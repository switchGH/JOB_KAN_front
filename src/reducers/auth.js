import { createReducer } from 'redux-act';
import {
    requestJwtLogin,
    successJwtLogin,
    failureJwtLogin,
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
        [requestJwtLogin]: (state) =>
            Object.assign({}, state, {
                isRequest: true,
                error: undefined,
            }),
        [successJwtLogin]: (state, payload) =>
            Object.assign({}, state, {
                isPrepared: true,
                isLoggedIn: true,
                user: {
                    studentId: payload.user.studentId,
                    name: payload.user.name,
                    password: payload.user.password,
                },
                isRequest: false,
                error: undefined,
                jwt: payload.jwt,
            }),
        [failureJwtLogin]: (state, err) =>
            Object.assign({}, state, {
                isLoggedIn: false,
                error: err,
            }),
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
