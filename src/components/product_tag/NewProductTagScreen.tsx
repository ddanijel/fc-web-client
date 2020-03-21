import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {AddActions} from "./steps/AddActions";
import {ScanProductTags} from "./steps/ScanProductTags";
import {NewPTOverview} from "./steps/NewPTOverview";
import {connect} from "react-redux";
import {StoreState} from "../../state/reducers";
import {generateProductTag} from "../../state/actions";
import {Geolocation, NewProductTag} from "../../interfaces/productTag";
import {geolocated, GeolocatedProps} from "react-geolocated";
import PrintQrCode from "./steps/PrintQRCode";
import ArrowLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowRightIcon from '@material-ui/icons/ChevronRight';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stepperRoot: {
            height: theme.spacing(10),
            paddingTop: theme.spacing(1)
        },
        root: {
            width: '100%',
            // marginBottom: "1000px"
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
    }),
);

function getSteps() {
    return ['Scan', 'Actions', 'Create', "Print"];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <ScanProductTags/>;
        case 1:
            return <AddActions/>;
        case 2:
            return <NewPTOverview/>;
        case 3:
            return <PrintQrCode/>;
        default:
            return 'Unknown step';
    }
}


interface Props extends GeolocatedProps {
    children?: React.ReactElement;
    generateProductTag: Function;
    newProductTag: NewProductTag
}


const _NewProductTag = (props: Props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const getGeolocation = (): Geolocation => {
        return {
            longitude: props.coords?.longitude === undefined ? "" : props.coords.longitude.toString(),
            latitude: props.coords?.latitude === undefined ? "" : props.coords.latitude.toString()
        }
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {

            props.generateProductTag({
                ...props.newProductTag,
                geolocation: getGeolocation()
            });
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper className={classes.stepperRoot} alternativeLabel activeStep={activeStep}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Create New Product Tag
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                        <div style={{
                            float: "right"
                        }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.button}
                                startIcon={<ArrowLeftIcon/>}
                            >
                                Back
                            </Button>
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={handleNext}
                                className={classes.button}
                                endIcon={<ArrowRightIcon/>}
                            >
                                {activeStep === steps.length - 1 ? 'Create Product Tag' : 'Next'}
                            </Button>
                        </div>
                    </>
                )}
        </div>
    );
};

const mapStateToProps = ({newProductTag}: StoreState) => {
    return {newProductTag};
};

export const NewProductTagScreen = connect(
    mapStateToProps,
    {generateProductTag}
)(geolocated()(_NewProductTag));
