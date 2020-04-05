import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ManageActionsForm from "../fragments/ManageActionsForm";
import {ScanProductTags} from "./steps/ScanProductTags";
import {NewPTOverview} from "./steps/NewPTOverview";
import {connect} from "react-redux";
import {StoreState} from "../../state/reducers";
import {addActionToNewProductTag, generateProductTag, toggleActionOfNewProductTag} from "../../state/actions";
import {IGeolocation, INewProductTag} from "../../interfaces/ProductTag";
import {geolocated, GeolocatedProps} from "react-geolocated";
import {PrintQrCode} from "./steps/PrintQRCode";
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
        buttonBack: {
            // marginRight: theme.spacing(1),
            float: "left"
        },
        buttonNext: {
            // marginRight: theme.spacing(1),
            float: "right"
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

function getStepContent(props: Props, step: number) {
    switch (step) {
        case 0:
            return <ScanProductTags/>;
        case 1:
            return <ManageActionsForm
                currentActions={props.newProductTag.actions}
                addAction={props.addActionToNewProductTag}
                toggleAction={props.toggleActionOfNewProductTag}
            />;
        case 2:
            return <NewPTOverview/>;
        case 3:
            return <PrintQrCode/>;
        default:
            return 'Unknown step';
    }
}

function getForwardButtonText(step) {
    switch (step) {
        case 0:
            return "Actions";
        case 1:
            return "Overview";
        case 2:
            return "Create";
        case 3:
            return "Print QR Code";
        default:
            return 'Unknown step';
    }
}

interface Props extends GeolocatedProps {
    children?: React.ReactElement;
    generateProductTag: Function;
    newProductTag: INewProductTag;
    addActionToNewProductTag: typeof addActionToNewProductTag;
    toggleActionOfNewProductTag: typeof toggleActionOfNewProductTag;
}


const _NewProductTag = (props: Props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const getGeolocation = (): IGeolocation => {
        return {
            longitude: props.coords?.longitude === undefined ? 0 : props.coords.longitude,
            latitude: props.coords?.latitude === undefined ? 0 : props.coords.latitude
        }
    };

    const handleNext = () => {
        if (activeStep === 2) {

            props.generateProductTag({
                ...props.newProductTag,
                geolocation: getGeolocation()
                // geolocation: {
                //     longitude: 8.5417,
                //     latitude: 47.3769
                // }
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
                    <Button onClick={handleReset} className={classes.buttonBack}>
                        Create New Product Tag
                    </Button>
                </div>
            ) : (
                <>
                    <div className={classes.instructions}>{getStepContent(props, activeStep)}</div>
                    <Button
                        variant="outlined"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.buttonBack}
                        startIcon={<ArrowLeftIcon/>}
                    >
                        Back
                    </Button>
                    <Button
                        variant={activeStep === 2 ? "contained" : "outlined"}
                        color={activeStep === 2 ? "secondary" : "inherit"}
                        onClick={handleNext}
                        className={classes.buttonNext}
                        endIcon={<ArrowRightIcon/>}
                    >
                        {getForwardButtonText(activeStep)}
                    </Button>
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
    {
        generateProductTag,
        addActionToNewProductTag,
        toggleActionOfNewProductTag
    }
)(geolocated()(_NewProductTag));
