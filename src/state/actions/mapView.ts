import {ActionTypes} from "./types";
import {IProductTag} from "../../interfaces/ProductTag";


export interface ToggleMapViewModalAction {
    type: ActionTypes.toggleMapViewModal;
    isMapViewModalOpen: boolean;
}

export interface ShowMapViewForProductTagAction {
    type: ActionTypes.showMapViewForProductTag
    productTag: IProductTag
}

export const toggleMapViewModal = (isMapViewModalOpen: boolean): ToggleMapViewModalAction => {
    return {
        type: ActionTypes.toggleMapViewModal,
        isMapViewModalOpen
    }
};

export const showMapViewForProductTag = (productTag: IProductTag): ShowMapViewForProductTagAction => {
    return {
        type: ActionTypes.showMapViewForProductTag,
        productTag
    }
};