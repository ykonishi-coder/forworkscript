# 画像生成AI別プロンプトのコツ

各AIごとのプロンプト作法。仕様は頻繁に変わるので、実行時にWebSearchで最新を確認 することを推奨。

このファイルは設計時点の一般的なガイドラインとして記載。

## 🏆 2026年現在の主要プレイヤー

### Google 系

#### Nano Banana（Gemini 2.5 Flash Image）
- 2024年8月登場、2025年以降も進化継続の Google の画像生成モデル
- 圧倒的な編集能力: 既存画像の一部編集・キャラクター一貫性が強み
- マルチモーダル: テキスト+画像入力で自然な編集指示
- Gemini アプリ / Google AI Studio / API 経由で利用

プロンプト形式:
- 自然言語中心
- 編集指示が可能（「この画像の背景を夕焼けに」等）
- キャラクター一貫性の指示（「同じ人物の別表情」等）

強み:
- 既存画像の一部編集
- 複数画像の合成
- テキストレンダリング精度
- リアリスティックな人物

プロンプト例:
```
A photorealistic portrait of a young woman with short black hair, 
wearing a light blue blazer, natural daylight, office background.
```

編集の場合:
```
[元画像を添付] この人物を笑顔にして、背景を海辺に変更してください
```

#### Nano Banana Pro（Gemini 3 Pro Image）
- Nano Banana の上位版（高解像度・高品質）
- プロフェッショナル用途
- 詳細情報は公式ドキュメント要確認

#### Imagen 3 / Imagen 4
- Google Cloud Vertex AI 経由
- 商用利用向け
- 写実系に強い

### OpenAI 系

#### GPT-4o / GPT Image 1
- 2025年登場の OpenAI 画像生成
- ChatGPT 経由で自然に利用
- DALL-E 3 の後継的位置づけ
- テキストレンダリングが非常に優秀
- マルチモーダル編集可能

プロンプト形式:
- 自然言語
- ChatGPT 内で対話的に調整
- 技術タグ不要

#### DALL-E 3（レガシー）
- OpenAI の旧世代モデル
- 現在は GPT Image に主流が移行済み
- まだ過去のシステムや一部ツールから利用できるが、新規運用は非推奨
- 積極的に使う理由は乏しい（GPT Image / Nano Banana / Midjourney V7 等を推奨）

### Midjourney

#### Midjourney V7 / V6.1
- 2026年時点の最新バージョン（要確認）
- 芸術性・スタイル性で最高峰
- Discord / 公式 Web

基本構造:
```
{subject}, {details}, {style}, {camera}, {lighting} --ar {ratio} --s {stylize} --v {version}
```

主要パラメータ:
- `--ar 1:1 / 16:9 / 9:16 / 3:4` — アスペクト比
- `--s 0-1000` — スタイライゼーション
- `--c 0-100` — カオス（バリエーション）
- `--v 6.1` / `--v 7` — バージョン
- `--niji 6` — アニメ調モデル
- `--no {keyword}` — ネガティブ
- `--cref {url}` — キャラクター参照
- `--sref {url}` — スタイル参照

Tips:
- 前半の要素ほど影響大
- 英語推奨
- `--cref` でキャラクター一貫性が大幅改善（V6 以降）

### FLUX（Black Forest Labs）

#### FLUX.1 dev / pro / 1.1 pro
- 2024年登場、オープンソース系の新世代
- テキストレンダリング優秀
- プロンプト追従性が高い
- API + ローカル実行両対応

特徴:
- Stable Diffusion の後継候補
- 商用ライセンスは FLUX.1 pro が必要
- ComfyUI / Replicate / fal.ai で利用可

プロンプト形式:
- 自然言語寄り
- 長めの記述でも精度保持

### Stable Diffusion（SDXL / SD 3.5）

- オープンソース・ローカル実行
- SDXL（2023年）/ SD 3.5（2024年）
- ControlNet / LoRA 等の細かい制御が強み

基本構造:
```
{positive prompt}, {style tags}, {quality tags}
Negative prompt: {negative}
```

重み付け:
- `(word:1.2)` — 1.2倍強調
- `(word:0.8)` — 0.8倍抑制
- `[word]` — 抑制

Tips:
- プロンプトは75トークンごと区切り
- LoRA 指定: `<lora:filename:weight>`
- ControlNet で構図・ポーズ制御
- ネガティブプロンプトが効く

