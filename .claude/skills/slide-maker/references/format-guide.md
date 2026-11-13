# 出力形式別ガイド

各スライド出力形式の特徴・セットアップ・ビルド手順。

【最重要】このドキュメントは静的な知識で、セットアップ時や実行時には必ず最新情報を WebSearch で調査する。スライド生成ツール・MCP・ライブラリは変化が早く、このファイルに書かれた手順が古くなっている可能性がある。以下は "その時点の代表例" として参考にし、最新版は都度確認する。

## 調査プロセス（最優先）

### setup モード Q4 での調査

ユーザーが出力形式を選んだら、その場で 以下を実行:

1. WebSearch で最新情報を収集:
   ```
   {選んだ形式} Claude MCP {今年}
   {選んだ形式} Anthropic skills {今年}
   {選んだ形式} latest version
   {選んだ形式} API changes
   ```
2. 公式・準公式ソースを WebFetch:
   - Anthropic 公式: `github.com/anthropics/skills`, `platform.claude.com`, `code.claude.com`
   - 各ツール公式: Google Slides API、Marp、python-pptx、reveal.js
   - MCP エコシステム: `modelcontextprotocol.io`
3. リスク評価（認証情報、データ経路、公式性、メンテナンス状況）
4. ユーザーに AIおすすめ度付きで提示
5. 調査日時を `config.integration_research.{形式}` に記録

### run モード・実ビルド直前の確認

直近30日で調査済みなら再利用。30日超なら再調査:

> 前回調査から30日以上経っています。最新の {形式} 連携方法を調べ直しますか？

破壊的変更や新MCPの登場があれば、ユーザーに通知してから続行。

### 提案テンプレート

```markdown
## {形式} 連携の選択肢（YYYY-MM-DD 調査時点）

### 選択肢A: {方式名}
- 公式性: {Anthropic公式 / サービス公式 / 非公式}
- できること: ...
- リスク:
  - 認証情報: {保管場所}
  - データ経路: {どこに何が送られるか}
  - 破壊的操作の有無
- セットアップ難易度: {初心者可 / 中級 / 上級}
- AIおすすめ度: ★★★★☆

### 選択肢B: 手動モード（ツールなし）
- AIおすすめ度: ★★★★★（安心重視）
- セットアップ: 不要
- リスク: 最小

迷ったら手動モードを強くおすすめします。
```

---

## 【参考】形式別の代表的セットアップ

以下は 2026年前半時点での一般的な選択肢。実際の選定時は 上記の調査プロセスで最新情報を確認 すること。

## 1. Google Slides

### 特徴
- 共有・共同編集が容易
- ブラウザだけで閲覧可能
- プレゼンモードが充実
- 多くの企業で標準

### セットアップ: GAS Web App 方式（推奨）

メリット: 認証情報が自分のアカウント内で完結、第三者にトークンを渡さない

