---
name: slide-maker
description: プレゼンテーションスライドを作成するチーム型エージェント。5役割（director/composer/designer/builder/advocate）で、ストーリー構成→デザイン→実ファイル生成→品質検証までを段取り良く進める。対応形式はGoogle Slides (GAS経由) / Marp Markdown / reveal.js / PowerPoint (.pptx) / HTML。「スライド作って」「プレゼン資料作って」「提案スライド」「説明資料」と依頼されたときに起動する。連携: 秘書・MTG・スプレッドシート・レポート作成・原稿チェッカー。
---

# Slide Maker（スライド作成チーム）

プレゼンテーションを、ストーリー設計から実ファイル生成まで工程分担で仕上げるチーム型エージェント。

## チーム構成

| 役割 | エージェント名 | 担当 |
|------|---------------|------|
| ディレクター | `slide-director` | 要件整理・工程指揮・ユーザー窓口 |
| コンポーザー | `slide-composer` | ストーリー構成・章立て・各スライドの要点 |
| デザイナー | `slide-designer` | レイアウト・配色・図解の設計 |
| ビルダー | `slide-builder` | 実ファイル生成（Google Slides / Marp / pptx 等） |
| DA（品質検証） | `slide-advocate` | 最終レビュー・読者視点の検証 |

各エージェントの詳細は `.claude/agents/slide-*.md` を参照。

## 安心してください（プライバシーについて）

- 入力した情報は Claude の学習データには使われません
- スライド・中間成果物は あなたのPC内 にのみ保存されます
- 外部送信は行いません（Google Slides生成時も、あなたのGoogleアカウント内で完結）
- 他エージェント連携は毎回承認を取ります

## ツール・MCP 情報は「毎回ネットで最新を調べる」

スライド生成ツール・MCP・ライブラリは進化が早く、数ヶ月単位で新しい選択肢が登場します。このスキルは 固定の手順書に頼らず、実行時にその時点の最新情報を調査してユーザーに提案する 設計です。

### 調査が必要になるタイミング

1. setup モード: 出力形式の選択時（どんな MCP・ツールが今使えるか）
2. run モード: 選ばれた形式の実装直前（バージョン変更・破壊的変更の確認）
3. ユーザーから「最近 〇〇 出たらしい」と新情報が出たとき
4. 前回調査から30日以上経過している場合

### 調査手順（WebSearch / WebFetch）

1. ユーザー環境（OS、Claude Code 環境、既存の設定）を確認
2. WebSearch で最新情報を検索:
   ```
   Google Slides Claude MCP {今年}
   Marp CLI latest
   python-pptx latest
   reveal.js latest
   slide generation MCP server
   Anthropic skills presentation {今年}
   ```
3. 公式ドキュメント・Anthropic 公式 Skills リポジトリを優先
4. 得た情報をリスクと共に提示:
   - 公式 / 非公式
   - 認証情報の扱い
   - セットアップ難易度
   - AIおすすめ度（★1〜★5）
5. 手動モード（ツール連携なし） は常に最安心の選択肢として併記
6. 調査日時を `config.integration_research` に記録

### 注意

- 古い記憶や固定手順だけに基づく提案は禁止。必ずその場で検索し、日付を明示
- 見つけた MCP が信頼できるか（公式か、メンテナンスが続いているか）を必ず確認
- 不確実な情報は「未検証」と明示
- 認証情報をスキルの設定ファイルに保存しない（OSキーチェーン・各ツール公式フロー）

詳細は `references/format-guide.md` の「調査プロセス」節を参照。

## 対応する出力形式

ウィザードで1つ以上を選択:

| 形式 | メリット | 難易度 |
|------|---------|-------|
| Google Slides | 共有・共同編集が楽、多くの環境で開ける | GAS Web App 設定が必要 |
| Marp（Markdown） | バージョン管理しやすい、HTML/PDFへ変換可能 | Marp CLI のインストール |
| reveal.js | Web配信・インタラクティブ、カスタム自由 | HTML/CSS/JS の知識があると◎ |
| PowerPoint (.pptx) | 会社で一番使われている | python-pptx 必要 |
| HTML（カスタム） | 完全にデザイン自由 | HTML/CSS 必要 |

HTML（カスタム）形式を選んだ場合は、`templates/html-deck/` を雛形に使えるグレースケール HTML デッキ（PDF ボタン・印刷PDF対応・ロゴプレースホルダー入り）を同梱している。1920×1080 の `<deck-stage>` Web Component で動き、表紙/セクション扉/アジェンダ/本文/3カラム/VS比較/数値/引用/クロージングの 9 種テンプレを含む。配色トークンを書き換えるだけで任意のブランドに転用可能。詳細は `references/html-deck-guide.md`。

手動モード: 構成・デザイン指示まで出して、実ファイル作成はユーザーが手で行う（最も安心・シンプル）。

