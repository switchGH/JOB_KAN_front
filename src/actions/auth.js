import { createAction } from 'redux-act';

// export const AUTH_PREPARED = 'AUTH_PREPARED';
// export const authPrepared = createAction(AUTH_PREPARED);
// export const FAIL_FETCHING_USERINFO = 'FAIL_FETCHING_USERINFO';
// export const failFetchingUserInfo = createAction(FAIL_FETCHING_USERINFO);

// 保存されているJWTによる認証要求
export const REQUEST_JWT_LOGIN = 'REQUEST_JWT_LOGIN';
export const requestJwtLogin = createAction(REQUEST_JWT_LOGIN);
// 保存されているJWTによる認証成功
export const SUCCESS_JWT_LOGIN = 'SUCCESS_JWT_LOGIN';
export const successJwtLogin = createAction(SUCCESS_JWT_LOGIN);
// ログイン要求
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const requestLogin = createAction(REQUEST_LOGIN);
// ログイン失敗
export const FAILURE_LOGIN = 'FAILURE_LOGIN';
export const failureLogin = createAction(FAILURE_LOGIN);
// ログイン成功
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const successLogin = createAction(SUCCESS_LOGIN);
// ログアウト要求
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const requestLogout = createAction(REQUEST_LOGOUT);
// ログアウト成功
export const SUCCESS_LOGOUT = 'SUCCESS_LOGOUT';
export const successLogout = createAction(SUCCESS_LOGOUT);
