import React from 'react';
import ProducerBottomTagNavigation from "./ProducerBottomTagNavigation";
import {routePaths} from "../../../global/constants";
import {PrivateRoute} from "../../PrivateRoute";
import {NewProductTagScreen} from "../../product_tag/NewProductTagScreen";
import ProductTagHistory from "../../product_tag/ProductTagHistory";
import ProducerSettings from "./ProducerSettings";
import theme from "../../ui/Theme";

const Producer = (props) => {
    return (
        <>
            <div style={{
                marginTop: theme.spacing(2)
            }}>
                {props.location.pathname === routePaths.producer ? <NewProductTagScreen/> : null}
                <PrivateRoute path="/producer/:subroute" component={subroute}/>
            </div>
            <ProducerBottomTagNavigation/>
        </>
    );
};

const subroute = ({match}) => {
    switch (match.url) {
        case routePaths.createProductTag:
            return <NewProductTagScreen/>;
        case routePaths.producerHistoryPage:
            return <ProductTagHistory/>;
        case routePaths.producerSettings:
            return <ProducerSettings/>;
        default:
            return <div>Not Found</div>
    }
};

export default Producer;