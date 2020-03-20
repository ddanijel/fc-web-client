import {ToggleDrawerAction, ToggleIsLoadingAction, ToggleQRScannerModalAction} from "./ui";
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
    toggleQRScannerModal,
    persistProducer,
    producerSignIn,
    addActionToNewProductTag,
    toggleActionOfNewProductTag,
    generateProductTag,
    fetchProductTag,
}

export type Action =
    ToggleDrawerAction |
    ToggleIsLoadingAction |
    ToggleQRScannerModalAction |
    PersistProducerAction |
    ProducerSignInAction |
    AddActionToNewProductTagAction |
    ToggleActionOfNewProductTagAction |
    GenerateProductTagAction |
    FetchProductTagAction;