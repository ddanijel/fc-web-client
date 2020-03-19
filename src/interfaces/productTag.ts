export interface NewProductTag extends ProductTag {
    actions: NewProductTagAction[]
}

export interface ProductTagAction {
    name: string;
}

export interface NewProductTagAction extends ProductTagAction{
    selected: boolean
}


export interface ProductTag {
    actions: ProductTagAction[];
    longitude: string;
    latitude: string;
    previousProductTagAddresses: string[];
}