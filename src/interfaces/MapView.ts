import {IProductTag} from "./ProductTag";

export interface IMapView {
    isMapViewModalOpen: boolean;
    productTag: IProductTag;
    previousProductTags: IProductTag[];
}