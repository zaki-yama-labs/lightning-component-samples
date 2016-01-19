Lightning Component Developer's Guide: Quick Start
==================================================

A standalone Lightning app for tracking expenses.
https://developer.salesforce.com/docs/atlas.en-us.198.0.lightning.meta/lightning/qs_intro.htm
デプロイには Force.com Migration Tool (Force.com 移行ツール) を使用しているので注意

### 基本的な使い方 (ant をそのまま使用した deploy & retrieve)

- 事前に Force.com Migration Tool をインストール
	- https://help.salesforce.com/apex/HTViewSolution?id=000176910&language=ja
- `build.properties.sample` に自分の組織のusername, password を入力し、`build.properties` として保存
- `build.xml` に記載されたコマンドを実行
	- `retrieveCode`: コードを取得
	- `deployCode`: コードをデプロイ
	- `removeCode`: コードを削除

### Deploy

```zsh
$ ./deploy.sh -p /path/to/build.properties -t codepkg
```
