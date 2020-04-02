import React, { Component } from 'react';
// import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Routes } from './Routes';
import configureStore, { history } from './store/configureStore';

const store = configureStore();
//const browserHistory = createBrowserHistory();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {/* <Router history={browserHistory}> */}
                <ConnectedRouter history={history}>
                    <Routes />
                </ConnectedRouter>
                {/* </Router> */}
            </Provider>
        );
    }
}
