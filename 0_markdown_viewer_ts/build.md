
```
cd myapp
npm init -y
npm install express marked fs path
npm install typescript ts-node @types/node @types/express
npx tsc --init

cd myapp
npx tsc
node dist/server.js

http://localhost:3000
```
```
markdown-server/
├── src/
│   └── server.ts
├── dist/
│   └── server.js
├── node_modules/
├── package.json
└── tsconfig.json

src/: ソースコードを含むディレクトリ。TypeScriptファイル (.ts) が含まれる。
dist/: コンパイル後のJavaScriptファイルが出力されるディレクトリ。
node_modules/: インストールされた依存パッケージ。
package.json: プロジェクトの設定と依存パッケージの定義。
tsconfig.json: TypeScriptコンパイラの設定ファイル。
```
