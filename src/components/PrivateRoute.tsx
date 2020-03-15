import React, {Component} from 'react';
import {Route, Redirect } from 'react-router-dom';
import {routePaths} from "../global/constants";
import {StoreState} from "../state/reducers";
import {connect} from "react-redux";


const _PrivateRoute = ({component: Component, producer, ...rest}) => {
    console.log("Producer: ", producer);
    return (
        <Route
            {...rest}
            render={props =>
                producer.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: routePaths.producerAuthPage
                        }}
                    />
                )
            }
        />
    );
};

const mapStateToProps = ({producer}: StoreState) => {
    return {producer};
};

export const PrivateRoute = connect(
    mapStateToProps,
    {}
)(_PrivateRoute);
