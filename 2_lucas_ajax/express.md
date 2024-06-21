###
#
###

---
---

了解しました。`index.html`をそのまま使用しつつ、Express.js側でAjaxリクエストを処理する方法を説明します。

まず、`server.js`ファイルを次のように編集します：

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const { performance } = require('perf_hooks');

const app = express();
const port = 3000;

// body-parserを使用してJSONをパースする設定
app.use(bodyParser.json());

// 静的ファイル（HTML、CSS、JavaScript）を提供するためのミドルウェア
app.use(express.static('public'));

// Lucas数を計算する関数
function calculateLucasNumber(n) {
    if (n === 0) return 2;
    if (n === 1) return 1;
    let a = 2, b = 1, temp;
    for (let i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

// POSTリクエスト '/calculate' を処理する
app.post('/calculate', (req, res) => {
    const { n } = req.body;
    
    // 計算開始時刻を記録
    const startTime = performance.now();
    
    // Lucas数を計算
    const result = calculateLucasNumber(parseInt(n));
    
    // 計算終了時刻を記録し、処理時間を計算
    const endTime = performance.now();
    const processTime = endTime - startTime;
    
    // 結果と処理時間をJSON形式で返す
    res.json({ result, process_time: processTime });
});

// サーバーを起動する
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
```

この`server.js`では、先ほどと同様に、`/calculate`エンドポイントでPOSTリクエストを受け取り、Lucas数を計算して結果と処理時間をJSON形式でクライアントに返します。

`index.html`は次のようにそのまま使用します：

```html
<!DOCTYPE html>
<html>

<head>
    <title>Lucas Number Calculator</title>
</head>

<body>
    <p>AJAX Lucas Number</p>
    <input type="number" id="inputN" placeholder="Enter a number">
    <button onclick="sendRequest()">Calculate</button>
    <div id="result"></div>
    <div id="time"></div>

    <script>
        function sendRequest() {
            const n = document.getElementById('inputN').value;
            fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ n })
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('result').innerText = `Lucas Number L${n} = ${data.result}`;
                    document.getElementById('time').innerText = `Time: ${(data.process_time / 1000).toFixed(3)} sec`;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    </script>
</body>

</html>
```

この`index.html`は、`/calculate`エンドポイントに対してPOSTリクエストを送信し、サーバーから返された結果を表示します。Express.jsサーバーは`server.js`で定義されているので、このコードを実行すると、期待通りに動作するはずです。

---

Express.jsを使用してHTMLファイルをホストする方法について説明します。

まず、Express.jsがインストールされていることを確認してください。インストールされていない場合は、次のコマンドでインストールします：

```
npm install express
```

次に、以下のような基本的なディレクトリ構造を持つプロジェクトを作成します：

```
project-root/
  |- node_modules/
  |- public/
      |- index.html
  |- server.js
  |- package.json
```

1. **index.html**: ホストするHTMLファイルです。`public`ディレクトリ内に配置します。

2. **server.js**: Expressサーバーの設定ファイルです。

3. **package.json**: プロジェクトの依存関係やスクリプトを管理するためのファイルです。

次に、`server.js`ファイルに以下のようにExpressアプリケーションを設定します：

```javascript
const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // 任意のポート番号を指定します

// 静的ファイル（HTML、CSS、JavaScriptファイル）を提供するためのミドルウェアを設定します
app.use(express.static(path.join(__dirname, 'public')));

// サーバーを起動します
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

これで、Expressは`public`ディレクトリ内の静的ファイル（ここでは`index.html`）を提供するように設定されます。

最後に、ターミナルで次のコマンドを実行してExpressサーバーを起動します：

```
node server.js
```

これで、`http://localhost:3000`にアクセスすると、`public`ディレクトリ内の`index.html`が表示されます。

Express.jsを使用すると、静的ファイル（HTML、CSS、JavaScriptなど）のホスティングが簡単に設定できます。

---
