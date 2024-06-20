const path = require('path');
const express = require('express');
const nmap = require('node-nmap');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "nmap_web"
});

// ----- //
connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

const PORT = process.env.PORT || 3010;
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/nmap', (req, res) => {

    let scan_target = req.query.target;
    let target_id = req.query.id;

    const sql = `SELECT param FROM nmap_commands WHERE id = ${target_id}`;

    connection.query(sql, function (err, result) {
        if (err) res.json('Произошла ошибка при запросе БД');

        let param = result[0].param;
        const osandports = new nmap.NmapScan(scan_target, param);
        osandports.on('complete', function (data) {
            res.json(data);
        });

        osandports.on('error', function (error) {
            res.status(500).json({ error: error });
        });

        osandports.startScan();
    });
});

app.post('/command_add', (req, res) => {
    //const formData = req.body;

    let description_command = req.body.description_command;
    let params = req.body.params;

    const sql = `INSERT INTO nmap_commands (description_command, param) VALUES ('${description_command}', '${params}')`;

    connection.query(sql, function (err, results) {
        if (err) res.json('Произошла ошибка при добавлении команды');
        res.json('Команда успешно добавлена');
    });

    //connection.end();
});

app.get('/commands', (req, res) => {

    const sql = `SELECT * FROM nmap_commands`;

    connection.query(sql, function (err, results) {
        if (err) res.json(err);

        res.json(results);
    });

    //connection.end();
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`);
});
