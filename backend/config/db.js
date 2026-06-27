// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    // Menyesuaikan otomatis dengan variabel yang disediakan MySQL Railway
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || 'admin123',
    database: process.env.MYSQLDATABASE || 'job_portal_db',
    port: process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

// Mengecek koneksi saat server pertama kali jalan
const promisePool = pool.promise();
promisePool.query('SELECT 1 + 1 AS result')
  .then(() => console.log('Koneksi Database MySQL/MariaDB Berhasil ✅'))
  .catch(err => console.error('Koneksi Gagal ❌:', err.message));

module.exports = promisePool;