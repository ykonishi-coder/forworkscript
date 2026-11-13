# Research Assistant（リサーチャー）

ネット経由のディープリサーチ + レポート作成 + 通知配信 を一貫支援。

---

## 🎯 できること

### ディープリサーチ
- 単発検索ではなく、多段階・複数ソース で掘り下げ
- 公的統計 → 業界レポート → メディア → 専門誌 の順で信頼度順に
- 複数ソースでクロスチェック
- 出典・取得日を必ず記録

### レポート作成
- 調査結果を構造化
- エグゼクティブサマリ + 詳細
- 出典付き

### 通知配信
- 関係者へメール・Slack・LINE・Discord・Teams・Chatwork 等で通知
- 下書き作成・承認制がデフォルト（誤送信防止）
- 自動送信は自分宛のみ

---

## 🔒 プライバシー・安全性

- Claude の学習データに使われません
- 調査結果は ローカル保存のみ
- 認証情報は環境変数 / OSキーチェーン管理
- 他者への自動送信禁止（ユーザー承認必須）

---

## ハイブリッド構成

- 本体: 調査・レポート・通知
- `research-assistant-advocate`: 情報源の信頼性・論理・偏りの DA

---

## 5つの機能

1. 調査計画 — 何をどう調べるか設計
2. 情報収集 — 多段階 Web 検索（WebSearch / WebFetch）
3. 情報整理 — 構造化・分類・クロスチェック
4. レポート生成 — 調査レポート作成
5. 通知配信 — 関係者への通知（下書き・承認制）

---

## 通知ツール対応

セットアップで設定、都度最新調査 で MCP / API 確認:

| ツール | 方式 | 備考 |
|-------|------|------|
| Gmail | MCP / API | secretary 連携可 |
| Outlook | Graph API | |
| Slack | Webhook / MCP / API | |
| Teams | Webhook / Graph API | |
| Discord | Webhook | |
| Chatwork | API | |
| LINE | Messaging API | Notify 2025/3 廃止 |
| Google Chat | Webhook | |

認証情報は config に書かない → 環境変数 / OSキーチェーン管理。

---

## セットアップ

```
リサーチャー セットアップして
```

### タイプ選択
- A) お試し
- B) 最低限
- C) しっかり

### 3問（B プラン）
- リサーチ領域
- 調査深度
- 通知機能の利用

---

## 使い方

### 調査
```
SaaS 業界の最新動向調べて
```

### 調査 + レポート
```
〇〇について調査してレポートにして
```

### 通知配信（下書き作成）
```
この調査結果、関係者に通知して
```
→ 下書き作成 → ユーザー確認 → 承認後に送信

### 定期調査
```
毎朝、業界ニュースのダイジェスト作って
```
→ scheduled-run で設定

---

## 情報源の優先度

### ★★★★★ 最優先
- 政府機関（経産省・総務省等）
- 業界団体の公式統計
- 上場企業の決算

### ★★★★☆ 高信頼
- 大手調査会社（矢野経済・IDC 等）
- 大手メディア（日経・ダイヤモンド等）

### ★★★☆☆ 参考
- 業界誌・専門ブログ
- 海外の業界メディア

### ★★☆☆☆ 補足
- 一般ブログ・まとめサイト

### ★☆☆☆☆ 使わない
- SNS・匿名情報

詳細は `references/source-evaluation.md`。

---

## DA の観点

- 情報源の信頼性
- 複数ソースのクロスチェック
- 論理の飛躍
- 偏り（確証バイアス）
- 情報の鮮度
- 著作権配慮

---

## ファイル構成

```
.claude/
├── skills/research-assistant/
│   ├── SKILL.md
│   ├── README.md
│   ├── references/
│   │   ├── wizard-setup.md
│   │   ├── function-plan.md
│   │   ├── function-collect.md
│   │   ├── function-organize.md
│   │   ├── function-report.md
│   │   ├── function-notify.md
│   │   ├── research-methodology.md       ⭐
│   │   ├── source-evaluation.md          ⭐
│   │   └── tool-integrations.md          (通知ツール)
│   └── templates/
│       ├── config.template.yaml
│       └── research-report.template.md
└── agents/
    └── research-assistant-advocate.md
```

---

## よくある質問

### Q. 有料データベースを調べられる？
いいえ。Web で公開されている範囲に限ります。有料レポートの概要は参照できます。

### Q. LINE Notify 使える？
2025年3月で廃止されました。LINE Messaging API 等への移行が必要です（都度最新調査）。

### Q. 通知を自動化したい
- 自分宛の自動通知: 可能（Slack DM 等）
- 他者への自動通知: 原則 毎回ユーザー承認
- 組織への定期配信は承認フロー整備推奨

### Q. 古い情報を引用してしまわない？
取得日を必ず記録し、古い情報は「YYYY 年時点」と明示。DA が鮮度チェック。

### Q. やめたくなったら？
`rm -rf ./.research-assistant/`（Windowsは `Remove-Item -Recurse -Force ./.research-assistant/`） で完全削除。
