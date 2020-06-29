import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {StoreState} from "../../state/reducers";
import {connect} from "react-redux";
import {geolocated} from "react-geolocated";
import {INewProductTag} from "../../interfaces/ProductTag";
import {showMapViewForProductTag} from "../../state/actions/mapView";
import {Divider, List} from "@material-ui/core";
import {IScannedProducerReducer} from "../../state/reducers/scannedProducers";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MapIcon from '@material-ui/icons/Map';
import RemoveIcon from '@material-ui/icons/Remove';
import uuid from 'react-uuid';

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
        },
        listItemText: {
            marginRight: theme.spacing(1)
        },
        viewButton: {
            marginLeft: theme.spacing(2)
        },
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
            <Divider/>
            <List>
                {props.newProductTag.previousProductTags.map((productTag, index1) => (

                    <div key={uuid()}>
                        <ListItem>
                            <ListItemText
                                className={classes.listItemText}
                                primary={producers.map((producer, index2) => {
                                    if (producer.producerContractAddress === productTag.producerAddress) {
                                        console.log("returning: ", productTag);
                                        return <Typography key={uuid()}
                                                           className={classes.secondaryHeading}
                                        >
                                            {producer.producerName}
                                        </Typography>;
                                    } // todo improve this method
                                })}
                                primaryTypographyProps={{variant: 'h6', noWrap: true}}
                                secondary={`${productTag.dateTime.day}/${productTag.dateTime.month}/${productTag.dateTime.year.toString().substring(2, 4)}`}
                            />
                            <Tooltip title="Remove">
                                <IconButton
                                    className={classes.viewButton}
                                    edge="end"
                                    onClick={() => console.log('remove pt')}
                                >
                                    <RemoveIcon fontSize="large"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Show details on map">
                                <IconButton
                                    className={classes.viewButton}
                                    edge="end"

                                    onClick={() => props.showMapViewForProductTag(productTag)}
                                >
                                    <MapIcon fontSize="large"/>
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                        <Divider key={uuid()}/>
                    </div>
                ))}
            </List>
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
