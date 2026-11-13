# 機能: プロンプト生成

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.image-prompt-generator/config.yaml` と
> `./.image-prompt-generator/style-profile.md` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` は config.yaml の値を、
> 「プロファイルから好みを反映」は style-profile.md の蓄積内容を指す。
> style-profile.md が未生成なら「プロファイル反映はスキップして進める」と明示する。


## 入力として受け取るもの

1. 欲しい画像のイメージ（自然言語）
2. 対象AI（指定があれば。なければ config の `preferred_ai`）
3. 用途（SNS / 資料 / 印刷物 / キャラデザ 等）
4. 制約（避けたい要素、必須要素）

不明点は1往復でまとめて聞く:

> いくつか教えてください:
> - 主題（何を描きたい？）
> - 雰囲気（明るい / ダーク / ノスタルジック 等）
> - 用途（SNS / 資料 / 印刷等）
> - 使う予定の画像生成AI

## 手順

### 1. イメージの構造化

ユーザーの漠然としたイメージを、プロンプトに必要な要素に分解:

| 要素 | 例 |
|------|---|
| 被写体 | 人物、動物、風景、オブジェクト |
| 行動・状況 | 歩いている、笑っている、静止 |
| 環境・背景 | 夜の街、森の中、白背景 |
| ライティング | 自然光、ネオン、ドラマチック |
| スタイル | 写実、アニメ調、水彩 |
| カメラ・構図 | クローズアップ、俯瞰、ローアングル |
| 色調 | 暖色、寒色、モノトーン |
| 感情・雰囲気 | 明るい、神秘的、緊張感 |
| 技術詳細 | 高解像度、フィルムグレイン、ボケ味 |

### 2. 対象AIの最新情報を調査

都度ネット調査 で、対象AIの最新プロンプト形式・パラメータを確認:

```
Nano Banana (Gemini Flash Image) prompt guide {今年}
GPT Image (OpenAI) prompt best practices {今年}
Midjourney V{最新バージョン} prompt parameters
FLUX.1 prompt structure {今年}
Stable Diffusion 3.5 / SDXL prompt weighting
```

`references/ai-specific-tips.md` も参照（ただし古い可能性があるので、常に最新情報を優先）。

### 3. プロンプトの構築

対象AIの流儀に合わせて構築:

#### Nano Banana / Nano Banana Pro（Google Gemini 系）
```
自然な文章で描写。マルチモーダル編集（既存画像 + 指示）も得意。
「この画像の背景を夕焼けに」「同じキャラの別表情を」等、対話的な指示が強力。
```
- 自然言語中心。技術タグ不要
- キャラクター一貫性・既存画像編集が圧倒的
- 既存画像を添付して編集指示する使い方が主流

#### GPT Image（OpenAI）
```
自然な文章で詳細に描写。テキストレンダリングが非常に優秀。
ChatGPT 内で対話的に調整していくのが効きやすい。
```
- 自然言語・描写調
- 画像内テキスト生成が強い
- DALL-E 3 の後継。新規運用は GPT Image を推奨

#### Midjourney V7 / V6.1
```
{主題}, {詳細}, {スタイル}, {ライティング}, {構図} --ar 16:9 --s 250 --v 7
```
- パラメータは末尾にまとめる
- `--ar`（アスペクト比）、`--s`（スタイライゼーション）、`--c`（カオス）、`--v`（バージョン）
- Niji モードは `--niji {version}`
- `--cref` でキャラクター一貫性

#### FLUX.1（Black Forest Labs）
```
長めの自然言語でも精度を保つ。テキストレンダリング・プロンプト追従性が高い。
```
- 自然言語寄り
- ComfyUI / Replicate / fal.ai 経由

