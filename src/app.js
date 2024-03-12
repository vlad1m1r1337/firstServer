const http = require('http');
const getUsers = require('./modules/users');
const url = require('url');
const { URLSearchParams } = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const searchParams = new URLSearchParams(parsedUrl.query);
    console.log(parsedUrl.query);

    for (const key of searchParams.keys()) {
        if (key !== 'hello' && key !== 'users') {
            res.statusCode = 500;
            res.statusMessage = "Bad Request";
            res.header = "Content-Type: text/plain";
            res.write("");
            res.end();
            return;
        }
    }

    if (searchParams.get('hello') !== null) {
        if (parsedUrl.query.hello) {
            res.statusCode = 200;
            res.statusMessage = "OK";
            res.header = "Content-Type: text/plain";
            res.write("Hello " + parsedUrl.query.hello);
            res.end();
            return;
        }
        else {
            res.statusCode = 400;
            res.statusMessage = "Bad Request";
            res.header = "Content-Type: text/plain";
            res.write("Enter a name");
            res.end();
            return;

        }
    }
    if ('users' in parsedUrl.query) {
        res.statusCode = 200;
        res.statusMessage = "OK";
        res.header = "Content-Type: application/json";
        res.write(getUsers());
        res.end();

        return;
    }
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.header = "Content-Type: text/plain";
    res.write("Hello, World!");
    res.end();
})

server.listen(3003, () => console.log("Сервер запущен по адресу http://localhost:3003/"));