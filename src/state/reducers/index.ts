import {combineReducers} from "redux";
import {Ui} from "../actions";
import {uiReducer} from "./ui";
import {Producer} from "../../interfaces/producer";
import {producerReducer} from "./producer";
import {ProductTag} from "../../interfaces/productTag";
import {productTagReducer} from "./productTag";


export interface StoreState {
    ui: Ui;
    producer: Producer;
    productTag: ProductTag
}

export const reducers = combineReducers<StoreState>({
    ui: uiReducer,
    producer: producerReducer,
    productTag: productTagReducer
});