# セキュリティ基礎

エンジニアが押さえるべきセキュリティの基本。

## OWASP Top 10 (2021)

### A01: Broken Access Control（アクセス制御の不備）

例: 他ユーザーのデータに URL 操作でアクセス

対策:
- リクエストごとに認可チェック
- 最小権限の原則
- デフォルトでアクセス拒否

### A02: Cryptographic Failures（暗号化の不備）

例: パスワードを平文保存

対策:
- パスワード: bcrypt / Argon2
- 通信: HTTPS 強制
- 保存: 適切な暗号化

### A03: Injection（インジェクション）

例: SQL / XSS / Command

対策:
- プリペアドステートメント
- エスケープ
- 入力検証

### A04: Insecure Design

対策:
- 脅威モデリング
- セキュリティレビュー

### A05: Security Misconfiguration

例: デフォルトパスワード、不要ポート開放

対策:
- 最小限の設定
- 定期監査
- エラーメッセージで内部情報を漏らさない

### A06: Vulnerable and Outdated Components

対策:
- 定期的な依存関係更新
- `npm audit`, `pip audit`
- Dependabot

### A07: Identification and Authentication Failures

対策:
- 強力なパスワードポリシー
- MFA
- セッション管理（タイムアウト・ローテート）

### A08: Software and Data Integrity Failures

対策:
- 信頼できるソースからのみインストール
- サブリソース整合性（SRI）
- CI/CD パイプラインの整合性

### A09: Security Logging and Monitoring Failures

対策:
- 重要イベントのログ
- 不正アクセス検知
- SIEM

### A10: Server-Side Request Forgery (SSRF)

対策:
- URL 検証
- ホワイトリスト
- 内部ネットワーク分離

## 認証・認可

### 認証（Authentication）
ユーザーが誰か確認。

#### ベストプラクティス
- 強力なパスワード（長さ + 複雑さ）
- パスワードハッシュ化（bcrypt, Argon2）
- MFA / 2FA
- ブルートフォース対策（rate limit）

### 認可（Authorization）
何ができるか確認。

#### モデル
- RBAC（ロールベース）
- ABAC（属性ベース）
- ACL（アクセス制御リスト）

### JWT 使用時
- 有効期限短く
- シークレット管理
- 署名アルゴリズム注意（none NG）
- トークン無効化戦略

## 機密情報の管理

### NG
- ソースコードにハードコード
- `.env` を git コミット

### OK
- 環境変数
- シークレットマネージャ（AWS Secrets Manager, HashiCorp Vault）
- `.gitignore` に `.env`

### 検出ツール
- git-secrets
- truffleHog
- Gitleaks

## 入力検証

### 原則
- 信頼しない（ユーザー入力・外部 API）
- ホワイトリスト 優先
- サーバー側で検証（クライアント側は UI だけ）

### 検証項目
- 型
- 長さ
- フォーマット（正規表現）
- 範囲

## セキュリティヘッダー

Web アプリで設定:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=()
```

## CSRF 対策

- CSRF トークン
- SameSite Cookie
- Origin / Referer ヘッダー確認

## CORS

必要最小限のオリジンを許可。ワイルドカード（`*`）は避ける。

## HTTPS

- 全通信 HTTPS
- HSTS 設定
- 証明書自動更新（Let's Encrypt）

## ログと監査

### 記録すべきイベント
- 認証成功・失敗
- 認可失敗
- 重要データアクセス
- 設定変更
- システムエラー

### 記録すべきでない
- パスワード
- クレジットカード情報
- 個人情報全体

## 依存関係管理

- 定期的な更新
- 脆弱性スキャン
- CVE 監視

### ツール
- Dependabot（GitHub）
- Snyk
- npm audit / pip audit

## セキュリティテスト

### SAST（静的解析）
- CodeQL
- SonarQube
- Semgrep

### DAST（動的解析）
- OWASP ZAP
- Burp Suite

### 侵入テスト
- 定期的な外部ペンテスト

## インシデント対応

### 手順
1. 検知
2. 封じ込め
3. 根本原因特定
4. 復旧
5. 事後分析

### 連絡フロー
- 内部エスカレーション
- ユーザー通知（個人情報漏洩時は法的義務）
- 監督官庁報告

## 継続的な学習

- OWASP
- CWE
- CVE データベース
- セキュリティブログ（Krebs on Security 等）
- JPCERT/CC（日本）

## 専門家への相談

- セキュリティインシデント → すぐ専門家
- 重要システム → 監査を入れる
- 個人情報 → 個人情報保護委員会
