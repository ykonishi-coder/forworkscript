# 機能: フォント選定

> 前提: 呼び出し元（SKILL.md）の「設定の読み込み」で `./.design-consultant/config.yaml` を読み込み済み。
> 未読込なら先に読むこと。本ファイル内の `config.xxx` はその値を指す。


デザインに合うフォントを提案。

## 手順

### 1. コンセプト確認

### 2. フォント候補

#### 日本語フォント（ゴシック系）
- Noto Sans JP: 無料、読みやすい、モダン
- 游ゴシック: 標準、OS搭載
- ヒラギノ角ゴ: 高品質、Mac 標準
- 源ノ角ゴシック (Adobe): 無料、多言語対応

#### 日本語フォント（明朝系）
- Noto Serif JP: 無料、モダン明朝
- 游明朝: 標準
- ヒラギノ明朝: Mac 標準

#### 英語フォント
- Inter: モダン、SaaS 人気
- Helvetica: クラシック
- Arial: 汎用
- Roboto: Google 製
- Poppins: 丸み
- Montserrat: 見出し向け

### 3. 組み合わせ提案

```markdown
### 推奨組み合わせ

#### 案1: モダン・クリーン
- 見出し: Inter Bold / Noto Sans JP Bold
- 本文: Inter Regular / Noto Sans JP Regular
- サイズ: 見出し 32-48px、本文 16-18px

#### 案2: クラシック・信頼感
- 見出し: 游明朝 Bold
- 本文: 游ゴシック Regular

#### 案3: フレンドリー
- 見出し: Poppins SemiBold / Noto Sans JP Bold
- 本文: Noto Sans JP Regular
```

### 4. 使用ガイドライン

```markdown
### フォントサイズ階層（Web）

- H1: 48px
- H2: 36px
- H3: 28px
- H4: 22px
- H5: 20px
- Body: 16-18px
- Small: 14px
- Caption: 12px

### 行間
- 見出し: 1.2-1.3
- 本文: 1.5-1.7

### 字間
- 見出し: やや広め
- 本文: 標準
```

### 5. ライセンス確認

- 無料・商用利用可: Google Fonts、Noto、Adobe Fonts（Adobe CC 契約者）
- OS 搭載: 大半のデバイスで使える
- 有料: Morisawa、Fontworks（Web フォント契約必要）

### 6. Web フォント読み込み

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
```

### 7. アクセシビリティ

- 最小サイズ: 16px（本文）
- コントラスト比: WCAG AA 以上
- 読みやすいフォント選定

## やってはいけないこと

- 3種類以上のフォント混在
- サイズ階層がない
- ライセンス違反
- 読みにくいフォントを本文に
