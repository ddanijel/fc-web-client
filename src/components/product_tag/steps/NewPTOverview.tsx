import React from 'react';
import {StoreState} from "../../../state/reducers";
import {connect} from "react-redux";
import {INewProductTag} from "../../../interfaces/ProductTag";
import ProductTagDetails from "../../fragments/ProductTagDetails";


interface Props {
    children?: React.ReactElement;
    newProductTag: INewProductTag;
}

const _NewPTOverview = (props: Props) => {
    return (
        <ProductTagDetails productTag={props.newProductTag}/>
    );
};

const mapStateToProps = ({newProductTag}: StoreState) => {
    return {newProductTag};
};

export const NewPTOverview = connect(
    mapStateToProps,
    {}
)(_NewPTOverview);
