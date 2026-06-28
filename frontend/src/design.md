# Design System — PasukanYerusSolo

## 1. Brand Identity

### Nama
**PasukanYerusSolo** — Portal lowongan kerja berbasis Solo Raya.

### Font
- **Primary:** Plus Jakarta Sans (sans-serif)
- **Weight digunakan:** 700 (bold), 800 (extrabold), 900 (black)
- **Fallback:** `sans-serif`

### Palet Warna

| Token | Dark Mode | Light Mode | Usage |
|---|---|---|---|
| `bg-primary` | `#0c0a09` | `#f5f5f4` (stone-50) | Body & section background |
| `bg-card` | `#120b06` | `#ffffff` | Card, FAQ accordion, dll |
| `bg-elevated` | `#171717` (neutral-900) | `#e5e5e5` (neutral-200) | Social media icons, input fields |
| `text-primary` | `#fef3c7` (amber-50) | `#1c1917` (stone-900) | Heading utama |
| `text-secondary` | `#a8a29e` (stone-400) | `#57534e` (stone-600) | Paragraf & deskripsi |
| `text-muted` | `#78716c` (stone-500) | `#a3a3a3` (neutral-400) | Footer, copyright |
| `accent-start` | `#ea580c` (orange-600) | → | Start gradient |
| `accent-end` | `#f59e0b` (amber-500) | → | End gradient |
| `accent-solid` | `#ea580c` | → | Hover, active indicator |
| `danger` | `#ef4444` (red-500) | → | Tombol logout |
| `success` | `#4ade80` (green-400) | → | Subscribe success |
| `border` | `rgba(38,38,38,0.5)` | `rgba(229,229,229,0.5)` | Border global |

### Glassmorphism
- **Background:** `rgba(12, 10, 9, 0.85)` (dark) / `rgba(245, 245, 244, 0.85)` (light)
- **Backdrop filter:** `blur(16px)`
- **Border:** `1px solid` dengan opacity 0.5 sesuai tema
- **Box shadow:** Dark `0 8px 32px rgba(0,0,0,0.4)`, Light `0 8px 32px rgba(0,0,0,0.1)`

---

## 2. Layout & Responsive Breakpoints

### Breakpoints
| Device | Width |
|---|---|
| Mobile | `< 768px` |
| Desktop | `>= 768px` |

### Container Max-Width
- **Konten umum:** `1200px`, `margin: 0 auto`
- **Testimonial:** `650px`
- **Job list:** `1200px`
- **FAQ accordion:** `700px`
- **Job services grid:** `1100px`

### Page Structure (Landing — `/`)
```
Walkthrough / Onboarding (full viewport, slide by slide)
  ├── Slide 1: Daftar Akun Gratis
  ├── Slide 2: Temukan Lowongan Ideal
  └── Slide 3: Kirim Lamaran Cepat → navigasi ke /home
```

### Page Structure (Beranda — `/home`)
```
Hero (100vh)
  ↓
JobServices (6 kategori cards)
  ↓
Job Listings (6 lowongan)
  ↓
Testimonials (carousel)
  ↓
CTA (daftar)
```

---

## 3. Components

### 3.1 Navbar
**Position:** `fixed`
- Desktop: `top: 16px`, centered `left: 50%; transform: translateX(-50%)`
- Mobile: `bottom: 16px`, centered `left: 50%; transform: translateX(-50%)`

**Shape:** Pill (`borderRadius: 60px`), `overflow: hidden`

**Desktop order:** `⚡[icon] PasukanYerusSolo | 🏠 Beranda | 💼 Lowongan | ☀️/🌙 toggle | Login / Keluar`
**Mobile order:** `☀️/🌙 toggle | 🏠 | 💼 | Login / 🔑👤📋⚙️`

**Spacing (mobile):**
- Nav padding: `6px 8px`
- Gap antar item: `4px`
- Theme/account button: `36px`, font `17px`
- Menu item padding: `8px 12px`, icon font `16px`
- Login button padding: `7px 14px`, font `12px`

**Active indicator:** `position: absolute; inset: 0; borderRadius: 40px; background: linear-gradient(135deg, #ea580c, #f59e0b); zIndex: 0`

**Mobile authenticated user:** Menampilkan icon role-based (👤 Pelamar, 📋 Perusahaan, ⚙️ Admin) yang navigasi ke halaman terkait.

