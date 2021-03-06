import {INewProductTagAction} from "./ProductTag";

export interface ISignUpFormData {
    producerName: string;
    licenceNumber: string;
    url: string;
    defaultActions: INewProductTagAction[];
    certificates: IProducerNewCertificate[];
}

export interface IProducerNewCertificate {
    name: string;
    selected: boolean;
}

export interface ISignInFormData {
    producerContractAddress: string;
}

export interface IProducer {
    isAuthenticated: boolean;
    foodChainContractAddress: string | undefined;
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