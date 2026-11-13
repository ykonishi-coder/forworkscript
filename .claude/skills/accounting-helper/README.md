# 経理支援 (Accounting Helper)

経理業務を会計ソフトに合わせて支援するエージェント。領収書処理・仕訳ドラフト・月次分析・税務調査・請求書作成・入金支払管理まで。

---

## ⚖️ 免責事項

このスキルは税理士・公認会計士の代わりではありません。

- 一般的な経理業務の参考情報を提供
- 重要な税務・決算判断は 税理士・会計士 に相談必須
- 税務申告は税理士業務
- 監査は会計士業務

詳細は `references/disclaimer.md` 参照。

---

## 🔒 プライバシーについて

経理データは機密の塊です:

- 学習に使われません
- マスキング標準装備（取引先名・金額・個人情報）
- ローカル保存のみ
- .gitignore 必須
- 給与情報は原則扱わない

詳細は `references/privacy-for-financial-data.md`。

---

## 機能

### 領収書・請求書処理
OCR結果やレシート情報から勘定科目・消費税区分を提案。

### 仕訳ドラフト作成
取引内容から複式簿記の仕訳を生成。CSV 出力可能。

### 月次レポート分析
P/L・B/S を読んで、変動・異常値・改善提案。

### 経費精算サポート
立替経費の精算申請書を作成。

### 税務情報調査
消費税・法人税・所得税等の一般情報を国税庁等から調査。

### 勘定科目相談
「この取引何勘定？」への提案。

### 請求書作成支援
インボイス対応の請求書を生成。

### 入金・支払管理
売掛金・買掛金の管理、期限アラート。

---

## 会計ソフト対応（サポートレベル別）

セットアップで 使っている会計ソフト を確認し、最新の連携方式を都度ネット調査 して提案します。

### レベル1: 情報整理・相談相手（どのソフトでも可）
- Claude に相談しながら、ユーザーが会計ソフトに入力
- 連携なし、最も安心

### レベル2: 半自動化（CSV連携）
- 領収書・請求書から仕訳ドラフト → CSV → 会計ソフトにインポート
- 手動連携、リスク低

### レベル3: MCP/API 連携
- 会計ソフトと直接連携（freee / マネーフォワード / 弥生クラウド / 勘定奉行等）
- 最新MCPの有無はセットアップ時に都度調査
- 書き込みは毎回承認

---

## 主要会計ソフト

- freee 会計
- マネーフォワード クラウド会計
- 弥生会計（デスクトップ / クラウド）
- 勘定奉行（OBC）
- PCA 会計
- Excel / Google Sheets（手動管理）

各ソフトのサポート状況は `references/accounting-software-guide.md` 参照。

---

## ハイブリッド構成

- 本体: 経理業務支援
- `accounting-helper-advocate`: 会計ルール・税法適合性の批判的レビュー

経理は誤りが金銭的・法的リスクに直結するため、DA で検証。

---

## セットアップ

```
経理支援セットアップして
```

### 最初に「タイプ」を聞かれます

- A) お試し — 架空データでデモ
- B) 最低限 — 会計ソフト確認 + レベル選択 + プライバシー
- C) しっかり — 業種・決算月・インボイス設定まで

### 必須の初期確認

- 免責事項の同意
- 使っている会計ソフト
- サポートレベル（1/2/3）
- プライバシー設定
- 事業形態（個人事業 / 法人）

---

## 使い方

### 領収書処理
```
この領収書処理して

{領収書内容 or 画像}
```

### 仕訳ドラフト
```
この取引の仕訳作って:
新幹線で東京から大阪、15,000円
```

### 月次分析
```
4月の試算表、分析して

{試算表 CSV or テキスト}
```

### 経費精算
```
4月の経費精算申請書作って
```

### 税務調査
```
インボイスの経過措置について教えて
```

### 勘定科目相談
```
従業員の健康診断費用、何勘定？
```

### 請求書作成
```
XYZ社宛の請求書、15万円で作って
```

### 入金管理
```
入金確認、C001 に 11万円入金
```

---

## ファイル構成

```
.claude/
├── skills/accounting-helper/
│   ├── SKILL.md
│   ├── README.md
│   ├── references/
│   │   ├── wizard-setup.md
│   │   ├── function-process-receipts.md
│   │   ├── function-draft-journal-entries.md
│   │   ├── function-monthly-report.md
│   │   ├── function-expense.md
│   │   ├── function-tax-research.md
│   │   ├── function-account-consultation.md
│   │   ├── function-invoice.md
│   │   ├── function-payment.md
│   │   ├── accounting-software-guide.md      ⭐
│   │   ├── accounting-basics.md
│   │   ├── japanese-tax-sources.md          ⭐
│   │   ├── privacy-for-financial-data.md    ⭐
│   │   └── disclaimer.md                    ⭐
│   └── templates/
│       ├── config.template.yaml
│       ├── journal-entry.template.md
│       ├── invoice.template.md
│       ├── expense-report.template.md
│       └── monthly-report.template.md
└── agents/
    └── accounting-helper-advocate.md
```

セットアップ後:
```
./.accounting-helper/
├── config.yaml
├── journal-drafts/       # 仕訳ドラフト履歴
├── monthly-analyses/     # 月次分析
├── receipts/            # 領収書処理履歴
├── invoices/            # 発行請求書
├── expenses/            # 経費精算
├── research/            # 税務調査結果
├── payments/            # 入金支払管理
├── alerts/              # 期限アラート
├── logs.txt
└── audit.log
```

⚠️ `.gitignore` 必須:
```
.accounting-helper/
journal-drafts/
monthly-analyses/
receipts/
invoices/
expenses/
research/
payments/
```

---

## よくある質問

### Q. 顧問税理士がいるけど使える？
もちろんです。日常業務の一次整理 に使い、重要判断は税理士に、が理想的な使い分け。

### Q. 税理士が使ってOK？
税理士のスタッフ業務の効率化に有効。ただし、このスキルの出力を税理士業務の最終成果物にはしないでください。

### Q. 経理ソフトが複数ある
複数設定可能。メインソフトを1つ指定し、他はサブとして扱います。

### Q. 給与も扱える？
原則扱いません。給与計算は専用ソフト（freee人事労務等）に任せ、このスキルは仕訳の「給料手当合計」だけ扱います。

### Q. 事業未登録・個人確定申告でも使える？
使えます。個人事業主モードで動作。ただし青色申告・白色申告の正式書類作成は税理士 or 国税庁の確定申告コーナーで。

### Q. やめたくなったら？
`rm -rf ./.accounting-helper/`（Windowsは `Remove-Item -Recurse -Force ./.accounting-helper/`） で完全削除。
