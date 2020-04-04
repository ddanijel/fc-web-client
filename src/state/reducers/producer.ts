import {Action, ActionTypes} from "../actions";
import {IProducer} from "../../interfaces/Producer";
import {getItemFromLocalStorage} from "../localStorage";
import {foodChainFactoryAddress, variableNames} from "../../global/constants";
import {isAlreadyAuthenticated} from "../helperFunction";

const producer: IProducer = getItemFromLocalStorage(variableNames.producer);

const initialState = {
    isAuthenticated: isAlreadyAuthenticated(),
    foodChainContractAddress: foodChainFactoryAddress,
    producerContractAddress: producer.producerContractAddress,
    producerOwnerAccountAddress: producer.producerOwnerAccountAddress,
    producerName: producer.producerName,
    licenceNumber: producer.licenceNumber,
    url: producer.url,
    defaultActions: producer.defaultActions,
    certificates: producer.certificates,
    productTags: producer.productTags
};

export const producerReducer = (state: IProducer = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.persistProducer:
            const producer = action.producer;
            console.log("prod: ", producer);
            return {
                ...state,
                isAuthenticated: true,
                producerContractAddress: producer.producerContractAddress,
                producerOwnerAccountAddress: producer.producerOwnerAccountAddress,
                producerName: producer.producerName,
                licenceNumber: producer.licenceNumber,
                url: producer.url,
                defaultActions: producer.defaultActions,
                certificates: producer.certificates,
                productTags: producer.productTags
            };
        case ActionTypes.producerSignIn:
            return {
                ...state,
                isAuthenticated: action.authenticated
            };
        default:
            return state;
    }
};