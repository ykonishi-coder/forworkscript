# セッション運用ルール

セッション名(タイトル)の先頭には、実行環境に応じて次のプレフィックスを必ず付けること。

| 実行環境 | プレフィックス |
|---|---|
| ユーザーのPC(ローカル端末) | `[MTG]` |
| クラウド(claude.ai の cloud container) | `[Cloud]` |

- 例: `[Cloud] 自社製品のクレーム対応`
- 判定は `get_session` の `environment_kind` で行う(`anthropic_cloud` ならクラウド)。
- セッション開始時に `set_session_title` でタイトルを確認・設定する。
