import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {routePaths} from "../global/constants";
import {StoreState} from "../state/reducers";
import {connect} from "react-redux";


const _PrivateRoute = ({component: Component, signInOnStartup, producer, ...rest}) => {
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
