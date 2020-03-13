import {combineReducers} from "redux";
import {Session, Ui} from "../actions";
import {uiReducer} from "./ui";
import {Producer} from "../../interfaces/producer";
import {producerReducer} from "./producer";
import {sessionReducer} from "./session";

export interface StoreState {
    ui: Ui;
    producer: Producer;
    session: Session;
}

export const reducers = combineReducers<StoreState>({
    ui: uiReducer,
    producer: producerReducer,
    session: sessionReducer
});