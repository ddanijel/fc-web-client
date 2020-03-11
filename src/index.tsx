import ReactDOM from "react-dom";
import React from 'react';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {reducers} from "./state/reducers";
import App from "./components/App";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root'));