手順:
1. Google アカウントでログイン
2. [Google Apps Script](https://script.google.com) で新規プロジェクト作成
3. `scripts/google-slides-gas.js` の内容をコピー
4. プロパティ設定:
   - `ACCESS_TOKEN`: 任意のシークレット
   - `ALLOWED_PRESENTATION_IDS`: 操作許可するプレゼンID（新規作成の場合は空でOK）
5. 初回実行で権限承認
6. Web App としてデプロイ:
   - 種類: ウェブアプリ
   - 実行: 自分
   - アクセス: 自分のみ
7. Web App URL を `config.yaml` の `google_slides.web_app_url` に保存

### ビルド手順

```
POST {WEB_APP_URL}?token={TOKEN}
Content-Type: application/json

{
  "action": "create_presentation",
  "title": "{案件タイトル}",
  "theme": {
    "primary": "#1F2937",
    "background": "#FFFFFF",
    "font_heading": "Noto Sans JP Bold",
    "font_body": "Noto Sans JP"
  },
  "slides": [
    {
      "type": "title",
      "title": "...",
      "subtitle": "..."
    },
    {
      "type": "2column",
      "title": "...",
      "left": { "type": "text", "content": ["要点1", "要点2"] },
      "right": { "type": "image", "url": "..." }
    },
    ...
  ]
}
```

応答でプレゼンテーション URL が返される。

### トラブルシュート
- 認証エラー → プロパティの `ACCESS_TOKEN` を確認
- 権限エラー → `clasp login --use-project-scopes` で再認証（clasp 使用時）
- URL 無効 → デプロイを再実行

## 2. Marp（Markdown）

### 特徴
- Markdown で記述
- バージョン管理しやすい
- HTML / PDF / PPTX に変換可能
- エンジニア・技術者向き

### セットアップ

```bash
# Node.js が必要
npm install -g @marp-team/marp-cli
```

### ビルド手順

Markdown ファイルを作成:

```markdown
---
marp: true
theme: custom
paginate: true
backgroundColor: "#FFFFFF"
color: "#1F2937"
---

# タイトルスライド

---

## 次のスライド

- 要点1
- 要点2

---
```

変換:

```bash
marp slide.md -o slide.pptx   # PowerPoint
marp slide.md -o slide.pdf    # PDF
marp slide.md -o slide.html   # HTML
marp slide.md --pdf-notes     # ノート付きPDF
```

### カスタムテーマ

CSS で独自テーマを作成:

```css
/* custom.css */
section {
  background: #FFFFFF;
  color: #1F2937;
  font-family: 'Noto Sans JP', sans-serif;
}
h1 {
  color: #3B82F6;
  border-bottom: 3px solid #3B82F6;
}
```

Markdown の front-matter で指定:

```yaml
theme: custom
```

### トラブルシュート
- `marp` コマンドが見つからない → Node.js パスの確認、再インストール
- 日本語フォントが表示されない → `@import url('https://fonts.googleapis.com/...')`
- PDF 変換失敗 → Chromium 依存、`--allow-local-files` オプション

## 3. reveal.js

### 特徴
- Web ベース、HTML/CSS/JS で自由にカスタマイズ
- インタラクティブ要素が豊富
- プレゼン時の機能充実

### セットアップ

1. [reveal.js](https://revealjs.com/) からテンプレート取得
2. `index.html` を編集

### ビルド手順

```html
<section>
  <h1>タイトル</h1>
</section>
<section>
  <h2>次のスライド</h2>
  <ul>
    <li>要点1</li>
    <li>要点2</li>
  </ul>
</section>
```

各 `<section>` が1スライド。ネストで縦スクロールスライドも可能。

### トラブルシュート
- ブラウザで開けない → ローカルサーバー必要（`python -m http.server 8000`）
- カスタムテーマ → CSS ファイルを別途

## 4. PowerPoint (.pptx)

### 特徴
- 会社で一番使われている
- Microsoft 365 と互換
- オフラインで開ける

### セットアップ

```bash
pip install python-pptx
```

### ビルド手順

Python スクリプトを生成:

```python
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

prs = Presentation()

# タイトルスライド
slide_layout = prs.slide_layouts[0]
slide = prs.slides.add_slide(slide_layout)
title = slide.shapes.title
title.text = "タイトル"
subtitle = slide.placeholders[1]
subtitle.text = "サブタイトル"

# コンテンツスライド
slide_layout = prs.slide_layouts[1]
slide = prs.slides.add_slide(slide_layout)
title = slide.shapes.title
title.text = "章タイトル"
body = slide.placeholders[1]
body.text = "要点1\n要点2\n要点3"

prs.save("final.pptx")
```

テンプレートを使う場合:
```python
prs = Presentation("template.pptx")
```

### トラブルシュート
- フォントが崩れる → テンプレート側でフォント指定
- 画像が埋め込めない → パス確認、画像形式確認（PNG/JPG）

## 5. HTML（カスタム）

### 特徴
- 完全にデザイン自由
- Web 配信可能
- アニメーション・動画埋め込み自由

### ビルド手順

基本テンプレート:

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>プレゼン</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="slide">
    <h1>タイトル</h1>
  </div>
  <div class="slide">
    <h2>次のスライド</h2>
    <ul>
      <li>要点1</li>
    </ul>
  </div>
  <script src="navigation.js"></script>
</body>
</html>
```

CSS で各 `.slide` を全画面表示、JS でキー操作ナビゲーション。

## 6. 手動モード

自動連携なし。composer + designer の成果物を、ユーザーが自分でスライドツールに転記する。

### 受け取る納品物

```markdown
# 手動構築用アウトライン

## プレゼン情報
- タイトル: ...
- 総スライド数: 15
- 発表時間目安: 30分

## デザインテーマ
- 配色: {色コード}
- フォント: {指定}
- レイアウト方針: {方針}

## 各スライド

### スライド1 [タイトル]
- テキスト:
  - メイン: "..."
  - サブ: "..."
- 画像: なし
- レイアウト: 中央寄せタイトル

### スライド2 [2カラム]
- 左:
  - 画像: {パス}
- 右:
  - 箇条書き:
    - 要点1
    - 要点2

（以下、全スライド）

## 転記手順
1. お好みのツール（PowerPoint / Keynote / Google Slides）を開く
2. 新規プレゼンを作成
3. デザインテーマを設定
4. 各スライドを上記アウトラインに従って作成
```

## 形式選択のガイド

| 条件 | 推奨 |
|------|------|
| 共有・共同編集したい | Google Slides |
| バージョン管理したい | Marp |
| Web 配信したい | reveal.js / HTML |
| 会社標準に合わせる | PowerPoint |
| 完全カスタムしたい | HTML |
| 自動化に不安 | 手動モード |

## 調査情報の鮮度

各形式の仕様・ツールは変化する。以下のタイミングで最新情報を WebSearch:

- 新バージョンリリース時
- ユーザーから「前と違う」と報告されたとき
- 3ヶ月ごとの定期レビュー