よく使われる品質タグ:
```
Positive: masterpiece, best quality, detailed
Negative: (worst quality:1.4), blurry, distorted, deformed, extra limbs, watermark
```

### その他の注目 AI（2026年時点）

#### Adobe Firefly（3 / Image 3）
- Adobe Creative Cloud 統合
- 商用利用に明確に対応（学習データが権利処理済み）
- Photoshop / Illustrator 内で直接利用
- プロのデザイナー向け

#### Ideogram（2.0 / 3.0）
- テキストレンダリングが圧倒的
- ロゴ・ポスター・タイポグラフィ向き
- 無料・有料プラン

#### Recraft（V3）
- デザイナー特化
- ブランドコントロール
- ベクター出力可能

#### Leonardo.ai
- ゲーム・コンセプトアート向け
- Phoenix / Flux 等のモデル選択

#### Krea.ai
- リアルタイム生成
- インタラクティブな編集

#### Runway ML
- 動画生成中心だが画像も
- Gen-3 / Gen-4

## DALL-E 3（レガシー・過去 AI）

2026年時点ではすでに主流から外れています。OpenAI 自身も GPT Image に主力を移行しており、新規運用では非推奨。過去の ChatGPT プロジェクトで触っていた人が参考程度に使うレベル。

- 技術タグは逆効果になる場合あり
- 長い自然言語が効く
- 現在の推奨は GPT Image / Nano Banana / Midjourney V7

## 共通のコツ

### 画質表現
- 写実: `photorealistic`, `hyperrealistic`（ただし AI によっては逆効果）
- イラスト: `illustration`, `digital art`, `concept art`
- 水彩: `watercolor painting`, `loose brushstrokes`
- 油絵: `oil painting`, `thick impasto`
- アニメ: `anime style`, `manga style`

### ライティング
- `golden hour` / `blue hour` / `rim light` / `backlight`
- `studio lighting` / `cinematic lighting` / `soft diffused light`

### カメラ
- `close-up` / `medium shot` / `wide shot`
- `low angle` / `high angle` / `eye level` / `bird's eye view`
- `shallow depth of field` / `deep focus`
- `35mm` / `50mm` / `85mm` / `wide angle`

### 構図
- `rule of thirds` / `symmetrical` / `leading lines` / `negative space`

### 雰囲気
- `moody` / `dreamy` / `vibrant` / `ethereal` / `gritty` / `minimal`

## AI の選び方の目安（2026年版）

| 用途 | おすすめ AI |
|------|----------|
| 既存画像の編集・キャラ一貫性 | Nano Banana, GPT Image |
| 高品質な芸術的画像 | Midjourney V7, FLUX.1 pro |
| テキストが画像内に必要 | Ideogram, Nano Banana, GPT Image |
| 写実的な人物・風景 | Nano Banana, Midjourney V7, Imagen |
| イラスト・アニメ調 | Midjourney niji, SD + LoRA |
| 細かい構図・ポーズ制御 | Stable Diffusion + ControlNet |
| 商用利用重視（権利クリア） | Adobe Firefly |
| ロゴ・タイポグラフィ | Ideogram, Recraft |
| オープンソース・ローカル | SDXL, SD 3.5, FLUX.1 dev |
| プロダクト・商品写真 | Nano Banana, Firefly |
| ゲーム・コンセプトアート | Midjourney, Leonardo.ai |

## 2026年のトレンド

### AI 画像生成の進化
- マルチモーダル: 画像+テキストで編集指示
- キャラクター一貫性: 同じ人物の複数生成
- テキストレンダリング: 画像内の日本語・英語精度向上
- 高解像度: 4K / 8K 標準化
- 動画への拡張: 画像から動画への生成連携

### 著作権・法的動向
- 学習データの権利問題
- AI 生成物の著作権（国により異なる）
- 日本でも法整備が進行
- 商用利用時は必ず利用規約確認

## 仕様変更への対応

プロンプトの作法は AI のバージョンアップで変わる:

- 新バージョンリリース時
- ユーザーが「前より効かなくなった」と言った時
- 3ヶ月に1度の定期レビュー

再調査結果は `config.integration_research` に記録。

## 最新情報の取得

実行時に 必ず WebSearch で最新確認:

```
{AI名} プロンプト 2026
{AI名} latest version
{AI名} prompt guide
```

このドキュメントは スナップショット であり、実際の運用では最新情報を優先。
