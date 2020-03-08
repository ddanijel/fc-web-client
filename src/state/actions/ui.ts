import {ActionTypes} from "./types";

export interface Ui {
    isDrawerOpen: boolean
}

export interface ToggleDrawerAction {
    type: ActionTypes.toggleDrawer;
    isDrawerOpen: boolean
}

export const toggleDrawer = (isDrawerOpen: boolean): ToggleDrawerAction => {
    return {
        type: ActionTypes.toggleDrawer,
        isDrawerOpen
    }
};