export interface NewProductTag extends ProductTag {
    actions: NewProductTagAction[]
}

export interface ProductTagAction {
    name: string;
}

export interface NewProductTagAction extends ProductTagAction{
    selected: boolean
}

interface Geolocation {
    longitude: string;
    latitude: string;
}

export interface ProductTag {
    actions: ProductTagAction[];
    geolocation: Geolocation
    previousProductTagAddresses: string[];
}