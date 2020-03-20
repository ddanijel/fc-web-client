import {Action, ActionTypes, Ui} from "../actions"

const initialState = {
    isDrawerOpen: false,
    isLoading: false,
    isQRScannerModalOpen: false
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
        default:
            return state;
    }
};