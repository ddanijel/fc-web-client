import {combineReducers} from "redux";
import {todosReducer} from "./todos";
import {Todo, Ui} from "../actions";
import {uiReducer} from "./ui";
import {Producer} from "../../interfaces/producer";
import {producerReducer} from "./producer";

export interface StoreState {
    todos: Todo[];
    ui: Ui,
    producer: Producer
}

export const reducers = combineReducers<StoreState>({
    todos: todosReducer,
    ui: uiReducer,
    producer: producerReducer
});