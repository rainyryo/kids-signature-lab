# Kids Signature Lab ✍️

子供向けの「筆記体サイン練習」Webアプリです。

## できること

- 名前からサイン見本を生成（かわいい/かっこいいフォント切替）
- タブレット+スタイラスでトレース練習（Canvas）
- 印刷用の練習シート生成
- PDF保存 / PNG保存

## ローカル起動

静的ファイルなので、そのまま `index.html` を開けば使えます。

## GitHub Pages デプロイ

1. このフォルダをGitHubリポジトリにpush
2. GitHubリポジトリの `Settings > Pages`
3. `Deploy from a branch` を選択
4. branch: `main` / folder: `/ (root)`
5. Save

反映後、`https://<username>.github.io/<repo>/` で公開されます。

## 次の改善候補

- サインの筆圧やペン先（太さ）調整
- 複数テンプレ（幼児向け/低学年向け/英字連結強化）
- データ保存（練習履歴）
- 日本語名→ローマ字自動変換
