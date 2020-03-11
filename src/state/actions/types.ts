import {DeleteTodoAction, FetchTodosAction} from "./todos";
import {ToggleDrawerAction, ToggleIsLoadingAction} from "./ui";


export enum ActionTypes {
    fetchTodos,
    deleteTodo,
    toggleDrawer,
    toggleIsLoading
}

export type Action =
    FetchTodosAction |
    DeleteTodoAction |
    ToggleDrawerAction |
    ToggleIsLoadingAction;