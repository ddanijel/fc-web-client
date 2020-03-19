import {ToggleDrawerAction, ToggleIsLoadingAction} from "./ui";
import {PersistProducerAction, ProducerSignInAction} from "./producer";
import {
    AddActionToNewProductTagAction,
    GenerateProductTagAction,
    ToggleActionOfNewProductTagAction,
} from "./newProductTag";
import {FetchProductTagAction} from "./productTag";

export enum ActionTypes {
    toggleDrawer,
    toggleIsLoading,
    persistProducer,
    producerSignIn,
    addActionToNewProductTag,
    toggleActionOfNewProductTag,
    generateProductTag,
    fetchProductTag
}

export type Action =
    ToggleDrawerAction |
    ToggleIsLoadingAction |
    PersistProducerAction |
    ProducerSignInAction |
    AddActionToNewProductTagAction |
    ToggleActionOfNewProductTagAction |
    GenerateProductTagAction |
    FetchProductTagAction;