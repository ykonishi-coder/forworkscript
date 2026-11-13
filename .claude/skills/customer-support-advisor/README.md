# Customer Support Advisor（CS 改善支援）

カスタマーサポート業務の 現状把握 → すぐできる改善 → 段階的改善 を支援。

---

## 🎯 特徴

### 小さく始める前提
いきなり大規模ツール導入を勧めません。

まず:
1. 現状ヒアリング
2. 今すぐできる改善（FAQ 整備・テンプレート化）
3. 効果測定
4. 必要なら段階的にツール導入

### 現状ヒアリング重視
CS は組織・業種・規模で違うので、丁寧に現状を聞きます。

### ツール導入は慎重に
- リスク・メリット・コスト明示
- 相談の上で導入
- 都度最新調査

---

## 🔒 プライバシー

- 顧客情報・問い合わせ内容は機密
- Claude の学習データに使われません
- ローカル保存のみ、顧客データは保存しない（デフォルト）

---

## ハイブリッド構成

- 本体: CS 改善提案
- `customer-support-advisor-advocate`: 顧客視点・コスト効率・実現可能性の DA

---

## 12 機能

1. 現状ヒアリング — 10項目を丁寧に棚卸し
2. 改善策の提案 — 即効策 Top 10
3. ツール選定 — CS ツール比較（都度最新調査）
4. FAQ 作成 — よくある質問の整備
5. テンプレート — 定型返信作成
6. ナレッジベース — 社内ナレッジ整備
7. チャットボット設計 — 自動応答フロー
8. KPI 設計・分析
9. オンボーディング設計
10. カスタマーサクセス戦略
11. エスカレーション判定 — 問い合わせを読んで、現場で済むか上位に引き継ぐかを判別
12. お客様の声分析（VOC分析） — 問い合わせ履歴から傾向・感情・優先改善課題を抽出してレポート化

---

## すぐできる改善 Top 10（全てコスト 0）

1. FAQ 整備（問い合わせ 30-50% 削減）
2. 返信テンプレート（対応時間半減）
3. 問い合わせ分類
4. 営業時間・レスポンス時間の明示
5. フォーム最適化
6. ナレッジ共有
7. Gmail フィルタ・ラベル
8. エスカレフロー
9. CSAT 計測
10. ヘルプ記事の SEO 最適化

---

## セットアップ

```
CS 改善支援 セットアップして
```

### 5問（B プラン・ヒアリング厚め）
- 事業・顧客タイプ
- 現在のチャネル
- 現在の管理方法
- 問い合わせ規模
- 最大の課題

---

## 対応 CS ツール

都度最新調査 で最適を提案:

### ヘルプデスク
- Zendesk / Freshdesk / HelpScout / Intercom / Zoho Desk

### チャット
- Intercom / Crisp / Tawk.to / ChannelTalk

### AI チャットボット
- Intercom Fin / Zendesk AI / KARAKURI / ChatPlus

### 国内ツール
- ChannelTalk / チャットプラス / Re:lation 等

### 無料ツール
- HubSpot Service Hub Free / Freshdesk Free / Tawk.to

詳細: `references/tool-landscape.md`

---

## 使い方

### 最初の相談
```
CS 改善したい
```
→ 現状ヒアリング開始

### 現状整理
```
CS の現状整理
```

### 改善策の提案
```
すぐできる改善策教えて
```

### ツール選定
```
CS ツール選定したい
```
→ 規模・予算を踏まえて最適ツールを最新調査で提案

### FAQ 作成
```
よくある質問を整備したい
```

### テンプレート作成
```
返信テンプレート作って
```

### KPI 分析
```
CSAT が低い、分析して
```

### エスカレーション判定
```
この問い合わせ緊急？エスカレすべき？
（問い合わせ本文をペーストすると、3軸でレベル判定）
```

### お客様の声分析（VOC分析）
```
先月のお客様の声をまとめて
過去90日の問い合わせ傾向を分析して
```
→ カテゴリ別件数・感情分布・急増テーマ・優先改善提案までレポート化

---

## ファイル構成

```
.claude/
├── skills/customer-support-advisor/
│   ├── SKILL.md
│   ├── README.md
│   ├── references/
│   │   ├── wizard-setup.md
│   │   ├── function-current-state.md
│   │   ├── function-quick-wins.md      ⭐
│   │   ├── function-tool-select.md
│   │   ├── function-faq.md
│   │   ├── function-template.md
│   │   ├── function-knowledge-base.md
│   │   ├── function-chatbot.md
│   │   ├── function-kpi.md
│   │   ├── function-onboarding.md
│   │   ├── function-escalation.md      ⭐ エスカレ判定
│   │   ├── function-voc-analysis.md    ⭐ お客様の声分析
│   │   ├── cs-frameworks.md
│   │   └── tool-landscape.md           ⭐ 都度最新
│   └── templates/
│       ├── config.template.yaml
│       ├── faq.template.md
│       ├── response-template.template.md
│       ├── knowledge-base.template.md
│       ├── escalation-criteria.template.md   ⭐ エスカレ基準
│       └── voc-report.template.md            ⭐ 声の分析レポート
└── agents/
    └── customer-support-advisor-advocate.md
```

---

## よくある質問

### Q. ツール売り込みされない？
いいえ。すぐできる改善を最優先、ツールは必要な時だけ推奨。オーバースペック警告を DA が行います。

### Q. 小規模事業者でも使える？
むしろ小規模こそ効果的。無料ツールで十分なことが多いので、そこを正直に提案します。

### Q. 顧客データを扱うのが心配
顧客データは ローカルにも保存しない のがデフォルト。問い合わせ内容の処理時のみ Claude API に送られます（学習には使われない）。

### Q. 大企業でも使える？
使えます。ただし大企業向けエンタープライズツールの細かい比較は、専門ベンダー・コンサルと併用推奨。

### Q. やめたくなったら？
`rm -rf ./.customer-support-advisor/`（Windowsは `Remove-Item -Recurse -Force ./.customer-support-advisor/`） で完全削除。
