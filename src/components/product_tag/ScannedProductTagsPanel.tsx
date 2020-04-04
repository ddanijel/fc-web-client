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
import {INewProductTag} from "../../interfaces/ProductTag";
import Button from "@material-ui/core/Button";
import {showMapViewForProductTag} from "../../state/actions/mapView";
import {Divider} from "@material-ui/core";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import {IScannedProducerReducer} from "../../state/reducers/scannedProducers";
import ActionsOverviewCard from "../fragments/ActionsOverviewCard";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            overflow: "auto",
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
        contractAddressForm: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            // '& > *': {
            //     margin: theme.spacing(1),
            // },
        }
    }),
);

interface Props {
    newProductTag: INewProductTag;
    scannedProducers: IScannedProducerReducer;
    showMapViewForProductTag: Function;
}

const _ScannedProductTagsPanel = (props: Props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const {producers} = props.scannedProducers;

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
                        {producers.map((producer, index) => {
                            if (producer.producerContractAddress === productTag.producerAddress) {
                                return <Typography key={index}
                                                   className={classes.secondaryHeading}
                                >
                                    {producer.producerName}
                                </Typography>;
                            } // todo improve this method
                        })}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ActionsOverviewCard actions={productTag.actions}/>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <div className={classes.contractAddressForm}>
                            <TextField
                                style={{marginRight: "10px"}}
                                id="outlined-basic"
                                label="Contract Address"
                                variant="outlined"
                                value={productTag.productTagAddress}
                                disabled={true}
                                size={"medium"}
                            />
                            <Button
                                target={"_blank"}
                                href={"www.google.com"}
                                size={"small"}

                                variant="outlined"
                            >
                                Show on Etherscan
                            </Button>

                        </div>
                    </ExpansionPanelDetails>
                    <Divider/>
                    <ExpansionPanelActions>
                        <Button
                            variant="outlined"
                            onClick={() => props.showMapViewForProductTag(productTag)}
                        >
                            Show on map
                        </Button>
                    </ExpansionPanelActions>
                    <Divider/>
                    <Divider/>
                    <div style={{
                        marginTop: "70px"
                    }}/>
                </ExpansionPanel>
            ))}

        </div>
    );
};

const mapStateToProps = ({newProductTag, scannedProducers}: StoreState) => {
    return {newProductTag, scannedProducers};
};

export const ScannedProductTagsPanel = connect(
    mapStateToProps,
    {
        showMapViewForProductTag
    }
)(geolocated()(_ScannedProductTagsPanel));
