# 機能: ドキュメント生成

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.engineer-assistant/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


コード・システムのドキュメントを作成。

## ドキュメントの種類

### README.md

- プロジェクト概要
- セットアップ手順
- 使い方
- 開発者向け
- ライセンス

### API ドキュメント

- エンドポイント一覧
- リクエスト / レスポンス
- 認証
- エラーコード

OpenAPI (Swagger) 形式推奨。

### Architecture ドキュメント

- システム構成図
- データフロー
- コンポーネント設計

### ADR (Architecture Decision Record)

`templates/adr.template.md` 参照。

### 運用手順書

- デプロイ手順
- 障害対応
- 監視項目

### コメント・Docstring

コード内のドキュメント。

### ユーザーマニュアル

エンドユーザー向け。

## 良いドキュメントの条件

- 必要な情報が見つかる
- 更新されている
- 例が豊富
- 誰が読む想定か明確

## README テンプレート

```markdown
# プロジェクト名

短い説明。

## 特徴

- 機能1
- 機能2
- 機能3

## 動作環境

- Node.js 18+
- npm 9+

## インストール

\`\`\`bash
git clone https://github.com/user/repo.git
cd repo
npm install
\`\`\`

## 使い方

\`\`\`bash
npm start
\`\`\`

http://localhost:3000 で起動

## 設定

`.env` ファイル:

\`\`\`
API_KEY=your_key
DATABASE_URL=postgres://...
\`\`\`

## 開発

\`\`\`bash
npm run dev    # 開発サーバー
npm test       # テスト
npm run build  # ビルド
\`\`\`

## コントリビュート

1. Fork
2. ブランチ作成
3. 変更
4. PR

## ライセンス

MIT
```

## API ドキュメント（OpenAPI）

```yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0

paths:
  /users/{id}:
    get:
      summary: ユーザー取得
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  id: { type: integer }
                  name: { type: string }
                  email: { type: string }
        '404':
          description: ユーザーが存在しない
```

## Docstring

### Python (Google style)

```python
def calculate_tax(amount: float, rate: float = 0.1) -> float:
    """消費税を計算する。

    Args:
        amount: 税抜金額
        rate: 税率（デフォルト 10%）

    Returns:
        税込金額

    Raises:
        ValueError: amount が負の場合

    Examples:
        >>> calculate_tax(100)
        110.0
    """
    if amount < 0:
        raise ValueError("amount must be non-negative")
    return amount * (1 + rate)
```

### JavaScript (JSDoc)

```javascript
/**
 * 消費税を計算する
 * @param {number} amount - 税抜金額
 * @param {number} [rate=0.1] - 税率
 * @returns {number} 税込金額
 * @throws {Error} amount が負の場合
 * @example
 * calculateTax(100) // => 110
 */
function calculateTax(amount, rate = 0.1) {
  if (amount < 0) {
    throw new Error('amount must be non-negative');
  }
  return amount * (1 + rate);
}
```

## コメントの書き方

### 良いコメント
- なぜ（Why）を書く
- 非自明な制約
- 参照先（Issue, 仕様書）

### 悪いコメント
- 何を（What）を書く（コードで読める）
- 古くなった情報
- TODO だらけ

## 他エージェント連携

- text-quality-checker: ドキュメントの校正
- report-writer: 技術レポート作成

## やってはいけないこと

- 更新されないドキュメント
- 抽象的すぎて役立たない
- コードと乖離
