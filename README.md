# PasukanYerusSolo — Job Portal

Portal lowongan kerja berbasis web dengan tiga peran pengguna: **Pelamar**, **Perusahaan (HRD)**, dan **Admin**.  
Dibangun dengan React + Node.js + Express + MySQL.

---

## Fitur

### Role: Pelamar
- Registrasi & login akun
- Walkthrough 3-step onboarding untuk pengunjung baru
- Jelajahi & cari lowongan kerja (filter kategori/tipe, sortir: terbaru, gaji, A-Z)
- Lihat detail lowongan dengan informasi perusahaan (logo, nama, bidang, lokasi, telepon, deskripsi)
- Info perusahaan lengkap di modal popup (klik "Lihat info" pada card perusahaan)
- Simpan lowongan favorit ⭐
- Lamar pekerjaan (upload CV .pdf max 2MB + pesan tambahan)
- Lacak status lamaran (Menunggu → Review → Interview → Lolos/Gagal)
- Update profil (foto, telepon, keahlian, tentang saya)

### Role: Perusahaan / HRD
- Dashboard khusus: kelola lowongan & lihat lamaran masuk
- Publikasi, edit, & hapus lowongan
- **Company Branding**: atur logo, nama, lokasi, deskripsi budaya, bidang, & no telepon
- Input gaji otomatis format Rupiah (Rp xxx.xxx)
- Input kategori lowongan dengan dropdown 13 opsi + custom input
- Informasi branding muncul otomatis di kartu lowongan & modal info perusahaan
- Update status lamaran (Menunggu → Review → Interview → Lolos/Gagal)

### Role: Admin
- Dashboard statistik (total pengguna, perusahaan, pelamar, lowongan, lamaran)
- Kelola pengguna (filter role, cari, sort, edit, hapus, ubah role)
- Kelola lowongan (filter kategori, cari, sort, edit, hapus)
- Kelola lamaran (filter status, cari, sort, update status)
- Kelola testimonial (filter aktif/nonaktif, cari, sort, edit, hapus, toggle status)
- Tampilan responsif: tabel desktop ↔ kartu mobile

### Fitur Umum
- Walkthrough interaktif (3 slide) untuk pengunjung baru
- Dark/light theme 🌙☀️ via ThemeContext
- Mobile responsive dengan bottom navigation
- Icons: Heroicons v2 outline (`@heroicons/react/24/outline`)
- Notifikasi modal untuk login, register, & logout
- Scroll-to-top otomatis setiap navigasi
- Footer dengan 5 tautan: Tentang Kami, Kebijakan Privasi, S&K, Karier, FAQ
- Axios instance dengan JWT interceptor untuk API calls

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 19, React Router 7, Axios, Heroicons v2 |
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

- Frontend (Nginx): `http://localhost:3005`
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

### Frontend API URL

Di `src/services/api.js`, base URL backend ditentukan secara dinamis:

```
REACT_APP_API_URL=http://localhost:5005/api   # via .env
Fallback: https://backend-pasukanyerussolo-production.up.railway.app/api
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
| `testimonials` | Testimonial landing page |

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

### Migrations & Seeders

```
backend/
├── migrations/
│   └── create_testimonials.sql     # Migration table testimonials
└── seeders/
    └── seedData.js                 # Data seeder
```

---

## API Endpoints

### Auth
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
| POST | `/api/jobs` | ✓ | Buat lowongan (general) |

### Lowongan (Authenticated / HRD)
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

### Lamaran & Apply
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | `/api/apply` | Pelamar | Kirim lamaran + CV (.pdf max 2MB) |
| GET | `/api/apply` | Pelamar | Lamaran user sendiri |
| GET | `/api/lamaran` | Pelamar | Status lamaran user |
| GET | `/api/lamaran/hrd` | Perusahaan | Lamaran masuk ke perusahaan |
| PATCH | `/api/lamaran/:id` | Perusahaan | Update status lamaran |
| POST | `/api/auth/apply` | Pelamar | Kirim lamaran (via auth routes) |
| GET | `/api/auth/hrd/applications` | Perusahaan | Lamaran masuk (via auth routes) |
| PATCH | `/api/auth/hrd/lamaran/:id` | Perusahaan | Update status lamaran (via auth routes) |

### Favorit
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/favorit` | ✓ | Favorit user |
| POST | `/api/favorit` | ✓ | Tambah favorit |
| DELETE | `/api/favorit/:id_lowongan` | ✓ | Hapus favorit |
| GET | `/api/favorit/cek/:id_lowongan` | ✓ | Cek status favorit |

