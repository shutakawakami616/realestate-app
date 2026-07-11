# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このリポジトリは不動産関連アプリケーション（realestate-app）です。現時点ではプロジェクトの初期化段階であり、具体的な技術スタックやディレクトリ構成はまだ確立されていません。今後コードが追加された際は、このファイルにビルド・テスト・実行コマンドやアーキテクチャの概要を追記してください。

## デプロイ情報

- 本番URL: https://realestate-app-jade-xi.vercel.app
- Supabaseプロジェクト名: realestate-app

## Git運用ルール

- **コードを変更するたびに、必ず変更内容をコミットし、GitHubのリモートリポジトリ（`origin`）へプッシュすること。** 変更を作業ツリーに残したまま次のタスクに進まない。
- リモートリポジトリ: `https://github.com/shutakawakami616/realestate-app.git`
- コミットメッセージは変更内容が分かるよう簡潔に記述する（日本語・英語いずれでも可）。
- 作業は基本的に `main` ブランチに対して行い、プッシュ前に `git status` / `git diff` で変更内容を確認する。
- 破壊的操作（`git push --force`、`git reset --hard` など）は明示的な指示がない限り実行しない。
