# 機能: バナー・OGP画像制作

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.design-consultant/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


Webサイトの装飾用バナー、SNSシェア時に表示されるOGP画像、広告バナーなどの制作を支援する機能。

## OGP画像って何？（初心者向け）

- OGP = Open Graph Protocol の略
- Web ページが Twitter / Facebook / LINE などでシェアされたときに表示されるプレビュー画像
- 1枚の画像が、投稿の印象・クリック率を大きく左右する
- 通常 1200 × 630 px のサイズ

設定していないと、何の画像も出なかったり、サイトのロゴだけが小さく表示されたりして、シェアされても伝わらない状態になります。

---

## 対応する画像種別とサイズ

### Webサイト内バナー
- ヒーロー画像: プロジェクトに応じる（例 1920 × 900 px）
- セクション見出し背景: 幅100%で高さは好み
- カード型バナー: 600 × 400 px など

### SNS シェア用（OGP）
- 共通 OGP: 1200 × 630 px
- Twitter 大型カード: 1200 × 628 px
- Facebook 推奨: 1200 × 630 px
- LINE: 1200 × 630 px
- Pinterest: 縦長 1000 × 1500 px

### 広告バナー（都度最新確認）
- Google Display Network: 主要サイズ 300×250, 728×90, 336×280, 160×600, 300×600
- Meta広告: 1080×1080（正方形）, 1080×1920（ストーリーズ）
- X広告: 1200 × 628

仕様は各プラットフォームで頻繁に変わるため、WebSearch で最新確認。

---

## 制作アプローチ

### アプローチA: HTML/CSS + Puppeteer などで画像化
- HTML/CSS でデザイン → スクリーンショット化
- 修正がコードで管理できる
- 量産に強い（JSON から複数バナーを一括生成など）
- engineer-assistant 領域だが、design-consultant からブリーフ提示で連携

### アプローチB: 画像生成AI
- image-prompt-generator と連携してプロンプト作成
- 背景・アクセント画像を生成
- 文字は後でオーバーレイ or そのままAI に載せる
- 手軽でユニークだが、同じテイストを量産するのは難しい

### アプローチC: Canva MCP（あれば・都度確認）
- Canva のテンプレートを呼び出して操作
- ブランドカラー・フォント統一が簡単
- MCP の有無と機能範囲は都度 WebSearch で確認

### アプローチD: Figma + 書き出し
- Figma でデザイン → PNG/JPG 書き出し
- Figma MCP 経由でフレーム生成まで自動化可能
- すでに Figma を使っているチームに最適

### アプローチE: Adobe 系（上級者のみ）
- Photoshop / Illustrator / Firefly をコンピュータ操作経由で
- セットアップは複雑、日常的に触っている上級者向け

用途・ブランド・量産性で選ぶ。初心者には A または B からおすすめ。

---

## 制作ワークフロー

### ステップ1: ブリーフ
- どこで使うか（サイト / X / Facebook / LINE / 広告）
- 目的（告知 / キャンペーン / 記事シェア / 商品訴求）
- 必須要素（コピー / ロゴ / 商品画像 / CTA / 日付）
- ブランドカラー・フォント
- サイズ・複数サイズ展開の必要性
- 期限・点数

### ステップ2: 下書き
- 文字要素の優先順位・視線誘導
- 色バランス・余白
- 可読性（特にスマホでの縮小表示を想定）

### ステップ3: 実装
- 選んだアプローチで制作
- ブランドガイドラインと照合
- 量産が必要ならテンプレート化

### ステップ4: レビュー
- advocate による visual / 文言 / 景表法チェック
- 視認性・コントラスト・アクセシビリティ
- 著作権・肖像権の確認

### ステップ5: 書き出し・配置
- サイト内バナー: `assets/images/` 配下に
- OGP: `<meta property="og:image" content="...">` を HTML に追加
- 絶対URLで指定することが多い（SNSクローラの仕様）

---

## OGP の HTML 設定サンプル

```html
<!-- Facebook / LINE / 一般 OGP -->
<meta property="og:title" content="ページタイトル" />
<meta property="og:description" content="ページの説明文" />
<meta property="og:image" content="https://example.com/ogp.png" />
<meta property="og:url" content="https://example.com/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="サイト名" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="ページタイトル" />
<meta name="twitter:description" content="ページの説明文" />
<meta name="twitter:image" content="https://example.com/ogp.png" />
```

設定後は、実際に Twitter や Facebook のデバッガツールで表示確認する（キャッシュされていることがあるため、強制リフレッシュが必要）。

---

## 著作権・ライセンスの原則

- 素材は必ず商用利用可能なもの
- ストックフォトは契約範囲内で（ユーザーごとに契約形態を確認）
- 画像生成AIで作ったものも、各AIの商用利用ポリシーを確認
- ロゴ・商標は、正式な権利者の承認を得たもののみ
- 他社ロゴ・キャラクターを許可なく使わない

---

## 他エージェントとの連携

- image-prompt-generator: 背景・ビジュアル素材のプロンプト
- content-creator: バナー内のコピー作成
- engineer-assistant: HTML/CSS → 画像変換パイプライン
- marketing-strategist: 広告クリエイティブのA/Bテスト設計

連携は必ずユーザー承認を取る。

## 絶対にやらないこと

- 他社ロゴ・キャラクターの無断使用
- 根拠のない「No.1」「最安」「効果◯◯倍」の表記
- 実在人物の顔写真を本人同意なく使う
- 医薬品・医療行為に関する誇大表現
- 利用規約違反のストック素材の商用転用
