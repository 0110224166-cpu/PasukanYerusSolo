// config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

const promisePool = pool;
promisePool.query('SELECT 1 + 1 AS result')
  .then(() => console.log('Koneksi Database MySQL/MariaDB Berhasil ✅'))
  .catch(err => console.error('Koneksi Gagal ❌:', err.message));

module.exports = promisePool;