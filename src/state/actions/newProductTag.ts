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
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));
        const productTag = await fetchPT(productTagContractAddress);
        dispatch<AddPreviousProductTagAction>({
            type: ActionTypes.addPreviousProductTag,
            productTag
        });
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
    }
};


export const generateProductTag = (productTag: NewProductTag, history: History) => {
    return async (dispatch: Dispatch) => {
        dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));

        try {
            const accounts = await web3.eth.getAccounts();

            const methodToCall = ProducerContract(getItemFromLocalStorage(variableNames.producerContractAddress))
                .methods.generateProductTag(
                    productTag.actions.filter(action => action.selected).map(action => action.name),
                    productTag.geolocation.longitude,
                    productTag.geolocation.latitude,
                    []
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