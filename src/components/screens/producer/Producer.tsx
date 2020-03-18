import React from 'react';
import ProducerBottomTagNavigation from "./ProducerBottomTagNavigation";
import {routePaths} from "../../../global/constants";
import {PrivateRoute} from "../../PrivateRoute";
import {NewProductTag} from "../../product_tag/NewProductTag";
import ProductTagHistory from "../../product_tag/ProductTagHistory";
import ProducerSettings from "./ProducerSettings";
import theme from "../../ui/Theme";

const Producer = (props) => {
    console.log(props);
    return (
        <>
            <div style={{
                marginTop: theme.spacing(2)
            }}>
            {props.location.pathname === routePaths.producer ? <NewProductTag/> : null}
            <PrivateRoute path="/producer/:subroute" component={subroute}/>
            </div>
            <ProducerBottomTagNavigation/>
        </>
    );
};

const subroute = ({match}) => {
    switch (match.url) {
        case routePaths.createProductTag:
            return <NewProductTag/>;
        case routePaths.producerHistoryPage:
            return <ProductTagHistory/>;
        case routePaths.producerSettings:
            return <ProducerSettings/>;
        default:
            return <div>Not Found</div>
    }

    return <div>hi</div>
};

export default Producer;