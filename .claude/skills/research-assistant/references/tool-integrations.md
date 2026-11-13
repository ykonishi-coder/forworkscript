# 通知ツール連携

都度ネット調査で最新状況を確認。ツール仕様は頻繁に変わる。

## 大原則

1. 認証情報は環境変数 / OSキーチェーン管理（config に書かない）
2. 送信は承認制（自動送信は自分宛のみ）
3. 最新 MCP / API を都度調査

## 調査プロセス

### Step 1: WebSearch
```
Slack MCP Claude {今年}
Teams webhook integration
Discord MCP Anthropic
Chatwork API
LINE Messaging API MCP
Gmail MCP
```

### Step 2: 公式ドキュメント確認
- Slack: https://api.slack.com/
- Teams: https://learn.microsoft.com/en-us/microsoftteams/platform/
- Discord: https://discord.com/developers/docs/
- Chatwork: https://developer.chatwork.com/
- LINE: https://developers.line.biz/

### Step 3: 最新手法提案

---

## メール

### Gmail
- secretary エージェント経由がスムーズ
- 直接も可（Gmail API）

### Outlook
- Microsoft Graph API

### SMTP 直接
- 汎用的、認証情報管理が重要

---

## Slack

### Incoming Webhooks（推奨・簡易）

メリット:
- シンプル
- 認証はURL1本

セットアップ:
1. Slack アプリ作成
2. Incoming Webhook 有効化
3. URL を環境変数に保存: `SLACK_WEBHOOK_URL`

送信:
```bash
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"Hello World"}' \
  $SLACK_WEBHOOK_URL
```

### Slack Bolt / API（高機能）

メリット:
- スレッド・ファイル添付・リアクション
- チャンネル一覧取得

要件: Bot Token, App Token

### Slack MCP（存在するなら）

都度調査: `Slack MCP Claude {今年}`

---

## Microsoft Teams

### Incoming Webhook（簡易）

1. Teams チャンネルで「Incoming Webhook」接続
2. URL 取得
3. 環境変数保存

### Graph API（高機能）

- メッセージ送信以外に、チーム管理も可
- Azure AD 認証必要

---

## Discord

### Webhook（推奨）

1. サーバー設定 → Webhook 作成
2. URL 取得
3. 環境変数保存

```bash
curl -H "Content-Type: application/json" \
  -X POST \
  -d '{"content":"Hello"}' \
  $DISCORD_WEBHOOK_URL
```

### Bot / API
大規模な場合のみ。

---

## Chatwork

### Chatwork API

- API トークン取得
- Python / Node.js ライブラリあり

```bash
curl -X POST -H "X-ChatWorkToken: $TOKEN" \
  -d "body=Hello" \
  "https://api.chatwork.com/v2/rooms/$ROOM_ID/messages"
```

---

## LINE

### ⚠️ LINE Notify は 2025年3月廃止

後継オプション:
- LINE Messaging API（公式推奨）
- LINE Works（ビジネス向け）
- 個人利用: IFTTT・Zapier 等の統合サービス経由

### LINE Messaging API

- LINE Developers でチャネル作成
- Channel Access Token 取得
- Webhook URL 設定

```bash
curl -X POST \
  -H "Authorization: Bearer $LINE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"to":"USER_ID","messages":[{"type":"text","text":"Hello"}]}' \
  https://api.line.me/v2/bot/message/push
```

注意: プッシュ通知は従量課金（フリープランは月1000通）

---

## Google Chat

### Webhook

1. Space 作成
2. Webhook URL 取得

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello"}' \
  $GCHAT_WEBHOOK_URL
```

---

## 認証情報管理

### 絶対にやらないこと
- `config.yaml` に Token / Webhook URL を書く
- git にコミット

### 推奨
- 環境変数
- OSキーチェーン
- `.env` ファイル（`.gitignore` 必須）

### .env 例
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
CHATWORK_TOKEN=...
LINE_TOKEN=...
GMAIL_API_KEY=...
```

### .gitignore
```
.env
.research-assistant/
```

---

## エラー時の対応

### 認証エラー
- Token 期限切れ
- スコープ不足
- 再認証フロー

### レート制限
- API 呼び出し制限超過
- 待機 or 分散

### ネットワークエラー
- リトライ
- タイムアウト設定

---

## 通知テスト

セットアップ時・変更時にテスト:

```markdown
セットアップした Slack 通知をテスト送信します。
テスト内容: 「[TEST] Research Assistant セットアップ完了」
送信先: #research

送信してよろしいですか？
```

---

## まとめ

- Webhook 系（Slack / Discord / Teams / GChat） は比較的簡単
- メール は secretary 経由が楽
- LINE は廃止された Notify に注意、Messaging API 等への移行
- 認証情報は厳重管理
- 最新 MCP / API は都度調査
