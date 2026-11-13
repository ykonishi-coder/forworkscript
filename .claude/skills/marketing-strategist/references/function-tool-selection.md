# 機能: ツール選定

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.marketing-strategist/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


マーケティングツール（MA・分析・広告・SNS 管理等）を、ユーザー状況に合わせて提案。

## 大原則

都度ネット調査で最新状況を確認。ツールの価格・機能は頻繁に変わる。

## カテゴリ別主要ツール

### 分析

#### Web 解析
- Google Analytics 4 (GA4): 無料標準
- Adobe Analytics: 大規模向け
- Matomo: プライバシー重視

#### BI
- Looker Studio: 無料
- Tableau
- Power BI

### MA（マーケティングオートメーション）

#### 大規模
- Marketo (Adobe): BtoB 大手
- Salesforce Marketing Cloud (SFMC)
- HubSpot: 中〜大、統合型

#### 中規模
- HubSpot (Starter / Professional)
- Pardot (Salesforce)

#### 中小・国内
- SATORI: 国産・BtoB
- SHANON: 国産
- List Finder: 国産・低価格
- Kairos3
- b→dash

#### スモール
- MailChimp（EC・BtoC）
- Brevo（旧 Sendinblue）

### 広告管理

- Google Ads
- Meta Ads Manager
- Microsoft Advertising
- LINE 広告管理
- Yahoo 広告

#### 広告最適化
- Optmyzr
- Marin Software

### SNS 管理

- Hootsuite
- Buffer
- Sprout Social
- SOCIAL INSIGHT（国産）
- コムニコ Marketing Suite

### SEO

- Ahrefs: 最強の被リンク・キーワード
- SEMrush
- Moz Pro
- 国内: ラッコキーワード、Keywordmap、Keyword Tool

### CRM

- Salesforce: 大企業標準
- HubSpot CRM: 中小〜大
- Pipedrive: 中小
- Zoho CRM: 中小
- kintone: 国産・カスタマイズ

### CMS

- WordPress: シェア最大
- Shopify: EC
- Webflow: ノーコード
- Contentful: ヘッドレス
- microCMS（国産）

### その他

#### ヒートマップ
- Hotjar
- User Insight

#### A/B テスト
- VWO
- Optimizely
- Google Optimize（終了）→ GA4 + サードパーティ

#### チャットボット
- Intercom
- ChatPlus
- 国産各種

## 選定基準

### 価格
- 無料・低価格（スモール）
- 中価格（スケール時）
- エンタープライズ

### 機能
- 必要十分か
- オーバースペックでないか

### 他ツール連携
- 既存ツールとの統合

### 日本語対応
- UI 日本語
- サポート日本語

### 導入ハードル
- セットアップ複雑度
- 学習コスト

### 将来性
- ベンダーの安定性
- 機能拡張予定

## 調査プロセス

### Step 1: WebSearch

```
{カテゴリ} 比較 {今年}
{カテゴリ} 日本 ランキング
{候補ツール名} レビュー
```

### Step 2: 公式サイト確認

- 最新価格
- 機能一覧
- ケーススタディ

### Step 3: 類似企業の事例

- 同業種・規模の導入事例

### Step 4: 無料トライアル

- 実際に触ってみる（ユーザー側）

## 提案テンプレート

```markdown
## {カテゴリ} ツール選定（YYYY-MM-DD 調査）

### 要件整理
- 必須機能: ...
- 予算: 月 ¥X
- 組織規模: ...

### 候補

#### 候補A: {ツール名}
- 価格: 月 ¥X（{プラン}）
- メリット: ...
- デメリット: ...
- 向いているケース: ...
- AIおすすめ度: ★★★★☆

#### 候補B
...

#### 候補C（無料/低価格オプション）
...

### AI 推奨: {候補X}

理由:
1. ...
2. ...

### 決定前の確認事項
- 無料トライアル試用
- 顧客サポート確認
- 契約条件

⚖️ 最終判断はあなた・チーム・購買部門で。
```

## よくある失敗

- オーバースペック: 使わない機能にお金
- ベンダーロックイン: 乗り換え困難
- 導入後の放置: 活用されない
- 統合不足: データサイロ化

## やってはいけないこと

- 古い情報で推奨（都度調査）
- 特定ベンダー偏重
- ユーザーの予算・規模を無視
