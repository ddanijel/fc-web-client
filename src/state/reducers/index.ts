import {combineReducers} from "redux";
import {Ui} from "../actions";
import {uiReducer} from "./ui";
import {IProducer} from "../../interfaces/Producer";
import {producerReducer} from "./producer";
import {INewProductTag} from "../../interfaces/ProductTag";
import {newProductTagReducer} from "./newProductTag";
import {IMapView} from "../../interfaces/MapView";
import {mapViewReducer} from "./mapView";
import {IScannedProducerReducer, scannedProducersReducer} from "./scannedProducers";


export interface StoreState {
    ui: Ui;
    producer: IProducer;
    newProductTag: INewProductTag;
    mapView: IMapView;
    scannedProducers: IScannedProducerReducer;
}

export const reducers = combineReducers<StoreState>({
    ui: uiReducer,
    producer: producerReducer,
    newProductTag: newProductTagReducer,
    mapView: mapViewReducer,
    scannedProducers: scannedProducersReducer
});