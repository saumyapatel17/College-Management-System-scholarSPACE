const mysql = require('mysql');
const dotenv = require("dotenv");

dotenv.config({
  path: './sys.env'
});

const conn = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.pass,
  database: process.env.database
});

conn.connect(function (err) {
  if (err) throw err;
  console.log('Database Connected');
});

module.exports = conn;