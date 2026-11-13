# ツール連携 調査フレームワーク

スプレッドシートサポーターが連携する主要ツール:

- Google Sheets（MCP / API / GAS Web App / 手動）
- Excel（ファイルやり取り / 手動）

連携は強制ではない — 手動コピペだけで関数生成・コード生成の全機能が使える。

## 大原則

1. 連携しなくても全機能は動く（関数・スクリプト生成はClaudeが出力するだけなので）
2. 毎回その場で調査 — 連携方法は変化が早い
3. 認証情報をスキルに保存しない — OAuth や GAS の自分のアカウント内で完結
4. 書き込み権限は必要最小限に絞る

## Google Sheets 連携の選択肢

### 選択肢A: GAS Web App（AIおすすめ度 ★★★★☆）

自分の Google アカウント内で GAS を Web App として公開し、Claude が HTTP 経由で操作する方式。

メリット:
- 自分のアカウント内で完結（第三者にトークン渡さない）
- 権限スコープは自分で制御
- clasp CLI で管理できる
- 追加費用なし

デメリット:
- 初回セットアップに数ステップ必要
- GAS Web App の URL を知っている人はアクセスできる（※対策は下記）

セキュリティ対策:
- Web App の実行ユーザーを「自分」に設定
- アクセス権限を「自分のみ」または「リンクを知っている自分のアカウント」に
- URL 内に簡易トークンを含める（厳格な認証が必要なら別途 OAuth）

セットアップ詳細: `references/gas-web-app-guide.md` 参照。

### 選択肢B: Google Sheets API 直接（★★★☆☆）

OAuth で認証して sheets.googleapis.com を直接叩く方式。

メリット: 標準的、ドキュメントも豊富

デメリット:
- OAuth セットアップが煩雑
- トークン管理が必要
- Google Cloud プロジェクト作成が必要

### 選択肢C: MCP サーバー（利用可能なら ★★★★☆）

MCP サーバーが利用可能なら最短。都度最新情報を調査:

調査クエリ例:
```
Google Sheets MCP Claude {今年}
MCP server spreadsheet
Anthropic Sheets integration
```

### 選択肢D: 手動コピペ（★★★★★ 安心重視）

関数・スクリプトを生成して、ユーザーが手でシートに貼る。最も安心で、どの環境でも動く。

## Excel 連携の選択肢

### 選択肢A: ファイルやり取り（★★★☆☆）

.xlsx ファイルを Claude に渡して、Claude が Python/スクリプトで処理して返す方式。

条件: Claude Code の code execution が利用可能であること（API のベータヘッダ `code-execution-2025-08-25` 等）

### 選択肢B: Office Scripts（Microsoft 365）（★★★☆☆）

Excel Online で動く JavaScript/TypeScript スクリプト。オフィススクリプト。

### 選択肢C: VBA / マクロ生成（★★★★☆）

VBA コードを生成して、ユーザーが Excel に貼り付け。実行はユーザー。

### 選択肢D: 手動コピペ（★★★★★）

関数を生成、ユーザーが手で貼る。最も安心。

## 調査プロセス

### Step 1: 環境確認
- OS / Excel のバージョン / Microsoft 365 かどうか
- Google ワークスペースの利用有無

### Step 2: WebSearch
```
Google Sheets Claude MCP {今年}
clasp GAS deploy Web App {今年}
Excel Office Scripts Claude
Google Sheets API OAuth minimal scope
```

### Step 3: 公式優先で WebFetch
- `developers.google.com/apps-script`
- `developers.google.com/sheets/api`
- `learn.microsoft.com/en-us/office/dev/scripts/`
- `github.com/google/clasp`

### Step 4: 提案テンプレート

```markdown
## 連携方式（YYYY-MM-DD 調査）

### Google Sheets
- A: GAS Web App — ★★★★☆ / 推奨（自分のアカウント内で完結）
- B: Sheets API 直接 — ★★★☆☆ / 設定やや複雑
- C: MCP（あれば） — ★★★★☆ / 確認中
- D: 手動コピペ — ★★★★★ / 安心重視

### Excel
- A: ファイルやり取り — ★★★☆☆
- B: Office Scripts — ★★★☆☆（Microsoft 365必要）
- C: VBA生成 — ★★★★☆
- D: 手動コピペ — ★★★★★

迷ったら 手動コピペ から始めることを強くおすすめします。
必要になったら GAS Web App への切り替えが比較的簡単です。
```

## 権限最小化の原則

### GAS Web App の場合
- `SpreadsheetApp.openById(id)` で特定ID のみアクセス
- 全スプレッドシートへのアクセス権は渡さない
- 書き込み権限を付ける場合も、対象シートを限定

### Sheets API の場合
- スコープを `spreadsheets.readonly` から始める
- 書き込みが必要になってから `spreadsheets` に昇格

### MCP の場合
- 提供される MCP ツールの権限を読んで理解してから使う
- 疑問があればドキュメント確認

## トラブルシュート

### GAS の権限エラー
- `clasp login --use-project-scopes` が付いていない可能性
- スコープが不足している → appsscript.json を確認

### OAuth トークン期限切れ
- 各ツールの公式再認証フローへ
- スキル設定ファイルに認証情報を書かせない

### MCP が動かない
- バージョン確認
- Claude Code の再起動
- 公式ドキュメントで現状確認

### 書き込み権限を付けたくない
- 手動コピペ方式に切り替え
- 関数・スクリプトを生成して、ユーザーが貼る運用

## まとめ

- 連携しなくても 関数・スクリプト生成機能は完全動作
- 書き込み操作が必要な場合のみ連携を検討
- 最初は手動コピペ、慣れたら GAS Web App への段階的移行を推奨
- 認証情報は絶対にスキル設定に書かない
