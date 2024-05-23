"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const marked_1 = require("marked");
const app = (0, express_1.default)();
const PORT = 3000;
const DIRECTORY_PATH = '/Users/shun_ishii/Downloads/doc';
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    fs_1.default.readdir(DIRECTORY_PATH, (err, files) => {
        if (err) {
            res.status(500).send('Unable to scan directory: ' + err);
            return;
        }
        const fileLinks = files.map(file => {
            const filePath = path_1.default.join(DIRECTORY_PATH, file);
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
    const filePath = path_1.default.join(DIRECTORY_PATH, fileName);
    fs_1.default.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Unable to read file: ' + err);
            return;
        }
        if (fileName.endsWith('.md')) {
            const htmlContent = (0, marked_1.marked)(data);
            res.send(`
                <html>
                <head><title>${fileName}</title></head>
                <body>
                    ${htmlContent}
                </body>
                </html>
            `);
        }
        else {
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
