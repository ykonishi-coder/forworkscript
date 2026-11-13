# 機能: リファクタリング提案

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.engineer-assistant/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


コードを改善する提案。機能を変えず、保守性・可読性を上げる。

## コードの匂い（Code Smell）

### Duplicated Code（重複）
- 同じロジックが複数箇所
- 修正: 関数化・共通化

### Long Method（長すぎる関数）
- 1関数 50行以上
- 修正: 分割・抽出

### Large Class（大きすぎるクラス）
- 責務が多すぎる
- 修正: 単一責任の原則に従って分割

### Long Parameter List（長い引数）
- 5個以上
- 修正: オブジェクト化

### Divergent Change（変更理由が複数）
- 同じクラスが異なる理由で頻繁に変更
- 修正: 責務分離

### Shotgun Surgery（散弾銃手術）
- 1つの変更が多箇所に波及
- 修正: 関連コードを集約

### Feature Envy（他クラスに干渉）
- 別クラスのデータばかり使う
- 修正: メソッドの移動

### Data Clumps（データの塊）
- 同じ引数セットが繰り返し
- 修正: オブジェクト化

### Primitive Obsession（プリミティブ中毒）
- String / int ばかり
- 修正: ドメインオブジェクト化

### Switch Statements（switch 文）
- 長い switch / if-else
- 修正: ポリモーフィズム

### Lazy Class（怠惰なクラス）
- ほとんど何もしないクラス
- 修正: インライン化・削除

### Dead Code（デッドコード）
- 使われていないコード
- 修正: 削除

### Comments（コメント過多）
- コードで語れない
- 修正: わかりやすいコードに

## リファクタリングの基本手順

1. テストを書く（リファクタ前の動作保証）
2. 小さな変更
3. テスト実行
4. コミット
5. 次の変更

## よくあるリファクタリング

### 関数の抽出 (Extract Function)

Before:
```python
def print_invoice(order):
    print(f"Customer: {order.customer}")
    # 長い税計算
    subtotal = 0
    for item in order.items:
        subtotal += item.price * item.quantity
    tax = subtotal * 0.1
    total = subtotal + tax
    print(f"Total: {total}")
```

After:
```python
def print_invoice(order):
    print(f"Customer: {order.customer}")
    total = calculate_total(order)
    print(f"Total: {total}")

def calculate_total(order):
    subtotal = sum(item.price * item.quantity for item in order.items)
    tax = subtotal * 0.1
    return subtotal + tax
```

### 変数の抽出

Before:
```python
if (order.quantity * item.price) - max(0, order.quantity - 500) * item.price * 0.05 + min(order.quantity * item.price * 0.1, 100) > 0:
    # ...
```

After:
```python
base_price = order.quantity * item.price
quantity_discount = max(0, order.quantity - 500) * item.price * 0.05
shipping = min(base_price * 0.1, 100)
total = base_price - quantity_discount + shipping

if total > 0:
    # ...
```

### クラスの抽出

関連性の高いフィールド・メソッドを別クラスに。

### メソッドの移動

他クラスのデータに依存する場合、そのクラスに移動。

### 条件記述の簡素化

```python
# Before
if is_holiday or is_weekend:
    rate = 2.0
else:
    rate = 1.0

# After
rate = 2.0 if is_holiday or is_weekend else 1.0
```

## リファクタ計画

大規模リファクタは段階的に:

1. フェーズ1: テスト追加
2. フェーズ2: 重複削除
3. フェーズ3: 責務分離
4. フェーズ4: インターフェース整理
5. フェーズ5: パフォーマンス最適化

### スコープ管理

- 一度に大きく変えない
- PR は小さく
- レビュー可能なサイズ

## 自動化ツール

- Python: black, ruff, refactoring (Rope)
- JavaScript: Prettier, ESLint --fix
- Java: IntelliJ の Refactor 機能

## やってはいけないこと

- テストなしのリファクタ（動作保証なし）
- 一度に大きな変更
- 本番直適用（ステージング経由）
- パフォーマンス悪化の気づきなし（計測）
