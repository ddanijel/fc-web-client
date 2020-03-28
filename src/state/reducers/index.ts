import {combineReducers} from "redux";
import {Ui} from "../actions";
import {uiReducer} from "./ui";
import {IProducer, ISignUpFormData} from "../../interfaces/Producer";
import {producerReducer} from "./producer";
import {IGeneratedProductTag, INewProductTag} from "../../interfaces/ProductTag";
import {newProductTagReducer} from "./newProductTag";
import {IMapView} from "../../interfaces/MapView";
import {mapViewReducer} from "./mapView";
import {IScannedProducerReducer, scannedProducersReducer} from "./scannedProducers";
import {producerAuthReducer} from "./producerAuth";
import {generatedProductTagReducer} from "./generatedProductTag";


export interface StoreState {
    ui: Ui;
    producer: IProducer;
    newProductTag: INewProductTag;
    mapView: IMapView;
    scannedProducers: IScannedProducerReducer;
    producerAuth: ISignUpFormData;
    generatedProductTag: IGeneratedProductTag;
}

export const reducers = combineReducers<StoreState>({
    ui: uiReducer,
    producer: producerReducer,
    newProductTag: newProductTagReducer,
    mapView: mapViewReducer,
    scannedProducers: scannedProducersReducer,
    producerAuth: producerAuthReducer,
    generatedProductTag: generatedProductTagReducer
});