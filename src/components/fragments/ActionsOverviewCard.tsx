import React from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Card} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {INewProductTagAction, IProductTagAction} from "../../interfaces/ProductTag";
import uuid from 'react-uuid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            margin: 7,
            width: "100%",
            overflow: "auto"
        },
        cardTitle: {
            fontSize: 16,
        }
    }),
);

interface Props {
    actions: IProductTagAction[] | INewProductTagAction[];
}

const ActionsOverviewCard = (props: Props) => {
    const classes = useStyles();
    const {actions} = props;
    // @ts-ignore
    const filteredActions = actions.length > 0 && actions[0].selected !== undefined ? actions.filter(action => action.selected).map(action => action.name) : actions.map(action => action);
    return (
        <Card className={classes.cardRoot}>
            <CardContent>
                <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                    Actions
                </Typography>
                <List dense={true}>
                    {filteredActions.map((actionName, index) => {
                            return React.cloneElement(
                                <ListItem key={uuid()}>
                                    <ListItemText
                                        primary={(index + 1) + `. ` + actionName}
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
    );
};

export default ActionsOverviewCard;