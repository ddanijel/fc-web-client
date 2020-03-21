import {ActionTypes} from "./types";
import {NewProductTag, NewProductTagAction, ProductTag} from "../../interfaces/productTag";
import {Dispatch} from "redux";
import {toggleIsLoading, ToggleIsLoadingAction} from "./ui";
import web3 from "../../ethereum/web3";
import {History} from 'history';
import ProducerContract from "../../ethereum/producer"
import {getItemFromLocalStorage} from "../localStorage";
import {variableNames} from "../../global/constants";
import {fetchPT} from "./productTag";
import {store} from "../../index"

export interface GenerateProductTagAction {
    type: ActionTypes.generateProductTag;
    productTag: NewProductTag
}

export interface ToggleActionOfNewProductTagAction {
    type: ActionTypes.toggleActionOfNewProductTag,
    action: NewProductTagAction
}

export interface AddActionToNewProductTagAction {
    type: ActionTypes.addActionToNewProductTag;
    newAction: NewProductTagAction
}

export interface FetchPreviousProductTagAction {
    type: ActionTypes.fetchPreviousProductTag;
    productTag: ProductTag
}

export interface AddPreviousProductTagAction {
    type: ActionTypes.addPreviousProductTag;
    productTag: ProductTag
}

export const addActionToNewProductTag = (newAction: NewProductTagAction): AddActionToNewProductTagAction => {
    return {
        type: ActionTypes.addActionToNewProductTag,
        newAction
    }
};

export const toggleActionOfNewProductTag = (action: NewProductTagAction): ToggleActionOfNewProductTagAction => {
    return {
        type: ActionTypes.toggleActionOfNewProductTag,
        action
    }
};

export const fetchPreviousProductTag = (productTagContractAddress: string) => {
    return async (dispatch: Dispatch) => {
        console.log("STORE: ", store.getState());
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));

        if (!store.getState().newProductTag.previousProductTags.some(productTag => productTag.productTagAddress === productTagContractAddress)) {
            const productTag = await fetchPT(productTagContractAddress);
            dispatch<AddPreviousProductTagAction>({
                type: ActionTypes.addPreviousProductTag,
                productTag
            });
        } else {
            console.log("Pt scanned...");
        }

        dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
};


export const generateProductTag = (productTag: NewProductTag, history: History) => {
    return async (dispatch: Dispatch) => {
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));

        try {
            const accounts = await web3.eth.getAccounts();

            const dateTime = new Date();

            const methodToCall = ProducerContract(getItemFromLocalStorage(variableNames.producerContractAddress))
                .methods.generateProductTag(
                    productTag.actions.filter(action => action.selected).map(action => action.name),
                    {
                        longitude: productTag.geolocation.longitude,
                        latitude: productTag.geolocation.latitude,
                    },
                    {
                        year: dateTime.getFullYear(),
                        month: dateTime.getMonth(),
                        day: dateTime.getDay(),
                        hour: dateTime.getHours(),
                        minute: dateTime.getMinutes()
                    },
                    productTag.previousProductTags.map(pt => pt.productTagAddress)
                );

            const productTagAddress = await methodToCall.call({from: accounts[0]});
            await methodToCall.send({from: accounts[0]});
            console.log("result: ", productTagAddress);

        } catch (e) {
            console.error(e);
        } finally {
            dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
        }
    }
};