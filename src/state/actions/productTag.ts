import {ActionTypes} from "./types";
import {ProductTag} from "../../interfaces/productTag";
import {Dispatch} from "redux";
import {toggleIsLoading, ToggleIsLoadingAction} from "./ui";
import ProductTagContract from "../../ethereum/productTag";

export interface FetchProductTagAction {
    type: ActionTypes.fetchProductTag;
    productTag: ProductTag
}

const populateProductTag = (productTagResult: any): ProductTag => {
    return {
        producerAddress: productTagResult[0],
        actions: productTagResult[1],
        geolocation: {
            longitude: productTagResult[2],
            latitude: productTagResult[3]
        },
        previousProductTags: productTagResult[4]
    }
};

export const fetchProductTag = (productTagAddress: string) => {
    return async (dispatch: Dispatch) => {
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));

        try {
            const productTag = await fetchPT(productTagAddress);
            console.log("fetched: ", productTag);

        } catch (e) {
            console.error(e);
        } finally {
            dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
        }
    }
};

export const fetchPT = async (productTagAddress: string): Promise<ProductTag> => {
    let productTag;
    try {
        const fetchedProductTag = await ProductTagContract(productTagAddress)
            .methods.describeProductTag().call();
        productTag = populateProductTag(fetchedProductTag);

    } catch (e) {
        console.error("Error while fetching the product tag for address: ", productTagAddress, "\mError: ", e);
    } finally {
        return productTag
    }
};