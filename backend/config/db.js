// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    database: process.env.MYSQLDATABASE || 'nama_db_lokal_kamu',
    port: process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Cara tes koneksi yang benar untuk versi promise tanpa bikin crash
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Koneksi Database Berhasil! Sukses Terhubung ke MySQL Railway.");
        connection.release();
    } catch (err) {
        console.error("Koneksi Gagal ke Database MySQL ❌: ", err.message);
    }
})();

module.exports = pool;
// Mengecek koneksi saat server pertama kali jalan
const promisePool = pool.promise();
promisePool.query('SELECT 1 + 1 AS result')
  .then(() => console.log('Koneksi Database MySQL/MariaDB Berhasil ✅'))
  .catch(err => console.error('Koneksi Gagal ❌:', err.message));

module.exports = promisePool;