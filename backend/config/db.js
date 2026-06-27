// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Kode untuk mengetes koneksi saat server pertama kali menyala
pool.getConnection()
    .then(connection => {
        console.log("Koneksi Database Berhasil!  Sukses Terhubung.");
        connection.release();
    })
    .catch(err => {
        console.error("Koneksi Gagal : ", err.message);
    });

module.exports = pool;

// Mengecek koneksi saat server pertama kali jalan
const promisePool = pool.promise();
promisePool.query('SELECT 1 + 1 AS result')
  .then(() => console.log('Koneksi Database MySQL/MariaDB Berhasil ✅'))
  .catch(err => console.error('Koneksi Gagal ❌:', err.message));

module.exports = promisePool;