mkdir my-blog
cd my-blog
npm init -y
npm install express ejs body-parser mongoose

cd my-blog
node app.js

http://localhost:3000

# localhost で接続が拒否されました。

my-blog/
├── views/
│   ├── index.ejs
│   ├── post.ejs
│   └── new.ejs
├── public/
│   └── styles.css
├── models/
│   └── post.js
├── app.js
└── package.json