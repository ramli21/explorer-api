# Folder Explorer API (Scalable Edition)

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
