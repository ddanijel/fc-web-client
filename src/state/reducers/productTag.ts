import {Action} from "../actions";
import {ProductTag} from "../../interfaces/productTag";


const initialState = {
    producerAddress: "",
    actions: ["action 1", "action 2"],
    longitude: "",
    latitude: "",
    previousProductTagAddresses: []
};

export const productTagReducer = (state: ProductTag = initialState, action: Action):ProductTag => {
    switch (action.type) {
        default:
            return state;
    }
};