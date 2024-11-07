# yi7242/sb2md
フォーク元処理を一部変更
- 編集日時のタイムスタンプを生成したファイルにも設定
- （画像ダウンロード処理がうまく動かないため）画像リンクはそのままに

## Usage

1. Download your scrapbox data as a json file
1. Run `npm run build`
1. Run `node dist/index.js <your_file>.json`
1. The converted markdown files will be saved to `output/`
