import {ActionTypes} from "./types";
import {INewProductTag, INewProductTagAction, IProductTag} from "../../interfaces/ProductTag";
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
    productTag: INewProductTag
}

export interface ToggleActionOfNewProductTagAction {
    type: ActionTypes.toggleActionOfNewProductTag,
    action: INewProductTagAction
}

export interface AddActionToNewProductTagAction {
    type: ActionTypes.addActionToNewProductTag;
    newAction: INewProductTagAction
}

export interface ResetProductTagUponCreationAction {
    type: ActionTypes.resetProductTagUponCreation;
}

export interface FetchPreviousProductTagAction {
    type: ActionTypes.fetchPreviousProductTag;
    productTag: IProductTag
}

export interface AddPreviousProductTagAction {
    type: ActionTypes.addPreviousProductTag;
    productTag: IProductTag
}

export const addActionToNewProductTag = (newAction: INewProductTagAction): AddActionToNewProductTagAction => {
    return {
        type: ActionTypes.addActionToNewProductTag,
        newAction
    }
};

export const toggleActionOfNewProductTag = (action: INewProductTagAction): ToggleActionOfNewProductTagAction => {
    return {
        type: ActionTypes.toggleActionOfNewProductTag,
        action
    }
};

export const resetProductTagUponCreation = (): ResetProductTagUponCreationAction => {
    return {
        type: ActionTypes.resetProductTagUponCreation
    }
};

export const fetchPreviousProductTag = (productTagContractAddress: string) => {
    return async (dispatch: Dispatch) => {
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));

        if (!store.getState().newProductTag.previousProductTags.some(productTag => productTag.productTagAddress === productTagContractAddress)) {
            const productTag = await fetchPT(dispatch, productTagContractAddress);
            dispatch<AddPreviousProductTagAction>({
                type: ActionTypes.addPreviousProductTag,
                productTag
            });
        } else {
            console.log("Pt scanned...");
            // todo display modal
        }

        dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
};


export const generateProductTag = (productTag: INewProductTag, history: History) => {
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
            dispatch<ResetProductTagUponCreationAction>(resetProductTagUponCreation());
        } catch (e) {
            console.error(e);
        } finally {
            dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
        }
    }
};