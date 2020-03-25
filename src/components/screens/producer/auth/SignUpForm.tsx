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
import {connect} from "react-redux";
import {
    addDefaultActionToProducer,
    signUpProducer,
    toggleDefaultActionForProducer,
    updateSignUpFormField
} from "../../../../state/actions";
import {useHistory} from "react-router-dom";
import {StoreState} from "../../../../state/reducers";
import {ISignUpFormData} from "../../../../interfaces/Producer";
import ManageActionsForm from "../../../fragments/ManageActionsForm";
import ProducerCertificatesForm from "../../../fragments/ProducerCertificatesForm";

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
    defaultActionsCard: {},
    cardTitle: {
        fontSize: 14
    }
}));

interface Props {
    children?: React.ReactElement;
    signUpProducer: Function;
    updateSignUpFormField: typeof updateSignUpFormField;
    producerAuth: ISignUpFormData;
    addDefaultActionToProducer: typeof addDefaultActionToProducer;
    toggleDefaultActionForProducer: typeof toggleDefaultActionForProducer;
}

const _SignUpForm = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();

    // const onSubmit = handleSubmit(
    //     ({
    //          producerName,
    //          licenceNumber,
    //          url,
    //          certificates
    //      }) => {
    //         props.signUpProducer({
    //             producerName,
    //             licenceNumber,
    //             url,
    //             certificates
    //         }, history);
    //         reset();
    //     });
    const onFormFieldChange = (eventTarget: (EventTarget & HTMLTextAreaElement) | (EventTarget & HTMLInputElement)) => {
        props.updateSignUpFormField(eventTarget.name, eventTarget.value);
    };

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

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="producerName"
                            name="producerName"
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            id="producerName"
                            label="Producer Name"
                            autoFocus
                            value={props.producerAuth.producerName}
                            onChange={(event) => onFormFieldChange(event.target)}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            size="small"
                            id="licenceNumber"
                            label="Licence Number"
                            name="licenceNumber"
                            autoComplete="licenceNumber"
                            value={props.producerAuth.licenceNumber}
                            onChange={(event) => onFormFieldChange(event.target)}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            size="small"
                            fullWidth
                            id="url"
                            label="URL"
                            name="url"
                            autoComplete="url"
                            value={props.producerAuth.url}
                            onChange={(event) => onFormFieldChange(event.target)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ManageActionsForm
                            currentActions={props.producerAuth.defaultActions}
                            addAction={props.addDefaultActionToProducer}
                            toggleAction={props.toggleDefaultActionForProducer}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ProducerCertificatesForm/>
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
            </div>
        </Container>
    );
};

const mapStateToProps = ({producerAuth}: StoreState) => {
    return {producerAuth};
};

export const SignUpForm = connect(
    mapStateToProps,
    {
        signUpProducer,
        updateSignUpFormField,
        addDefaultActionToProducer,
        toggleDefaultActionForProducer
    }
)(_SignUpForm);
