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

interface SignUpFormData {
    producerName: string;
    licenceNumber: string;
    url: string;
    certificates: string;
}

export default function SignUpForm() {
    const classes = useStyles();
    const {register, setValue, handleSubmit, errors, control} = useForm<SignUpFormData>();

    const onSubmit = handleSubmit(({
                                       producerName,
                                       licenceNumber,
                                       url,
                                       certificates
                                   }) => {
        console.log("submiting: ", {
            producerName,
            licenceNumber,
            url,
            certificates
        });
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="producerName"
                                control={control}
                                defaultValue=""
                                as={
                                    <TextField
                                        autoComplete="producerName"
                                        name="producerName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="producerName"
                                        label="Producer Name"
                                        autoFocus
                                    />
                                }
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="licenceNumber"
                                control={control}
                                defaultValue=""
                                as={
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="licenceNumber"
                                        label="Licence Number"
                                        name="licenceNumber"
                                        autoComplete="lnumber"
                                    />
                                }
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="url"
                                control={control}
                                defaultValue=""
                                as={
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="url"
                                        label="URL"
                                        name="url"
                                        autoComplete="url"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="certificates"
                                control={control}
                                defaultValue=""
                                as={
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="certificates"
                                        label="Certificates"
                                        id="certificates"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="agreeWithTermsAndConditions" color="primary"/>}
                                label="I agree with terms and conditions"
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
}