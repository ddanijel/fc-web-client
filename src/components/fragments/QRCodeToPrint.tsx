import React from 'react';
import {IGeneratedProductTag} from "../../interfaces/ProductTag";
import {QRCode} from 'react-qr-svg';

interface Props {
    generatedProductTag: IGeneratedProductTag;
    children?: React.ReactElement;
}

export class QrCodeToPrint extends React.Component<Props> {
    render() {
        return (
            <div style={{
                order: 1
            }}>
                <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{
                        width: "76%",
                        marginLeft: "12%",
                        marginBottom: "15px"
                    }}
                    value={this.props.generatedProductTag.address}
                />
            </div>
        );
    }
}