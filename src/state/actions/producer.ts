import {ActionTypes} from "./types";
import {Dispatch} from "redux";
import {Producer, SignUpFormData} from "../../interfaces/producer";
import FoodChain from "../../ethereum/foodChain"
import ProducerContract from "../../ethereum/producer"
import web3 from "../../ethereum/web3";
import {toggleIsLoading, ToggleIsLoadingAction} from "./ui";
import {History} from 'history';

export interface ProducerSignUpAction {
    type: ActionTypes.producerSignUp;
    producer: Producer
}

const populateProducer = (producerResult: any): Producer => {
    console.log("result: ", producerResult);
    return {
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

export const signUpProducer = (producerSignUpFormData: SignUpFormData, history: History) => {
// export const signUpProducer = (producerSignUpFormData: SignUpFormData) => {
    return async (dispatch: Dispatch) => {
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));

        try {
            const accounts = await web3.eth.getAccounts();
            const result = await FoodChain().methods.registerProducer(
                producerSignUpFormData.producerName,
                producerSignUpFormData.licenceNumber,
                producerSignUpFormData.url,
                producerSignUpFormData.certificates
            ).send({from: accounts[0]});
            const contractAddress = await FoodChain().methods.getContractForProducer(accounts[0]).call();
            const producerResult = await ProducerContract(contractAddress).methods.describeProducer().call();
            const producer = populateProducer(producerResult);
            console.log("RESULT ADDRESS: ", contractAddress);
            history.push("/producer");
            dispatch<ProducerSignUpAction>({
                type: ActionTypes.producerSignUp,
                producer
            });
        } catch (e) {
            console.error(e);
        } finally {
            dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
        }


    }
};
