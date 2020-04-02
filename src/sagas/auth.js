import { select, put, take, call, fork, join } from 'redux-saga/effects';
import { push } from 'connected-react-router';
// select: Stateから必要なデータを取り出す
// put: Actionをdispatchする
// take: Actionを待つ、イベントの発生を待つ
// call: Promiseの完了を待つ
// fork: 別のタスクを開始する
// join: 別のタスクの終了を待つ
import {
    requestLogin,
    failureLogin,
    successLogin,
    requestLogout,
    successLogout,
} from '../actions/auth';
import requestAuth from '../modules/requestAuth';

function* handleLogin() {
    while (true) {
        // ログイン要求が来るまで待つ
        const action = yield take(requestLogin);
        // 認証処理の呼び出し
        const { payload, err } = yield call(requestAuth, {
            endpoint: '/login',
            type: 'POST',
            data: action.payload, // { studentId, name, password }
        });
        // 認証失敗の場合
        if (!payload && err) {
            yield put(failureLogin(String(err).split('Error: ')[1]));
            continue; // 認証に失敗したらリトライに備えて最初に戻る
        }
        // jwtの取得と保存
        const jwt = payload.token;
        const user = payload.result;
        localStorage.setItem('jwt', jwt);
        //console.log(Object.assign({}, { user }, { jwt }));
        // 認証成功
        yield put(successLogin(Object.assign({}, { user }, { jwt })));
        yield put(push('/'));
    }
}

function* handleLogout() {
    while (true) {
        // ログアウト要求待ち
        yield take(requestLogout);
        // jwtの削除
        localStorage.removeItem('jwt');
        // ログイン画面へ戻る
        yield put(successLogout());
        yield put(push('/login'));
    }
}

export default function* rootSaga() {
    yield fork(handleLogin);
    yield fork(handleLogout);
}
