import React from 'react';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import {StoreState} from "../../state/reducers";
import {connect} from "react-redux";
import {fetchPreviousProductTag, toggleQRScannerModal, Ui} from "../../state/actions";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import QrReader from 'react-qr-reader'
import {isAddressValid} from "../../ethereum/helpers";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            width: "80%",
            height: "40%",
            marginLeft: "10%",
            marginTop: "30%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            width: "100%",
            height: "100%",
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

interface Props {
    ui: Ui
    fetchPreviousProductTag: Function
    toggleQRScannerModal: typeof toggleQRScannerModal
}

const _QrScannerModal = (props: Props) => {
    const classes = useStyles();

    const handleOnScan = (data: string) => {
        if (isAddressValid(data)) {
            props.fetchPreviousProductTag(data);
            props.toggleQRScannerModal(false)
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.ui.isQRScannerModalOpen}
            onClose={() => props.toggleQRScannerModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.ui.isQRScannerModalOpen}>
                <div className={classes.paper}>
                    <QrReader
                        delay={300}
                        onError={() => console.error("error")}
                        onScan={(data) => handleOnScan("0xdf14D00FcDcEBCCdE1Ea6Ac8aD0223549FE486Cb")} // todo
                        style={{width: '100%'}}
                    />
                </div>
            </Fade>
        </Modal>
    );
};

const mapStateToProps = ({ui}: StoreState) => {
    return {ui};
};

export const QrScannerModal = connect(
    mapStateToProps,
    {
        fetchPreviousProductTag,
        toggleQRScannerModal

    }
)(_QrScannerModal);
