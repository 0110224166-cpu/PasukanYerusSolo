// backend/controllers/JobController.js
const pool = require('../config/db');

exports.index = async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT l.id_lowongan as id, l.judul_posisi as title, l.kategori, 
            l.tipe_pekerjaan as type, l.gaji, l.deskripsi_pekerjaan as deskripsi,
            l.created_at, pp.nama_perusahaan, pp.logo, pp.lokasi
            FROM lowongan l
            LEFT JOIN profil_perusahaan pp ON l.id_perusahaan = pp.id_user
        `);
        res.json({ data: rows });
    } catch (err) { next(err); }
};

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(`
            SELECT l.id_lowongan as id, l.judul_posisi as title, l.kategori, 
            l.tipe_pekerjaan as type, l.gaji, l.deskripsi_pekerjaan as deskripsi,
            pp.nama_perusahaan, pp.logo, pp.lokasi, pp.deskripsi_budaya,
            pp.no_telepon, pp.bidang
            FROM lowongan l
            LEFT JOIN profil_perusahaan pp ON l.id_perusahaan = pp.id_user
            WHERE l.id_lowongan = ?`, [id]
        );
        res.json({ data: rows[0] });
    } catch (err) { next(err); }
};

exports.store = async (req, res, next) => {
    try {
        // Tambahkan logika insert data Anda di sini
        // const { judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan } = req.body;
        // await pool.query("INSERT INTO lowongan ...", [...]);
        res.status(201).json({ message: "Berhasil menambahkan lowongan" });
    } catch (err) { next(err); }
};