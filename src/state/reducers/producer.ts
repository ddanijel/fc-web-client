import {Action, ActionTypes} from "../actions";
import {Producer} from "../../interfaces/producer";
import {getItemFromLocalStorage} from "../localStorage";
import {variableNames} from "../../global/constants";



const initialState = {
    isAuthenticated: false,
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