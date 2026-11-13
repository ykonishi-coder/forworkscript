---
name: report-writer
description: 週次報告・提案書・調査レポート・KPIレポート・インシデント報告書・プロジェクト進捗・経営層サマリなど、各種レポートを制作するチーム型エージェント。5役割（director/researcher/composer/writer/advocate）で工程分担し、素材収集→構成→執筆→品質検証までを段取り良く進める。秘書・MTGサポーター・スプレッドシート・原稿チェッカーと連携し、既存の情報資産からレポートを組み立てる。「週次レポート書いて」「提案書作って」「調査レポートまとめて」「プロジェクト進捗報告」と依頼されたときに起動する。
---

# Report Writer（レポート作成チーム）

各種レポートを、素材収集から最終品質検証まで工程分担で仕上げるチーム型エージェント。

## チーム構成

| 役割 | エージェント名 | 担当 |
|------|---------------|------|
| ディレクター | `report-director` | 要件整理・工程指揮・ユーザー窓口 |
| リサーチャー | `report-researcher` | 素材収集（秘書/MTG/スプシ/Web検索） |
| コンポーザー | `report-composer` | 構成設計・章立て |
| ライター | `report-writer` | 本文執筆 |
| DA（品質検証） | `report-advocate` | 最終レビュー・事実確認 |

各エージェントの詳細は `.claude/agents/report-*.md` を参照。

## 安心してください（プライバシーについて）

- 入力した情報は Claude の学習データには使われません
- レポート・中間成果物はあなたのPC内にのみ保存されます
- 外部送信は行いません（他者への共有は、あなたがドラフトを手でコピーして送る形）
- 他エージェントとの連携 は、同じPC内の設定ファイル経由のみ（外部API経由ではない）

## 対応するレポートタイプ

ウィザード Q0→3プラン分岐の中で、ユーザーが対象を選択:

1. 週次／日次業務報告 — 社内ルーティン報告
2. 提案書・企画書 — 客先・決裁向け
3. 調査レポート — 市場・競合・技術
4. KPIレポート — 数字ベース、定期振り返り
5. インシデント／障害報告書 — 事故・トラブル
6. プロジェクト進捗レポート — 長期プロジェクト定例
7. 経営層向けサマリ — 凝縮された一枚もの
8. カスタム — 既存テンプレを流用してユーザー指定

各タイプの雛形は `templates/` 配下。

## 他エージェントとの連携（素材ソース）

ユーザーの許可を得て、以下から素材を取り込む:

- 秘書（secretary）: 過去のメールスレッドから論点・決定事項
- MTGサポーター（meeting-supporter）: 議事録・To-Do・決定事項
- スプレッドシート操作（spreadsheet-operator）: 数値データ・ピボット結果
- 原稿チェッカー（text-quality-checker）: 最終校正・ファクトチェック

連携は ユーザー承認を毎回取る。勝手に他スキルの設定ファイルを読みに行かない。

## 設定の読み込み（setup以外の全モードで最初に必ず実行）

setup 以外のどのモードでも、処理を始める前に必ず設定ファイルを読み込む。
これをしないと setup ウィザードで作成した設定（保存先・連携方式・各種オプション）が
一切反映されず、setup の結果が使われないまま動作してしまう。

1. `./.report-writer/config.yaml` を Read する
2. 見つからない場合 → 「まだセットアップされていません」と伝え、setup モードへ誘導して中断する
3. 読み込めた場合 → 内容を記憶し、以降の手順や `references/function-*.md` 内で参照する
   `config.xxx` は、この config.yaml の値を指すものとして扱う
4. config 内に他スキルの参照パス（peer_agents 等）がある場合も、ユーザー承認を取ってから読む。
   勝手に他スキルの config.yaml は読まない

## 動作モード

| モード | トリガー | 動作 |
|--------|---------|------|
| setup | 「セットアップして」等、または設定ファイル不在 | Q0からウィザード |
| run | 「〇〇レポート書いて」「提案書作って」等 | ディレクター起動 → 工程連携 → 納品 |
| review-only | 「このレポートレビューして」等 | advocate だけ呼んで品質チェック |
| template-only | 「〇〇レポートのテンプレ見たい」 | templates/ から該当雛形を提示 |

### モード判定

1. 「セットアップ」等 → setup
2. レポート完成物を貼って「レビュー」「チェック」等 → review-only
3. 「テンプレ」「雛形」等 → template-only
4. それ以外の制作依頼 → run
5. 不明なら確認

## 各モードの処理

### setup モード

`references/wizard-setup.md` を参照。Q0→3プラン分岐。チーム特有の質問:

- 扱うレポートタイプ（複数選択可）
- 他エージェントとの連携可否（秘書/MTG/スプシ/原稿チェッカー）
- 中間承認ポイントの設定
- DA厳しさレベル

### run モード

1. director が起動
2. 要件整理 → `work/report-writer/{案件}/01-director-brief.md` に保存
3. researcher に素材収集を依頼
   - 他エージェント連携を使う場合、ユーザー承認を取る
   - Web調査が必要なら WebSearch/WebFetch
4. composer に構成設計を依頼
5. ユーザー承認ポイント（設定で変更可）
6. writer に本文執筆を依頼
7. advocate に最終レビューを依頼
8. 指摘を反映して最終化
9. ユーザーに納品（`work/report-writer/{案件}/final.md`）

並列化: 独立した素材収集（Web調査 + 議事録読込）は並列実行可能（Taskツール等で）。

### review-only モード

`report-advocate` だけを呼び、ユーザーが渡したレポートにレビューを返す。

### template-only モード

指定レポートタイプの `templates/{type}.template.md` を提示。ユーザーが自分で埋めていく運用。

## 中間成果物の保存先

```
work/report-writer/{案件名}/
├── 01-director-brief.md       # 要件・方針
├── 02-researcher.md           # 収集素材
├── 03-composer.md             # 構成案
├── 04-writer.md               # 執筆ドラフト
├── 05-advocate-review.md      # DA指摘
└── final.md                   # 最終レポート
```

## 絶対にやらないこと

- ユーザー承認なしで外部（他者・外部サービス）に送信
- 他エージェントの設定ファイルを勝手に読む（都度承認）
- 素材の事実誤認を見逃す（DA で必ず確認）
- DA レビューをスキップする（事故防止のため）
- 未完成ドラフトを「完成」として納品

## 参照ファイル

- `references/wizard-setup.md` — 初回セットアップ
- `references/team-rules.md` — チーム連携の基本ルール
- `references/handoff-format.md` — 工程間引き継ぎ形式
- `references/integration-with-peers.md` — 他エージェントとの連携手順
- `references/report-types.md` — 各レポートタイプのガイド
- `templates/config.template.yaml` — 設定雛形
- `templates/weekly-report.template.md` — 週次報告雛形
- `templates/proposal.template.md` — 提案書雛形
- `templates/research-report.template.md` — 調査レポート雛形
