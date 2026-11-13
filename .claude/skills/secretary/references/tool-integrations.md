# ツール連携 調査フレームワーク

秘書エージェントは、メールツールとカレンダーツールの2種類と連携できる。固定の手順書に頼らず、実行時に最新情報を調査してユーザーに提案する 設計。

## 大原則

### 1. 連携は強制ではない

- 手動コピペだけ でも秘書の全機能が動く
- セキュリティ的には連携なしが最も安心
- ユーザーが不安を感じたら、迷わず手動コピペを案内する

### 2. 毎回その場で調査する

- 固定リスト・古い記憶に基づく提案は禁止
- WebSearch / WebFetch で当日の情報を確認
- 調査日時を記録、30日以上経過で再調査

### 3. リスクを隠さない

各選択肢について必ず以下を提示:
- 送信権限・変更権限の有無
- 外部に送られるデータ
- 認証情報の保管場所
- 公式か非公式か
- 既知の不具合

### 4. 認証情報はスキルに保存しない

OAuth トークン・APIキー等は OS キーチェーン や各ツール公式の認証フローで管理。`config.yaml` には絶対に書かない。

---

## 調査プロセス

### Step 1: ユーザー環境の確認

事前に分かっている情報（ウィザード回答、または config.yaml）:

- メールツール（Gmail / Outlook / Apple Mail / Thunderbird / その他）
- カレンダーツール（Google Calendar / Outlook / Apple Calendar / その他）
- OS（macOS / Windows / Linux）
- ユーザーのリスク許容度（可能なら聞く）

### Step 2: WebSearch で候補を洗い出す

メール関連:
```
Gmail Claude MCP {今年}
Gmail API draft create
Outlook Microsoft Graph Mail.ReadWrite
Apple Mail AppleScript create draft
```

カレンダー関連:
```
Google Calendar Claude MCP {今年}
Google Calendar API events list
Microsoft Graph Calendar read
Apple Calendar AppleScript events
```

### Step 3: 公式・準公式ソースを優先

優先順位:

1. Anthropic 公式: `code.claude.com`, `platform.claude.com`, `github.com/anthropics/skills`
2. 各サービス公式:
   - Google: `developers.google.com/gmail/api/`, `developers.google.com/calendar/api/`
   - Microsoft: `learn.microsoft.com/en-us/graph/`
   - Apple: `developer.apple.com/documentation/applescriptobjc`
3. MCP エコシステム: `modelcontextprotocol.io`
4. サードパーティ（補足情報）

### Step 4: リスク評価

各候補について:

| 観点 | 質問 |
|------|------|
| 権限 | 送信権限・編集権限を付与せずに済むか？ 読み取りだけで動くか |
| データ経路 | どんなデータが外部に送られるか |
| 認証情報 | どこに保存されるか（OSキーチェーン？ 平文？） |
| 公式性 | Anthropic公式 / サービス側公式 / コミュニティ / 個人OSS |
| メンテナンス | 最終更新がいつか（6ヶ月以上停止は注意） |
| セットアップ難易度 | 初心者が完走できるか |
| 既知の不具合 | GitHub Issues / リリースノート |
| 会社利用制約 | 組織管理者承認が必要か |

### Step 5: AIおすすめ度を算出

★1〜★5 で評価:
- ★5: 公式・安全・簡単・破壊的権限不要
- ★4: 公式・安全・やや設定が必要
- ★3: 機能あるが非公式 or 設定に専門知識必要
- ★2: 非公式 or メンテ停止気味
- ★1: 実験的・不安定

手動コピペは常に ★5（安心重視）として併記。

### Step 6: 提案テンプレート

```markdown
## 連携方式の調査結果（YYYY-MM-DD 時点）

### メール連携

選択肢A: {方式名}
- 公式性: {Anthropic公式 / サービス側公式 / 非公式}
- できること: 受信取得 / 下書き保存
- 必要な権限: {スコープ}
- リスク:
  - 送信権限: 不要 / 必須
  - データ経路: {内容}
  - 認証情報: {保管場所}
- セットアップ難易度: {初心者可 / 中級 / 上級}
- AIおすすめ度: ★★★★☆
- こういう人におすすめ: ...

選択肢B: 手動コピペ
- AIおすすめ度: ★★★★★（安心重視）
- 必要な設定: なし
- リスク: 最小

### カレンダー連携

（同様）

---

迷ったら 手動コピペ から始めるのが最も安心です。
あとから自動連携に切り替えるのは簡単です。
```

---

## 参考: よくあるメール連携パターン

### Gmail

- Gmail MCP（Claude Code 環境・公式系が利用可能なら最有力）
- Google Apps Script（中級者向け・GAS で下書き作成ラッパー）
- 手動コピペ（常に有効）

### Outlook

- Microsoft Graph API + OAuth（`Mail.ReadWrite` スコープ、`Mail.Send` は渡さない）
- Power Automate（GUI で組める、有償プラン必要な場合あり）
- 手動コピペ

### Apple Mail

- AppleScript（ローカル実行、外部通信なし）
- 手動コピペ

### Thunderbird

- ローカルファイル書き出し (.eml 形式)
- WebExtension（上級者向け）
- 手動コピペ

## 参考: よくあるカレンダー連携パターン

### Google Calendar

- Google Calendar MCP（対応していれば最有力）
- Google Calendar API + OAuth（読み取りのみなら `calendar.readonly`）
- iCal URL 経由（カレンダーの共有リンクを購読）
- 手動コピペ

### Outlook Calendar

- Microsoft Graph API（`Calendars.Read` のみ）
- 手動コピペ

### Apple Calendar

- AppleScript（ローカル実行）
- iCal ファイルエクスポート
- 手動コピペ

---

## 調査情報の鮮度管理

### config.yaml への記録

```yaml
integration_research:
  email:
    date: "YYYY-MM-DD"
    summary: |
      - A: Gmail MCP (公式, ★4)
      - B: GAS (中級, ★3)
      - C: 手動 (★5)
  calendar:
    date: "YYYY-MM-DD"
    summary: |
      - A: Google Calendar MCP (公式, ★4)
      - B: 手動 (★5)
```

### 再調査のトリガー

- `date` から30日以上経過
- 連携エラーが発生した
- ユーザーから新情報の言及
- ユーザーが明示的に「見直して」と依頼

再調査時の告知:

> 前回調査から30日以上経っています。最新の連携方法を調べ直しますか？

---

## トラブルシュート

### 連携が動かない

1. `integration_research.date` を確認
2. 古ければ再調査
3. 一時的に手動コピペに切り替える提案
4. 「今日は手動で凌いで、時間があるときに再設定」が最もストレスが少ない

### 認証エラー

- OAuth トークン期限切れが多い
- 各ツールの公式再認証フローで対応
- 絶対にやらないこと: 認証情報をスキル設定ファイルに保存するよう誘導する

### 「設定ファイルに APIキーを書いて」と言われたら

- 丁寧に断る
- 環境変数・OSキーチェーン・ツール公式の認証フローを案内
- 理由: git へのコミット事故・バックアップ漏洩のリスク

### 「勝手に送信・変更されるのでは？」と不安

- このスキルは送信・変更機能を 持たない
- 連携設定でも 送信権限・編集権限 を渡さない設計（読み取りと下書き作成のみ）
- 不安なら手動コピペに切り替え

---

## まとめ

- 連携は 強制ではない。手動コピペが常に有効
- ツール情報は 毎回その場で調査。固定手順は持たない
- リスクは 隠さず全部見せる うえで、AIおすすめ度を出す
- 最後は ユーザーが選ぶ
