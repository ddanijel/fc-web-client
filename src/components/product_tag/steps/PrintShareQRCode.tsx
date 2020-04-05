import React, {useRef} from 'react';
import {StoreState} from "../../../state/reducers";
import {connect} from "react-redux";
import {geolocated} from "react-geolocated";
import {IGeneratedProductTag} from "../../../interfaces/ProductTag";
import ReactToPrint from "react-to-print";
import {QrCodeToPrint} from "../../fragments/QRCodeToPrint";
import {Button} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";


interface Props {
    generatedProductTag: IGeneratedProductTag
}

const _PrintQrCode = (props: Props) => {

    const componentRef = useRef<HTMLDivElement>(null);


    return (
        <>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Generated QR Code
                </Typography>
            </CardContent>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <ReactToPrint
                    content={() => componentRef.current}
                    trigger={() =>
                        <Button
                            style={{
                                order: 2
                            }}
                            variant={"contained"}
                            color="secondary"
                        >
                            Print QR Code
                        </Button>}
                />
                <QrCodeToPrint
                    generatedProductTag={props.generatedProductTag}
                    // @ts-ignore
                    ref={componentRef}
                />

            </div>
        </>
    );
};

const mapStateToProps = ({generatedProductTag}: StoreState) => {
    return {generatedProductTag};
};

export const PrintShareQRCode = connect(
    mapStateToProps,
    {}
)(geolocated()(_PrintQrCode));

