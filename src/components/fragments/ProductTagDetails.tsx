import React from 'react';
import {Card} from "@material-ui/core";
import {INewProductTag, IProductTag} from "../../interfaces/ProductTag";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {ScannedProductTagsPanel} from "../product_tag/ScannedProductTagsPanel";
import ActionsOverviewCard from "./ActionsOverviewCard";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        demo: {
            backgroundColor: theme.palette.background.paper,
            overflow: "auto",
        },
        cardTitle: {
            fontSize: 16,
        },
        dateTextField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            // width: 200,
        },
    }),
);

interface Props {
    productTag: INewProductTag | IProductTag;
    height?: string;
    showPreviousProductTagsList?: boolean;
}

const ProductTagDetails = (props: Props) => {
    const classes = useStyles();
    const {actions, dateTime} = props.productTag;

    const shouldShowPreviousProductTagsList = (): boolean => {
        return !(props.showPreviousProductTagsList === undefined || !props.showPreviousProductTagsList);
    };
    const formattedDateTime = new Date(dateTime.year, dateTime.month - 1, dateTime.day, dateTime.hour, dateTime.minute);

    return (
        <div className={classes.demo} style={{
            height: props.height ? props.height : "100%"
        }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Product Tag Overview
                </Typography>
            </CardContent>

            <TextField
                variant="outlined"
                id="datetime-local"
                disabled={true}
                label="Creation Date"
                type="dateTextField"
                defaultValue={`${formattedDateTime.toDateString()}, ${formattedDateTime.toLocaleTimeString()}`}
                className={classes.dateTextField}
            />

            <ActionsOverviewCard actions={actions}/>

            {shouldShowPreviousProductTagsList() ?
                <Card style={{
                    margin: 7
                }}>
                    <CardContent>
                        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                            Previous Product Tags
                        </Typography>
                        <ScannedProductTagsPanel/>
                    </CardContent>
                </Card> : null
            }

        </div>
    );
};


export default ProductTagDetails;