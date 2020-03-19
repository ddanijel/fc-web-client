import {ToggleDrawerAction, ToggleIsLoadingAction} from "./ui";
import {PersistProducerAction, ProducerSignInAction} from "./producer";
import {AddActionToNewProductTagAction, GenerateProductTagAction} from "./newProductTag";

export enum ActionTypes {
    toggleDrawer,
    toggleIsLoading,
    persistProducer,
    producerSignIn,
    addActionToNewProductTag,
    generateProductTag
}

export type Action =
    ToggleDrawerAction |
    ToggleIsLoadingAction |
    PersistProducerAction |
    ProducerSignInAction |
    AddActionToNewProductTagAction |
    GenerateProductTagAction;