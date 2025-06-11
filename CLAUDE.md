# 映画なにみる？ v2.0 - 映画情報・上映スケジュール検索アプリ

## プロジェクト概要
TMDb APIを使用した映画情報検索アプリケーション（v2.0）。
v1.0の機能に加えて、映画館の上映スケジュール検索機能を追加予定。
React + TypeScript + Viteで構築。

## 開発サーバーの起動
```bash
npm run dev
```

## ビルド
```bash
npm run build
```

## 型チェックとリント
```bash
npm run typecheck
npm run lint
```

## v1.0 継承機能
- 人気映画の表示
- 上映中映画の表示
- 映画タイトルによる検索
- ジャンル別検索
- 映画詳細情報の表示（キャスト、あらすじ、評価など）
- ページネーション
- レスポンシブデザイン

## v2.0 新機能（予定）
- 🎭 映画館検索機能
- 📅 上映スケジュール表示
- 📍 地域別映画館検索
- ⏰ 時間帯別上映検索
- 🎫 座席予約リンク連携

## 環境変数
`.env`ファイルに以下を設定：
- `VITE_TMDB_API_KEY`: TMDb APIキー
- `VITE_TMDB_BASE_URL`: https://api.themoviedb.org/3
- `VITE_TMDB_IMAGE_BASE_URL`: https://image.tmdb.org/t/p

## 技術スタック
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router v7
- Axios
- ESLint + Prettier