# 機能: スクリプト生成

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.spreadsheet-operator/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


ユーザーの反復作業を自動化する GAS (Google Apps Script) コードを生成する。

このモードは主に「コード生成 + 説明」。実際のデプロイはユーザーが行う（事故防止）。

## 入力

1. 自動化したいタスク（具体的に）
2. 実行タイミング（手動 / 毎日X時 / 特定イベント）
3. 対象スプレッドシート

## 手順

### 1. 要件の明確化

以下を確認:

- 処理の全体像: 入力→処理→出力
- 実行頻度: 手動 / 日次 / 週次 / イベント駆動
- エラー時の挙動: 中断 / スキップ / 通知
- 既存環境: GAS プロジェクトが既にあるか、新規か
- 権限スコープ: 必要最小限に絞る

### 2. GAS コード生成

以下のパターンで構造化:

```javascript
/**
 * {スクリプトの目的}
 *
 * 実行方法: {手動 / トリガー設定方法}
 * 権限: SpreadsheetApp（読み取り / 書き込み）
 *
 * 作成日: YYYY-MM-DD
 * 注意: 認証情報はプロパティサービスで管理（コードに直書きしない）
 */

function main() {
  // 設定の読み込み
  const config = getConfig_();

  // メイン処理
  try {
    const result = processData_(config);
    logSuccess_(result);
  } catch (err) {
    logError_(err);
    // 通知を設定していれば呼ぶ
  }
}

function getConfig_() {
  const props = PropertiesService.getScriptProperties();
  return {
    targetSheetId: props.getProperty('TARGET_SHEET_ID'),
    // その他の設定
  };
}

function processData_(config) {
  const ss = SpreadsheetApp.openById(config.targetSheetId);
  const sheet = ss.getSheetByName('対象シート');

  // 処理ロジック
  // ...

  return { processedRows: 0 };
}

function logSuccess_(result) {
  console.log(`処理完了: ${result.processedRows}行`);
}

function logError_(err) {
  console.error(`エラー: ${err.message}`);
}
```

### 3. コードの説明

ユーザーが理解できるレベルで解説:

- 各関数の役割
- 変更が必要な箇所（プロパティ設定、シート名等）
- 動作確認の方法
- トリガー設定手順（定期実行の場合）

### 4. セットアップ手順の案内

```markdown
## セットアップ手順

### 1. GAS プロジェクト作成
- 方法A: スプレッドシートから「拡張機能 → Apps Script」を開く
- 方法B: script.google.com で新規作成

### 2. コードを貼り付け
- 上記コードをエディタに貼り付け

### 3. プロパティ設定
- 「プロジェクトの設定」→「スクリプトプロパティ」
- キー: TARGET_SHEET_ID / 値: 対象スプレッドシートのID

### 4. 権限付与
- 「実行」を押すと初回に権限ダイアログが出る
- 必要な権限のみ許可する

### 5. トリガー設定（定期実行の場合）
- 「トリガー」→「トリガーを追加」
- 関数: main
- イベントのソース: 時間主導型
- 時間ベースのトリガーのタイプ: {日次 / 週次 等}

### 6. 動作確認
- 「実行」ボタンで手動実行してテスト
- ログで結果確認
```

### 5. clasp CLI を使う場合の案内

開発が本格的になる場合:

```bash
# インストール
npm install -g @google/clasp

# ログイン
clasp login --use-project-scopes

# 既存プロジェクトをクローン
clasp clone {SCRIPT_ID}

# または新規作成
clasp create --type sheets

# ローカル編集 → プッシュ
clasp push
```

注意: `clasp login` は `--use-project-scopes` を必ず付ける（SpreadsheetApp 等の権限が通らない事故を防ぐ）。

## スクリプト設計のガードレール

### エラーハンドリング
- すべての外部呼び出しを try-catch で囲む
- エラー時は処理を停止（連鎖エラーを防ぐ）
- ログに詳細を残す

### 権限の最小化
- 書き込みが不要なら読み取りのみ
- 特定シートのみアクセスするよう設計
- 外部API呼び出しを含める場合は明示

### 機密情報の扱い
- APIキー・トークンは PropertiesService で管理（コード直書き禁止）
- メールアドレス等の個人情報はログに残さない

### 実行頻度の制限
- Google の実行時間制限（6分）を超えないよう設計
- 大量データ処理は分割実行を推奨

## やってはいけないこと

- ユーザー代行でデプロイ実行: コード生成と説明まで、デプロイはユーザー
- 他人のスプレッドシートへの書き込みスクリプト: アクセス権のないシートへの操作
- メール送信機能を含む: 要件にない限り含めない（事故防止）
- 認証情報をコードに直書き

## 典型的なスクリプトパターン

### 日次サマリ生成

毎朝、昨日のデータを集計してサマリシートに書き込み:

```javascript
function dailySummary() {
  // 1. 昨日の日付を取得
  // 2. データシートから昨日分を抽出
  // 3. 集計
  // 4. サマリシートに追記
}
```

### データ取り込み（外部API）

定期的に外部APIからデータを取得してシートに追加:

```javascript
function importFromAPI() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('API_KEY');
  // UrlFetchApp.fetch() でデータ取得
  // シートに書き込み
}
```

### 通知トリガー

特定条件を満たすデータが発生したらユーザーに通知:

```javascript
function checkAndNotify() {
  // 1. 条件をチェック
  // 2. 該当があれば Logger.log or メール下書き
  // 注意: 自動送信はしない
}
```

### リマインド（下書きのみ）

定期的にリマインド対象を抽出してドラフト作成:

```javascript
function generateReminderDrafts() {
  // 1. 期限が近いタスクを抽出
  // 2. 下書きメールを作成（送信はしない）
  // 3. Gmail の下書きとして保存
}
```

## 最終確認メッセージ

```markdown
## GAS コードを生成しました

目的: {スクリプトの目的}
実行タイミング: {手動 / 定期実行の詳細}
必要な権限: {権限リスト}

### セットアップ手順
（上記の手順1〜6）

### 動作確認のおすすめ
1. 最初は手動実行でテスト
2. 少量データで動作確認
3. 問題なければトリガーを設定

不明点があれば教えてください。
```
