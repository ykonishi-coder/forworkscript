# 機能: ムードボード作成

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.design-consultant/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


デザインの 雰囲気・方向性 を視覚的に整理する準備。

## ムードボードとは

- 色・質感・スタイル・雰囲気を集めたコラージュ的な資料
- デザインに着手する前の「方向性すり合わせ」に使う
- 画像・テキスト・色パレットを組み合わせる

## このスキルのアプローチ

画像収集は ユーザーが実施。このスキルは以下を提供:

1. ムードを言語化: 3〜5 の形容詞で雰囲気を定義
2. 参考キーワード: 画像検索用のキーワード提案
3. 色パレット: 雰囲気に合う配色
4. 質感・スタイル: テクスチャ・素材感の方向性
5. 参考事例: 類似のデザインスタイル

## 手順

### 1. コンセプト確認

ブリーフ・コンセプトから方向性を確認。

### 2. 雰囲気の言語化

```markdown
### ムード: {名称}

キーワード:
- 形容詞1（例: 洗練）
- 形容詞2（例: モダン）
- 形容詞3（例: プロフェッショナル）
- 形容詞4（例: 信頼感）
- 形容詞5（例: 先進的）

一言で:
{一行でこの雰囲気を表現}
```

### 3. 画像検索用キーワード

ユーザーが Unsplash / Pexels / Pinterest で画像を探す用:

```markdown
### 画像検索キーワード（英語推奨）

#### 全体的な雰囲気
- "modern corporate design"
- "minimalist business"
- "clean technology"

#### 具体的な要素
- "abstract geometric"
- "gradient background"
- "professional workspace"

#### 特定の色調
- "navy blue design"
- "monochrome photography"

#### 日本語でも
- 「コーポレート デザイン」
- 「モダン 建築」
- 「ミニマル インテリア」
```

### 4. 参考デザイン事例

類似のデザインスタイルを参考に提案:

```markdown
### 参考デザインの方向性

似たスタイルのデザイン:
- {事例ジャンル1}: 特徴
- {事例ジャンル2}: 特徴

避けたい方向性:
- {避けるべきスタイル}: 理由

### 参考サイトの例（検索用）
- Behance: https://www.behance.net/ で「{キーワード}」検索
- Dribbble: https://dribbble.com/ で「{キーワード}」検索
- Awwwards: https://www.awwwards.com/
- Pinterest: https://www.pinterest.com/ で「{キーワード}」検索

※ 参考画像は著作権に配慮。無断転載・模倣はしない
```

### 5. 色・質感の方向性

```markdown
### 色調
- メインカラー: {色系統}
- アクセント: {色系統}
- 明度: {明るい / 暗い / ミディアム}
- 彩度: {鮮やか / 落ち着いた}

### 質感
- マットか光沢か
- テクスチャの有無
- グラデーションの使用
- シャドウの強さ

### スタイル
- フラット / スキューモーフィック / リアリズム / イラスト
```

### 6. 画像生成プロンプト（レベル2）

レベル2 以上なら、image-prompt-generator 連携でイメージ画像生成用プロンプト作成:

```markdown
### ムード画像生成プロンプト（Midjourney 向け）

```
modern corporate office space, clean minimal aesthetic, navy blue and white color scheme, professional lighting, geometric shapes, sophisticated atmosphere, high-end business interior --ar 16:9 --s 250
```

このプロンプトを Midjourney に入れると、ムードに合う画像が生成される。
```

### 7. ムードボード構成提案

ユーザーが Figma / Miro / Pinterest で実際に作る際の構成:

```markdown
### ムードボードの構成（ユーザーが作る場合）

#### 3x3 or 4x4 グリッドで:
1. 全体の雰囲気を伝える画像（1-2 枚）
2. カラーパレット
3. テクスチャ・質感（2-3 枚）
4. タイポグラフィサンプル
5. 参考ロゴ・ブランド（2-3 個）
6. 参考レイアウト
7. キーワード（テキスト）

#### ツール
- Figma (Free プラン可)
- Miro (Free プラン可)
- Pinterest
- 手書きでも可
```

## 完成ムードボードの使い方

ユーザーが画像を集めた後:

1. 関係者との 方向性すり合わせ
2. デザイナーへの 制作依頼資料
3. 意思決定の基準 として参照

## 出力フォーマット

```markdown
# ムードボード方向性: {案件名}

## コンセプト
{一言で}

## ムードキーワード
- 洗練
- モダン
- プロフェッショナル

## 推奨色調
- プライマリ: ネイビー系 (#1E40AF)
- アクセント: ブルー系 (#3B82F6)
- 全体印象: クリーン・クール

## 質感・スタイル
- フラット
- 幾何学的
- マット質感

## 画像検索キーワード
- "modern corporate architecture"
- "minimalist business design"
- "navy blue technology"

## 参考デザイン方向
- テック系スタートアップ（Stripe / Linear 等の系統）
- コーポレート感のあるモダン

## ユーザーアクション
1. 上記キーワードで Pinterest / Behance / Unsplash を検索
2. 気に入った画像を 10-20 枚収集
3. Figma / Miro に配置してムードボード完成

## 次のステップ
ムードボードができたら、コンセプト（`function-concept.md`）や配色（`function-palette.md`）を詳細化します。
```

## やってはいけないこと

- 特定ブランドのパクリを推奨
- 著作権侵害になる模倣
- 画像を勝手に生成・保存（ユーザーが管理）
