# BizDev チーム連携ルール

## 基本原則

1. 役割を越境しない: 各工程の責任範囲を守る
2. 成果物はファイルに残す: `work/bizdev-strategist/{案件}/` に保存
3. 判断ポイント明示
4. ディレクター経由

## 工程の流れ

```
director → researcher
        ↘  [並列可]   ↘
                        → analyst → strategist → advocate → director (納品)
```

並列化できる箇所:
- researcher の市場調査と競合調査は並列可
- analyst のフレームワーク分析は複数並列可

## 成果物ファイル

```
work/bizdev-strategist/{案件}/
├── 01-director-brief.md
├── 02-researcher.md       # 市場・競合リサーチ
├── 03-analyst.md          # フレームワーク分析
├── 04-strategist.md       # 事業計画書
├── 05-advocate-review.md  # DA レビュー
└── final.md               # 最終成果物
```

## 品質ルール

### 必須
- 数字の創作をしない
- 出典なしで事実として書かない
- 配布前提で内部コードネームを含めない
- 著作権配慮

### 自己チェック（advocate 前）
- [ ] 要求を満たしているか
- [ ] 前工程の意図を引き継いでいるか
- [ ] 数字の根拠が示されているか
- [ ] 論理の飛躍がないか

## エスカレーション

- 前工程成果物に問題
- 要件不明
- 法令・規制の懸念
- 納期逼迫

→ director に即エスカレーション

## 並列実行

researcher の並列:
- 市場規模調査 + 競合調査 + トレンド調査

analyst の並列:
- SWOT + BMC + 3C （互いに独立）

director が並列可否を判断。

## 機密情報

- 新規事業アイデアは特に機密
- マスキング設定を尊重
- 配布前の確認
