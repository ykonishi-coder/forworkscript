# Marketing Strategist（マーケティング戦略支援）

マーケティングを 現状把握 → 戦略 → チャネル → 施策 → 分析 の全段階で支援。

---

## 🎯 特徴

マーケティングは 非常に広い分野。このスキルは最初に 「あなたが何をやっているか」 を丁寧にヒアリングし、コンテキストに合った支援を提供します。

## 🔒 プライバシー

- マーケデータ（顧客・広告予算・CVR 等）は機密
- Claude の学習データに使われません
- ローカル保存のみ、マスキング対応

---

## カバー領域

### デジタルマーケティング
SEO / SEM / SNS / コンテンツ / メール・MA / アフィリエイト / インフルエンサー / 動画

### 広告
Google / Meta / LinkedIn / Yahoo / TikTok / YouTube

### オフライン・統合
PR / イベント / ウェビナー / 展示会 / DM

### 戦略・分析
ブランディング / STP / ペルソナ / カスタマージャーニー / 競合分析 / ABM / グロースハック

### BtoB / BtoC 両対応

---

## サポートレベル（段階別）

- レベル1（戦略相談・おすすめ）: 文字ベース、戦略・企画・相談
- レベル2（データ分析）: GA4 / 広告管理画面のデータ貼り付けで分析
- レベル3（API 連携・上級）: Google Ads / Meta / MA ツール連携

---

## ハイブリッド構成

- 本体: 戦略支援
- `marketing-strategist-advocate`: 効果性・法令・ROI の批判的レビュー

---

## 10 の提供機能

1. 現状整理 — 何をやっているか棚卸し（最初に必ず）
2. 戦略立案 — STP・ファネル・4P・3シナリオ
3. チャネル選定 — SEO / SNS / 広告 / メール等の相談
4. コンテンツ企画 — ブログ・動画・SNS・WP のネタ出し
5. ツール選定 — MA / 広告 / 分析ツール（都度最新調査）
6. KPI 分析 — データ分析と改善提案
7. キャンペーン設計 — 施策計画
8. 競合分析 — 公開情報ベース
9. ブランディング — ポジショニング・メッセージ
10. ペルソナ設計 — ターゲット具体化

---

## セットアップ

```
マーケ戦略 セットアップして
```

### 最初に「タイプ」を聞かれます
- A) お試し
- B) 最低限（5問、ヒアリング厚め）
- C) しっかり

マーケは広いため、B プランでも 5問（通常は3問）と丁寧にヒアリング。

---

## 使い方

### 現状整理から
```
マーケ活動の現状整理して
```

### 戦略立案
```
{業種・事業}のマーケ戦略考えて
```

### チャネル別相談
```
SEO 始めたい
SNS どう活用すべき？
広告運用の相談
```

### コンテンツ企画
```
ブログのネタ出し
SNS 投稿企画
```

### ツール選定
```
MA ツール比較して
分析ツール何がいい？
```

### KPI 分析
```
このGA4データ分析して

{データ貼り付け}
```

### 競合分析
```
{競合}のマーケ活動調べて
```

### ブランディング
```
{ブランド}のポジショニング考えて
```

---

## 連携エージェント

- bizdev-strategist: 新規事業のマーケ戦略
- design-consultant: クリエイティブ方向性
- slide-maker: プレゼン資料
- report-writer: マーケレポート
- text-quality-checker: コンテンツ校正

---

## ファイル構成

```
.claude/
├── skills/marketing-strategist/
│   ├── SKILL.md
│   ├── README.md
│   ├── references/
│   │   ├── wizard-setup.md
│   │   ├── function-current-state.md
│   │   ├── function-strategy.md
│   │   ├── function-channel.md
│   │   ├── function-content-plan.md
│   │   ├── function-tool-selection.md
│   │   ├── function-kpi-analysis.md
│   │   ├── function-campaign.md
│   │   ├── function-competitive.md
│   │   ├── function-branding.md
│   │   ├── marketing-frameworks.md    ⭐
│   │   └── channel-guide.md           ⭐
│   └── templates/
│       ├── config.template.yaml
│       └── persona.template.md
└── agents/
    └── marketing-strategist-advocate.md
```

---

## よくある質問

### Q. マーケの経験がなくても使える？
使えます。B プランで現状ヒアリングを丁寧にするので、コンテキストに合わせた提案が受けられます。

### Q. 法令違反が心配（景表法・ステマ等）
DA が自動的に景表法・ステマ規制・特商法観点でチェック。ただし最終判断は専門家（広告代理店・弁護士）へ。

### Q. BtoB / BtoC どちらに強い？
両対応。セットアップで事業形態を聞くので、それに合わせた戦略・施策を提案します。

### Q. 業界特化？
特定業界特化ではなく汎用。業種をセットアップで聞いて、特性を踏まえた提案に寄せます。

### Q. やめたくなったら？
`rm -rf ./.marketing-strategist/`（Windowsは `Remove-Item -Recurse -Force ./.marketing-strategist/`） で完全削除。
