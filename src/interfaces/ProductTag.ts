export interface INewProductTag {
    geolocation: IGeolocation;
    dateTime: IDateTime;
    actions: INewProductTagAction[];
    previousProductTags: IProductTag[];
}

export interface IProductTagAction {
    name: string;
}

export interface INewProductTagAction extends IProductTagAction {
    selected: boolean
}

export interface IGeolocation {
    longitude: number;
    latitude: number;
}

interface IDateTime {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}

export interface IProductTag {
    productTagAddress: string;
    producerAddress: string;
    dateTime: IDateTime;
    actions: IProductTagAction[];
    geolocation: IGeolocation
    previousProductTags: IProductTag[];
}