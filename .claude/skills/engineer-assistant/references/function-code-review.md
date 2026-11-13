# 機能: コードレビュー

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.engineer-assistant/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


コードの品質・セキュリティ・保守性をレビュー。

## 入力

1. レビュー対象コード（貼り付け or ファイル）
2. 言語・フレームワーク
3. 目的（PR レビュー / リファクタリング前 / 本番投入前）

## 観点

advocate の観点を参照 + 以下:

### 可読性
- 命名が明確か
- 複雑すぎる関数
- コメントの有無

### テスタビリティ
- 単体テストが書けるか
- 依存関係が整理されているか

### 規約準拠
- 言語標準規約（PEP 8, ESLint Rules 等）
- プロジェクト独自規約

### パフォーマンス
- アルゴリズムの効率
- DB クエリ最適化
- メモリ使用

### セキュリティ
- 入力検証
- 認証・認可
- 機密情報の扱い

### エラーハンドリング
- 例外の適切な処理
- ログ出力

## 出力

`templates/code-review.template.md` 形式 + advocate の詳細観点で。

### 指摘の優先度

- 🔴 Critical: 必ず修正（セキュリティ・本番影響）
- 🟡 Warning: 修正推奨（保守性・パフォーマンス）
- 🟢 Info: 任意（改善提案）

### 修正案の提示

```markdown
### 🔴 Critical: SQL インジェクション

現状:
```python
query = f"SELECT * FROM users WHERE id = {user_id}"
```

問題: ユーザー入力を直接 SQL に埋め込み

修正案:
```python
query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))
```

関連: OWASP A03
```

## 完了メッセージ

```markdown
## コードレビュー完了

対象: src/user.py
言語: Python
行数: 150

### サマリ
- 🔴 Critical: 2件
- 🟡 Warning: 5件
- 🟢 Info: 3件

### 主要な指摘
1. SQL インジェクション脆弱性（行42）
2. 認証情報のハードコード（行10）
3. N+1 問題（行78）

### 推奨アクション
- Critical 2件を即修正
- Warning 5件を次回の改善で
- テストケース追加

⚖️ 本番投入前に必ず修正・テストを。
```
