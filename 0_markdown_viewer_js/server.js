const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked'); // 修正ポイント

const app = express();
const PORT = 3000;
const DIRECTORY_PATH = '/Users/shun_ishii/Downloads/doc';

app.use(express.static('public'));

app.get('/', (req, res) => {
    fs.readdir(DIRECTORY_PATH, (err, files) => {
        if (err) {
            res.status(500).send('Unable to scan directory: ' + err);
            return;
        }

        const fileLinks = files.map(file => {
            const filePath = path.join(DIRECTORY_PATH, file);
            return `<li><a href="/file/${file}">${file}</a></li>`;
        }).join('');

        res.send(`
            <html>
            <head><title>File List</title></head>
            <body>
                <h1>Files in ${DIRECTORY_PATH}</h1>
                <ul>
                    ${fileLinks}
                </ul>
            </body>
            </html>
        `);
    });
});

app.get('/file/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(DIRECTORY_PATH, fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Unable to read file: ' + err);
            return;
        }

        if (fileName.endsWith('.md')) {
            const htmlContent = marked(data); // 修正後のコード
            res.send(`
                <html>
                <head><title>${fileName}</title></head>
                <body>
                    ${htmlContent}
                </body>
                </html>
            `);
        } else {
            res.send(`
                <html>
                <head><title>${fileName}</title></head>
                <body>
                    <pre>${data}</pre>
                </body>
                </html>
            `);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
