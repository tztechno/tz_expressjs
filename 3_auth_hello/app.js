const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// bodyParserの設定
app.use(bodyParser.urlencoded({ extended: true }));

// セッション設定
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// ユーザー認証のミドルウェア
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        console.log('User is authenticated');
        next();
    } else {
        res.redirect('/login');
    }
};

// ルートページ
app.get('/', (req, res) => {
    res.redirect('/hello');
});

// ログインページ
app.get('/login', (req, res) => {
    res.send(`
    <h1>Login</h1>
    <form method="post" action="/login">
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  `);
});

// ログイン処理
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // ここでユーザー情報の照合を行う
    if (username === 'admin' && password === 'password') {
        req.session.user = { username };
        res.redirect('/hello');
    } else {
        res.redirect('/login');
    }
});

// 認証が必要な「Hello, World!」ページ
app.get('/hello', isAuthenticated, (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
