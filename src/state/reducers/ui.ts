import {ActionTypes, Action, Ui} from "../actions"

const initialState = {
    isDrawerOpen: false
};

export const uiReducer = (state: Ui = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.toggleDrawer:
            return {
                ...state,
                isDrawerOpen: action.isDrawerOpen
            };
        default:
            return state;
    }
};