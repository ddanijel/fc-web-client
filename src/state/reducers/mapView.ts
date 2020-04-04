import {Action, ActionTypes} from "../actions"
import {IMapView} from "../../interfaces/MapView";

const initialState = {
    isMapViewModalOpen: false,
    productTag: {
        productTagAddress: "",
        producerAddress: "",
        actions: [],
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
    },
    previousProductTags: []
};

export const mapViewReducer = (state: IMapView = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.toggleMapViewModal:
            return action.isMapViewModalOpen ? {
                ...state,
                isMapViewModalOpen: true
            } : initialState;
        case ActionTypes.storeMainProductTagToMapView:
            return {
                ...state,
                isMapViewModalOpen: true,
                productTag: action.productTag
            };
        case ActionTypes.addFetchedPreviousProductTagForMapView: {
            return {
                ...state,
                previousProductTags: [
                    ...state.previousProductTags,
                    action.productTag
                ]
            }
        }
        default:
            return state;
    }
};