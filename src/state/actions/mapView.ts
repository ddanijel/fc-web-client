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

export const toggleMapViewModal = (isMapViewModalOpen: boolean): ToggleMapViewModalAction => {
    return {
        type: ActionTypes.toggleMapViewModal,
        isMapViewModalOpen
    }
};

export const showMapViewForProductTag = (productTag: IProductTag): (dispatch: Dispatch) => Promise<void> => {
    return async (dispatch: Dispatch) => {
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));

        const result = await processPreviousProductTags(dispatch, productTag);

        console.log("result: ", result);
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));


    }


    // return {
    //     type: ActionTypes.showMapViewForProductTag,
    //     productTag
    // }
};


const processPreviousProductTags = async (dispatch: Dispatch, productTag: IProductTag) => {
    console.log("called ppt: ", productTag.previousProductTags);

    const pptgs = await productTag.previousProductTags.map(async previousProductTag => (
        await fetchPT(dispatch, previousProductTag.productTagAddress)
    ));

    // for (const previousProductTag of productTag.previousProductTags) {
    //     const ptObject = await fetchPT(dispatch, previousProductTag.productTagAddress);
    //
    //     console.log("ptObject: ", ptObject);
    //
    //     await processPreviousProductTags(dispatch, ptObject);
    // }
    console.log("end fn:", pptgs);
    return productTag;
};