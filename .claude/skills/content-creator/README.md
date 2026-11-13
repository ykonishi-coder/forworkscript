# Content Creator（コンテンツ制作支援）

ブログ・SNS・メルマガ・動画台本・LP 等 多岐にわたるコンテンツ制作を段階的に支援。

---

## 🎯 特徴

### 段階的ヒアリング
コンテンツは種類が多いので、順番に 確認:

1. 現在、何を使って作っている？
2. AI 自動化したいのは？
3. 既存 or ゼロから？

### 小さく始める設計
1 本から 始めて継続を支援。

### 動画の難易度を正直に伝える
YouTube・TikTok 動画は AI での完全自動化が難しく、編集スキル・時間が必要 と事前説明。
このスキルは 企画・台本まで 支援し、編集は別途案内。

---

## 🔒 プライバシー

- ブランド・コンテンツ戦略は機密
- Claude の学習データに使われません
- ローカル保存のみ

---

## ハイブリッド構成

- 本体: コンテンツ制作支援
- `content-creator-advocate`: 品質・著作権・SEO・法令（景表法/ステマ/薬機法）DA

---

## 対応コンテンツ

### 📝 文章系（🟢 AI 得意）
- ブログ / WordPress / Note
- メルマガ
- ホームページ・LP
- 広告コピー
- ホワイトペーパー（BtoB）
- プレスリリース

### 📱 SNS（🟢 頻度と継続）
- X / Instagram / LinkedIn / Threads / Facebook / TikTok / Pinterest

### 🎬 動画（🔴 難易度高・企画台本のみ支援）
- YouTube（台本・企画）
- TikTok / Reels / Shorts（企画）
- ポッドキャスト台本

### 🖼️ ビジュアル（🟡 連携）
- design-consultant / image-prompt-generator と連携

---

## 動画の扱い（重要）

### ✅ このスキルでできること
- 企画・ネタ
- 台本作成
- タイトル・説明文
- サムネイル企画
- ハッシュタグ

### ❌ できないこと
- 実際の編集
- 撮影
- BGM 生成

### 動画を始めるなら
1. 台本まではここで
2. 撮影はスマホで
3. 編集: CapCut（無料・初心者）→ DaVinci → Premiere
4. サムネ: Canva

いきなり動画フル装備は挫折率高い。文章系で反応を見てから動画に挑戦がおすすめ。

---

## セットアップ

```
コンテンツ制作支援 セットアップして
```

### 段階的ヒアリング
- BQ1: 現在作っているコンテンツ
- BQ2: AI 自動化したいもの
- BQ3: 既存 or ゼロから

→ 改善策の提案

---

## 使い方

### ブログ
```
{テーマ}のブログ記事書いて
```

### SNS
```
X 投稿の企画
Instagram キャプション作って
```

### メルマガ
```
今週のメルマガ作って
```

### LP
```
{サービス}の LP コピー
```

### 動画台本
```
YouTube の台本書いて
```
→ 最初に難易度説明 → 台本作成

### コンテンツカレンダー
```
月間のコンテンツ計画立てて
```

---

## ファイル構成

```
.claude/
├── skills/content-creator/
│   ├── SKILL.md
│   ├── README.md
│   ├── references/
│   │   ├── wizard-setup.md
│   │   ├── function-blog.md
│   │   ├── function-sns.md
│   │   ├── function-newsletter.md
│   │   ├── function-lp.md
│   │   ├── function-video-script.md      ⭐ 難易度説明付き
│   │   ├── function-content-plan.md
│   │   ├── function-seo.md
│   │   ├── content-types-guide.md        ⭐
│   │   ├── copyright-guide.md
│   │   └── tool-landscape.md
│   └── templates/
│       ├── config.template.yaml
│       ├── blog-post.template.md
│       ├── sns-post.template.md
│       ├── newsletter.template.md
│       ├── lp-copy.template.md
│       └── video-script.template.md
└── agents/
    └── content-creator-advocate.md
```

---

## DA の観点

- 著作権: 他社素材・BGM・画像
- 景表法: 「絶対」「最大級」等
- ステマ規制（2023/10〜）: 広告明示
- 薬機法: 健康・美容系
- SEO: キーワードスタッフィング等
- ブランド整合

---

## よくある質問

### Q. 動画をやりたいけど、編集できない
まず文章系・SNS から始めましょう。動画は編集者に依頼するか、CapCut で簡易版から。

### Q. AI 生成感を減らすには？
体験談・具体例・独自データを入れる。DA が不自然な AI 感を指摘。

### Q. 著作権が不安
DA が常にチェック。フリー素材 or 自作を推奨。迷ったら弁護士・弁理士。

### Q. SEO 対策は十分？
基本的な SEO 対策（タイトル・キーワード・構造）は対応。高度な対策は SEO 専門家推奨。

### Q. やめたくなったら？
`rm -rf ./.content-creator/`（Windowsは `Remove-Item -Recurse -Force ./.content-creator/`） で完全削除。