### 3.2 Footer
**Layout:** Single column (flex vertical), center alignment.

**Struktur:**
| Bagian | Konten |
|---|---|
| Top bar | `height: 4px`, animasi `gradientMove` (`#ea580c → #f59e0b → #ea580c`), durasi 3s |
| Logo & Sosmed | Logo "PasukanYerusSolo" + 4 social media buttons (Instagram, Facebook, Twitter, LinkedIn) |
| Tautan | 4 menu: **Tentang Kami**, **Kebijakan Privasi**, **S&K**, **FAQ** — navigasi via `useNavigate()` ke route |
| Copyright | Teks hak cipta |

**Tautan menggunakan `navigate()`** dari `react-router-dom`, bukan link biasa — agar navigasi internal tetap dalam SPA.

**Social buttons:** `38px` rounded (`borderRadius: 12px`), hover → gradient oranye + `translateY(-4px)`.

**Responsive:** Tidak ada perubahan layout signifikan (single column di semua ukuran). Padding disesuaikan untuk mobile.

### 3.3 Hero
- **minHeight:** `100vh`
- **Padding:** `120px 20px 60px`
- **Alignment:** Flex center (vertical + horizontal)

**Carousel (Background):**
- 5 gambar Unsplash (workspace)
- Interval: 5 detik
- Transition: `opacity 1.5s ease`
- Dark overlay di atas gambar
- Dot navigator: `borderRadius: 4px` (pill), active `width: 24px` warna `#ea580c`, inactive `width: 8px`

**Typography:**
- Heading: `clamp(2.5rem, 8vw, 5rem)`, weight `900`
- Subtitle badge: `13px`, `uppercase`, `letterSpacing: 2px`, weight `800`, background `rgba(234,88,12,0.1)`
- Description: `clamp(16px, 2vw, 18px)`
- **Gradient text:** `background: linear-gradient(135deg, #ea580c, #f59e0b); backgroundClip: text; color: transparent`

**Buttons:**
- **Primary:** gradient `#ea580c → #f59e0b`, `borderRadius: 12px`, padding `16px 36px`, weight `800`, shadow `0 4px 20px rgba(234,88,12,0.3)`. Hover: `translateY(-3px)` + shadow diperkuat.
- **Secondary:** `background: transparent`, `border: 2px solid` warna sesuai tema, weight `700`. Hover: background `#ea580c`, color `#fff`.

**Statistik (3 angka):** Font `clamp(22px, 4vw, 28px)`, weight `900`, color `#ea580c`. Dipisah `borderTop`.

### 3.4 HowItWorks
- **Section padding:** `100px 20px`
- **Background:** Dark `#080402` / Light `#f5f5f4`
- **Grid:** `flexWrap`, gap `24px`, tiap card `flex: 1 1 calc(25% - 24px)` dengan `min-width: 220px`, `max-width: 280px`
- **Card:** `borderRadius: 24px`, padding `36px 24px`, background dark `#120b06` / light `#ffffff`, border `1px solid`. Hover: `translateY(-8px)`, border `#ea580c`, muncul `boxShadow`
- **Icon:** Heroicons `clamp(32px, 5vw, 42px)`, color `#ea580c`
- **Step tag:** `11px` uppercase, weight `700`, `letterSpacing: 1.5px`, background `rgba(234,88,12,0.1)`, padding `4px 12px`, `borderRadius: 20px`
- **Button:** Sama dengan Hero primary button

### 3.5 JobServices
- **Section padding:** `100px 20px`
- **Background:** Dark `#080402` / Light `#f5f5f4`
- **Grid:** `repeat(auto-fit, minmax(300px, 1fr))`, gap `24px`, max-width `1100px`
- **Card:** `borderRadius: 20px`, background dark `#120b06` / light `#ffffff`, border `1px solid`, `overflow: hidden`. Hover: `translateY(-6px)`, border `#ea580c`, boxShadow
- **Image:** Height `180px`, `objectFit: cover`, overlay gradient hitam bottom. Hover: `scale(1.08)` durasi `0.5s`
- **Category dot:** Pojok kiri bawah gambar, warna sesuai kategori (`#3b82f6` IT, `#8b5cf6` Kreatif, dst)
- **Card body:** Padding `20px 24px 24px`. Title `clamp(16px, 3vw, 18px)` weight `800`. Description `clamp(13px, 3vw, 14px)`, line-height `1.6`. Link "Lihat Lowongan →" color `#ea580c`

