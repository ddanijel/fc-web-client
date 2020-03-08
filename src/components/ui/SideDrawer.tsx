import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LanguageIcon from '@material-ui/icons/Language';
import {connect} from "react-redux";
import {toggleDrawer, Ui} from "../../state/actions";
import {StoreState} from "../../state/reducers";

interface Props {
    children?: React.ReactElement;
    ui: Ui;
    toggleDrawer: typeof toggleDrawer;
}

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const _SideDrawer = (props: Props) => {
    const classes = useStyles();


    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        props.toggleDrawer(open);
    };

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Language'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <LanguageIcon/> : <LanguageIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </div>
    );

    return (
        <>
            <SwipeableDrawer
                open={props.ui.isDrawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {sideList()}
            </SwipeableDrawer>
        </>
    );
};

const mapStateToProps = ({ui}: StoreState) => {
    return {ui};
};

export const SideDrawer = connect(
    mapStateToProps,
    {toggleDrawer}
)(_SideDrawer);