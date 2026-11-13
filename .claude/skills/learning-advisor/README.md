# Learning Advisor（教育・学習・研修支援）

個人のスキルアップ〜組織の人材育成 を幅広くサポート。

---

## 🎯 特徴

### 意図に寄り添う
教育への期待は人それぞれ。まず「何を求めるか」 を丁寧に確認してから進めます。

### 個人 / 組織 両対応
- 個人: 学習ロードマップ・教材推奨・習慣化
- 組織: カリキュラム設計・研修プログラム・評価設計

### 小さく始める設計
大きなカリキュラム前に、1つの小さな学習から。

---

## 🔒 プライバシー

- 学習進捗・人事情報は機密
- Claude の学習データに使われません
- ローカル保存のみ

---

## ハイブリッド構成

- 本体: 教育支援
- `learning-advisor-advocate`: 学習効果・公平性・実現可能性 DA

---

## 対応領域

### 個人向け
- スキルアップ計画
- 学習ロードマップ
- 教材推奨（都度最新調査）
- 学習習慣化
- 資格取得支援
- 読書計画

### 組織向け
- カリキュラム設計
- 新人オンボーディング
- 管理職研修
- 技術研修
- ソフトスキル研修
- 評価制度設計
- メンタリング制度

### 両方
- 学習効果測定
- フィードバック設計
- LMS 選定

---

## セットアップ

```
教育・学習支援 セットアップして
```

### 最初に丁寧に意図確認
1. 誰の学習？
2. 何を達成したい？
3. 期間・ペース
4. 予算・リソース

---

## 使い方

### 個人向け
```
学習計画立てたい
スキルアップしたい
{技術}の学習ロードマップ
資格取得の計画
```

### 組織向け
```
新人研修プログラム設計
管理職研修カリキュラム
スキル評価制度作りたい
```

### 教材推奨
```
{スキル}の教材おすすめして
```

### フィードバック
```
1on1 のフィードバック設計
```

---

## 活用する学習理論

- 成人学習（アンドラゴジー）: 自己主導・経験活用
- 学習科学: アクティブリコール・間隔反復
- ブルームのタキソノミー: 6段階の認知レベル
- 70:20:10: 実務 70・他者 20・研修 10
- カークパトリック4段階評価
- ADDIE モデル: 教育設計プロセス
- フロー理論: スキル ≈ 難易度

詳細は `references/learning-theory.md`。

---

## ファイル構成

```
.claude/
├── skills/learning-advisor/
│   ├── SKILL.md
│   ├── README.md
│   ├── references/
│   │   ├── wizard-setup.md
│   │   ├── function-intent-check.md    ⭐ 最重要
│   │   ├── function-personal-plan.md
│   │   ├── function-curriculum.md
│   │   ├── function-onboarding.md
│   │   ├── function-leadership.md
│   │   ├── function-material-recommend.md
│   │   ├── function-skill-assessment.md
│   │   ├── function-feedback.md
│   │   ├── function-habit-form.md
│   │   ├── learning-theory.md          ⭐
│   │   └── tool-landscape.md
│   └── templates/
│       ├── config.template.yaml
│       ├── learning-plan.template.md
│       ├── curriculum.template.md
│       ├── onboarding-plan.template.md
│       └── skill-matrix.template.md
└── agents/
    └── learning-advisor-advocate.md
```

---

## DA の観点

- 学習効果（成人学習理論との整合）
- 公平性（全対象者がアクセス可能か）
- 現実性（時間・コスト・リソース）
- 動機付け（内発的動機）
- 評価の妥当性
- 労働法上の配慮

---

## よくある質問

### Q. 個人と組織、どう使い分ける？
セットアップの BQ1 で「誰の学習？」で分岐。同じスキルでも提案が違います。

### Q. 学習スタイル診断はある？
セットアップで確認。ただし「学習スタイル理論」は科学的根拠が弱いとする研究もあるため、1要素として参考程度に扱います（科学的根拠は `learning-theory.md` 参照）。

### Q. 教材推奨は？
都度最新情報で推奨。ただし、最終的な選択はユーザーに任せます。

### Q. 研修で強制すべき？
強制は逆効果の可能性あり。DA が警告します。内発的動機を重視した設計を推奨。

### Q. やめたくなったら？
`rm -rf ./.learning-advisor/`（Windowsは `Remove-Item -Recurse -Force ./.learning-advisor/`） で完全削除。
