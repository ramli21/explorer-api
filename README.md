# App : Folder Explorer API

Backend service untuk aplikasi Windows Explorer Clone, dibangun dengan fokus pada performa tinggi, skalabilitas data, dan arsitektur yang bersih.

## 🚀 Tech Stack

- **Runtime:** [Bun](https://bun.sh/) (High-performance JavaScript runtime)
- **Framework:** [ElysiaJS](https://elysiajs.com/) (Fast & Type-safe web framework)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (TypeScript ORM)
- **Database:** MySQL
- **Validation:** TypeBox (Native Elysia validation)

## ✨ Fitur Utama

- **Lazy Loading Strategy:** Mengambil data per-level untuk mendukung skalabilitas jutaan data.
- **Hierarchical Data Model:** Menggunakan _Adjacency List Model_ dengan indexing pada `parent_id`.
- **Modular Routing:** Organisasi kode berbasis plugin untuk kemudahan maintenance.
- **Global Error Handling:** Format error JSON yang konsisten (404, 422, 500).
- **Search Engine:** Pencarian folder & file dengan optimasi indexing.

## 🛠️ Persiapan & Instalasi

### 1. Prasyarat

- Sudah menginstal **Bun** (`curl -fsSL https://bun.sh/install | bash`)
- MySQL Server yang sedang berjalan.

### 2. Setup Environment

Buat file `.env` di root folder dan sesuaikan kredensial database Anda:

```env
APP_Name=Explorer
PORT=3000
NODE_ENV=development
```

### 3. Instalasi & Migrasi

```Bash
# Install dependencies
bun install

# Generate & Push skema ke database
bunx drizzle-kit push:mysql

# (Opsional) Jalankan seeding untuk data dummy
bun run src/db/seed.ts
```

### 4. Menjalankan Server

```Bash
bun dev
```

Server akan berjalan di http://localhost:3000.

## 📍 API Endpoints

Semua endpoint diawali dengan prefix **/api/v1**.

| Method | Endpoint             | Deskripsi                                                 |
| ------ | :------------------- | --------------------------------------------------------- |
| GET    | /folders/tree        | struktur pohon folder (root level)                        |
| GET    | /folders/:id/content | Mendapatkan sub-folder dan file di dalam folder spesifik. |
| GET    | /search?q=keyword    | Mencari folder berdasarkan nama (min. 2 karakter).        |

## 🧪 Testing

Proyek ini dilengkapi dengan unit & integration test menggunakan Bun native test runner.

```Bash
bun test
```

## 📐 Arsitektur Folder

```Plaintext
src/
├── controllers/    # Logika handling request & response
├── routes/         # Definisi endpoint & validasi (Elysia Plugins)
├── repositories/   # Abstraksi query database (Data Access Layer)
├── db/             # Skema tabel & koneksi database
└── index.ts        # Entry point & Global configurations
```

---

Dibuat oleh **Ahmad Ramli**
