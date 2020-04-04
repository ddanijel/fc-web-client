import {getItemFromLocalStorage} from "./localStorage";

export const isAlreadyAuthenticated = ():boolean => {
    return JSON.stringify(getItemFromLocalStorage("authenticated")) === 'true'
};