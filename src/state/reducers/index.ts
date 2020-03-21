import {combineReducers} from "redux";
import {Ui} from "../actions";
import {uiReducer} from "./ui";
import {Producer} from "../../interfaces/Producer";
import {producerReducer} from "./producer";
import {INewProductTag} from "../../interfaces/ProductTag";
import {newProductTagReducer} from "./newProductTag";
import {IMapView} from "../../interfaces/MapView";
import {mapViewReducer} from "./mapView";


export interface StoreState {
    ui: Ui;
    producer: Producer;
    newProductTag: INewProductTag
    mapView: IMapView
}

export const reducers = combineReducers<StoreState>({
    ui: uiReducer,
    producer: producerReducer,
    newProductTag: newProductTagReducer,
    mapView: mapViewReducer
});