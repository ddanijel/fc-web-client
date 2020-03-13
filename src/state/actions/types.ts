import {ToggleDrawerAction, ToggleIsLoadingAction} from "./ui";
import {ProducerSignUpAction, ProducerSignInAction} from "./producer";

export enum ActionTypes {
    toggleDrawer,
    toggleIsLoading,
    producerSignUp,
    producerSignIn
}

export type Action =
    ToggleDrawerAction |
    ToggleIsLoadingAction |
    ProducerSignUpAction |
    ProducerSignInAction;