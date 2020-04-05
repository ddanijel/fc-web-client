import React from 'react';
import {Card} from "@material-ui/core";
import {INewProductTag, IProductTag} from "../../interfaces/ProductTag";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {ScannedProductTagsPanel} from "../product_tag/ScannedProductTagsPanel";
import ActionsOverviewCard from "./ActionsOverviewCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

const ProductTagDetails = (props: Props) => {
    const classes = useStyles();
    const {actions} = props.productTag;

    return (
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
    );
};


export default ProductTagDetails;