# GAS Web App セットアップガイド

スプレッドシートサポーターが Google Sheets を自動操作するための GAS Web App 構築手順。

この方式のメリット: 認証情報が自分のGoogleアカウント内で完結、第三者にトークンを渡さない、権限を自分で制御できる。

## 前提

- Google アカウント
- Node.js + npm（clasp CLI 用）
- ターミナルが使える
- `scripts/gas-web-app.js` に参考実装あり

## セットアップ手順

### 1. clasp CLI のインストールとログイン

```bash
npm install -g @google/clasp
```

ログイン（必ず `--use-project-scopes` を付ける）:

```bash
clasp login --use-project-scopes
```

`--use-project-scopes` を付けないと、SpreadsheetApp 等の権限が通らずエラーになる既知問題がある。

### 2. GAS プロジェクトを作成

方法A: スプレッドシートから
- 対象スプレッドシートで「拡張機能 → Apps Script」を開く
- プロジェクト名を設定

方法B: clasp で新規作成
```bash
mkdir spreadsheet-operator-gas
cd spreadsheet-operator-gas
clasp create --type standalone --title "Spreadsheet Operator"
```

### 3. コードを配置

`scripts/gas-web-app.js` の内容を `Code.gs`（または `main.js`）にコピー。

プロパティ設定:
- 「プロジェクトの設定」→「スクリプトプロパティ」
- キー: `ALLOWED_SHEET_IDS` / 値: 操作を許可するスプレッドシートIDのカンマ区切りリスト
- キー: `ACCESS_TOKEN` / 値: 任意のシークレット文字列（Claude側からのリクエスト認証用）

### 4. 権限付与

1. エディタで `doGet` または適当な関数を選択して実行
2. 権限ダイアログが出る → 必要な権限を許可
   - SpreadsheetApp へのアクセス
   - Web App の実行

### 5. Web App としてデプロイ

エディタの「デプロイ → 新しいデプロイ」:

- 種類: ウェブアプリ
- 説明: 「Spreadsheet Operator v1」等
- 実行するユーザー: 自分
- アクセスできるユーザー: 自分のみ（または用途に応じて）

デプロイすると Web App URL が発行される。これを `config.yaml` の `gas_web_app_url` に保存。

### 6. 動作確認

curl で疎通確認:

```bash
curl -X POST "{WEB_APP_URL}?token={ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"action":"ping"}'
```

応答:
```json
{"status":"ok","message":"pong"}
```

### 7. スプレッドシートサポーター側の設定

`config.yaml` に追記:

```yaml
integration:
  google_sheets: gas_web_app
  gas_web_app_url: "https://script.google.com/macros/s/XXXXX/exec"
  # ACCESS_TOKEN は config には書かない。別途 OS キーチェーン等で管理
  # または、環境変数 GAS_ACCESS_TOKEN に設定
```

## セキュリティ設計

### 許可シートの制限

`ALLOWED_SHEET_IDS` プロパティで、操作可能なシートを明示的にホワイトリスト化:

```
ALLOWED_SHEET_IDS=1abcdef...,2xyzzz...,3qrstuvw...
```

GAS 側コードは、リクエストで指定された sheet_id がこのリストに含まれない限り処理を拒否する。

### トークンによる簡易認証

`ACCESS_TOKEN` は Claude からのリクエストに含める文字列。GAS 側で一致しないリクエストは拒否。

厳格な認証が必要なら、代わりに OAuth 2.0 の Service Account 方式を検討。

### 実行権限

デプロイ時の「実行するユーザー」は 自分 に設定。これで、Web App がアクセスする権限は自分のアカウントの範囲に限定される。

### ログ

GAS 側で全リクエストをログに残す:

```javascript
console.log(`Action: ${action}, SheetId: ${sheetId}, From: ${ip}`);
```

異常を検知したら即座に Web App URL を無効化（デプロイを解除）。

## 運用

### 更新

コード変更後:
```bash
clasp push
clasp deploy --description "v2"
```

新しい URL が発行される場合があるので、`config.yaml` を更新。

### URL の無効化

事故があった場合、即座にデプロイを解除:
```bash
clasp undeploy {DEPLOYMENT_ID}
```

### バージョン管理

clasp で管理していれば、コードは Git に入れられる（ただし `.clasp.json` と `appsscript.json` の取扱いに注意、認証情報は除外）。

## トラブルシュート

### デプロイが失敗する

- clasp のバージョン確認: `clasp --version`
- `--use-project-scopes` でログインし直す
- `appsscript.json` の権限スコープが不足していないか

### 権限エラー

- GAS エディタで一度手動実行し、権限ダイアログを承認
- `Drive` や `Sheets` の API を Services から有効化する必要があるケース

### Web App が 403 を返す

- デプロイ時の「アクセスできるユーザー」設定を確認
- 「自分のみ」の場合、ログインしているアカウントと一致しているか

### リクエストが届かない

- Web App URL のパス末尾が `/exec` になっているか
- HTTPS になっているか
- POST のヘッダで `Content-Type: application/json` が指定されているか

## まとめ

- GAS Web App は、自分のアカウント内で完結する 安全な自動操作手段
- clasp CLI で管理するとコード変更が楽
- セキュリティ対策（許可シートのホワイトリスト、トークン認証）を必ず入れる
- 不安なら手動コピペから始める
