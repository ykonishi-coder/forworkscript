# スライド作成チーム (Slide Maker)

プレゼンテーションスライドを5役割チームで分担制作するエージェント。Google Slides / Marp / reveal.js / PowerPoint / HTML に対応。

---

## プライバシーについて（最初に）

- 入力した情報は Claude の学習データには使われません
- スライド・中間成果物は あなたのPC内 にのみ保存
- Google Slides 生成時も あなたのGoogleアカウント内で完結
- 他エージェント連携は 毎回承認 を取ります

---

## 構成（5役割チーム）

| 役割 | 担当 |
|------|------|
| 🎯 director | 要件整理・工程指揮 |
| 📐 composer | ストーリー構成・各スライドの要点 |
| 🎨 designer | レイアウト・配色・図解 |
| 🏗️ builder | 実ファイル生成 |
| 🛡️ advocate | 最終レビュー |

---

## 対応形式

| 形式 | 向いているケース |
|------|---------------|
| Google Slides | 共同編集、社内共有、一番開きやすい |
| Marp | バージョン管理、エンジニア向け |
| reveal.js | Web配信、インタラクティブ |
| PowerPoint | 会社標準、提案資料 |
| HTML | デザイン完全自由 |
| 手動モード | 構成・デザイン指示まで、実ファイルはユーザー作成 |

---

## セットアップ

```
スライド作成チームセットアップして
```

### 最初に「タイプ」を聞かれます

- A) お試し — サンプル案件でフロー確認
- B) 最低限（3問）— 使いたい形式 / 典型用途 / 連携の有無
- C) しっかり — デザイン傾向、工程取捨選択、テーマプリセットまで

---

## 使い方

### スライドを丸ごと作る
```
〇〇の提案スライド作って
```

```
社内勉強会の資料、Marpで作って
```

→ 要件ヒアリング → 構成 → デザイン → ビルド → レビュー → 納品

### 構成案だけ欲しい
```
〇〇のスライド構成だけ出して
```

→ composerだけが起動

### デザインテーマだけ欲しい
```
コーポレート系のデザインテーマ提案して
```

→ designerだけが起動

### 既存スライドをレビュー
```
このスライドレビューして

{スライド or リンク}
```

→ advocateが起動

---

## 他エージェント連携

セットアップで許可した場合のみ:

- 秘書: メールから背景取り込み
- MTG: 議事録から素材取り込み
- スプレッドシート: 数値・グラフ取り込み
- レポート作成: 既存レポートをスライド化
- 原稿チェッカー: 各スライドのテキスト校正

---

## ファイル構成

```
.claude/
├── skills/slide-maker/
│   ├── SKILL.md
│   ├── README.md
│   ├── references/
│   │   ├── wizard-setup.md
│   │   ├── team-rules.md
│   │   ├── handoff-format.md
│   │   ├── format-guide.md
│   │   ├── design-principles.md
│   │   └── integration-with-peers.md
│   ├── scripts/
│   │   └── google-slides-gas.js
│   └── templates/
│       ├── config.template.yaml
│       ├── presentation-outline.template.md
│       ├── slide-theme.template.yaml
│       └── marp-sample.md
└── agents/
    ├── slide-director.md
    ├── slide-composer.md
    ├── slide-designer.md
    ├── slide-builder.md
    └── slide-advocate.md
```

---

## よくある質問

### Q. Google Slides の生成は安全？
あなたのGoogleアカウント内でGAS Web Appを動かします。第三者にトークンを渡さない構造です（詳細は `references/format-guide.md`）。

### Q. PowerPoint が作れる？
python-pptx が必要ですが対応しています。Pythonのない環境なら、構成＋デザインテーマを渡してユーザーが手でPowerPointに落とす「手動モード」が使えます。

### Q. Marp ってなに？
Markdown で書いてスライドに変換するツール。`marp-cli` をインストールすれば、`.md` → `.pdf` / `.html` / `.pptx` が自動生成できます。バージョン管理に向いています。

### Q. 画像の著作権は？
ユーザーが用意した画像、または権利処理済みの素材（ストック / 自作）のみ使用する前提です。Web上の画像を無断で埋め込むことはしません。

### Q. やめたくなったら？
`rm -rf ./.slide-maker/`（Windowsは `Remove-Item -Recurse -Force ./.slide-maker/`） + `work/slide-maker/` で完全に消えます。
