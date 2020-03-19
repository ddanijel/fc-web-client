import {Action, ActionTypes} from "../actions";
import {NewProductTag} from "../../interfaces/productTag";


const initialState = {
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
    geolocation: {
        longitude: "",
        latitude: "",
    },
    previousProductTags: []
};

export const newProductTagReducer = (state: NewProductTag = initialState, action: Action):NewProductTag => {
    switch (action.type) {
        case ActionTypes.addActionToNewProductTag:
            return {
                ...state,
                actions: [
                    ...state.actions,
                    action.newAction
                ]
            };
        case ActionTypes.toggleActionOfNewProductTag:
            return {
                ...state,
                actions: state.actions.map(act => {
                    if (act.name === action.action.name) {
                        return {
                            name: act.name,
                            selected: !act.selected
                        };
                    } else return act;
                })
            };
        default:
            return state;
    }
};