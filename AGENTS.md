# AGENTS.md

## 前提
- 環境: Mac
- ディレクトリ: リポジトリルート

## 絶対ルール
- main へ直push禁止。必ず feature/* ブランチで作業し、PRで納品する。
- 依存は必要最小限。
- Secrets/.env/個人情報はコミット禁止。
- アプリ本体は app/ 配下に閉じ込める。

## コマンド
- テスト: `cd app && npm test`
- ビルド: `cd app && npm run build`
- 起動: `cd app && npm run dev`
