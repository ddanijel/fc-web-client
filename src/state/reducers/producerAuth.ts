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
        case ActionTypes.addCertificateToProducer:
            return {
                ...state,
                certificates: [
                    ...state.certificates,
                    action.newCertificate
                ]
            };
        case ActionTypes.toggleDefaultActionForProducer:
            return {
                ...state,
                defaultActions: state.defaultActions.map(act => {
                    if (act.name === action.action.name) {
                        return {
                            name: act.name,
                            selected: !act.selected
                        };
                    } else return act;
                })
            };
        case ActionTypes.toggleCertificateForProducer:
            return {
                ...state,
                certificates: state.certificates.map(cer => {
                    if (cer.name === action.certificate.name) {
                        return {
                            name: cer.name,
                            selected: !cer.selected
                        };
                    } else return cer;
                })
            };
        default:
            return state;
    }
};