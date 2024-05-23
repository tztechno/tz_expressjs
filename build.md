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
markdown-server/
├── src/
│   └── server.ts
├── dist/
│   └── server.js
├── node_modules/
├── package.json
└── tsconfig.json
```