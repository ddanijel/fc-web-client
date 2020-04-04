import {ActionTypes} from "./types";
import {IProductTag} from "../../interfaces/ProductTag";
import {Dispatch} from "redux";
import {toggleIsLoading, ToggleIsLoadingAction} from "./ui";
import {fetchPT} from "./productTag";


export interface ToggleMapViewModalAction {
    type: ActionTypes.toggleMapViewModal;
    isMapViewModalOpen: boolean;
}

export interface ShowMapViewForProductTagAction {
    type: ActionTypes.showMapViewForProductTag
    productTag: IProductTag
}

export interface StoreMainProductTagToMapViewAction {
    type: ActionTypes.storeMainProductTagToMapView
    productTag: IProductTag
}

export interface AddFetchedPreviousProductTagForMapViewAction {
    type: ActionTypes.addFetchedPreviousProductTagForMapView
    productTag: IProductTag
}

export const toggleMapViewModal = (isMapViewModalOpen: boolean): ToggleMapViewModalAction => {
    return {
        type: ActionTypes.toggleMapViewModal,
        isMapViewModalOpen
    }
};

export const storeMainProductTagToMapView = (productTag: IProductTag): StoreMainProductTagToMapViewAction => {
    return {
        type: ActionTypes.storeMainProductTagToMapView,
        productTag
    }
};

export const addFetchedPreviousProductTagForMapView = (productTag: IProductTag): AddFetchedPreviousProductTagForMapViewAction => {
    return {
        type: ActionTypes.addFetchedPreviousProductTagForMapView,
        productTag
    }
};

export const showMapViewForProductTag = (productTag: IProductTag) => {
    return async (dispatch: Dispatch) => {
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));
        dispatch<StoreMainProductTagToMapViewAction>(storeMainProductTagToMapView(productTag));
        await traversePreviousProductTagsTree(productTag, dispatch);
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
};

const traversePreviousProductTagsTree = async (productTag: IProductTag, dispatch: Dispatch) => {
    await asyncForEach(productTag.previousProductTags, async (productTag) => {
        const result = await fetchPT(dispatch, productTag.productTagAddress);
        dispatch<AddFetchedPreviousProductTagForMapViewAction>(addFetchedPreviousProductTagForMapView(result));
        await asyncForEach(result.previousProductTags, async (prevPt) => {
            const result = await fetchPT(dispatch, prevPt.productTagAddress);
            dispatch<AddFetchedPreviousProductTagForMapViewAction>(addFetchedPreviousProductTagForMapView(result));
        });
    });
};

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};