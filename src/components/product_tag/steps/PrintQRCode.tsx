import React from 'react';
import useWindowDimensions from "../../ui/hooks/useWindowDimensions";
import {Card} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import QRCode from 'qrcode.react';
import {StoreState} from "../../../state/reducers";
import {connect} from "react-redux";
import {geolocated} from "react-geolocated";
import {IGeneratedProductTag} from "../../../interfaces/ProductTag";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            overflow: "auto"
        }
    }),
);

interface Props {
    generatedProductTag: IGeneratedProductTag
}

const _PrintQrCode = (props: Props) => {
    const classes = useStyles();
    const {height} = useWindowDimensions();

    return (
        <Card style={{
            height: height - 300
        }} className={classes.cardRoot}>
            <div>
                <QRCode value={props.generatedProductTag.address}/>
            </div>
        </Card>
    );
};

const mapStateToProps = ({generatedProductTag}: StoreState) => {
    return {generatedProductTag};
};

export const PrintQrCode = connect(
    mapStateToProps,
    {}
)(geolocated()(_PrintQrCode));
