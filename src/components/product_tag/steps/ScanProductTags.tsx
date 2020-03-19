import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import QrReader from 'react-qr-reader'
import {StoreState} from "../../../state/reducers";
import {connect} from "react-redux";
import {fetchProductTag} from "../../../state/actions";
import {isAddressValid} from "../../../ethereum/helpers";

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
    fetchProductTag: Function
}

const _ScanProductTags = (props: Props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOnScan = (data: string) => {
        console.log("data: ", data);
        console.log("valid: ", isAddressValid(data));
        if (isAddressValid(data)) props.fetchProductTag(data);
    };

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                react-transition-group
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <QrReader
                            delay={300}
                            onError={() => console.error("error")}
                            onScan={(data) => handleOnScan("0x56Ccc978680F9C0E65069481a3fF59Ad2250bb5b")} // todo
                            style={{width: '100%'}}
                        />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


const mapStateToProps = ({newProductTag}: StoreState) => {
    return {newProductTag};
};

export const ScanProductTags = connect(
    mapStateToProps,
    {
        fetchProductTag
    }
)(_ScanProductTags);