### 3.6 Testimonials
- **Section padding:** `100px 20px`, borderTop pemisah
- **Container:** `maxWidth: 650px`
- **Navigation:** 2 arrow buttons (← →) `borderRadius: 50%`, `40px`. Hover: background `#ea580c`, color `#fff`
- **Dot indicators:** 3 dot, `8px` bulat. Active `#ea580c`, inactive dark `#262626` / light `#d4d4d4`
- **Card:** `borderRadius: 24px`, padding `clamp(30px, 5vw, 40px)`, text center
- **Avatar:** `64px` bulat, gradient `#ea580c → #f59e0b`, boxShadow
- **Rating:** Stars color `#f59e0b`
- **Nama:** weight `800`, color `#ea580c`. Role/company: abu-abu

### 3.7 FAQ
- **Section padding:** `100px 20px`, background konsisten
- **Accordion container:** `maxWidth: 700px`
- **Item:** `borderRadius: 16px`, border `1px solid`, background dark `#120b06` / light `#ffffff`, marginBottom `12px`, `overflow: hidden`
- **Header:** padding `20px 24px`, font `clamp(14px, 3vw, 16px)` weight `700`, `display: flex; justifyContent: space-between`. Hover: color `#ea580c`
- **Icon (+):** `20px`, color `#ea580c`. Saat open: `rotate(45deg)` menjadi ×, `transition 0.3s ease`
- **Answer panel:** `maxHeight: 0 → 300px`, `transition 0.4s ease`. Padding `0 24px` → `0 24px 20px`. Text `14px`, line-height `1.7`

### 3.8 FilterBox
- **Container:** `borderRadius: 16px`, padding `20px`, background dark `#120b06` / light `#ffffff`
- **Layout:** 3 kolom flex (mobile: stacked vertikal)
  - **Kata Kunci** → input text, placeholder "Cari posisi atau nama perusahaan..."
  - **Tipe Pekerjaan** → select dropdown (Semua, Full-time, Remote, Contract)
  - **Urutkan** → select dropdown (Terbaru, Terlama, Gaji Tertinggi, Gaji Terendah, A-Z, Z-A)
- **Input style:** `borderRadius: 10px`, padding `12px 14px`, border `1px solid`, onFocus border `#ea580c` + boxShadow
- **Label style:** `11px` uppercase, weight `700`, `letterSpacing: 0.5px`
- **Footer:** statistik hint + badge "Filter aktif" jika ada filter/sort non-default

### 3.9 JobListContainer
- **Data source:** GET `/api/jobs` — response termasuk `created_at` untuk sortir waktu
- **Filter (useMemo):** search (title/kategori/perusahaan), type filter, **sort** (6 mode), limit opsional
- **Sort logic:** `parseGaji()` stripping non-digit agar handle format `Rp 10.000.000` maupun `3000000`
- **Variant:** `simple` (dibatasi 6, tanpa FilterBox), `full` (dengan FilterBox + info hasil)
- **Mobile:** layout card vertikal, filter box stacked

### 3.10 ApplyJobForm
- **Container:** `borderRadius: 16px`, padding `20px`, border dashed `#ea580c`
- **Upload:** Input file `.pdf` max 2MB, dengan validasi client-side
- **Pesan tambahan:** Textarea opsional untuk HRD
- **Button:** Gradient oranye, `borderRadius: 10px`, weight `700`
- **States:** Loading spinner "Mengirim...", success & error alert

### 3.11 ApplicationStatusTracker (HRD)
- **Layout:** Flex row, gap `12px`, `borderRadius: 14px`
- **Status badge:** Warna sesuai status (Lolos: hijau, Interview: kuning, Gagal: merah, Review: oranye, Menunggu: default)
- **Dropdown change:** 5 opsi status (Menunggu → Review → Interview → Lolos/Gagal)
- **Loading state:** disabled select + teks "Menyimpan..."

### 3.12 Sidebar (Dashboard)
- **Menu items:** Eksplorasi, Lowongan Favorit, Status Lamaran, Profil Saya, Ganti Password
- **Active state:** Gradient oranye, text putih
- **Inactive state:** Transparent, text abu-abu
- **Footer:** Tombol logout dengan border merah

