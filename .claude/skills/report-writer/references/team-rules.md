# レポート作成チーム 連携ルール

チーム内の標準ルール。全担当（director / researcher / composer / writer / advocate）が従う。

## 基本原則

1. 役割を越境しない: 自分の工程を超えた判断はディレクターに相談
2. 成果物はファイルに残す: すべての中間成果物を `work/report-writer/{案件}/` に保存
3. 判断ポイントは明示: 「ここは方針次第で変わる」ポイントを成果物に明記
4. ディレクター経由: 工程担当同士で直接やり取りせず、ディレクターを介する

## 工程の流れ

```
director (要件整理)
   ↓
researcher (素材収集)
   ↓ [承認ポイント 1]
composer (構成設計)
   ↓ [承認ポイント 2]
writer (執筆)
   ↓ [承認ポイント 3]
advocate (品質検証)
   ↓
director (最終化・納品)
```

承認ポイントは `config.team.approval_after` で設定可能。

## 成果物ファイル

```
work/report-writer/{案件}/
├── 01-director-brief.md    # director 作成
├── 02-researcher.md        # researcher 作成
├── 03-composer.md          # composer 作成
├── 04-writer.md            # writer 作成
├── 05-advocate-review.md   # advocate 作成
└── final.md                # director が最終化
```

## 依頼と完了報告

### 依頼ブリーフ（director → 各担当）
`references/handoff-format.md` 参照。

### 完了報告（各担当 → director）
各担当ファイル（`agents/report-*.md`）の末尾に記載されたフォーマットに従う。

## 品質ルール

### 必須
- 事実・数値の創作をしない
- 出典なしで事実として書かない
- 配布前提の案件では 内部コードネーム・社内固有名詞を含めない
- プライバシー情報はマスキング

### DA レビュー前の自己チェック（各担当）
- [ ] 要求を満たしているか
- [ ] 前工程の意図を引き継いでいるか
- [ ] 出典は明記されているか
- [ ] 冗長な部分はないか

## エスカレーション

以下は director に即エスカレーション:

- 前工程の成果物に重大な問題がある
- 要件そのものが不明瞭
- 他エージェント連携でエラー発生
- 法的・倫理的な懸念
- 納期に間に合わない可能性

## 並列実行

- 並列OK: 独立した素材収集（秘書 / MTG / Web調査）
- 並列NG: 前工程の成果物を必要とする工程（composer は researcher 成果物が必要）
- director が並列可否を判断して指示

`config.parallelism.enabled` が true のときのみ並列化。

## 機密情報の扱い

- 各担当は成果物ファイルへの保存時に機密度を意識する
- `config.security.mask_sensitive` が true なら、固有名詞は `{相手名}` 等にマスキング
- 最終納品時にマスキングを解除するかはユーザー判断

## 他エージェント連携

### 連携発動時のルール
1. director が必要性を判断
2. ユーザーに承認を求める:

   > このレポート作成で、以下のエージェントを連携させてよろしいですか？
   >
   > - 秘書: {対象メールスレッド}
   > - MTG: {対象議事録}
   >
   > 連携先の設定ファイルを読み取り、必要な情報だけを取り込みます。

3. 承認後、researcher が具体的に取り込み
4. 取り込んだ情報は researcher の成果物にのみ保存（他担当には成果物経由で渡る）

### 連携しない場合
- 素材は director がユーザーから直接受け取り、researcher に転送

## ログ

各担当は実行時の主要な判断を `work/report-writer/{案件}/logs.txt` に記録:

```
[timestamp] [agent-name] {アクション}
```

何が起きたかを時系列で追えるように。
