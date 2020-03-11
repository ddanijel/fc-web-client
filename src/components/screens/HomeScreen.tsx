import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            }
        },
    }),
);

const HomeScreen = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button component={Link} to="/producer" variant="contained">Producer</Button>
            <Button component={Link} to="/scan" variant="contained">Scan Product</Button>
        </div>
    );
};

export default HomeScreen;