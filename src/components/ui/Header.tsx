import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import {SideDrawer} from "./SideDrawer";
import {connect} from "react-redux";
import {toggleDrawer} from "../../state/actions";
import {Link} from "react-router-dom";
import {StoreState} from "../../state/reducers";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbarMargin: {
            ...theme.mixins.toolbar
        },
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            color: 'inherit',
            textDecoration: 'none'
        },
    }),
);

interface Props {
    children?: React.ReactElement;
    toggleDrawer: typeof toggleDrawer;
}

function HideOnScroll(props: Props) {
    const { children } = props;
    const trigger = useScrollTrigger({});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const _Header = (props: Props) => {
    const classes = useStyles();

    const onDrawerButtonClicked = (): void => {
        props.toggleDrawer(true);
    };

    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar color="primary">
                    <Toolbar>
                        <IconButton onClick={onDrawerButtonClicked} edge="start" className={classes.menuButton}
                                    color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography component={Link} to="/" variant="h6" className={classes.title}>
                            FoodChain
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <div className={
                classes.toolbarMargin
            }/>
            <SideDrawer/>
        </React.Fragment>
    );
};

const mapStateToProps = ({ui}: StoreState) => {
    return {ui};
};

export const Header = connect(
    mapStateToProps,
    {toggleDrawer}
)(_Header);
