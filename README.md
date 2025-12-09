# 🚀 NestJS Starter Kit - Enterprise Ready

> Template REST API modern, scalable, dan secure berbasis **NestJS**, **TypeORM**, dan **MySQL**.

Project ini dirancang sebagai fondasi kokoh untuk aplikasi backend skala enterprise. Dilengkapi dengan **Autentikasi JWT**, **Role-Based Access Control (RBAC)**, **Database Migrations**, dan struktur folder modular yang mengikuti *best practices* industri.

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Struktur Project](#-struktur-project)
- [Prasyarat](#-prasyarat)
- [Instalasi & Setup](#-instalasi--setup)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Database Migrations](#-database-migrations)
- [Dokumentasi API](#-dokumentasi-api)
- [Testing](#-testing)
- [Author](#-author)

---

## ✨ Fitur Utama

Project ini mencakup fitur-fitur esensial untuk backend modern:

- **🔐 Autentikasi & Keamanan**
  - **JWT Authentication** (Login/Register/Logout/Self)
  - **Cookie-based Session** (Secure, HttpOnly)
  - **Password Hashing** menggunakan generic `bcrypt` flow
  - **Role-Based Access Control (RBAC)** dengan Guard (`Admin`, `User`)
  - **Email Verification Guard** (siap pakai)

- **🗄️ Database & ORM**
  - **TypeORM** modul terintegrasi penuh
  - **MySQL** driver
  - **Automatic Migrations** flow untuk manajemen skema database yang aman
  - **Entity Relations** (One-to-One User & Profile)

- **🛠️ Developer Experience**
  - **Modular Architecture** (AuthModule, UserModule)
  - **DTO Validation** menggunakan `class-validator` & `class-transformer`
  - **Global Pipes** untuk transformasi dan validasi data otomatis
  - **Environment Config** terpusat via `@nestjs/config`

---

## 🛠 Teknologi

Core stack yang digunakan dalam project ini:

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **NestJS** | v11.x | Framework Node.js paling maintainable |
| **TypeORM** | v0.3.x | ORM TypeScript/JavaScript modern |
| **MySQL** | v3.x | Relational Database Management System |
| **Passport & JWT** | - | Standar industri untuk autentikasi API |
| **Jest** | - | Delightful JavaScript Testing Framework |

---

## 📁 Struktur Project

Struktur folder disusun agar mudah diskalakan (scalable) dan dipelihara (maintainable):

```bash
src/
├── common/             # Shared resources (Guards, Enums, Interfaces)
│   ├── enums/          # Role Enum (USER, ADMIN)
│   ├── guards/         # Auth, Role, EmailVerified Guards
│   └── interface/      # Custom types
├── database/           # Database setup
│   ├── migrations/     # File migrasi database
│   └── data-source.ts  # Config TypeORM Source
├── entities/           # Database Models
│   ├── user.entity.ts
│   └── profile.entity.ts
├── modules/            # Feature Modules
│   ├── auth/           # Login, Register, Auth logic
│   └── user/           # User management
├── app.module.ts       # Root Module
└── main.ts             # Entry point
```

---

## 🔌 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** (versi 18 atau lebih baru disarankan)
- **NPM** atau **Yarn**
- **MySQL Database** (lokal atau remote)

---

## 🚀 Instalasi & Setup

Ikuti langkah-langkah ini untuk menjalankan project di komputer lokal:

### 1. Clone Repository
```bash
git clone https://github.com/SiamAlSobari/StarterkitProjectBestPracticeNestJs.git
cd backend/nest
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Duplikat file `.env.example` (jika ada) atau buat file `.env` baru di root folder:

```bash
# Server Config
PORT=5000
NODE_ENV=development

# Database Config
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=          # Masukkan password database Anda
DB_NAME=starterkit

# JWT Config
JWT_SECRET=rahasia_super_panjang_dan_acak_seperti_ini_123456
```

### 4. Jalankan Database Migrations (PENTING)
Agar tabel terbentuk di database MySQL Anda:

```bash
# Generate file migrasi (jika ada perubahan entity baru)
npm run mg:gen

# Jalankan migrasi ke database
npm run mg:run
```

---

## ▶️ Menjalankan Aplikasi

```bash
# Development (Auto-reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

Aplikasi akan berjalan di `http://localhost:5000/api` (default prefix `/api`).

---

## 🛠 Database Migrations

Kami menggunakan TypeORM migration untuk mengelola perubahan skema database tanpa kehilangan data.

- **Generate Migrasi**: Jika Anda mengubah file di `src/entities/*.ts`, jalankan perintah ini untuk membuat file migrasi baru:
  ```bash
  npm run mg:gen
  ```
  *File migrasi akan muncul di `src/database/migrations`.*

- **Jalankan Migrasi**: Untuk menerapkan perubahan ke database asli:
  ```bash
  npm run mg:run
  ```

---

## 📡 Dokumentasi API

Berikut adalah beberapa endpoint utama yang tersedia:

### Authentication (`/api/auth`)

| Method | Endpoint | Deskripsi | Auth Required | Body |
|--------|----------|-----------|---------------|------|
| `POST` | `/register` | Mendaftar user baru | ❌ | `email`, `password`, `first_name`, `last_name` |
| `POST` | `/login` | Masuk aplikasi | ❌ | `email`, `password` |
| `GET` | `/self` | Cek profile sendiri | ✅ (JWT) | - |
| `DELETE`| `/logout` | Hapus sesi/cookie | ✅ (JWT) | - |

#### Contoh Payload Register
```json
POST /api/auth/register
{
    "email": "user@example.com",
    "password": "password123",
    "first_name": "Siam",
    "last_name": "Al Sobari"
}
```

#### Contoh Response Login
Aplikasi ini menggunakan mekanisme **HttpOnly Cookie** untuk menyimpan token secara aman, namun juga mengembalikan token di body jika diperlukan untuk mobile apps.

```json
{
    "message": "Login successful",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🧪 Testing

Jalankan test suite untuk memastikan kode berjalan dengan baik:

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 👤 Author

**Siam Al Sobari**

---

## 📄 License

This project is **UNLICENSED**.
Private use only unless permitted by author.

---

<p align="center">
  Built with ❤️ using NestJS
</p>
