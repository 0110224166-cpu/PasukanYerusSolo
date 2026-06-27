const pool = require('../config/db');

class TestimonialController {
  async getAllActive(req, res) {
    try {
      const [rows] = await pool.query(
        'SELECT id_testimoni, nama, role, perusahaan, teks, rating, created_at FROM testimonials WHERE is_active = 1 ORDER BY created_at DESC'
      );
      res.json(rows);
    } catch (err) {
      console.error('Get testimonials error:', err);
      res.status(500).json({ message: 'Gagal mengambil testimonial' });
    }
  }

  async create(req, res) {
    try {
      const { nama, role, perusahaan, teks, rating } = req.body;
      const id_user = req.user.id_user;

      if (!teks || !nama) {
        return res.status(400).json({ message: 'Nama dan teks testimonial wajib diisi' });
      }

      await pool.query(
        'INSERT INTO testimonials (id_user, nama, role, perusahaan, teks, rating) VALUES (?, ?, ?, ?, ?, ?)',
        [id_user, nama, role || null, perusahaan || null, teks, rating || 5]
      );

      res.status(201).json({ message: 'Testimonial berhasil dikirim dan menunggu persetujuan admin' });
    } catch (err) {
      console.error('Create testimonial error:', err);
      res.status(500).json({ message: 'Gagal mengirim testimonial' });
    }
  }
}

module.exports = new TestimonialController();
