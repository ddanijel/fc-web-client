import {ActionTypes} from "./types";

export interface Ui {
    isDrawerOpen: boolean
    isLoading: boolean
}

export interface ToggleDrawerAction {
    type: ActionTypes.toggleDrawer;
    isDrawerOpen: boolean;
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

export const toggleIsLoading = (isLoading: boolean): ToggleIsLoadingAction => {
    return {
        type: ActionTypes.toggleIsLoading,
        isLoading
    }
};