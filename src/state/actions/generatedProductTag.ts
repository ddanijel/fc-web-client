import {ActionTypes} from "./types";


export interface SaveGeneratedProductTagAddressAction {
    type: ActionTypes.saveGeneratedProductTagAddress;
    address: string;
}

export const saveGeneratedProductTagAddress = (address: string): SaveGeneratedProductTagAddressAction => {
    return {
        type: ActionTypes.saveGeneratedProductTagAddress,
        address
    }
};
