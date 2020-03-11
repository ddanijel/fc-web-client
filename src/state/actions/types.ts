import {DeleteTodoAction, FetchTodosAction} from "./todos";
import {ToggleDrawerAction, ToggleIsLoadingAction} from "./ui";
import {ProducerSignUpAction} from "./producer";


export enum ActionTypes {
    fetchTodos,
    deleteTodo,
    toggleDrawer,
    toggleIsLoading,
    producerSignUp
}

export type Action =
    FetchTodosAction |
    DeleteTodoAction |
    ToggleDrawerAction |
    ToggleIsLoadingAction |
    ProducerSignUpAction;