# BizDev Strategist（新規事業開発）

新規事業開発を5役割チームで支援するエージェント。アイデア発想 → 市場・競合ディープリサーチ → TAM/SAM/SOM → フレームワーク分析 → 事業計画書 → ピッチ資料まで。

---

## プライバシー配慮

- 入力した情報は Claude の学習データには使われません
- 新規事業アイデア・戦略は あなたのPC内 にのみ保存
- マスキング機能で機密情報を最小化
- .gitignore 必須

---

## チーム構成

| 役割 | 担当 |
|------|------|
| 🎯 director | 全体統括・ユーザー窓口 |
| 🔍 researcher | 市場・競合のディープリサーチ（WebSearch） |
| 📊 analyst | TAM/SAM/SOM・フレームワーク分析 |
| 📝 strategist | 戦略立案・事業計画書作成 |
| 🛡️ advocate | 批判的検証（投資家視点） |

---

## できること

### アイデア発想
SCAMPER・4象限・デザイン思考等、様々な発想法を支援。

### 市場調査（ディープリサーチ）
- TAM / SAM / SOM をトップダウン + ボトムアップで算出
- 業界成長率・トレンド
- 公的統計（経産省・総務省・業界団体）
- 調査会社レポート（矢野経済・富士キメラ・IDC 等）
- 複数ソースでクロスチェック

### 競合分析
- 主要プレイヤーの把握
- ポジショニング・差別化
- 最近の動向（プレスリリース等）

### フレームワーク分析
- SWOT / 3C / 4P / BMC / PESTLE / ファイブフォース / STP / バリューチェーン
- ユニットエコノミクス（LTV/CAC）

### 事業計画書作成
- エグゼクティブサマリ
- 市場分析
- 事業戦略
- 競合分析
- マーケティング・販売計画
- オペレーション計画
- 財務計画（3シナリオ）
- リスク分析
- タイムライン

### ピッチ資料
- slide-maker と連携して可視化

---

## セットアップ

```
BizDev セットアップして
```

### 最初に「タイプ」を聞かれます

- A) お試し — 架空事業テーマでデモ
- B) 最低限（3問）— フェーズ・業種・読者
- C) しっかり — 自社プロファイル・制約・フレームワーク設定まで

---

## 使い方

### アイデア発想
```
新規事業案考えたい、業界は{業界}で
```

### 市場調査
```
{業界} の TAM SAM SOM 出して
```

### 競合分析
```
{業界} の主要競合、徹底的に調べて
```

### フレームワーク分析
```
この事業で SWOT 分析して
```

```
BMC 作って
```

### 事業計画書作成
```
{事業名} の事業計画書作成

- 目的: {投資判断 / 社内稟議}
- 読者: {経営層 / 投資家}
- 期限: {日付}
```

→ 5役割フル稼働で作成

### ピッチ資料
```
この事業計画書から投資家向けピッチ資料作って
```

→ slide-maker 連携

### 既存計画のレビュー
```
この事業計画書、批判的にレビューして

{計画書本文}
```

→ advocate が投資家視点で指摘

---

## ディープリサーチの仕組み

### 信頼できる情報源を優先

1. 公的統計（★★★★★）: 経産省・総務省・業界団体
2. 調査会社（★★★★☆）: 矢野経済・富士キメラ・IDC
3. 上場企業 IR（★★★★★）: EDINET・決算短信
4. メディア（★★★★☆）: 日経・業界専門誌
5. スタートアップ情報: STARTUP DB・Crunchbase

### クロスチェック
重要な数字は複数ソースで確認。1ソースで断定しない。

### 鮮度管理
取得日を必ず記録。古いデータは「YYYY年時点」と明示。

詳細は `references/research-sources.md`。

---

## 連携

- slide-maker: ピッチ資料作成
- report-writer: 事業計画書のレポート化
- spreadsheet-operator: 財務モデル
- text-quality-checker: 計画書の校正
- legal-advisor: 規制・法務観点

---

## ファイル構成

```
.claude/
├── skills/bizdev-strategist/
│   ├── SKILL.md
│   ├── README.md
│   ├── references/
│   │   ├── wizard-setup.md
│   │   ├── team-rules.md
│   │   ├── handoff-format.md
│   │   ├── frameworks.md          ⭐ フレームワーク集
│   │   └── research-sources.md    ⭐ 情報源ガイド
│   └── templates/
│       ├── config.template.yaml
│       ├── business-plan.template.md  ⭐ 事業計画書雛形
│       ├── tam-sam-som.template.md
│       ├── swot.template.md
│       └── bmc.template.md
└── agents/
    ├── bizdev-director.md
    ├── bizdev-researcher.md
    ├── bizdev-analyst.md
    ├── bizdev-strategist.md
    └── bizdev-advocate.md
```

中間成果物:
```
work/bizdev-strategist/{案件}/
├── 01-director-brief.md
├── 02-researcher.md
├── 03-analyst.md
├── 04-strategist.md
├── 05-advocate-review.md
└── final.md
```

---

## よくある質問

### Q. 業界知識がなくても使える？
使えます。researcher がネットから情報収集します。ただし、業界特有の深いインサイトは専門家に確認を。

### Q. 投資判断に使える？
投資判断の材料提供まで。最終的な投資判断は、会計士・経営コンサル・業界専門家等の意見も踏まえてください。

### Q. 事業計画書の質は？
初期検証・社内稟議レベルまでは十分。本格的な投資家向けドキュメントは、専門家（コンサル・CFO 等）のレビューを推奨。

### Q. 競合情報は正確？
ネット上の公開情報に基づきます。非公開情報や専門家しか知らない情報は反映されません。

### Q. やめたくなったら？
`rm -rf ./.bizdev-strategist/`（Windowsは `Remove-Item -Recurse -Force ./.bizdev-strategist/`） で完全削除。
