import {Action, ActionTypes, Ui} from "../actions"

const initialState = {
    isDrawerOpen: false,
    isLoading: false
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
        default:
            return state;
    }
};