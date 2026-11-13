# 学術リソース詳細ガイド

## 論文データベース

### Google Scholar（汎用・最優先）
- URL: https://scholar.google.com/
- 分野横断
- 被引用数表示
- 無料
- API: 公式なし、scraping はグレー

### Semantic Scholar
- URL: https://www.semanticscholar.org/
- AI によるセマンティック検索
- 公式 API 無料: https://api.semanticscholar.org/

### arXiv
- URL: https://arxiv.org/
- 物理・数学・情報・生物
- プレプリント（未査読）
- 公式 API: https://info.arxiv.org/help/api/

主要カテゴリ:
- `cs.AI` 人工知能
- `cs.LG` 機械学習
- `cs.CL` 自然言語処理
- `cs.CV` コンピュータビジョン
- `cs.CR` セキュリティ
- `stat.ML` 統計機械学習
- `q-bio` 生物学
- `physics` 物理
- `math` 数学

監視方法:
- RSS フィード対応
- API で新着取得

### PubMed
- URL: https://pubmed.ncbi.nlm.nih.gov/
- 医学・生命科学
- 世界最大級
- 公式 API (E-utilities)

### J-STAGE
- URL: https://www.jstage.jst.go.jp/
- 日本の学会誌・ジャーナル
- 日本語論文
- API あり

### CiNii
- URL: https://cir.nii.ac.jp/
- 日本の研究文献
- 学位論文も

### IEEE Xplore
- URL: https://ieeexplore.ieee.org/
- 電気電子・情報工学
- 有料論文多い
- 会員制度

### ACM Digital Library
- URL: https://dl.acm.org/
- コンピュータサイエンス全般
- 有料が多い

### DBLP
- URL: https://dblp.org/
- CS 論文のメタデータ集約
- 著者検索強い
- 無料・API あり

### Papers with Code
- URL: https://paperswithcode.com/
- 論文 + 実装コード
- ベンチマーク結果
- AI/ML 中心

### bioRxiv / medRxiv
- 生物学・医学プレプリント
- 無料公開

### SSRN
- URL: https://www.ssrn.com/
- 社会科学・経済・法学
- プレプリント中心

### ResearchGate
- URL: https://www.researchgate.net/
- 研究者 SNS
- 著者に直接連絡可

## 特許データベース

### J-PlatPat（日本）
- URL: https://www.j-platpat.inpit.go.jp/
- 特許庁公式
- 日本特許
- 無料

### Google Patents
- URL: https://patents.google.com/
- グローバル特許
- 機械翻訳あり
- 無料

### USPTO（米国）
- URL: https://www.uspto.gov/

### EPO（欧州）
- URL: https://www.epo.org/

### Espacenet
- URL: https://worldwide.espacenet.com/
- 欧州特許庁
- グローバルカバー

## カンファレンス

### AI / ML
- NeurIPS（12月）
- ICML（7月）
- ICLR（4-5月）
- AAAI（2月）
- IJCAI（8月）
- CVPR / ICCV / ECCV（CV）
- ACL / EMNLP / NAACL（NLP）

### システム・ソフトウェア
- SIGCOMM（ネットワーク）
- OSDI / SOSP（OS）
- POPL（プログラミング言語）
- CHI（HCI）

### セキュリティ
- USENIX Security
- CCS
- S&P (Oakland)

## 企業 R&D ブログ

- Google Research: https://research.google/
- DeepMind: https://deepmind.google/research/
- OpenAI: https://openai.com/research
- Meta AI: https://ai.meta.com/research/
- Microsoft Research: https://www.microsoft.com/research/
- NVIDIA Research: https://www.nvidia.com/research/
- Apple ML Research: https://machinelearning.apple.com/
- Adobe Research: https://research.adobe.com/
- Amazon Science: https://www.amazon.science/
- IBM Research: https://research.ibm.com/

## 日本の研究機関

- 理研 (RIKEN): https://www.riken.jp/
- 産総研 (AIST): https://www.aist.go.jp/
- NICT: https://www.nict.go.jp/
- NTT 研究所
- 日立中央研究所
- 大学の研究室

## 検索クエリのコツ

### 英語で検索する
日本語より遥かに多い。翻訳ツールで。

### キーワードの組み合わせ
- `"large language model" OR LLM`
- `transformer AND attention AND efficient`

### フィルター
- 年（`since 2024`）
- 著者
- ジャーナル

### 引用ネットワーク
- 重要論文を見つけたら:
  - その被引用論文
  - その参照論文

## 論文の入手

### 無料で読める
- arXiv・プレプリントサーバー
- オープンアクセスジャーナル
- 著者のパーソナルサイト（多くの場合 PDF あり）

### 有料論文
- 所属機関の図書館経由
- 著者に直接連絡（ResearchGate）
- DOI 経由で正規購入

### 違法な入手は避ける
- Sci-Hub 等は著作権上グレー〜違法
- 推奨しない

## 論文の選び方

### 最初に見るべき
- Abstract: 3分で要旨把握
- Figures: 図表で実験内容
- Introduction: 背景・貢献
- Conclusion: 結論

### 深く読むべき
- Methodology: 手法
- Experiments: 実験設定・結果
- Limitations: 限界

### 必要に応じて
- Related Work: 関連研究
- Supplementary: 付録

## サーベイ論文の活用

### メリット
- 分野全体を俯瞰
- 引用元をたどれる
- 体系的に整理

### 探し方
- `"survey" OR "review" AND {トピック}`
- `"overview" AND {トピック}`

## リサーチャーの常識

### インパクトファクター ≠ 質
- 高 IF でも悪い論文あり
- 低 IF でも良い論文あり
- 個別に評価

### プレプリント ≠ 確定
- 査読前
- 後に大幅修正も
- 出典明示で使う

### 被引用数 ≠ 質
- 古い論文は有利
- 流行分野は有利
- 補助指標

### 再現性
- コード・データ公開
- 独立再現
- 最近重視される

## 著作権配慮

- 論文の長大なコピーは NG
- 引用ルール（短く・出典明記）
- 商用利用は要確認
