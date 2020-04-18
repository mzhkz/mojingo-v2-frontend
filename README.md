## Mojingo-V2-FrontEnd

### Using framework and libraries.
- Vue(2.6.11)
- Vue Router (3.1.5)
- Vuex (3.1.)
- jQuery (3.3.1)
- Axios (0.18.0)
- Webpack4 (4.20.2)

### Command
|Command|Description|
|:---|:---|
|yarn start|開発用サーバを起動する(ライブリロードあり)|
|yarn server|Expressを起動(事前に本番ファイルを生成する必要あり)|
|yarn build:dev|開発用のファイルを出力する|
|yarn build:prod|本番用のファイルを出力する|


### Environments Settings
|ENV|Type|Description|DEFAULT|
|:---|:---|:---|:---|
|MOJINGOV2_API_BASE_URL|string|接続するAPIサーバー|https://api-v2.mojingo.me|
|MOJINGOV2_APP_SERVICE_ACCOUNT|string|GOOGLE_SPREADSHEET共有先アカウント（CORS）|sheet-request@****.iam.gserviceaccount.com|
|MOJINGOV2_APP_EXPRESS_HOST|string|フロントエンドサーバーホスト|0.0.0.0|
|MOJINGOV2_APP_EXPRESS_PORT|int|フロントエンドサーバーポート|8888|
|NODE_ENV|string|ステージング設定(WebPackのみ)|development|

