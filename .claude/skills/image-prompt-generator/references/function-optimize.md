# 機能: プロンプト最適化

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.image-prompt-generator/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


既存のプロンプトを改善する、または他のAI用に翻訳する。

## 入力

1. 既存プロンプト（ユーザーが貼る）
2. 目的（改善 / 他AIへの翻訳 / 両方）
3. 不満な点（あれば）
4. 対象AI（翻訳先）

## 手順

### 1. 既存プロンプトの分析

以下を抽出:
- 使われている画像生成AI（記法から推定）
- 含まれている要素（被写体、スタイル、カメラ、ライティング）
- 冗長な部分・矛盾する指定
- 欠けている可能性がある要素

### 2. 改善

#### 冗長の削除
- 同じ意味の単語の重複（`high quality, best quality, hires` → `high quality`）
- 矛盾する指定（`bright dark scene` → どちらかに）
- 効果の弱い単語（`very` `extremely` の多用）

#### 要素の追加
- ライティングが指定されていない → 追加提案
- 構図が曖昧 → カメラアングルの明示
- スタイルが不明確 → 参照アーティスト・映画・雑誌等の例

#### 重み付けの調整（SD系）
- 主要要素を `(word:1.2)` で強調
- 抑えたい要素を `(word:0.8)` で弱める
- 過度な重み（1.5以上）は避ける

### 3. 他AIへの翻訳

対象AIの流儀に合わせて書き換え:

#### Midjourney → DALL-E 3
- パラメータ（`--ar` 等）を削除
- キーワード列挙から自然言語描写に変換
- `a photograph of...` のように記述調に

#### DALL-E 3 → Midjourney
- 自然言語から要素キーワード列挙へ
- スタイル指定をタグ化
- `--ar` や `--s` などのパラメータを追加

#### Stable Diffusion → Midjourney
- 重み付け `(word:1.2)` を `--s` やキーワード強調に変換
- LoRA 指定は削除（同等効果のスタイル記述で代替）

### 4. 出力フォーマット

```markdown
## プロンプト最適化結果

### 入力プロンプト
```
beautiful girl, forest, sunset, high quality, best quality, masterpiece, 8k
```

### 改善版（同じAI向け）
```
portrait of a young woman in a forest clearing, golden hour sunset, warm light streaming through trees, shallow depth of field, cinematic, photorealistic --ar 3:4 --s 250
```

### 何を変えたか
- `beautiful girl` → `portrait of a young woman` に（より具体的）
- `forest` → `forest clearing` に（場所を明確に）
- `sunset` → `golden hour sunset, warm light streaming through trees` に（ライティング詳細）
- `high quality, best quality, masterpiece, 8k` は冗長なので削除し、`cinematic, photorealistic` で品質表現
- アスペクト比 3:4（人物向け）と `--s 250`（適度な芸術性）を追加

### Stable Diffusion 向けに翻訳
```
portrait of a young woman in a forest clearing, (golden hour sunset:1.1), warm light streaming through trees, (cinematic:1.2), photorealistic, 8k, sharp focus
Negative: blurry, low quality, distorted, deformed, extra limbs, watermark
```

### DALL-E 3 向けに翻訳
```
A photograph of a young woman standing in a forest clearing during golden hour. Warm sunset light streams through the trees, casting a dreamy atmosphere. Shot on a 50mm lens with shallow depth of field, cinematic composition.
```
```

## 翻訳時の注意

### 機能の違いを理解

- Midjourney: キーワード列挙が強い、パラメータで制御
- Stable Diffusion: 重み付けと LoRA で細かい制御
- DALL-E 3: 自然言語が強い、プロンプトの意図を理解する
- Nano Banana 等: 最新情報を都度調査

### 完全翻訳は難しい

ある程度のニュアンスの差は残る。

> 注意: AI の違いで表現できる範囲が変わります。特に `--s` (Midjourney) のような芸術性パラメータは他AIにそのまま存在しないため、スタイル記述で代替しています。実際に生成してみて、必要なら再調整してください。

## やってはいけないこと

- ユーザーの意図を勝手に変える: 雰囲気やテーマを別のものに変えない
- 元プロンプトの制約を無視: 「青色を入れたい」等の明示的な指定を削除しない
- AI の存在しない機能を提示: Midjourney に `(word:1.2)` を書いても無視される、等

## 一般的な改善パターン

### パターン1: 品質タグの整理

Before:
```
best quality, masterpiece, ultra detailed, 8k, photorealistic, hyper realistic, extremely detailed
```

After:
```
high quality, photorealistic, detailed
```

→ 意味が重複している。簡潔に。

### パターン2: ライティング追加

Before:
```
woman in a cafe
```

After:
```
woman sitting in a warm-lit cafe, soft natural window light, cozy atmosphere
```

→ 雰囲気が格段に良くなる。

### パターン3: 構図の明示

Before:
```
a cat
```

After:
```
close-up portrait of a cat, looking at camera, shallow depth of field
```

→ 構図を指定することで意図が伝わる。

### パターン4: 技術タグのAI別調整

Midjourney では `--ar 16:9 --s 250`、SD では `(word:1.2)`、DALL-E では自然言語。AI を変えるならこれらを書き直す。
