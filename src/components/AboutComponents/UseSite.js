import React from 'react';

export function UseSite() {
    return (
        <div>
            一日に登録できる作業内容は一回まででお願いします。(改善中)
            <ul>
                <li>一覧</li>
                登録した作業内容を一覧で見ることができます。
                <li>カレンダー</li>
                日にちをクリックすることで、その日の作業内容を見ることができます。
                <li>月別</li>
                月別で作業内容を確認できます。
                <li>統計</li>
                今までの作業内容をグラフで見ることができます。
                <li>記録</li>
                その日の作業内容を記録できます。
                <li>削除</li>
                IDを用いて目的の作業記録を削除できます。
                <li>更新</li>
                IDを用いて目的の作業記録を更新できます。
                <li>設定(実装中)</li>
                ユーザーのプロフィールを変更できます。
            </ul>
        </div>
    );
}
