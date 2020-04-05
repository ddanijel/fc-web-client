import {Action, ActionTypes, Ui} from "../actions"

const initialState = {
    isDrawerOpen: false,
    isLoading: false,
    isQRScannerModalOpen: false,
    newProductTagSteps: {
        steps: ['Scan', 'Actions', 'Create', "Print"],
        activeStep: 0
    }
};

export const uiReducer = (state: Ui = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.toggleDrawer:
            return {
                ...state,
                isDrawerOpen: action.isDrawerOpen
            };
        case ActionTypes.toggleIsLoading:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case ActionTypes.toggleQRScannerModal:
            return {
                ...state,
                isQRScannerModalOpen: action.isQRScannerModalOpen
            };
        case ActionTypes.setNewProductTagActiveStep:
            return {
                ...state,
                newProductTagSteps: {
                    ...state.newProductTagSteps,
                    activeStep: action.activeStep
                }
            };
        default:
            return state;
    }
};