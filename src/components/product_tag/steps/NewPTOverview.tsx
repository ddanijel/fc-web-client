import React from 'react';
import {StoreState} from "../../../state/reducers";
import {connect} from "react-redux";
import {NewProductTag} from "../../../interfaces/productTag";

interface Props {
    children?: React.ReactElement;
    newProductTag: NewProductTag;
}

const _NewPTOverview = (props: Props) => {
    return (
        <div>
            {JSON.stringify(props.newProductTag)}
        </div>
    );
};

const mapStateToProps = ({newProductTag}: StoreState) => {
    return {newProductTag};
};

export const NewPTOverview = connect(
    mapStateToProps,
    {}
)(_NewPTOverview);
