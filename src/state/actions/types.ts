import {ToggleDrawerAction, ToggleIsLoadingAction} from "./ui";
import {PersistProducerAction, ProducerSignInAction} from "./producer";
import {
    AddActionToNewProductTagAction,
    GenerateProductTagAction,
    ToggleActionOfNewProductTagAction
} from "./newProductTag";

export enum ActionTypes {
    toggleDrawer,
    toggleIsLoading,
    persistProducer,
    producerSignIn,
    addActionToNewProductTag,
    toggleActionOfNewProductTag,
    generateProductTag
}

export type Action =
    ToggleDrawerAction |
    ToggleIsLoadingAction |
    PersistProducerAction |
    ProducerSignInAction |
    AddActionToNewProductTagAction |
    ToggleActionOfNewProductTagAction |
    GenerateProductTagAction;