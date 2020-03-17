export interface SignUpFormData {
    producerName: string;
    licenceNumber: string;
    url: string;
    certificates: string;
}

export interface SignInFormData {
    producerContractAddress: string;
}

export interface Producer {
    isAuthenticated: boolean,
    foodChainOwnerAddress: string,
    // producerContractAddress,
    owner: string,
    producerName: string,
    licenceNumber: string,
    url: string,
    certificates: string,
    defaultActions: string,
    productTags: string[]
}