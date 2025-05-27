const http = require('http');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const serveStatic = require('serve-static');

const publicDirectory = path.join(__dirname, './'); // Папка с вашими статическими файлами

// Создаем сервер
const server = http.createServer((req, res) => {
    // Подключаем middleware для сжатия
    compression()(req, res, () => {
        // Обслуживаем статичные файлы из папки public
        serveStatic(publicDirectory)(req, res, () => {
            // Если файл не найден
            res.statusCode = 404;
            res.end('File not found');
        });
    });
});

// Порт, на котором будет работать сервер
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});