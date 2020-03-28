import {Action, ActionTypes} from "../actions"
import {IGeneratedProductTag} from "../../interfaces/ProductTag";

const initialState = {
    address: ""
};

export const generatedProductTagReducer = (state: IGeneratedProductTag = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.saveGeneratedProductTagAddress:
            return {
                ...state,
                address: action.address
            };
        default:
            return state;
    }
};