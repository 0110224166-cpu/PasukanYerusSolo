# PasukanYerusSolo — Job Portal

Portal lowongan kerja berbasis web dengan tiga peran pengguna: **Pelamar**, **Perusahaan (HRD)**, dan **Admin**.  
Dibangun dengan React + Node.js + Express + MySQL.

---

## Fitur

### Role: Pelamar
- Registrasi & login akun
- Jelajahi & cari lowongan kerja (filter kategori/tipe, sortir: terbaru, gaji, A-Z)
- Lihat detail lowongan dengan informasi perusahaan (logo, nama, bidang, lokasi, telepon, deskripsi)
- Info perusahaan lengkap di modal popup (klik "Lihat info" pada card perusahaan)
- Simpan lowongan favorit ⭐
- Lamar pekerjaan (upload CV + pesan tambahan)
- Lacak status lamaran (Menunggu → Review → Interview → Lolos/Gagal)
- Update profil (foto, telepon, keahlian, tentang saya)

### Role: Perusahaan / HRD
- Dashboard khusus: kelola lowongan & lihat lamaran masuk
- Publikasi, edit, & hapus lowongan
- **Company Branding**: atur logo, nama, lokasi, deskripsi budaya, bidang, & no telepon
- Input gaji otomatis format Rupiah (Rp xxx.xxx)
- Input kategori lowongan dengan dropdown 13 opsi + custom input
- Informasi branding muncul otomatis di kartu lowongan & modal info perusahaan

### Role: Admin
- Dashboard statistik (total pengguna, perusahaan, pelamar, lowongan, lamaran)
- Kelola pengguna (filter role, cari, sort, edit, hapus, ubah role)
- Kelola lowongan (filter kategori, cari, sort, edit, hapus)
- Kelola lamaran (filter status, cari, sort, update status)
- Kelola testimonial (filter aktif/nonaktif, cari, sort, edit, hapus, toggle status)
- Tampilan responsif: tabel desktop ↔ kartu mobile

### Fitur Umum
- Walkthrough interaktif (3 slide) untuk pengunjung baru
- Dark/light theme 🌙☀️
- Mobile responsive dengan bottom navigation
- Notifikasi modal untuk login, register, & logout
- Scroll-to-top otomatis setiap navigasi
- Footer dengan 4 tautan: Tentang Kami, Kebijakan Privasi, S&K, FAQ

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 19, React Router 7, Axios |
| Backend | Node.js, Express 5 |
| Database | MySQL / MariaDB |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| File Upload | Multer (logo, CV, foto profil) |
| Container | Docker + docker-compose |

---

## Prasyarat

- Node.js v18+
- MySQL / MariaDB (atau Docker)
- npm atau yarn

---

## Instalasi & Menjalankan

### 1. Clone & masuk direktori

```bash
git clone <repo-url>
cd job-portal-project
```

### 2. Setup Database

**Opsi A — Pakai Docker (recommended):**

```bash
docker compose up -d db
```

**Opsi B — Manual:**

Buat database `job_portal_db`, lalu import:

```bash
mysql -u root -p job_portal_db < dump-job_portal_db-202604171944.sql
```

### 3. Backend

```bash
cd backend
cp .env.example .env   # lalu isi konfigurasi database
npm install
node server.js
```

Server berjalan di `http://localhost:5005`

### 4. Frontend

```bash
cd frontend
npm install
npm start
```

Aplikasi terbuka di `http://localhost:3000`

### 5. Docker (semua service)

```bash
docker compose up -d
```

- Frontend: `http://localhost:3005`
- Backend API: `http://localhost:5006`
- MySQL: `localhost:3307`

---

## Konfigurasi Environment

### Backend `.env`

```
PORT=5005
JWT_SECRET=bebasapasaja123
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin123
DB_DATABASE=job_portal_db
DB_PORT=3306
```

---

## Database Schema

### Tabel

| Tabel | Keterangan |
|-------|-----------|
| `users` | User (Pelamar, Perusahaan, Admin) |
| `lowongan` | Postingan lowongan pekerjaan |
| `profil_perusahaan` | Branding perusahaan (logo, nama, lokasi, deskripsi budaya, bidang, no_telepon) |
| `profil_pencari_kerja` | Profil pelamar (bio, pendidikan, pengalaman) |
| `lamaran` | Lamaran pekerjaan dengan status |
| `favorit` | Lowongan favorit (M:N users ↔ lowongan) |

### Relasi

