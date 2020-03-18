import {Action} from "../actions";
import {NewProductTag} from "../../interfaces/productTag";


const initialState = {
    producerAddress: "",
    actions: [
        {
            name: "Action 1",
            selected: true
        },
        {
            name: "Action 2",
            selected: false
        }
    ],
    longitude: "",
    latitude: "",
    previousProductTagAddresses: []
};

export const productTagReducer = (state: NewProductTag = initialState, action: Action):NewProductTag => {
    switch (action.type) {
        default:
            return state;
    }
};