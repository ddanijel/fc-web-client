import {ActionTypes} from "./types";
import {ProductTag} from "../../interfaces/productTag";
import {Dispatch} from "redux";
import {toggleIsLoading, ToggleIsLoadingAction} from "./ui";
import ProductTagContract from "../../ethereum/productTag";

export interface FetchProductTagAction {
    type: ActionTypes.fetchProductTag;
    productTag: ProductTag
}

const populateProductTag = (productTagResult: any, productTagAddress: string): ProductTag => {
    return {
        productTagAddress: productTagAddress,
        producerAddress: productTagResult[0],
        actions: productTagResult[1],
        geolocation: {
            longitude: productTagResult[2][0],
            latitude: productTagResult[2][1]
        },
        dateTime: {
            year: productTagResult[3][0],
            month: productTagResult[3][1],
            day: productTagResult[3][2],
            hour: productTagResult[3][3],
            minute: productTagResult[3][4],
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
        productTag = populateProductTag(fetchedProductTag, productTagAddress);
    } catch (e) {
        console.error("Error while fetching the product tag for address: ", productTagAddress, "\mError: ", e);
    } finally {
        return productTag
    }
};