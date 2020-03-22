import {Action, ActionTypes} from "../actions";
import {IScannedProducer} from "../../interfaces/Producer";

export interface IScannedProducerReducer {
    producers: IScannedProducer[]
}

const initialState = {
    producers: []
};

export const scannedProducersReducer = (state: IScannedProducerReducer = initialState, action: Action): IScannedProducerReducer => {
    switch (action.type) {
        case ActionTypes.storeScannedProducer:
            return {
                ...state,
                producers: [
                    ...state.producers,
                    action.scannedProducer
                ]
            };
        default:
            return state;
    }
};