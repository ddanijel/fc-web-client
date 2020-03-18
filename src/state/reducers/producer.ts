import {Action, ActionTypes} from "../actions";
import {Producer} from "../../interfaces/producer";
import {getItemFromLocalStorage} from "../localStorage";
import {variableNames} from "../../global/constants";

const isAlreadyAuthenticated = ():boolean => {
    return JSON.stringify(getItemFromLocalStorage("authenticated")) == 'true'
};

const initialState = {
    isAuthenticated: isAlreadyAuthenticated(),
    foodChainOwnerAddress: getItemFromLocalStorage(variableNames.producerContractAddress),
    owner: "",
    producerName: "",
    licenceNumber: "",
    url: "",
    certificates: "",
    defaultActions: "",
    productTags: []
};

export const producerReducer = (state: Producer = initialState, action: Action) => {
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