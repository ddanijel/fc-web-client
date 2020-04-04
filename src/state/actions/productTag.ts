import {ActionTypes} from "./types";
import {IProductTag} from "../../interfaces/ProductTag";
import {Dispatch} from "redux";
import ProductTagContract from "../../ethereum/productTag";
import {fetchScannedProducer, FetchScannedProducerAction} from "./scannedProducers";

export interface FetchProductTagAction {
    type: ActionTypes.fetchProductTag;
    productTag: IProductTag
}

const populateProductTag = (productTagResult: any, productTagAddress: string): IProductTag => {
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
        previousProductTags: productTagResult[4].map(address => ({
            productTagAddress: address
        }))
    }
};

export const fetchPT = async (dispatch: Dispatch, productTagAddress: string): Promise<IProductTag> => {
    let productTag;
    console.log("fetchPT: ", productTagAddress);
    try {
        const fetchedProductTag = await ProductTagContract(productTagAddress)
            .methods.describeProductTag().call();
        productTag = populateProductTag(fetchedProductTag, productTagAddress);
        // @ts-ignore
        dispatch<FetchScannedProducerAction>(fetchScannedProducer(productTag.producerAddress));
    } catch (e) {
        console.error("Error while fetching the product tag for address: ", productTagAddress, "\nError: ", e);
    } finally {
        return productTag
    }
};