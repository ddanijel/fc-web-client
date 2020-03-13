import {ActionTypes} from "./types";

export interface Session {
    isAuthenticated: Promise<boolean>
}

export interface ToggleIsAuthenticatedAction {
    type: ActionTypes.toggleIsAuthenticated;
    isAuthenticated: Promise<boolean>;
}


export const toggleIsAuthenticated = (isAuthenticated: Promise<boolean>): ToggleIsAuthenticatedAction => {
    return {
        type: ActionTypes.toggleIsAuthenticated,
        isAuthenticated
    }
};