### Admin
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/admin/stats` | Admin | Statistik dashboard |
| GET | `/api/admin/users` | Admin | Semua user |
| GET | `/api/admin/users/:id` | Admin | Detail user |
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

### Testimonials
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/testimonials` | - | Testimonial landing page (active only) |
| POST | `/api/testimonials` | ✓ | Tambah testimonial |

---

## Frontend Routes

| Path | Component | Access |
|---|---|---|
| `/` | WalkthroughPage (3-step onboarding) | Public |
| `/home` | HomePage (Hero, JobServices, JobList, Testimonials, CTA) | Public |
| `/eksplorasi` | EksplorasiPage (JobListContainer full) | Public |
| `/job/:id` | JobDetailWrapper | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/hrd/dashboard` | JobPublisher | Perusahaan |
| `/hrd/branding` | CompanyBrandingForm | Perusahaan |
| `/favorit` | FavoriteListContainer | Pelamar |
| `/status-lamaran` | StatusTracker | Pelamar |
| `/profile` | ProfileContainer | Semua role |
| `/admin/dashboard` | AdminDashboard | Admin |
| `/tentang-kami` | InfoPage | Public |
| `/kebijakan-privasi` | InfoPage | Public |
| `/syarat-ketentuan` | InfoPage | Public |
| `/karier` | InfoPage | Public |
| `/faq` | InfoPage | Public |

---

## Struktur Proyek

```
job-portal-project/
├── backend/
│   ├── config/            # db.js (MySQL pool), test.js
│   ├── controllers/       # Auth, Job, HRD, Admin, Application, Favorit, Testimonial, Profile
│   ├── middleware/         # auth (JWT), authorize (role), upload (Multer), validator, errorMiddleware
│   ├── routes/            # auth, jobs, apply, lamaran, favorit, admin, testimonial
│   ├── migrations/        # create_testimonials.sql
│   ├── seeders/           # seedData.js
│   ├── uploads/           # file uploads (logo, cv, foto)
│   ├── server.js          # entry point (Express)
│   ├── package.json
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js              # Routing, HomePage, EksplorasiPage, AppLayout
│       ├── main.jsx            # Entry point (React 19 createRoot)
│       ├── context/            # ThemeContext (dark/light)
│       ├── services/           # api.js (Axios instance with JWT interceptor)
│       ├── utils/              # formatRupiah.js
│       ├── Layout/             # Layout wrapper (Navbar + Container + Footer)
│       ├── components/         # Navbar, Footer, Container, Modal, auth, jobs, ScrollReveal, PageTransition
│       ├── features/
│       │   ├── landing/        # Hero, HowItWorks, JobServices, Testimonials, FAQ, CTA, Walkthrough
│       │   ├── eksplorasi/     # JobListContainer, FilterBox, ApplyJobForm, FavoriteListContainer
│       │   ├── hrd/            # JobPublisher, FormLowongan, FormLowonganControlled, ApplicationStatusTracker
│       │   ├── dashboard/      # CompanyBrandingForm, ProfileContainer, AdminDashboard, AdminStatsView, Sidebar, ThemeToggle
│       │   ├── applications/   # ApplyJobForm, StatusTracker, FavoriteService
│       │   └── lamaran/        # ApplyJobForm, FavoriteHandler, FavoriteService (legacy)
│       └── pages/              # WalkthroughPage, Home, LandingPage, LoginPage, RegisterPage, InfoPage
├── docker-compose.yml
├── dump-*.sql
└── README.md
```

---

## Lisensi

Proyek ini dikembangkan untuk keperluan tugas akhir / portofolio.
