import {ActionTypes} from "./types";

export interface Ui {
    isDrawerOpen: boolean;
    isLoading: boolean;
    isQRScannerModalOpen: boolean;
    newProductTagSteps: INewProductTagSteps;
}

interface INewProductTagSteps {
    steps: string[];
    activeStep: number;

}

export interface ToggleDrawerAction {
    type: ActionTypes.toggleDrawer;
    isDrawerOpen: boolean;
}

export interface SetNewProductTagActiveStepAction {
    type: ActionTypes.setNewProductTagActiveStep;
    activeStep: number;
}

export interface ToggleQRScannerModalAction {
    type: ActionTypes.toggleQRScannerModal;
    isQRScannerModalOpen: boolean;
}

export interface ToggleIsLoadingAction {
    type: ActionTypes.toggleIsLoading;
    isLoading: boolean;
}

export const toggleDrawer = (isDrawerOpen: boolean): ToggleDrawerAction => {
    return {
        type: ActionTypes.toggleDrawer,
        isDrawerOpen
    }
};

export const toggleQRScannerModal = (isQRScannerModalOpen: boolean): ToggleQRScannerModalAction => {
    return {
        type: ActionTypes.toggleQRScannerModal,
        isQRScannerModalOpen
    }
};

export const toggleIsLoading = (isLoading: boolean): ToggleIsLoadingAction => {
    return {
        type: ActionTypes.toggleIsLoading,
        isLoading
    }
};

export const setNewProductTagActiveStep = (activeStep: number): SetNewProductTagActiveStepAction => {
    return {
        type: ActionTypes.setNewProductTagActiveStep,
        activeStep
    }
};