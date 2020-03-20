import React from 'react';
import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CameraIcon from '@material-ui/icons/Camera';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import DoneIcon from '@material-ui/icons/Done';
import PrintIcon from '@material-ui/icons/Print';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {StepIconProps} from '@material-ui/core/StepIcon';
import {AddActions} from "./steps/AddActions";
import {ScanProductTags} from "./steps/ScanProductTags";
import {NewPTOverview} from "./steps/NewPTOverview";
import {connect} from "react-redux";
import {StoreState} from "../../state/reducers";
import {generateProductTag} from "../../state/actions";
import {Geolocation, NewProductTag} from "../../interfaces/productTag";
import {geolocated, GeolocatedProps} from "react-geolocated";
import PrintQrCode from "./steps/PrintQRCode";

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(128,128,128) 0%, rgb(192,192,192) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(153,255,153) 0%, rgb(0,153,76) 50%, rgb(0,102,51) 100%)',
    },
});

function ColorlibStepIcon(props: StepIconProps) {
    const classes = useColorlibStepIconStyles();
    const {active, completed} = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <CameraIcon/>,
        2: <CallToActionIcon/>,
        3: <DoneIcon/>,
        4: <PrintIcon/>
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    return ['Scan', 'Add Actions', 'Create', "Print"];
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
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector/>}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
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
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Create Product Tag' : 'Next'}
                            </Button>
                        </div>
                    </>
                )}
            </div>
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
