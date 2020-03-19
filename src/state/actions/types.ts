import {ToggleDrawerAction, ToggleIsLoadingAction} from "./ui";
import {PersistProducerAction, ProducerSignInAction} from "./producer";
import {AddActionToNewProductTagAction} from "./newProductTag";

export enum ActionTypes {
    toggleDrawer,
    toggleIsLoading,
    persistProducer,
    producerSignIn,
    addActionToNewProductTag
}

export type Action =
    ToggleDrawerAction |
    ToggleIsLoadingAction |
    PersistProducerAction |
    ProducerSignInAction |
    AddActionToNewProductTagAction;