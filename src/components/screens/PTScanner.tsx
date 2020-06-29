import React from 'react';
import {ScannedProductTagsPanel} from "../product_tag/ScannedProductTagsPanel";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {Card} from "@material-ui/core";
import {useDispatch} from 'react-redux';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import useWindowDimensions from "../ui/hooks/useWindowDimensions";
import CameraIcon from "@material-ui/icons/Camera";
import Button from "@material-ui/core/Button";
import {toggleQRScannerModal} from "../../state/actions";

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

const PtScanner = () => {
    const classes = useStyles();
    const {height} = useWindowDimensions();
    const dispatch = useDispatch();
    return (
        <>
            <Card style={{
                height: height - 150
            }} className={classes.cardRoot}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Scanned Products
                    </Typography>
                </CardContent>
                <CardContent style={{
                    height: "65%"
                }}>
                    <ScannedProductTagsPanel/>
                </CardContent>
                <CardActions style={{
                    position: "absolute"
                }}>
                </CardActions>
            </Card>
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Button
                    style={{
                        width: "30%",
                        marginTop: 10
                    }}
                    variant="contained"
                    color="secondary"
                    // className={classes.scanPTButton}
                    startIcon={<CameraIcon/>}
                    onClick={() => dispatch(toggleQRScannerModal(true))}
                >
                    Scan
                </Button>
            </div>
        </>
    );
};

export default PtScanner;