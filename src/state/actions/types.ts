import {ToggleDrawerAction, ToggleIsLoadingAction, ToggleQRScannerModalAction} from "./ui";
import {PersistProducerAction, ProducerSignInAction} from "./producer";
import {
    AddActionToNewProductTagAction,
    AddPreviousProductTagAction,
    FetchPreviousProductTagAction,
    GenerateProductTagAction,
    ResetProductTagUponCreationAction,
    ToggleActionOfNewProductTagAction,
} from "./newProductTag";
import {FetchProductTagAction} from "./productTag";
import {ShowMapViewForProductTagAction, ToggleMapViewModalAction} from "./mapView";

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
    fetchPreviousProductTag,
    addPreviousProductTag,
    resetProductTagUponCreation,
    toggleMapViewModal,
    showMapViewForProductTag
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
    FetchProductTagAction |
    FetchPreviousProductTagAction |
    AddPreviousProductTagAction |
    ResetProductTagUponCreationAction |
    ToggleMapViewModalAction |
    ShowMapViewForProductTagAction;