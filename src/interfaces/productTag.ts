export interface NewProductTag extends ProductTag {
    actions: NewProductTagAction[]
}

interface ProductTagAction {
    name: string;
}

interface NewProductTagAction extends ProductTagAction{
    selected: boolean
}


export interface ProductTag {
    producerAddress: string;
    actions: ProductTagAction[];
    longitude: string;
    latitude: string;
    previousProductTagAddresses: string[];
}