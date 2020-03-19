export interface NewProductTag extends ProductTag {
    actions: NewProductTagAction[]
}

export interface ProductTagAction {
    name: string;
}

export interface NewProductTagAction extends ProductTagAction{
    selected: boolean
}

export interface Geolocation {
    longitude: string;
    latitude: string;
}

export interface ProductTag {
    producerAddress?: string
    actions: ProductTagAction[];
    geolocation: Geolocation
    previousProductTags: ProductTag[];
}