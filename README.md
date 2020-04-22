# JOB KAN

作業時間を管理できる Web アプリケーションです。

## Description

## API

### ユーザー操作

| メソッド |        url         |        処理        |
| :------: | :----------------: | :----------------: |
|   GET    |       /users       | ユーザー情報の取得 |
|   POST   |   /users/signup    |   ユーザーの登録   |
|   POST   |    /users/login    |    ログイン処理    |
|   GET    |    /users/login    |      JWT 認証      |
|  DELETE  | /users/{studentId} |   ユーザーの削除   |

### 作業時間操作

| メソッド |                url                |           処理           |
| :------: | :-------------------------------: | :----------------------: |
|   GET    |            /work-time             |      作業情報の取得      |
|   POST   |            /work-time             |      作業情報の登録      |
|   GET    |      /work-time/{studentId}       | ユーザーの作業情報の取得 |
|  DELETE  | /work-time/{studentId}/{objectId} |      作業情報の削除      |
|   PUT    | /work-time/{studentId}/{objectId} |      作業記録の更新      |
