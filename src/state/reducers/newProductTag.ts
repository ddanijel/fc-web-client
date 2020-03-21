import {Action, ActionTypes} from "../actions";
import {INewProductTag} from "../../interfaces/ProductTag";


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
    dateTime: {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
    },
    geolocation: {
        longitude: 0,
        latitude: 0,
    },
    previousProductTags: []
};

export const newProductTagReducer = (state: INewProductTag = initialState, action: Action): INewProductTag => {
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
        case ActionTypes.addPreviousProductTag:
            return {
                ...state,
                previousProductTags: [
                    ...state.previousProductTags,
                    action.productTag
                ]

            };
        case ActionTypes.resetProductTagUponCreation:
            return initialState;
        default:
            return state;
    }
};