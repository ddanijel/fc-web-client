export interface ISignUpFormData {
    producerName: string;
    licenceNumber: string;
    url: string;
    certificates: string;
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