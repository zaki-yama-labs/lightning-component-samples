Report View Component
=====================

A component which renders the data from a report, using [c3.js](http://c3js.org/).

![ss 2016-01-18 0 25 22](https://cloud.githubusercontent.com/assets/1001444/12378207/581a56b8-bd7a-11e5-994c-82c2f6f8b8d6.png)

This component is introduced by the video:
[39. Lightning Components Series Episode 5 - Report View Component - YouTube](https://www.youtube.com/watch?v=FqT-NVR8MXc)


### 使い方

1. 事前に `Opportunities_Stage_Report` という API 参照名で商談のレポートを作成します。
レポートはサマリー形式とし、最低1つの項目でグルーピングを作成しておきます。

2. `.env.json.sample` をコピーし、デプロイする組織のユーザー名・パスワードを入力して `.env.json` という名前で保存します。

3. 以下のコマンドを実行し、コードをデプロイします。

  ```
  $ npm install -g gulp  # インストールしていなければ
  $ npm install
  $ gulp  # デプロイします
  ```

4. 開発者コンソールで `Preview.app` を開きます。または任意の Lightning アプリケーションに `ReportView.cmp` を追加します。
