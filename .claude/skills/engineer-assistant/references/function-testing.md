# 機能: テスト戦略・テスト設計

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.engineer-assistant/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


## テストピラミッド

```
        ▲
       ╱ ╲
      ╱E2E╲       少ない（高コスト・遅い）
     ╱─────╲
    ╱Integra╲      中程度
   ╱─tion───╲
  ╱───Unit───╲    多い（低コスト・速い）
 ╱────────────╲
```

## 種類別の戦略

### 単体テスト (Unit Test)

- 対象: 関数・メソッド・クラス
- 目的: 個別ロジックの正しさ
- ツール: Jest (JS), pytest (Python), RSpec (Ruby), JUnit (Java)

### 統合テスト (Integration Test)

- 対象: 複数コンポーネントの連携
- 目的: モジュール間の動作
- ツール: Supertest, pytest-flask, RSpec

### E2E テスト

- 対象: ユーザー操作フロー
- 目的: 本番に近い動作確認
- ツール: Playwright, Cypress, Selenium

### パフォーマンステスト

- 負荷テスト: k6, JMeter
- ストレステスト
- ベンチマーク

### セキュリティテスト

- SAST (Static): SonarQube, CodeQL
- DAST (Dynamic): OWASP ZAP
- 依存関係: npm audit, pip audit, Snyk

## 戦略の決め方

### 小規模プロジェクト
- 単体テスト中心（カバレッジ 70% 目安）
- 重要フローだけ統合テスト

### 中規模
- 単体テスト（80%+）
- 統合テスト（主要 API）
- E2E（重要シナリオ 5-10）

### 大規模
- 全レイヤー網羅
- CI で自動化
- パフォーマンステスト定期実行

## TDD（Test-Driven Development）

1. Red: 失敗するテストを書く
2. Green: テストが通る最小実装
3. Refactor: リファクタリング

### 向いているケース
- 仕様が明確
- ロジック複雑
- 長期保守

### 向いていないケース
- UI（変更頻繁）
- 一度きりのスクリプト

## テストの書き方

### AAA パターン

```python
def test_user_creation():
    # Arrange（準備）
    user_data = {"name": "Taro", "email": "taro@example.com"}

    # Act（実行）
    user = create_user(user_data)

    # Assert（検証）
    assert user.name == "Taro"
    assert user.email == "taro@example.com"
```

### Given-When-Then

```
Given ユーザーデータが渡される
When create_user が呼ばれる
Then 新しいユーザーが作成される
```

### エッジケース

- 空入力
- 境界値（0, 最大値）
- 不正な型
- null / undefined
- 大量データ

## モックの使い方

### 使うべきケース
- 外部 API
- データベース
- ファイル I/O
- 時刻に依存する処理

### 使うべきでないケース
- モックがほとんどの振る舞いを占める
- 実装詳細に結合しすぎる

## カバレッジ

### 目標
- 単体テスト: 80%+
- Critical path: 100%

### 計測
- `coverage.py` (Python)
- `nyc` (JS)
- Jest 内蔵

### 注意
- カバレッジ 100% ≠ 品質 100%
- カバレッジより「重要なロジックが網羅されているか」

## テストの品質

### 良いテスト
- 速い
- 独立している
- 再現可能
- 自己説明的

### 悪いテスト
- 遅い
- 他テストに依存
- Flaky（たまに失敗）
- 何を testing しているか不明

## CI での実行

```yaml
# GitHub Actions 例
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test -- --coverage
```

## やってはいけないこと

- テストを書かない（少しでも書く）
- モックばかり（実装と乖離）
- E2E だけ（遅い）
- CI を回さない（ローカルで忘れる）
