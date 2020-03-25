import {ActionTypes} from "./types";
import {IProducer} from "../../interfaces/Producer";

export interface PersistProducerAction {
    type: ActionTypes.persistProducer;
    producer: IProducer
}


export const populateProducer = (producerResult: any, contractAddress: string): IProducer => {
    return {
        producerContractAddress: contractAddress,
        isAuthenticated: true,
        foodChainContractAddress: producerResult[0],
        producerOwnerAccountAddress: producerResult[1],
        producerName: producerResult[2],
        licenceNumber: producerResult[3],
        url: producerResult[4],
        certificates: producerResult[5],
        defaultActions: producerResult[6],
        productTags: producerResult[7]
    }
};

