import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbarMargin: {
            ...theme.mixins.toolbar
        }
    }),
);

interface Props {
    children?: React.ReactElement;
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

const Header = (props: Props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar color="primary">
                    <Toolbar>
                        <Typography variant="h5">FoodChain</Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <div className={
                classes.toolbarMargin
            }/>
        </React.Fragment>
    );
};

export default Header;