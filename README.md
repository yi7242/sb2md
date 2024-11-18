# yi7242/sb2md
フォーク元処理を一部変更
- 編集日時のタイムスタンプを生成したファイルにも設定
- PrivateのProjectでも画像のダウンロードが可能に

## Usage

1. Download your scrapbox data as a json file
1. (Optional) Privateのプロジェクトから画像をダウンロードしたい場合、.envにconnect.sidを記入
    - Chrome Developers Toolsから取得可能
1. Run `npm i`
1. Run `npm run build`
1. Run `node dist/index.js <your_file>.json`
1. The converted markdown files will be saved to `output/`

## 注
wsl上で本スクリプトを実行した場合、デスクトップへフォルダをコピーすると更新日時のタイムスタンプが現在の日時にリセットされてしまう。`copywithtimestamp.sh`のように`cp --preserve=timestamps`とcpコマンドを実行することで対策可能。