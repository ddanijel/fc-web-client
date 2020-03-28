import {ActionTypes} from "./types";
import {IScannedProducer} from "../../interfaces/Producer";
import {Dispatch} from "redux";
import {toggleIsLoading, ToggleIsLoadingAction} from "./ui";
import ProducerContract from "../../ethereum/producer";
import {store} from "../../index"

export interface FetchScannedProducerAction {
    type: ActionTypes.fetchScannedProducer;
}

export interface StoreScannedProducerAction {
    type: ActionTypes.storeScannedProducer;
    scannedProducer: IScannedProducer
}


export const fetchScannedProducer = (producerContractAddress: string) => {
    return async (dispatch: Dispatch) => {
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));
        try {
            if (!store.getState().scannedProducers.producers.some(producer => producer.producerContractAddress === producerContractAddress)) {
                const fetchedProducer = await ProducerContract(producerContractAddress).methods.describeScannedProducer().call();
                const populatedProducer = populateScannedProducer(fetchedProducer, producerContractAddress);
                dispatch<StoreScannedProducerAction>({
                    type: ActionTypes.storeScannedProducer,
                    scannedProducer: populatedProducer
                });
            } else {
                console.log("Producer Already Fetched.")
            }

        } catch (e) {
            // todo display modal
            console.error("Error while fetching the scanned producer, message: ", e);
        } finally {
            dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
        }
    }
};


const populateScannedProducer = (producerResult: any, producerContractAddress: string): IScannedProducer => {
    return {
        producerContractAddress,
        producerOwnerAccountAddress: producerResult[0],
        producerName: producerResult[1],
        licenceNumber: producerResult[2],
        url: producerResult[3],
        certificates: producerResult[4],
        productTags: producerResult[5]
    }
};
