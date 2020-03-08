import {combineReducers} from "redux";
import {todosReducer} from "./todos";
import {Todo, Ui} from "../actions";
import {uiReducer} from "./ui";

export interface StoreState {
    todos: Todo[];
    ui: Ui
}

export const reducers = combineReducers<StoreState>({
    todos: todosReducer,
    ui: uiReducer
});