### 3.13 CTA
- **Section padding:** `80px 20px`, text center, borderTop
- **Background glow:** Elemen `radial-gradient(rgba(234,88,12,0.05))` dengan animasi `pulse` (scale 1↔1.1, opacity 0.5↔0.8) durasi 8s
- **Heading:** `clamp(1.8rem, 5vw, 2.5rem)` weight `800`
- **Description:** `clamp(14px, 4vw, 16px)`
- **Button:** Gradient `#ea580c → #f59e0b`, padding `clamp(12px,4vw,14px) clamp(30px,8vw,40px)`, `borderRadius: 12px`, weight `800`. Hover: `translateY(-3px)`. Touch: `scale(0.98)`

---

## 4. Animations

### 4.1 ScrollReveal (IntersectionObserver)
Komponen pembungkus yang memicu animasi saat elemen masuk viewport (`threshold: 0.1`, `rootMargin: 0px 0px -40px 0px`).

| Animation | Start | End | Duration | Easing |
|---|---|---|---|---|
| `fadeUp` | opacity 0, translateY(40px) | opacity 1, translateY(0) | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `fadeIn` | opacity 0 | opacity 1 | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `slideLeft` | opacity 0, translateX(-60px) | opacity 1, translateX(0) | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `slideRight` | opacity 0, translateX(60px) | opacity 1, translateX(0) | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `scaleIn` | opacity 0, scale(0.9) | opacity 1, scale(1) | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |

**Applied di HomePage:**
- Hero → (default, no ScrollReveal)
- JobServices → `slideRight`, delay 150ms
- Job list section → `fadeUp`, delay 100ms (inner elements: `fadeIn` 200ms, `fadeUp` 300ms, `scaleIn` 400ms)
- Testimonials → `slideLeft`, delay 200ms
- CTA → `scaleIn`, delay 200ms

### 4.2 PageTransition (Route Change)
- **Trigger:** Setiap `pathname` berubah (useLocation)
- **Animation:** `pageEnter` — `opacity: 0, translateY(20px)` → `opacity: 1, translateY(0)`
- **Duration:** 0.35s, `ease-out`
- **Inject:** Keyframes di-inject ke `<head>` via `document.createElement('style')` saat mount (sekali)
- **Performance:** `willChange: opacity, transform`

### 4.3 CTA Background
- `pulse`: scale(1)→(1.1), opacity(0.5)→(0.8), 8s ease-in-out infinite

### 4.4 Footer Gradient Bar
- `gradientMove`: background-position 0%→100%→0%, 3s ease infinite

### 4.5 Walkthrough Float
- `float`: translateY(0px)→(-12px)→(0px), 3s ease-in-out infinite

---

## 5. Theme System (Dark/Light)

### Context: `ThemeContext` (`frontend/src/context/ThemeContext.js`)
- **Default:** `'dark'`
- **Persist:** `localStorage.getItem('theme')`
- **Toggle:** `setTheme(prev => prev === 'dark' ? 'light' : 'dark')`
- **Body styling:** `document.body.style.backgroundColor` dan `color` diubah via `useEffect`
- **Dark body:** `background: #0c0a09`, `color: #fff`
- **Light body:** `background: #f5f5f4`, `color: #1c1917`
- **Pattern di komponen:** `const isDark = theme === 'dark';` lalu gunakan `isDark` untuk conditional styling

---

## 6. Navigation & Routing

### Library: `react-router-dom` v7

### Routes
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
| `/profile` | ProfileContainer | Pelamar |
| `/admin/dashboard` | AdminDashboard | Admin |
| `/tentang-kami` | InfoPage | Public |
| `/kebijakan-privasi` | InfoPage | Public |
| `/syarat-ketentuan` | InfoPage | Public |
| `/karier` | InfoPage | Public |
| `/faq` | InfoPage | Public |

### Scroll Behavior
- **ScrollToTop component:** Watch `pathname` via `useLocation()`, call `window.scrollTo(0, 0)` on change
- **navigateTo wrapper:** Also calls `window.scrollTo({ top: 0, behavior: 'instant' })` before `navigate()` for instant feedback

---

## 7. Coding Conventions

- **No comments** in code
- **All inline styles** — no CSS modules, styled-components, or external stylesheets (kecuali `index.css` untuk global reset)
- **No external animation libraries** — IntersectionObserver manual, CSS keyframes
- **State management:** React Context (ThemeContext), localStorage for auth & theme
- **isMobile state:** `window.innerWidth < 768`, updated on `resize` event
- **Icons:** `@heroicons/react/24/outline` — Heroicons v2 outline
- **API calls:** Axios instance (`services/api.js`) dengan interceptor JWT

