# Academic Scout（研究開発・論文偵察）

学術論文・特許・技術動向 を継続的に調査・監視し、R&D を支援。

---

## 🎯 できること

### 論文検索・要約・評価
- arXiv / PubMed / Google Scholar / J-STAGE 等
- DOI で実在確認（ハルシネーション防止）
- 信頼性・再現性評価

### 定期監視
- 特定著者の新論文
- arXiv カテゴリの新規投稿
- ジャーナル最新号
- キーワードアラート

### 特許調査
- J-PlatPat / Google Patents

### レポート・通知
- R&D 動向レポート
- メール・Slack・Teams 等で通知（下書き・承認制）

---

## 🔒 プライバシー

- 研究テーマは機密扱い
- Claude の学習データに使われません
- ローカル保存のみ

---

## ハイブリッド構成

- 本体: 論文調査・監視・レポート
- `academic-scout-advocate`: 論文の信頼性・方法論・再現性 DA

---

## 対応する学術リソース

### 論文
- Google Scholar / Semantic Scholar
- arXiv（cs.AI, cs.LG, cs.CL, stat.ML, q-bio, physics, math 等）
- PubMed / bioRxiv / medRxiv
- J-STAGE / CiNii（日本語）
- IEEE Xplore / ACM / DBLP
- Papers with Code

### 特許
- J-PlatPat（特許庁）
- Google Patents / USPTO / Espacenet

### 企業 R&D
- Google Research / DeepMind / OpenAI / Meta AI / Microsoft Research 等

詳細は `references/academic-sources.md`。

---

## セットアップ

```
Academic Scout セットアップして
```

### 3問（B プラン）
- 研究分野
- 調査深度
- 定期監視の利用

---

## 使い方

### 論文検索
```
large language model の最新論文調べて
```

### 論文要約
```
この論文要約して

{論文 URL or 本文}
```

### 論文評価
```
この論文、信頼できる？

{論文情報}
```

### 特許調査
```
{技術}の特許調査
```

### 定期監視設定
```
arXiv cs.AI を毎朝監視して
```

```
Yann LeCun の新論文を監視
```

### R&D レポート
```
LLM 分野の最新動向レポート作って
```

### 通知
```
今週の重要論文、チームに通知
```
→ 下書き作成 → 承認 → 送信

---

## ハルシネーション対策

AI は 存在しない論文を引用 することがあります。このスキルは:

- DOI で実在確認
- Google Scholar でクロスチェック
- advocate が二重チェック
- 不確実なら「要確認」と明示

それでも重要な引用は必ず原典確認 を。

---

## ファイル構成

```
.claude/
├── skills/academic-scout/
│   ├── SKILL.md
│   ├── README.md
│   ├── references/
│   │   ├── wizard-setup.md
│   │   ├── function-search-papers.md
│   │   ├── function-summarize-paper.md
│   │   ├── function-monitor.md
│   │   ├── function-rnd-report.md
│   │   ├── function-notify.md
│   │   ├── academic-sources.md         ⭐
│   │   └── paper-evaluation.md         ⭐
│   └── templates/
│       ├── config.template.yaml
│       └── paper-summary.template.md
└── agents/
    └── academic-scout-advocate.md
```

---

## よくある質問

### Q. research-assistant との違い？
- research-assistant: 汎用市場・業界調査（メディア・調査会社中心）
- academic-scout: 学術論文・特許・研究動向特化

### Q. 論文の全文は取得できる？
無料公開（arXiv・オープンアクセス）の PDF や Abstract は取得可能。有料論文は Abstract まで or 所属機関経由で。

### Q. 研究テーマを他人に知られたくない
ローカル保存のみ、外部送信は承認制。Claude API への送信時は 学習に使われない。

### Q. 撤回論文を引用してしまう？
advocate が Retraction Watch 等で確認。ただし最終確認は研究者自身で。

### Q. 定期監視は負担にならない？
ログファイルに書き出すだけで、通知は送りません（設定で自分宛のみ可）。起動時に確認する形式。

### Q. やめたくなったら？
`rm -rf ./.academic-scout/`（Windowsは `Remove-Item -Recurse -Force ./.academic-scout/`） で完全削除。
