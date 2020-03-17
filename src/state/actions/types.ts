import {ToggleDrawerAction, ToggleIsLoadingAction} from "./ui";
import {PersistProducerAction, ProducerSignInAction} from "./producer";
import {GenerateProductTagAction} from "./productTag";

export enum ActionTypes {
    toggleDrawer,
    toggleIsLoading,
    persistProducer,
    producerSignIn,
    generateProductTag
}

export type Action =
    ToggleDrawerAction |
    ToggleIsLoadingAction |
    PersistProducerAction |
    ProducerSignInAction |
    GenerateProductTagAction;