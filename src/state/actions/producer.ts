import {ActionTypes} from "./types";
import {Dispatch} from "redux";
import {ISignUpFormData, Producer} from "../../interfaces/Producer";
import FoodChain from "../../ethereum/foodChain"
import ProducerContract from "../../ethereum/producer"
import web3 from "../../ethereum/web3";
import {toggleIsLoading, ToggleIsLoadingAction} from "./ui";
import {History} from 'history';
import {saveItemToLocalStorage} from "../localStorage";
import {routePaths, variableNames} from "../../global/constants";

export interface PersistProducerAction {
    type: ActionTypes.persistProducer;
    producer: Producer
}

export interface ProducerSignInAction {
    type: ActionTypes.producerSignIn;
    authenticated: boolean
}

const populateProducer = (producerResult: any): Producer => {
    return {
        isAuthenticated: true,
        foodChainOwnerAddress: producerResult[0],
        owner: producerResult[1],
        producerName: producerResult[2],
        licenceNumber: producerResult[3],
        url: producerResult[4],
        certificates: producerResult[5],
        defaultActions: producerResult[6],
        productTags: producerResult[7]
    }
};


export const signUpProducer = (producerSignUpFormData: ISignUpFormData, history: History) => {
    return async (dispatch: Dispatch) => {
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));

        try {
            const accounts = await web3.eth.getAccounts();
            await FoodChain().methods.registerProducer(
                producerSignUpFormData.producerName,
                producerSignUpFormData.licenceNumber,
                producerSignUpFormData.url,
                producerSignUpFormData.certificates
            ).send({from: accounts[0]});
            const contractAddress = await FoodChain().methods.getContractForProducer(accounts[0]).call();
            const producerResult = await ProducerContract(contractAddress).methods.describeProducer().call();
            const producer = populateProducer(producerResult);
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
            const authenticated = await ProducerContract(producerContractAddress).methods.isAuthenticated().call({from: accounts[0]});
            dispatch<ProducerSignInAction>({
                type: ActionTypes.producerSignIn,
                authenticated: authenticated
            });

            if (authenticated) {
                saveItemToLocalStorage(variableNames.producerContractAddress, producerContractAddress);
                saveItemToLocalStorage("authenticated", true);
                const producerResult = await ProducerContract(producerContractAddress).methods.describeProducer().call();
                const producer = populateProducer(producerResult);
                dispatch<PersistProducerAction>({
                    type: ActionTypes.persistProducer,
                    producer
                });
            }

            history.push(routePaths.producer);
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