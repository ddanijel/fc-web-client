import {FetchTodosAction, DeleteTodoAction} from "./todos";
import {ToggleDrawerAction} from "./ui";


export enum ActionTypes {
    fetchTodos,
    deleteTodo,
    toggleDrawer
}

export type Action = FetchTodosAction | DeleteTodoAction | ToggleDrawerAction;