#### Stable Diffusion 3.5 / SDXL
```
{positive}, (high quality:1.2), (detailed:1.1), {style tags}
Negative: {negative prompt}
```
- 重み付け `(word:1.2)` は SD の流儀
- LoRA 使用時は `<lora:name:weight>` 形式
- プロンプト長は長くなりすぎないよう注意（75トークン単位で区切られる）
- ControlNet で構図・ポーズ制御

#### DALL-E 3（レガシー）
```
自然な文章で描写。現在は GPT Image に主流が移行済みで、新規運用は非推奨。
```
- 過去の環境でまだ触っている人向け
- 新規は GPT Image / Nano Banana / Midjourney V7 を推奨

#### Imagen / Ideogram / Firefly 等

調査結果に応じて適切な形式に。

### 4. 3案の提示

#### 案1: シンプル版
- 基本要素のみ
- プロンプトが短い
- 初心者でも再現可能

#### 案2: 詳細版
- 要素を網羅
- 細かな制御
- 意図した画像を出しやすい

#### 案3: 実験的・アート版
- 非標準の組み合わせ
- 意外性のあるバリエーション

### 5. ネガティブプロンプトの提案（対応AI）

SD 系、Midjourney `--no` 等、ネガティブプロンプトが有効な場合:

```
Negative: blurry, low quality, distorted, deformed hands, bad anatomy, watermark
```

用途に応じて追加（例: ビジネス用途なら `nsfw, violence`）。

### 6. 出力フォーマット

```markdown
## プロンプト生成結果

### 対象AI: Midjourney V6

### 案1: シンプル版
```
a golden retriever sitting on a wooden bench in autumn park, warm sunlight, cinematic --ar 16:9 --s 100
```

- 何を表現したか: 秋の公園、温かい光、優しい雰囲気
- 調整ポイント: `--s 100` で自然寄り、もっと芸術的なら `--s 500` へ

### 案2: 詳細版
```
portrait of a golden retriever sitting on a wooden bench in autumn park, fallen leaves scattered around, warm afternoon sunlight filtering through trees, cinematic composition, shallow depth of field, photorealistic, 8k --ar 16:9 --s 250 --v 6
```

### 案3: 実験的版
```
hyperrealistic cinematic still of a golden retriever in autumn, Kodak Portra 400 film, soft bokeh, backlit, dreamy atmosphere --ar 2:3 --s 750 --stylize 750
```

### 推奨ネガティブプロンプト
Midjourney: `--no blurry, low quality, multiple dogs, people`

### 次の一手
- もっと夕方っぽく: 「golden hour」「sunset」を追加
- もっと可愛く: 「cute pose」「puppy」要素を追加
- 違うAI用に翻訳: 「このプロンプトを Nano Banana 用に」「GPT Image 用に」等と依頼してください
```

## 用途別のコツ

### SNS投稿
- 縦長（9:16）や正方形（1:1）
- キャッチーな色使い
- 目を引く構図

### 業務資料
- シンプル・クリーン
- 余白を意識
- テキストが被らない構図（`clean background`, `space for text`）

### 印刷物
- 高解像度指定
- 印刷適性（彩度控えめ、CMYK想定）

### キャラクターデザイン
- 正面・横顔・後ろ姿のバリエーション提案
- 一貫性のある詳細（髪色、服装、体型）

## やってはいけないこと

- 実在人物の写真風: `photo of {実在人物名}` のようなプロンプトは生成しない
- 特定著作権キャラ名の羅列: 「〇〇（アニメキャラ名）風」などは避ける（代わりに「90年代アニメスタイル」等の汎用表現）
- 差別・ヘイト・違法行為の表現
- ユーザーの要望を無条件に通す（懸念があれば代替案を提案）

## 繰り返し運用

ユーザーが「うまくいかなかった」と戻ってきた場合:

1. どのAIで試したか
2. 出てきた画像のどこが不満か
3. プロンプトのどの部分を調整したいか

を聞いて、改善版を生成。改善の履歴は style-profile に残すと、次回以降の生成が合いやすくなる。
