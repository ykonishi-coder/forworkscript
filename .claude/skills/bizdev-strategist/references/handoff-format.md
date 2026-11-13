# 工程間引き継ぎフォーマット

## 依頼ブリーフ（director → 各担当）

```markdown
# 依頼ブリーフ

## 宛先
bizdev-{ROLE}

## 案件
{案件名}

## 担当工程
{市場調査 / フレームワーク分析 / 事業計画書作成 / 批判的レビュー}

## 前工程までの成果物
- work/bizdev-strategist/{案件}/01-director-brief.md
- （前工程があれば追加）

## 作業内容
{具体的な指示}

## 期待アウトプット
- 形式: Markdown
- 分量: ...
- 深度: 軽い/標準/深い

## 制約
{禁止事項・注意点}

## 納期
{目安}
```

## 完了報告（各担当 → director）

```markdown
# 完了報告: bizdev-{ROLE}

## 案件
{案件名}

## 成果物
- パス: work/bizdev-strategist/{案件}/0X-{ROLE}.md

## 主要な発見
1. ...
2. ...
3. ...

## 判断ポイント
- {director / ユーザー判断が必要な箇所}

## 懸念
- {あれば}

## 次工程への申し送り
{後工程の人が迷わない補足}
```

## DA レビュー依頼

```markdown
# レビュー依頼

## 宛先
bizdev-advocate

## 案件
{案件名}

## レビュー対象
- メイン: work/bizdev-strategist/{案件}/04-strategist.md
- 参考: 他ファイル

## 重点チェック観点
- 数字の妥当性
- 楽観的仮定の特定
- リスク過少評価
- 代替案

## 厳しさレベル
{standard / strict / lenient}
```

## 修正依頼

```markdown
# 修正依頼

## 宛先
bizdev-{ROLE}

## 元成果物
{パス}

## 修正箇所
### 🔴 Critical
1. ...

### 🟡 Warning
1. ...

## 修正方針
- Critical を全て反映
- Warning も基本反映

## 納期
{目安}
```
