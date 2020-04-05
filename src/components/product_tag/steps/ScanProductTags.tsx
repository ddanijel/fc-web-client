import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {StoreState} from "../../../state/reducers";
import {connect} from "react-redux";
import {Ui} from "../../../state/actions";
import {INewProductTag} from "../../../interfaces/ProductTag";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {ScannedProductTagsPanel} from "../ScannedProductTagsPanel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            overflow: "auto"
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        cardActions: {
            justifyContent: 'center'
        }
    }),
);

interface Props {
    newProductTag: INewProductTag
    ui: Ui
}

const _ScanProductTags = (props: Props) => {
    const classes = useStyles();

    return (
        <>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Scanned Products
                </Typography>
            </CardContent>
            <CardContent style={{
                height: "65%"
            }}>
                <ScannedProductTagsPanel/>
            </CardContent>
            <CardActions style={{
                position: "absolute"
            }} className={classes.cardActions}>
            </CardActions>
        </>
    );
};


const mapStateToProps = ({newProductTag, ui}: StoreState) => {
    return {newProductTag, ui};
};

export const ScanProductTags = connect(
    mapStateToProps,
    {}
)(_ScanProductTags);