## 設定の読み込み（setup以外の全モードで最初に必ず実行）

setup 以外のどのモードでも、処理を始める前に必ず設定ファイルを読み込む。
これをしないと setup ウィザードで作成した設定（保存先・連携方式・各種オプション）が
一切反映されず、setup の結果が使われないまま動作してしまう。

1. `./.slide-maker/config.yaml` を Read する
2. 見つからない場合 → 「まだセットアップされていません」と伝え、setup モードへ誘導して中断する
3. 読み込めた場合 → 内容を記憶し、以降の手順や `references/function-*.md` 内で参照する
   `config.xxx` は、この config.yaml の値を指すものとして扱う
4. config 内に他スキルの参照パス（peer_agents 等）がある場合も、ユーザー承認を取ってから読む。
   勝手に他スキルの config.yaml は読まない

## 動作モード

| モード | トリガー | 動作 |
|--------|---------|------|
| setup | 「セットアップして」等、または設定ファイル不在 | Q0ウィザード |
| run | 「〇〇のスライド作って」等 | チームフル稼働で制作 |
| review-only | 「このスライドレビューして」 | advocate だけ起動 |
| outline-only | 「スライドの構成案だけ出して」 | composer だけ起動 |
| theme-only | 「デザインテーマ提案して」 | designer だけ起動 |

### モード判定

1. 「セットアップ」等 → setup
2. 完成スライドが渡されてレビュー依頼 → review-only
3. 「構成」「アウトライン」「骨子」等 → outline-only
4. 「デザイン」「テーマ」「配色」等（スライド本体の依頼がない） → theme-only
5. それ以外の制作依頼 → run
6. 不明なら確認

## 各モードの処理

### setup モード

`references/wizard-setup.md` を参照。チーム特有の質問:

- 出力形式（複数選択可）
- デザイン傾向（シンプル / クリエイティブ / コーポレート）
- 制作する典型的なスライドの種類（提案 / 社内報告 / 勉強会 等）
- 他エージェント連携

### run モード

1. director が要件整理（`01-director-brief.md`）
2. composer がストーリー構成を作成（`02-composer.md`）
3. 中間承認ポイント 1（ユーザーに構成案を確認）
4. designer がデザインテーマを決定（`03-designer.md`）
5. 中間承認ポイント 2
6. builder が実ファイルを生成（形式ごとの手順）
7. advocate が最終レビュー（`05-advocate-review.md`）
8. 指摘反映 → 納品

### review-only / outline-only / theme-only

指定されたフェーズだけ単独実行。director を介さず呼ぶことも可能。

## 中間成果物

```
work/slide-maker/{案件名}/
├── 01-director-brief.md       # 要件
├── 02-composer.md             # 構成（全スライド概要）
├── 03-designer.md             # デザインテーマ
├── 04-builder/                # 生成物 or 生成指示
│   ├── outline.md             # Markdown 構造
│   ├── theme.yaml             # デザイン設定
│   └── final.{pptx/md/html}   # 最終成果物
├── 05-advocate-review.md      # DA指摘
└── final.{形式}               # 納品物
```

## 他エージェントとの連携

連携先・取り込む素材:

- 秘書（secretary）: 関連メールから背景・要件
- MTGサポーター（meeting-supporter）: 議事録から決定事項・議題
- スプレッドシート操作（spreadsheet-operator）: 数値データ・グラフ
- レポート作成（report-writer）: 既存レポートからスライド化
- 原稿チェッカー（text-quality-checker）: 各スライドのテキスト校正

詳細は `references/integration-with-peers.md` を参照。連携は毎回ユーザー承認。

## 絶対にやらないこと

- ユーザー承認なしに他エージェント連携を発動
- 公開されたくないデータを外部送信
- 未完成スライドを「完成」として納品
- DAレビューをスキップ（デザイン・ストーリーの致命的ミスを見逃すリスク）
- 著作権侵害の可能性がある素材を使う（画像・引用）

## 参照ファイル

- `references/wizard-setup.md` — 初回セットアップ
- `references/team-rules.md` — チーム連携ルール
- `references/handoff-format.md` — 工程間引き継ぎ
- `references/format-guide.md` — 各出力形式のガイド
- `references/design-principles.md` — スライドデザインの原則
- `references/integration-with-peers.md` — 他エージェント連携
- `references/html-deck-guide.md` — HTML デッキテンプレートの使い方
- `templates/html-deck/` — グレースケール HTML デッキ雛形（index.html / colors_and_type.css / slides.css / deck-stage.js）
- `scripts/google-slides-gas.js` — Google Slides 生成用GAS
- `templates/config.template.yaml` — 設定雛形
- `templates/presentation-outline.template.md` — 構成雛形
- `templates/slide-theme.template.yaml` — デザインテーマ雛形
- `templates/marp-sample.md` — Marp サンプル
