import React, { Component } from 'react'
// import { render } from 'react-dom'
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import { getPosts } from './actions/postAction'
import { Routes } from './Routes';

const browserHistory = createBrowserHistory();
console.log(browserHistory);

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
)

store.dispatch(getPosts())

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Routes />
                </Router>
            </Provider>
        );
    }
}
