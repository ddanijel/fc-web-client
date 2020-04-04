import {ToggleDrawerAction, ToggleIsLoadingAction, ToggleQRScannerModalAction} from "./ui";
import {PersistProducerAction} from "./producer";
import {
    AddActionToNewProductTagAction,
    AddPreviousProductTagAction,
    FetchPreviousProductTagAction,
    GenerateProductTagAction,
    ResetProductTagUponCreationAction,
    ToggleActionOfNewProductTagAction,
} from "./newProductTag";
import {FetchProductTagAction} from "./productTag";
import {
    AddFetchedPreviousProductTagForMapViewAction,
    ShowMapViewForProductTagAction,
    StoreMainProductTagToMapViewAction,
    ToggleMapViewModalAction
} from "./mapView";
import {FetchScannedProducerAction, StoreScannedProducerAction} from "./scannedProducers";
import {
    AddCertificateToProducerAction,
    AddDefaultActionToProducerAction,
    ProducerSignInAction,
    ToggleCertificateForProducerAction,
    ToggleDefaultActionForProducerAction,
    UpdateSignUpFormFieldAction
} from "./producerAuth";
import {SaveGeneratedProductTagAddressAction} from "./generatedProductTag";

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
    showMapViewForProductTag,
    fetchScannedProducer,
    storeScannedProducer,
    updateSignUpFormField,
    addDefaultActionToProducer,
    toggleDefaultActionForProducer,
    addCertificateToProducer,
    toggleCertificateForProducer,
    saveGeneratedProductTagAddress,
    storeMainProductTagToMapView,
    addFetchedPreviousProductTagForMapView
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
    ShowMapViewForProductTagAction |
    FetchScannedProducerAction |
    StoreScannedProducerAction |
    UpdateSignUpFormFieldAction |
    AddDefaultActionToProducerAction |
    ToggleDefaultActionForProducerAction |
    AddCertificateToProducerAction |
    ToggleCertificateForProducerAction |
    SaveGeneratedProductTagAddressAction |
    StoreMainProductTagToMapViewAction |
    AddFetchedPreviousProductTagForMapViewAction;