---

## 8. File Structure

```
frontend/src/
├── App.js                          # Route definitions, HomePage, EksplorasiPage, AppLayout
├── App.css
├── index.js / main.jsx             # Entry point (ReactDOM.createRoot)
├── index.css                       # Global reset & base styles
├── context/
│   └── ThemeContext.js              # Dark/light theme provider
├── utils/
│   └── formatRupiah.js             # Shared Rupiah formatting utility
├── services/
│   └── api.js                      # Axios instance with JWT interceptor
├── Layout/
│   └── index.js                    # Layout wrapper (Navbar + Container + Footer)
├── components/
│   ├── Navbar/
│   │   └── Navbar.js               # Pill navbar (fixed, responsive, role-based menu)
│   ├── Footer/
│   │   └── Footer.js               # Footer with logo, social media, 4 internal links
│   ├── Container/
│   │   ├── index.js                # Container max-width wrapper
│   │   └── index.module.css        # Container styles (CSS modules)
│   ├── PageTransition.js           # Route change animation wrapper
│   ├── ScrollReveal.js             # IntersectionObserver scroll animation wrapper
│   ├── Modal/
│   │   └── Modal.js                # Reusable modal (logout confirm, success)
│   ├── auth/
│   │   ├── Login.js                # Login page
│   │   └── Register.js             # Register page
│   └── jobs/
│       ├── JobCard.jsx             # Job card component
│       └── JobDetail.jsx           # Job detail page (with company info modal)
├── features/
│   ├── landing/
│   │   ├── Hero.js                 # Full-viewport hero with background carousel
│   │   ├── HowItWorks.js           # 4-step guide
│   │   ├── JobServices.js          # 6 job category cards with photos
│   │   ├── Testimonials.js         # Testimonial carousel
│   │   ├── FAQ.js                  # Accordion FAQ
│   │   ├── CTA.js                  # Call to action section
│   │   └── Walkthrough.js          # Legacy 4-step walkthrough (not used)
│   ├── eksplorasi/
│   │   ├── JobListContainer.js     # Job listing (simple & full variants)
│   │   ├── FilterBox.js            # Search filter component
│   │   ├── ApplyJobForm.js         # Job application form
│   │   ├── FavoriteListContainer.js # Saved jobs
│   │   └── JobListContainer.css    # Job list styles
│   ├── hrd/
│   │   ├── JobPublisher.js         # Post job (HRD dashboard)
│   │   ├── FormLowongan.js         # Basic job form (legacy)
│   │   ├── FormLowonganControlled.js # Job form with Rupiah input & kategori dropdown
│   │   └── ApplicationStatusTracker.js # HRD application status updater
│   ├── dashboard/
│   │   ├── CompanyBrandingForm.js  # Company profile edit (logo, nama, lokasi, bidang, telepon, deskripsi)
│   │   ├── ProfileContainer.js     # User profile (photo, telepon, keahlian, about)
│   │   ├── AdminDashboard.js       # Admin panel (filter, sort, responsive tabel/cards)
│   │   ├── AdminStatsView.js       # Admin statistics cards (responsive grid)
│   │   ├── Sidebar.js              # Dashboard sidebar navigation
│   │   └── ThemeToggle.js          # Theme toggle switch component
│   ├── applications/
│   │   ├── ApplyJobForm.jsx        # Job application form (enhanced, with validation)
│   │   ├── StatusTracker.jsx       # Application status tracking
│   │   └── FavoriteService.js      # Favorite job API service
│   └── lamaran/
│       ├── ApplyJobForm.js         # Legacy job application form
│       ├── FavoriteHandler.js      # Favorite toggle handler
│       └── FavoriteService.js      # Legacy favorite service
└── pages/
    ├── WalkthroughPage.js          # 3-step onboarding walkthrough
    ├── Home.jsx                    # Simple home page (alternate)
    ├── LandingPage.js              # Alternative landing page (Tailwind)
    ├── LoginPage.jsx               # Login page wrapper
    ├── RegisterPage.jsx            # Register page wrapper
    └── InfoPage.js                 # Static info pages (Tentang Kami, Privasi, S&K, Karier, FAQ)
```
