import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {StoreState} from "../../state/reducers";
import {connect} from "react-redux";
import {geolocated} from "react-geolocated";
import {NewProductTag} from "../../interfaces/productTag";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

interface Props {
    newProductTag: NewProductTag
}

const _ScannedProductTagsPanel = (props: Props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            {props.newProductTag.previousProductTags.map((productTag, index) => (
                <ExpansionPanel key={index} expanded={expanded === productTag.productTagAddress}
                                onChange={handleChange(productTag.productTagAddress)}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography
                            className={classes.heading}>{productTag.dateTime.day}/{productTag.dateTime.month}/{productTag.dateTime.year.toString().substring(2, 4)}</Typography>
                        <Typography className={classes.secondaryHeading}>Producer Name</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {productTag.productTagAddress}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}

        </div>
    );
};

const mapStateToProps = ({newProductTag}: StoreState) => {
    return {newProductTag};
};

export const ScannedProductTagsPanel = connect(
    mapStateToProps,
    {}
)(geolocated()(_ScannedProductTagsPanel));
