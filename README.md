# Shoot Foldername Generator

撮影データのフォルダ名を規定のフォーマットで生成するツール。

## 構成
- `app/`: アプリケーション本体 (Vite + Vanilla JS)

## 機能
- 日付・コード・氏名からフォルダ名を自動生成
- 生成名をワンクリックでコピー（失敗時は `Cmd+C` 誘導）
-macOS用 `pbcopy` コマンドの生成


## 開発
```bash
cd app
npm install
npm run dev
```

## テスト
```bash
cd app
npm test
```
