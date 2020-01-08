import { combineReducers } from 'redux';
import users from './postReducer';

const rootReducer = combineReducers({
    users
});

export default rootReducer
