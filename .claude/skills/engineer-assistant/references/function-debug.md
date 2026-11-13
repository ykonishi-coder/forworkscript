# 機能: デバッグ支援

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.engineer-assistant/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


エラーメッセージ・スタックトレースから原因推測・修正案提示。

## 入力

- エラーメッセージ
- スタックトレース
- 関連コード
- 再現手順（あれば）
- 環境情報（OS・バージョン）

## 手順

### 1. エラー種別の判定

- 構文エラー
- 実行時エラー
- 論理エラー
- ネットワークエラー
- データベースエラー
- パフォーマンス問題

### 2. 原因の推測

エラーメッセージとコードから:
- 直接原因
- 根本原因
- 関連する可能性

### 3. 修正案の提示

```markdown
### エラー: AttributeError: 'NoneType' object has no attribute 'name'

発生箇所: src/user.py:42

直接原因:
`user` が None のため、`.name` にアクセスできない

根本原因の候補:
1. DB クエリが結果を返さない（ユーザーが存在しない）
2. トランザクション内の未コミット
3. 異なるセッションからのアクセス

修正案:

### 案1: None チェック追加
```python
user = db.query(User).filter_by(id=user_id).first()
if user is None:
    raise UserNotFoundError(f"User {user_id} not found")
return user.name
```

### 案2: 例外処理
```python
try:
    user = db.query(User).filter_by(id=user_id).first()
    return user.name
except AttributeError:
    logger.error(f"User {user_id} not found")
    return None
```

推奨: 案1（明示的にエラー返し、呼び出し側で対応）

### 確認すべきこと
- DB にデータが存在するか
- user_id の型が合っているか
- 権限・フィルタが干渉していないか
```

### 4. よくあるパターン

#### NullPointerException / AttributeError
- None / null チェック

#### TypeError
- 型不一致

#### KeyError / IndexError
- 存在確認

#### ConnectionError
- ネットワーク・タイムアウト
- リトライ戦略

#### TimeoutError
- 処理時間の確認
- 非同期化検討

#### MemoryError
- メモリリーク
- バッチ処理

#### PermissionError
- ファイル・ディレクトリ権限
- 認証・認可

### 5. デバッグのコツ

- 最小再現コード
- print / logger でフロー追跡
- デバッガー使用 (pdb / debugger)
- 単体テストで切り分け
- StackOverflow / GitHub Issues で類似事例
