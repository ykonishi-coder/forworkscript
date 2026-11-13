# 機能: 定期監視

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.academic-scout/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


特定対象の新規情報を定期的にチェック。

## 監視対象の種類

### 1. 特定著者
- その研究者の新論文
- 所属機関の変更
- 発表スケジュール

### 2. ジャーナル
- 最新号の目次
- 特定号のアブスト

### 3. arXiv カテゴリ
- 新規投稿
- 例: `cs.AI`, `cs.CL`, `stat.ML`, `q-bio`

### 4. キーワード
- 新論文のヒット
- 例: "transformer", "quantum computing"

### 5. カンファレンス
- 開催スケジュール
- 発表論文リスト
- CFP（Call for Papers）

### 6. 企業 R&D
- Google Research ブログ
- OpenAI ブログ
- 他主要企業

### 7. 特許
- 特定企業の出願
- 特定分野の新規出願

## 監視設定

```yaml
# monitors/authors.yaml
authors:
  - name: "Geoffrey Hinton"
    affiliation: "University of Toronto"
    priority: high
    notification: daily
  - name: "Yann LeCun"
    priority: medium
```

```yaml
# monitors/arxiv-categories.yaml
arxiv_categories:
  - category: "cs.AI"
    priority: high
    max_per_day: 5  # 重要そうな論文の上位N本
  - category: "cs.CL"
    priority: high
```

```yaml
# monitors/keywords.yaml
keywords:
  - "large language model"
  - "LLM alignment"
  - "multimodal"
```

## 実行頻度

- リアルタイム: 重要著者の新論文
- 日次: arXiv 新着
- 週次: ジャーナル最新号
- 月次: 分野全体のトレンド

## scheduled-run での実行

### 日次実行例（毎朝 8:00）

1. 前日〜今日の新着をチェック:
   - 監視対象の著者
   - arXiv 指定カテゴリ
   - キーワードヒット
2. 重要度判定（AI 評価）:
   - Abstract を読んで興味ありそうか
   - 設定された優先度
   - 被引用予測
3. 上位 N 本をピックアップ
4. 要約を生成
5. ログファイルに保存: `alerts/YYYY-MM-DD.md`
6. ユーザーが起動時に確認

### 自動通知（承認なしは自分宛のみ）

- 自分の Slack DM
- 自分のメール

他者への通知は 毎回承認。

## 新着情報の重要度判定

### 自動判定の基準

- 著者優先度（high/medium/low）
- キーワード一致数
- 被引用予測（論文自体の話題性）
- 既存興味との関連性

### 上位選定

```markdown
## 2026-04-24 arXiv cs.AI 新着（182本中トップ 5）

### 1. {論文タイトル} 🌟 Must read
- 理由: 注目著者 + 重要キーワード
- Abstract: ...

### 2. {論文タイトル}
- 理由: ...

（以下上位5本）

## その他（リスト）
- 177 件の新着（`alerts/YYYY-MM-DD-full.md` に全体）
```

## 成果物

### 日次アラート
```
alerts/2026-04-24-daily.md
```

### 週次サマリ
```
alerts/2026-W17-weekly.md
```

### 月次レポート
```
alerts/2026-04-monthly.md
```

## 監視の調整

ユーザーが「ノイズが多い」「大事なものが見落とされる」と言ったら:
- 優先度の見直し
- キーワードの追加・削除
- フィルタ強化

## やってはいけないこと

- 論文本文の無断保存（メタ情報のみ）
- 監視対象の個人情報収集
- 不正な方法での論文取得
- ユーザー承認なしの大量通知
