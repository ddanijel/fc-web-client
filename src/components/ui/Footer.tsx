import React from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://www.csg.uzh.ch/csg/en/research/Foodchains.html">
                CSG
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Copyright/>
            </Container>
        </footer>
    );
};

export default Footer;