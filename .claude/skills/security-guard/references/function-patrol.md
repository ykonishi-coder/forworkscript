# 機能: 定期巡回（Patrol / シークレットスキャン）

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.security-guard/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


APIキー・パスワード・トークン等のシークレットが、リポジトリ・ログ・設定ファイル等に 意図せず残っていないか を定期的にスキャンする機能。

## なぜ巡回が必要か

どれだけ注意しても、シークレットの漏洩は人間のミスで一番よく起きる:

- `.env` を `.gitignore` に入れ忘れて Git コミット
- デバッグログに API キーを出力してしまい、そのログを外部共有
- スクリーンショットに IDE のパネルごと写り込む
- README にサンプルとして書いた仮のキーが、実はホンモノだった
- 以前のプロジェクトで作ったキーが、退職後・外注解除後も使えたまま放置

→ 巡回で早期検出することが、これらの構造的ミスへの最前線の対応策です。

---

## 対象

| 対象 | 検査内容 |
|------|---------|
| Gitリポジトリ | ワークツリー + 過去コミット履歴（`git log -p`）をスキャン |
| ログファイル | アプリログ・デバッグログ・CI出力にキーが残っていないか |
| 設定ファイル | `CLAUDE.md` / `SKILL.md` / `config.yaml` 等に平文キー |
| 環境変数ファイル | `.env*` が `.gitignore` に入っているか |
| クラウドコンソール | AWS / GCP / GitHub 等の発行キー一覧（手動連携）|
| パスワードマネージャー | 古い・期限切れエントリの掃除（手動連携）|

---

## 検知パターン（2026年版・都度最新確認）

以下は典型的なキー形式。最新の公式ドキュメントを WebSearch で確認 してから適用する:

| サービス | プレフィックス例 | メモ |
|---------|----------------|------|
| Anthropic Claude | `sk-ant-api03-` | |
| OpenAI | `sk-proj-` / `sk-` | 組織別・プロジェクト別あり |
| AWS | `AKIA...` / `ASIA...` | Access Key ID |
| AWS Secret | 40文字 Base64 | 形式判別は難しく誤検知あり |
| GCP サービスアカウント | `"type": "service_account"` JSON | |
| GitHub PAT | `ghp_` / `github_pat_` | fine-grained は `github_pat_` |
| Slack | `xoxb-` / `xoxp-` / `xoxa-` | |
| Stripe | `sk_live_` / `sk_test_` / `rk_live_` | |
| Discord Bot | 24 char Base64 + `.` + 6 + `.` + 27 | |
| Notion Integration | `secret_` / `ntn_` | |
| Supabase | `eyJ...` (JWT形式) | service role key 要注意 |
| Replicate | `r8_` | |
| HuggingFace | `hf_` | |
| SendGrid | `SG.` | |
| Twilio | `SK` + 32hex | Account SID は `AC` + 32hex |
| 汎用パスワード | `password =` / `PASSWORD=` | 誤検知多いが重要 |
| 汎用秘密鍵 | `-----BEGIN .* PRIVATE KEY-----` | |

---

## 実行フロー

### 1. 対象指定

```
対象を教えてください:
- スキャン対象ディレクトリ: {パスリスト}
- 対象リポジトリ（Git履歴込み）: {パスリスト}
- ログファイル: {パスリスト}
- 除外したいパス: {node_modules 等}
```

### 2. 検知パターンの最新化

WebSearch で以下を確認:

```
{サービス名} API key format {今年}
secret scanning patterns {今年}
gitleaks rules updated
```

公式が形式を変えていないか（OpenAI は `sk-` から `sk-proj-` へ変わった実績あり）チェック。

### 3. スキャン実行

Grep（ripgrep）で検索。例:

```
# Claude API
pattern: sk-ant-api03-[A-Za-z0-9_-]+

# AWS Access Key
pattern: (AKIA|ASIA)[A-Z0-9]{16}

# GitHub PAT
pattern: (ghp_|github_pat_)[A-Za-z0-9_]{36,}

# 汎用（平文パスワード）
pattern: (password|passwd|pwd)\s*[:=]\s*["'][^"']{6,}
```

重要: スキャン結果そのものに キーの値が含まれる ので、レポート時は必ずマスクする。

### 4. マスキング付きレポート

```markdown
# 巡回レポート - {日時}

## サマリ
- スキャン対象: {ファイル数} ファイル / {行数} 行
- ヒット: {検出件数} 件
- 優先度: 🔴 即対応 {n} 件 / 🟡 確認 {n} 件 / 🟢 誤検知候補 {n} 件

## 🔴 即対応（ローテーション必須）

### {ファイルパス}:{行番号}
- 種別: Anthropic Claude API Key
- 検出値: `sk-ant-api03-...` ← マスク済み
- 行コンテキスト: `ANTHROPIC_API_KEY=sk-ant-api03-`
- 対応:
  1. Anthropic Console で該当キーを即無効化
  2. 新キーを発行して環境変数に入れ直し
  3. Git履歴から削除（`git filter-repo` 等・影響大なので慎重に）
  4. 公開リポジトリの場合、攻撃者が既に取得済みと考えるべき

### ...

## 🟡 確認（誤検知の可能性あり）
...

## 🟢 誤検知候補（テストデータの可能性）
...
```

### 5. 対応ガイドの自動付与

検出結果に対して、各サービス別の無効化手順 をその場で案内:

#### Anthropic
1. https://console.anthropic.com/ → API Keys
2. 該当キーの `Revoke`
3. 新キー発行 → 環境変数更新

#### AWS
1. IAM → ユーザー → セキュリティ認証情報
2. Access key を Deactivate → Delete
3. 新規作成

#### GitHub PAT
1. Settings → Developer settings → PAT
2. 該当トークン `Delete`
3. 新規発行時は fine-grained PAT 推奨

最新手順は必ず WebSearch で確認 してから案内（UIは頻繁に変わる）。

---

## 過去コミット履歴のスキャン

Git では `.gitignore` 追加前にコミットした秘密情報が 過去履歴に残る。
現在のワークツリーには無くても、過去コミットに残っていれば攻撃者はアクセス可能:

```bash
git log -p -- '<ファイル>' | grep -E '{パターン}'
```

または専用ツール `gitleaks` / `trufflehog` の利用を推奨（本スキル内では提案のみ、実行はユーザーの判断）。

履歴クリーンアップは慎重に:
- `git filter-repo` で履歴書き換えが可能だが、共有リポジトリでは影響大
- 既に漏れているキーは履歴から消しても無意味 — 攻撃者が取得済みと考え、必ずローテーション優先

---

## 定期実行（scheduled-run）

- 週次: リポジトリスキャン
- 月次: クラウドコンソールの発行キー棚卸し（手動連携）
- 四半期: 全キーのローテーション

レポートは `./.security-guard/patrol-reports/{YYYY-MM-DD}.md` に保存（`.gitignore` 必須）。

---

## advocate との連携

検出結果について security-guard-advocate を起動し:

- 「見逃しているパターンは？」
- 「誤検知として除外したものに、実は本物が混ざっていないか？」
- 「攻撃者視点で、このログの残り方は危険ではないか？」

を批判的にレビューしてもらう。

## 絶対にやらないこと

- 検出したキーの値をマスクなしでレポートに出す
- 勝手にキーを無効化する（ユーザー承認必須）
- 履歴クリーンアップをユーザー承認なしで実行する
- 誤検知を減らすために検知パターンを甘くする（抜けが出る）
