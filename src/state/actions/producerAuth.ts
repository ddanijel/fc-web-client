import {IProducerNewCertificate, ISignUpFormData} from "../../interfaces/Producer";
import {History} from "history";
import {Dispatch} from "redux";
import {toggleIsLoading, ToggleIsLoadingAction} from "./ui";
import web3 from "../../ethereum/web3";
import FoodChain from "../../ethereum/foodChain";
import ProducerContract from "../../ethereum/producer";
import {saveItemToLocalStorage} from "../localStorage";
import {routePaths, variableNames} from "../../global/constants";
import {ActionTypes} from "./types";
import {PersistProducerAction, populateProducer} from "./producer";
import {INewProductTagAction} from "../../interfaces/ProductTag";


export interface UpdateSignUpFormFieldAction {
    type: ActionTypes.updateSignUpFormField;
    field: {
        name: string,
        value: string
    }
}

export interface AddDefaultActionToProducerAction {
    type: ActionTypes.addDefaultActionToProducer;
    newAction: INewProductTagAction
}

export interface AddCertificateToProducerAction {
    type: ActionTypes.addCertificateToProducer;
    newCertificate: IProducerNewCertificate
}

export const addDefaultActionToProducer = (newAction: INewProductTagAction): AddDefaultActionToProducerAction => {
    return {
        type: ActionTypes.addDefaultActionToProducer,
        newAction
    }
};

export const addCertificateToProducer = (newCertificate: IProducerNewCertificate): AddCertificateToProducerAction => {
    return {
        type: ActionTypes.addCertificateToProducer,
        newCertificate
    }
};


export interface ProducerSignInAction {
    type: ActionTypes.producerSignIn;
    authenticated: boolean
}

export const signUpProducer = (producerSignUpFormData: ISignUpFormData, history: History): (dispatch: Dispatch) => Promise<void> => {
    return async (dispatch: Dispatch) => {
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));

        try {
            const accounts = await web3.eth.getAccounts();
            await FoodChain().methods.registerProducer(
                producerSignUpFormData.producerName,
                producerSignUpFormData.licenceNumber,
                producerSignUpFormData.url,
                producerSignUpFormData.defaultActions.filter(action => action.selected).map(action => action.name),
                producerSignUpFormData.certificates.filter(certificate => certificate.selected).map(certificate => certificate.name)
            ).send({from: accounts[0]});
            const contractAddress = await FoodChain().methods.getContractForProducer(accounts[0]).call();
            const producerResult = await ProducerContract(contractAddress).methods.describeProducer().call();
            const producer = populateProducer(producerResult, contractAddress);
            saveItemToLocalStorage(variableNames.producerContractAddress, contractAddress);
            saveItemToLocalStorage("authenticated", true);
            dispatch<PersistProducerAction>({
                type: ActionTypes.persistProducer,
                producer
            });
            history.push(routePaths.producer);
        } catch (e) {
            console.error(e);
        } finally {
            dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
        }
    }
};

export const signInProducer = (producerContractAddress: string, history: History) => {
    return async (dispatch: Dispatch) => {
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));
        try {
            const accounts = await web3.eth.getAccounts();
            const authenticated = await ProducerContract(producerContractAddress).methods.isAuthenticated().call();
            dispatch<ProducerSignInAction>({
                type: ActionTypes.producerSignIn,
                authenticated: authenticated
            });
            if (authenticated) {
                const producerResult = await ProducerContract(producerContractAddress).methods.describeProducer().call();
                const producer = populateProducer(producerResult, producerContractAddress);
                dispatch<PersistProducerAction>({
                    type: ActionTypes.persistProducer,
                    producer
                });
                saveItemToLocalStorage(variableNames.producerContractAddress, producerContractAddress);
                saveItemToLocalStorage("authenticated", true);
                history.push(routePaths.producer);
            }
        } catch (e) {
            dispatch<ProducerSignInAction>({
                type: ActionTypes.producerSignIn,
                authenticated: false
            });
            console.error("Error while signing in the producer, message: ", e);
        } finally {
            dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
        }
    }
};


export const updateSignUpFormField = (name: string, value: string): UpdateSignUpFormFieldAction => {
    return {
        type: ActionTypes.updateSignUpFormField,
        field: {
            name,
            value
        }
    }
};


export interface ToggleDefaultActionForProducerAction {
    type: ActionTypes.toggleDefaultActionForProducer,
    action: INewProductTagAction
}


export const toggleDefaultActionForProducer = (action: INewProductTagAction): ToggleDefaultActionForProducerAction => {
    return {
        type: ActionTypes.toggleDefaultActionForProducer,
        action
    }
};


export interface ToggleCertificateForProducerAction {
    type: ActionTypes.toggleCertificateForProducer,
    certificate: IProducerNewCertificate
}

export const toggleCertificateForProducer = (certificate: IProducerNewCertificate): ToggleCertificateForProducerAction => {
    return {
        type: ActionTypes.toggleCertificateForProducer,
        certificate
    }
};