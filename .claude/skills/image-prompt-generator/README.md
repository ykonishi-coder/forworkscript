# 画像生成プロンプト (Image Prompt Generator)

2026年主要画像生成AI（Nano Banana / GPT Image / Midjourney V7 / FLUX.1 / Stable Diffusion 3.5 / Adobe Firefly / Ideogram 等）向けに、最適化されたプロンプトを作るサポーター。

---

## プライバシーについて（最初に）

- 入力した情報は Claude の学習データには使われません
- 設定・好みプロファイルは あなたのPC内 にのみ保存されます
- 参考画像を渡す場合、処理時に Claude API に送られます（学習には使われません）
- 生成したプロンプトは外部に送信されません（コピペでお使いください）

---

## できること

### プロンプト生成
「こんな画像が欲しい」という自然言語のイメージから、対象AIに最適化されたプロンプトを3案提示。ネガティブプロンプトも合わせて提案。

### プロンプト最適化・翻訳
既存のプロンプトを改善、または他のAI用に翻訳。冗長な部分の整理、不足要素の追加。

### リファレンス分析
参考画像からスタイル要素を抽出し、同じ雰囲気を再現するためのプロンプトを生成。

注: 画像生成自体はこのスキルでは行いません。プロンプトを生成するだけです。

---

## 対応AI（仕様は都度ネット調査）

### 最前線（2026年）
- Nano Banana / Nano Banana Pro（Gemini 2.5/3 Flash Image）— 画像編集・キャラ一貫性が圧倒的
- GPT Image（OpenAI）— テキストレンダリング強
- Midjourney V7 / V6.1（Niji モード含む）— 芸術性最高峰
- FLUX.1 pro / 1.1 pro / dev（Black Forest Labs）

### 定番・特化
- Stable Diffusion 3.5 / SDXL（LoRA / ControlNet 対応）
- Adobe Firefly 3（商用利用が明確にクリア）
- Ideogram 2.0 / 3.0（テキストレンダリング最強）
- Imagen 3 / 4（Google Cloud）
- Recraft V3（デザイナー向け）
- Leonardo.ai（ゲーム・コンセプト）
- Krea.ai（リアルタイム）
- DALL-E 3（レガシー・非推奨）— OpenAI は GPT Image に移行済み、昔の環境で触っていた人向け

その他、新しい AI も都度ネット調査で対応。

仕様変更が頻繁なので、セットアップ後も定期的に最新情報を調査します。

---

## セットアップ

```
画像生成プロンプトサポーターセットアップして
```

### 最初に「タイプ」を聞かれます

- A) お試し — サンプルデモ、ファイル作らない
- B) 最低限 — よく使うAI・用途・テイストの3問
- C) しっかり — 細かい好みや制限事項まで

---

## 使い方

### プロンプト生成
```
秋の公園でくつろぐゴールデンレトリバーのプロンプト作って
```

複数のAI向けにまとめて:
```
Midjourney と DALL-E 用に、〇〇のプロンプト作って
```

### プロンプト最適化
```
このプロンプト改善して

{既存プロンプト}
```

他AI用に翻訳:
```
このMidjourneyのプロンプトを Stable Diffusion 用に翻訳して

{Midjourney プロンプト}
```

### リファレンス分析
```
この画像みたいな雰囲気のプロンプト作って

{画像を貼り付け}
```

---

## ファイル構成

```
image-prompt-generator/
├── SKILL.md
├── README.md
├── references/
│   ├── wizard-setup.md
│   ├── function-generate.md
│   ├── function-optimize.md
│   ├── function-analyze.md
│   └── ai-specific-tips.md
└── templates/
    ├── config.template.yaml
    └── style-profile.template.md
```

---

## よくある質問

### Q. 参考画像を渡すのは大丈夫？
権利的に問題ない画像（自作、ストック画像、許可を得たもの）に限ります。他者の著作物を無断模倣する目的では使えません。

### Q. 商用利用できる？
プロンプト生成は問題ありませんが、実際に画像を生成して商用利用する際は、使用する画像生成AIの利用規約 を必ず確認してください。

### Q. 実在人物の写真風プロンプトは作れる？
作りません（肖像権・プライバシー問題）。「架空の人物の〇〇風ポートレート」など、実在しない対象で代替します。

### Q. キャラクターIP の再現は？
特定著作権キャラクターの完全再現プロンプトは作りません。「90年代アニメ風の少女キャラクター」など、汎用的な表現で代替します。

### Q. やめたくなったら、どう消せますか？
`rm -rf ./.image-prompt-generator/`（Windowsは `Remove-Item -Recurse -Force ./.image-prompt-generator/`） で完全に消えます。
