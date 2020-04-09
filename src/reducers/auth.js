import { createReducer } from 'redux-act';
import {
    requestLogin,
    failureLogin,
    successLogin,
    successLogout,
} from '../actions/auth';

const initialState = {
    auth: {
        isPrepared: false,
        isLoggedIn: false,
        user: {
            _id: undefined,
            studentId: undefined,
            name: undefined,
            password: undefined,
        },
        isRequest: false,
        error: undefined,
        jwt: '',
    },
};

const auth = createReducer(
    {
        [requestLogin]: (state) =>
            Object.assign({}, state, {
                isRequest: true,
                error: undefined,
            }),
        [failureLogin]: (state, err) =>
            Object.assign({}, state, {
                isLoggedIn: false,
                error: err,
            }),
        [successLogin]: (state, payload) =>
            Object.assign({}, state, {
                isPrepared: true,
                isLoggedIn: true,
                user: {
                    _id: payload.user._id,
                    studentId: payload.user.studentId,
                    name: payload.user.name,
                    password: payload.user.password,
                },
                isRequest: false,
                error: undefined,
                jwt: payload.jwt,
            }),
        [successLogout]: () =>
            Object.assign({}, initialState.auth, {
                isPrepared: true,
            }),
    },
    initialState.auth
);

export default auth;
