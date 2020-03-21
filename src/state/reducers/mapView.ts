import {Action, ActionTypes} from "../actions"
import {IMapView} from "../../interfaces/MapView";

const initialState = {
    isMapViewModalOpen: true,
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
    }
};

export const mapViewReducer = (state: IMapView = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.toggleMapViewModal:
            return {
                ...state,
                isMapViewModalOpen: action.isMapViewModalOpen
            };
        default:
            return state;
    }
};