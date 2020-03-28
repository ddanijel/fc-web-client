import React from 'react';
import {StoreState} from "../../state/reducers";
import {connect} from "react-redux";
import {Card} from "@material-ui/core";
import {INewProductTag, IProductTag} from "../../interfaces/ProductTag";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import useWindowDimensions from "../ui/hooks/useWindowDimensions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
    // @ts-ignore
    const filteredActions = actions.length > 0 && actions[0].selected !== undefined ? actions.filter(action => action.selected).map(action => action.name) : actions.map(action => action.name);

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

                <Card>
                    <CardContent>
                        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                            Actions
                        </Typography>
                        <List dense={true}>
                            {filteredActions.map((actionName, index) => {
                                    console.log("filteredActions: ", filteredActions);
                                    return React.cloneElement(
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={actionName}
                                            />
                                        </ListItem>,
                                        {
                                            key: actionName,
                                        })
                                }
                            )}
                        </List>
                    </CardContent>
                </Card>


                {JSON.stringify(props.productTag)}
                {JSON.stringify(props.productTag)}
                {JSON.stringify(props.productTag)}
                {JSON.stringify(props.productTag)}
                {JSON.stringify(props.productTag)}
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
