import {combineReducers} from "redux";
import {Ui} from "../actions";
import {uiReducer} from "./ui";
import {Producer} from "../../interfaces/producer";
import {producerReducer} from "./producer";
export interface StoreState {
    ui: Ui;
    producer: Producer;
}

export const reducers = combineReducers<StoreState>({
    ui: uiReducer,
    producer: producerReducer,
});