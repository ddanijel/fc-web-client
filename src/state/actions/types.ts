import {ToggleDrawerAction, ToggleIsLoadingAction} from "./ui";
import {ProducerSignUpAction} from "./producer";
import {ToggleIsAuthenticatedAction} from "./session";


export enum ActionTypes {
    toggleDrawer,
    toggleIsLoading,
    producerSignUp,
    toggleIsAuthenticated
}

export type Action =
    ToggleDrawerAction |
    ToggleIsLoadingAction |
    ProducerSignUpAction |
    ToggleIsAuthenticatedAction;