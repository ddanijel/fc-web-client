import React from 'react';
import {IProducerCertificate} from "../../interfaces/Producer";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";


interface Props {
    certificates: IProducerCertificate[];
    addCertificate: Function;
    toggleCertificate: Function;
}

const ProducerCertificatesForm = () => {
    return (
        <Card>
            <CardContent>
                Certificates
            </CardContent>
        </Card>
    );
};

export default ProducerCertificatesForm;