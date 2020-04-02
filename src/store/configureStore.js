import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers/reducers';
import rootSaga from '../sagas/auth';

export const history = createBrowserHistory();
//const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    if (process.env.NODE_ENV !== 'production') {
        const { logger } = require('redux-logger');
        middlewares.push(logger);
    }
    const store = createStore(
        //reducers,
        createRootReducer(history),
        initialState,
        //createRootReducer(history),
        // composeEnhancer(
        //     applyMiddleware(sagaMiddleware, logger, routerMiddleware(history))
        // )
        compose(applyMiddleware(...middlewares, routerMiddleware(history)))
    );

    sagaMiddleware.run(rootSaga);
    return store;
}
