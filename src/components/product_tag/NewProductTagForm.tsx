import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Controller, useForm} from "react-hook-form";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {ProductTag} from "../../interfaces/productTag";
import {generateProductTag} from "../../state/actions/productTag";

import { GeolocatedProps, geolocated } from "react-geolocated";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        // width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface Props extends GeolocatedProps {
    children?: React.ReactElement;
    generateProductTag: Function;

}

const _NewProductTagForm = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const {handleSubmit, control, reset} = useForm<ProductTag>();

    const actions = [];
    const longitude = "lfs";
    const latitude = "lfs";
    const previousProductTags = [];

    console.log("Coordinates: ", props.coords); // todo continue here

    const onSubmit = handleSubmit(
        ({
             producerAddress,
            actions,
            longitude,
            latitude,
            previousProductTagAddresses
         }) => {
            props.generateProductTag({
                producerAddress,
                actions,
                longitude,
                latitude,
                previousProductTagAddresses
            }, history);
            reset();
        });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="producerAddress"
                                control={control}
                                defaultValue="Producer 1"
                                as={
                                    <TextField
                                        autoComplete="producerAddress"
                                        name="producerAddress"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="producerAddress"
                                        label="Producer Address"
                                        autoFocus
                                        contentEditable={false}
                                    />
                                }
                            />

                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export const NewProductTagForm = connect(
    null,
    {generateProductTag}
)(geolocated()(_NewProductTagForm));
