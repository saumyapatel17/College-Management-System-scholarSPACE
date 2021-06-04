const express = require("express");
const path = require("path");

const hostname = '127.0.0.1';
const port = 5000;

const app = express();

const publicDirectory = path.join(__dirname, './');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
