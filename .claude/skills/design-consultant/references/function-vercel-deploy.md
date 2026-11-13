# 機能: Vercel デプロイ連携

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.design-consultant/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


作ったLPやWebサイトを Vercel に公開する機能。初心者でも世界に向けて公開できる状態まで一緒にセットアップ。

## Vercelって何？（初心者向け）

- Webサイトをインターネット上に公開するためのサービス
- 静的サイト（HTML/CSS/JS）・Next.js など主要フレームワークを、Gitと連携するだけでデプロイできる
- 無料枠でも個人・小規模事業は十分使える
- URL は自動で `{project-name}.vercel.app` が発行される
- 独自ドメインも設定可能

他の選択肢（Netlify / Cloudflare Pages / GitHub Pages / Firebase Hosting / レンタルサーバー）もあるが、静的サイトでの使いやすさと日本語情報の多さから、本スキルはデフォルトで Vercel を推奨。

---

## 公開までの全体フロー

```
1. プロジェクトの準備
   ↓
2. Vercel アカウント作成（初回のみ）
   ↓
3. GitHub リポジトリ作成（推奨）
   ↓
4. Vercel にリポジトリ接続 or CLI で直接デプロイ
   ↓
5. プレビューURL 発行
   ↓
6. ユーザーがプレビュー確認・承認
   ↓
7. 本番デプロイ（独自ドメイン設定含む）
```

---

## 初回セットアップ（ユーザーごと1回）

### 1. Vercel アカウント作成
- https://vercel.com/signup
- GitHub アカウントで登録が一番スムーズ

### 2. Vercel CLI インストール（CLI 使う場合）

```
npm i -g vercel
# or
pnpm add -g vercel
```

### 3. `vercel login` で認証
- ブラウザが開いて認証完了

### 4. 課金情報・利用ポリシー確認
- 無料枠の範囲・超えたときの挙動を確認
- 本スキルの security-guard と連携して、AI専用カードを登録することを推奨

---

## プロジェクトごとのデプロイ

### パターンA: GitHub 連携（推奨）

1. GitHub にリポジトリを作成（github-flow モード連携）
2. プロジェクトを push
3. Vercel のダッシュボードで「New Project」→ リポジトリ選択
4. ビルド設定を確認（静的サイトなら変更不要が多い）
5. Deploy
6. プレビューURL が発行される
7. `main` ブランチへの push が本番デプロイになる
8. PR ごとに専用プレビューURL が発行されて、ユーザー承認が楽になる

### パターンB: Vercel CLI で直接デプロイ

```
cd {project-dir}
vercel          # プレビュー
vercel --prod   # 本番
```

ただし Git 連携ではないため、履歴・ロールバック・プレビュー管理に弱い。学習や一時的な公開向き。

---

## vercel.json（必要に応じて）

シンプルな静的サイトなら設定不要。以下のようなときに使う:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    { "source": "/old", "destination": "/new", "permanent": true }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

セキュリティヘッダーや URL 書き換えを細かく管理したい時に。詳細は都度 WebSearch で最新確認。

---

## 独自ドメインの設定

1. 独自ドメインを持っている（例: example.com / 取得先 お名前.com / Route53 / Cloudflare 等）
2. Vercel のプロジェクト → Settings → Domains で追加
3. DNS 設定（CNAME or A レコード）を案内通りに
4. SSL は自動発行（Let's Encrypt）

DNS の伝播には時間がかかる（数分〜48時間）ことを伝える。

---

## カスタム自動エイリアス（応用）

デプロイごとの URL（`project-xxxxx.vercel.app`）は変わるが、独自のエイリアス（`project.vercel.app` や `project-yourname.vercel.app`）は安定した URL として使える:

```
vercel alias set {deployed-url} {alias}
```

独自ドメイン設定後も、短縮エイリアスを併用するのが管理しやすい。

---

## 環境変数

- APIキー・シークレットは Vercel Dashboard の Environment Variables で管理
- 絶対にコードに書かない
- Preview / Production で分けられる
- 本スキルの security-guard と連携して、本番キーと検証キーを分離することを推奨

---

## 公開前チェックリスト

- [ ] タイトル・説明・OGP が設定されている
- [ ] favicon が設定されている
- [ ] 404 ページが最低限用意されている
- [ ] プライバシーポリシー・特商法ページ（必要な業種）
- [ ] フォーム送信が動く（検証環境で実際に送ってみる）
- [ ] アクセシビリティ（alt, コントラスト, 見出し階層）
- [ ] モバイル表示が崩れていない
- [ ] 読み込み速度（Lighthouse スコア確認）
- [ ] アナリティクス（GA4 等）が入っているなら動作確認
- [ ] 公開 URL を共有する相手・タイミングを決めている

---

## 公開後の運用

- プレビュー → 本番 のフローを徹底
- PR ごとに専用 URL が生成されるので、関係者レビューを取りやすい
- 問題発生時は Vercel のダッシュボードから以前のデプロイに 1 クリックでロールバック可能
- 監視: Vercel 自身のアナリティクス・Web Vitals を確認

---

## セキュリティの勘所

- 本番デプロイの権限を AI に渡しすぎない
- 独断で `vercel --prod` せず、必ずユーザー承認
- 本番環境変数の値を AI に出力させない（Vercel ダッシュボードで直接設定）
- 誤ってプライベート情報を含むファイルを deploy に含めないよう `.vercelignore` で除外

security-guard と連携して、Vercel アカウント側の二要素認証・API キー管理も整える。

---

## 他エージェントとの連携

- engineer-assistant: Next.js など複雑フレームワークのビルド設定・SSR 周り
- security-guard: 本番キー分離・デプロイ前監査
- legal-advisor: プライバシーポリシー・特商法・利用規約の草稿
- github-flow: PR ベース運用

連携は必ずユーザー承認を取る。

---

## 絶対にやらないこと

- ユーザー承認なしで `vercel --prod`
- 本番ドメインを AI 独断で切り替える
- 環境変数・API キーをコードや README に書く
- 本番デプロイ時に検証環境をスキップ
- ロールバック無しで致命的変更をデプロイ