```
users ──┬── lowongan (id_perusahaan → id_user)
        ├── profil_perusahaan (id_user)
        ├── profil_pencari_kerja (id_user)
        ├── lamaran (id_user)
        └── favorit (id_user)

lowongan ──┬── lamaran (id_lowongan)
           └── favorit (id_lowongan)
```

---

## API Endpoints

### Auth & Profile
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | `/api/auth/register` | - | Registrasi |
| POST | `/api/auth/login` | - | Login |
| GET | `/api/auth/me` | ✓ | Info user saat ini |
| GET | `/api/auth/profile` | ✓ | Profil lengkap |
| PUT | `/api/auth/profile` | ✓ | Update profil + foto |

### Lowongan (Public)
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/jobs` | - | Semua lowongan (dengan data branding) |
| GET | `/api/jobs/:id` | - | Detail lowongan (dengan branding) |

### Lowongan (Authenticated)
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/auth/jobs` | ✓ | Semua lowongan (tanpa branding) |
| POST | `/api/auth/hrd/jobs` | Perusahaan | Publikasi lowongan baru |
| GET | `/api/auth/hrd/jobs` | Perusahaan | Lowongan milik sendiri |
| PUT | `/api/auth/hrd/jobs/:id` | Perusahaan | Edit lowongan |
| DELETE | `/api/auth/hrd/jobs/:id` | Perusahaan | Hapus lowongan |

### Company Branding
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/auth/company/profile` | Perusahaan | Ambil profil perusahaan |
| PUT | `/api/auth/company/profile` | Perusahaan | Update branding (logo, nama, deskripsi, lokasi, bidang, no_telepon) |

### Lamaran
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | `/api/auth/apply` | Pelamar | Kirim lamaran + CV |
| GET | `/api/lamaran` | Pelamar | Status lamaran user |
| GET | `/api/auth/hrd/applications` | Perusahaan | Lamaran masuk |
| PATCH | `/api/auth/hrd/lamaran/:id` | Perusahaan | Update status lamaran |

### Favorit
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/favorit` | ✓ | Favorit user |
| POST | `/api/favorit` | ✓ | Tambah favorit |
| DELETE | `/api/favorit` | ✓ | Hapus favorit |

### Admin
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/admin/stats` | Admin | Statistik dashboard |
| GET | `/api/admin/users` | Admin | Semua user |
| PUT | `/api/admin/users/:id` | Admin | Edit user |
| DELETE | `/api/admin/users/:id` | Admin | Hapus user |
| GET | `/api/admin/jobs` | Admin | Semua lowongan (dengan nama perusahaan) |
| PUT | `/api/admin/jobs/:id` | Admin | Edit lowongan |
| DELETE | `/api/admin/jobs/:id` | Admin | Hapus lowongan |
| GET | `/api/admin/applications` | Admin | Semua lamaran |
| PATCH | `/api/admin/applications/:id` | Admin | Update status lamaran |
| GET | `/api/admin/testimonials` | Admin | Semua testimonial |
| PUT | `/api/admin/testimonials/:id` | Admin | Edit testimonial |
| DELETE | `/api/admin/testimonials/:id` | Admin | Hapus testimonial |
| GET | `/api/admin/my-profile` | Admin | Profil admin |

### Testimonials
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/testimonials` | - | Testimonial landing page |

---

## Struktur Proyek

```
job-portal-project/
├── backend/
│   ├── config/            # db.js, test.js
│   ├── controllers/       # auth, Job, HRD, Admin, etc
│   ├── middleware/         # auth, authorize, upload, validator
│   ├── routes/            # auth, jobs, lamaran, admin, etc
│   ├── uploads/           # file uploads (logo, cv, foto)
│   ├── server.js          # entry point
│   ├── package.json
│   └── .env
├── frontend/
│   └── src/
│       ├── components/    # auth, jobs (JobCard, JobDetail), Modal, Navbar, Footer
│       ├── context/       # ThemeContext
│       ├── features/      # landing, eksplorasi, hrd, dashboard, lamaran
│       ├── pages/         # Walkthrough, Info, Home, Login, Register
│       ├── utils/         # formatRupiah.js (shared Rupiah formatting)
│       ├── services/      # api.js (axios instance)
│       └── App.js         # routing & layout
├── docker-compose.yml
├── dump-*.sql
└── README.md
```

---

## Lisensi

Proyek ini dikembangkan untuk keperluan tugas akhir / portofolio.
