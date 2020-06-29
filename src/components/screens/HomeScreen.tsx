import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import {routePaths} from "../../global/constants";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            }
        },
        button: {
            display: 'flex',
            justifyContent: 'center'
        },
        buttonGroup: {
            height: 150,
            marginTop: 50
        }
    }),
);


const HomeScreen = () => {
    const classes = useStyles();
    return (

        <div className={classes.root}>
            <Box mt={3}>
                <Typography
                    variant="h5"
                    color="textPrimary"
                >
                    Decentralized Web-based Supply Chain Tracking Application
                </Typography>
            </Box>

            <Box mt={3}>
                <Grid
                    className={classes.buttonGroup}
                    container
                    spacing={3}
                >
                    <Grid
                        className={classes.button}
                        item
                        xs={12}
                    >
                        <Button component={Link} to={routePaths.producerAuthPage} variant="contained">Producer</Button>
                    </Grid>
                    <Grid
                        className={classes.button}
                        item
                        xs={12}
                    >
                        <Button component={Link} to={routePaths.ptScan} variant="contained">Consumer</Button>
                    </Grid>
                </Grid>
            </Box>
            {/*<div className="Demo__some-network">*/}
            {/*    <EmailShareButton*/}
            {/*        url='lfjsda'*/}
            {/*        title='lfsdj'*/}
            {/*        className="Demo__some-network__share-button"*/}
            {/*    >*/}
            {/*        <EmailIcon size={32} round />*/}
            {/*    </EmailShareButton>*/}
            {/*</div>*/}
        </div>
    );
};

export default HomeScreen;
