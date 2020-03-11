import {Action, ActionTypes} from "../actions";
import {Producer} from "../../interfaces/producer";

const initialState = {
    foodChainOwnerAddress: "",
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
        case ActionTypes.producerSignUp:
            return action.producer;
        default:
            return state;
    }
};