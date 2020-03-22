import {Action, ActionTypes} from "../actions";
import {IProducer} from "../../interfaces/Producer";
import {getItemFromLocalStorage} from "../localStorage";
import {foodChainFactoryAddress, variableNames} from "../../global/constants";
import {isAlreadyAuthenticated} from "../helperFunction";


const initialState = {
    isAuthenticated: isAlreadyAuthenticated(),
    foodChainContractAddress: foodChainFactoryAddress,
    producerContractAddress: getItemFromLocalStorage(variableNames.producerContractAddress),
    producerOwnerAccountAddress: "",
    producerName: "",
    licenceNumber: "",
    url: "",
    defaultActions: [],
    certificates: [],
    productTags: []
};

export const producerReducer = (state: IProducer = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.persistProducer:
            return action.producer;
        case ActionTypes.producerSignIn:
            return {
                ...state,
                isAuthenticated: action.authenticated
            };
        default:
            return state;
    }
};