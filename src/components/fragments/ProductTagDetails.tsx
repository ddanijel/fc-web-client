import React from 'react';
import {StoreState} from "../../state/reducers";
import {connect} from "react-redux";
import {Card} from "@material-ui/core";
import {INewProductTag, IProductTag} from "../../interfaces/ProductTag";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import useWindowDimensions from "../ui/hooks/useWindowDimensions";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {ScannedProductTagsPanel} from "../product_tag/ScannedProductTagsPanel";
import ActionsOverviewCard from "./ActionsOverviewCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            height: theme.spacing(35),
            overflow: "auto"
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        cardTitle: {
            fontSize: 16,
        }
    }),
);

interface Props {
    productTag: INewProductTag | IProductTag;
}

const _ProductTagDetails = (props: Props) => {
    const classes = useStyles();
    const {height} = useWindowDimensions();
    const {actions} = props.productTag;

    return (
        <Card style={{
            height: height - 300
        }} className={classes.cardRoot}>
            <div className={classes.demo}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Product Tag Overview
                    </Typography>
                </CardContent>

                <ActionsOverviewCard actions={actions}/>

                <Card style={{
                    margin: 7
                }}>
                    <CardContent>
                        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                            Previous Product Tags
                        </Typography>
                        <ScannedProductTagsPanel/>
                    </CardContent>
                </Card>

            </div>
        </Card>
    );
};

const mapStateToProps = ({}: StoreState) => {
    return {};
};

export const ProductTagDetails = connect(
    mapStateToProps,
    {}
)(_ProductTagDetails);
