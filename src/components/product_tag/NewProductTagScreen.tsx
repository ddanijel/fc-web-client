import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import ManageActionsForm from "../fragments/ManageActionsForm";
import {ScanProductTags} from "./steps/ScanProductTags";
import {NewPTOverview} from "./steps/NewPTOverview";
import {connect} from "react-redux";
import {StoreState} from "../../state/reducers";
import {
    addActionToNewProductTag,
    generateProductTag,
    setNewProductTagActiveStep,
    toggleActionOfNewProductTag,
    toggleQRScannerModal,
    Ui
} from "../../state/actions";
import {IGeolocation, INewProductTag} from "../../interfaces/ProductTag";
import {geolocated, GeolocatedProps} from "react-geolocated";
import {PrintShareQRCode} from "./steps/PrintShareQRCode";
import ArrowLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowRightIcon from '@material-ui/icons/ChevronRight';
import {Card} from "@material-ui/core";
import useWindowDimensions from "../ui/hooks/useWindowDimensions";
import CameraIcon from "@material-ui/icons/Camera";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stepperRoot: {
            height: theme.spacing(10),
            paddingTop: theme.spacing(1)
        },
        cardRoot: {
            height: theme.spacing(35),
            overflow: "auto"
        },
        root: {
            width: '100%',
        },
        buttonBack: {
            float: "left"
        },
        buttonNext: {
            float: "right"
        },
        scanPTButton: {
            // margin: theme.spacing(1),
            marginLeft: "5%"
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
    }),
);

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
            return <PrintShareQRCode/>;
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
            return "New Product Tag";
        default:
            return 'Unknown step';
    }
}

interface Props extends GeolocatedProps {
    children?: React.ReactElement;
    generateProductTag: Function;
    newProductTag: INewProductTag;
    ui: Ui;
    addActionToNewProductTag: typeof addActionToNewProductTag;
    toggleActionOfNewProductTag: typeof toggleActionOfNewProductTag;
    setNewProductTagActiveStep: typeof setNewProductTagActiveStep;
    toggleQRScannerModal: typeof toggleQRScannerModal
}


const _NewProductTag = (props: Props) => {
    const classes = useStyles();
    const steps = props.ui.newProductTagSteps.steps;
    const {height} = useWindowDimensions();

    const activeStep = props.ui.newProductTagSteps.activeStep;

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
        } else if (activeStep === steps.length - 1) {
            props.setNewProductTagActiveStep(0);
        } else {
            props.setNewProductTagActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        props.setNewProductTagActiveStep(activeStep - 1);
    };
    //
    // const handleReset = () => {
    //     props.setNewProductTagActiveStep(0);
    // };

    return (
        <div className={classes.root}>
            <Stepper className={classes.stepperRoot} alternativeLabel activeStep={activeStep}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
                <div className={classes.instructions}>
                    <Card style={{
                        height: height - 300
                    }} className={classes.cardRoot}>
                        {getStepContent(props, activeStep)}
                    </Card>
                </div>
                <div style={{
                    // display: "flex",
                    justifyContent: "center",
                }}>
                    <Button
                        style={{
                            width: "30%",
                            marginRight: "5%",
                            float: activeStep === 0 ? "none" : "left"
                        }}
                        variant="outlined"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        // className={classes.buttonBack}
                        startIcon={<ArrowLeftIcon/>}
                    >
                        Back
                    </Button>
                    {activeStep === 0 ?
                        <Button
                            style={{
                                width: "30%"
                            }}
                            variant="contained"
                            color="secondary"
                            // className={classes.scanPTButton}
                            startIcon={<CameraIcon/>}
                            onClick={() => props.toggleQRScannerModal(true)}
                        >
                            Scan
                        </Button>
                        : null}
                    <Button
                        style={{
                            width: activeStep === 0 ? "30%" : "40%",
                            marginLeft: "5%",
                            float: activeStep === 0 ? "none" : "right"
                        }}
                        variant={activeStep === 2 ? "contained" : "outlined"}
                        color={activeStep === 2 ? "secondary" : "inherit"}
                        onClick={handleNext}
                        // className={classes.buttonNext}
                        endIcon={<ArrowRightIcon/>}
                    >
                        {getForwardButtonText(activeStep)}
                    </Button>
                </div>
            </>
        </div>
    );
};

const mapStateToProps = ({newProductTag, ui}: StoreState) => {
    return {newProductTag, ui};
};

export const NewProductTagScreen = connect(
    mapStateToProps,
    {
        generateProductTag,
        addActionToNewProductTag,
        toggleActionOfNewProductTag,
        setNewProductTagActiveStep,
        toggleQRScannerModal
    }
)(geolocated()(_NewProductTag));
