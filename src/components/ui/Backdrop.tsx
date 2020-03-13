import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {StoreState} from "../../state/reducers";
import {Ui} from "../../state/actions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

interface Props {
    ui: Ui
}

const _Backdrop = (props: Props) => {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={props.ui.isLoading}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
};

const mapStateToProps = ({ui}: StoreState): { ui: Ui } => {
    return {ui};
};

export const LoadingBackdrop = connect(
    mapStateToProps,
    {}
)(_Backdrop);
