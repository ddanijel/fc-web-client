export interface NewProductTag {
    geolocation: Geolocation;
    dateTime: DateTime;
    actions: NewProductTagAction[];
    previousProductTags: ProductTag[];
}

export interface ProductTagAction {
    name: string;
}

export interface NewProductTagAction extends ProductTagAction {
    selected: boolean
}

export interface Geolocation {
    longitude: string;
    latitude: string;
}

interface DateTime {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}

export interface ProductTag {
    productTagAddress: string;
    producerAddress: string;
    dateTime: DateTime;
    actions: ProductTagAction[];
    geolocation: Geolocation
    previousProductTags: ProductTag[];
}