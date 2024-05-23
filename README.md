### 
# tz_expressjs
### 

---

ExpressはNode.js上で動作する軽量かつ柔軟なWebアプリケーションフレームワークで、簡単にHTTPサーバーを構築するための機能を提供します。

### Expressの特徴

軽量で柔軟: 必要な機能だけを選んで使用できるため、シンプルなアプリケーションから複雑なアプリケーションまで幅広く対応できます。
ミドルウェアのサポート: リクエストの処理過程で様々な機能を追加することができ、再利用可能なミドルウェアを利用することで効率的な開発が可能です。
ルーティング: URLパスとHTTPメソッドに基づいてリクエストを処理するルーティング機能が豊富です。
テンプレートエンジンの統合: EJS、Pug、Handlebarsなどのテンプレートエンジンと簡単に統合できます。

### コードの概要

このプロジェクトのserver.tsファイルでは、以下のようにExpressを使用しています。

### Expressのインポートとアプリケーションの作成:
```
import express from 'express';
const app = express();
```
### 静的ファイルの提供:
```
app.use(express.static('public'));
```
### ルートの設定:

### ディレクトリ内のファイルリストを表示するルート:
```
app.get('/', (req, res) => {
    fs.readdir(DIRECTORY_PATH, (err, files) => {
        // ファイルリストの生成と送信
    });
});
```
### 指定されたファイルを表示するルート:
```
app.get('/file/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(DIRECTORY_PATH, fileName);
    fs.readFile(filePath, 'utf8', (err, data) => {
        // ファイル内容の送信
    });
});
```
### サーバーの起動:
```
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
```
### まとめ

このプロジェクトではExpressを使用して、指定されたディレクトリ内のファイルリストを表示し、MarkdownファイルをHTML化して表示する機能を実装しています。

Expressは簡潔なAPIと豊富な機能を提供するため、このような用途には非常に適しています。

---
