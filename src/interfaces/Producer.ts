import {INewProductTagAction} from "./ProductTag";

export interface ISignUpFormData {
    producerName: string;
    licenceNumber: string;
    url: string;
    defaultActions: INewProductTagAction[];
    certificates: IProducerCertificate[];
}

export interface IProducerCertificate {
    name: string;
    selected: boolean;
}

export interface ISignInFormData {
    producerContractAddress: string;
}

export interface IProducer {
    isAuthenticated: boolean;
    foodChainContractAddress: string;
    producerContractAddress: string,
    producerOwnerAccountAddress: string;
    producerName: string;
    licenceNumber: string;
    url: string;
    defaultActions: string[];
    certificates: string[];
    productTags: string[];
}

export interface IScannedProducer {
    producerContractAddress: string;
    producerOwnerAccountAddress: string;
    producerName: string;
    licenceNumber: string;
    url: string;
    certificates: string[];
    productTags: string[];
}