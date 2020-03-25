import {Action, ActionTypes} from "../actions";
import {ISignUpFormData} from "../../interfaces/Producer";

const initialState = {
    producerName: "",
    licenceNumber: "",
    url: "",
    defaultActions: [],
    certificates: []
};

export const producerAuthReducer = (state: ISignUpFormData = initialState, action: Action): ISignUpFormData => {
    switch (action.type) {
        case ActionTypes.updateSignUpFormField:
            return {
                ...state,
                [action.field.name]: action.field.value
            };
        case ActionTypes.addDefaultActionToProducer:
            return {
                ...state,
                defaultActions: [
                    ...state.defaultActions,
                    action.newAction
                ]
            };
        default:
            return state;
    }
};