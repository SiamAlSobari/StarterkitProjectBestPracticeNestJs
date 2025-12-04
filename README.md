
## Description

# 🚀 NestJS Starter Kit

Starter kit template lengkap untuk membangun REST API dengan NestJS. Template ini dilengkapi dengan fitur autentikasi, manajemen user, database, dan best practices untuk development yang cepat dan profesional.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Struktur Folder](#struktur-folder)
- [Instalasi & Setup](#instalasi--setup)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Perintah Npm](#perintah-npm)
- [Dokumentasi Fitur](#dokumentasi-fitur)
- [Best Practices](#best-practices)

---

## ✨ Fitur Utama

✅ **Autentikasi JWT** - Login dan register dengan token berbasis JWT  
✅ **Role-Based Access Control (RBAC)** - Kontrol akses berdasarkan role pengguna  
✅ **User Management** - Module untuk manajemen user dan profile  
✅ **Database Integration** - Integrasi TypeORM dengan MySQL  
✅ **Database Migration** - Sistem migration untuk versionisasi database  
✅ **Validation & Guards** - Validasi input dengan class-validator dan guards  
✅ **Environment Configuration** - Manajemen konfigurasi melalui .env  
✅ **Linting & Code Format** - ESLint dan Prettier untuk code quality  
✅ **Testing** - Setup untuk unit testing dan e2e testing dengan Jest  

---

## 🛠 Teknologi yang Digunakan

### Core Framework
- **NestJS v11** - Progressive Node.js framework untuk membangun aplikasi yang scalable
- **TypeScript** - Superset dari JavaScript dengan static typing
- **Express.js** - Web server framework (bawaan NestJS)

### Database & ORM
- **TypeORM v0.3** - ORM yang powerful untuk TypeScript/JavaScript
- **MySQL v3** - Database relasional
- **Prisma Client** - Query builder alternative (optional)

### Authentication & Security
- **JWT (JSON Web Tokens)** - Token-based authentication
- **Bcrypt** - Password hashing untuk keamanan
- **Cookie Parser** - Parsing cookies dari request

### Validation & Data Transfer
- **class-validator** - Validation decorator berbasis kelas
- **class-transformer** - Transform plain objects ke class instances
- **DTOs (Data Transfer Objects)** - Untuk standardisasi data input/output

### Development Tools
- **ESLint** - Linting untuk code quality
- **Prettier** - Code formatter
- **Jest** - Testing framework
- **ts-node** - Eksekusi TypeScript langsung

---

## 📁 Struktur Folder

```
src/
├── common/                      # Utilities, guards, enums, interfaces yang shared
│   ├── enums/
│   │   └── role.enum.ts        # Enum untuk role pengguna (USER, ADMIN, etc)
│   ├── guards/
│   │   ├── auth.guard.ts       # Guard untuk validasi JWT token
│   │   ├── email-verified.guard.ts  # Guard untuk cek email verified
│   │   └── role.guard.ts       # Guard untuk kontrol akses berdasarkan role
│   └── interface/
│       └── request.ts          # Custom Request interface
│
├── database/                    # Konfigurasi database & migrations
│   ├── data-source.ts          # TypeORM data source configuration
│   └── migrations/             # Folder untuk database migrations
│
├── entities/                    # Database entities (Model)
│   ├── user.entity.ts          # Entity User
│   └── profile.entity.ts       # Entity Profile (relasi ke User)
│
├── modules/                     # Feature modules
│   ├── auth/                   # Authentication module
│   │   ├── auth.controller.ts  # Endpoints login & register
│   │   ├── auth.service.ts     # Business logic autentikasi
│   │   ├── auth.module.ts      # Module configuration
│   │   └── dto/
│   │       ├── login.dto.ts    # DTO untuk login
│   │       └── register.dto.ts # DTO untuk register
│   │
│   └── user/                   # User management module
│       ├── user.module.ts      # Module configuration
│       └── user.repository.ts  # Database operations
│
├── app.controller.ts           # Root controller
├── app.service.ts              # Root service
├── app.module.ts               # Root module - mengatur semua imports
└── main.ts                     # Entry point aplikasi

test/                           # Folder untuk testing
├── app.e2e-spec.ts            # End-to-end testing
└── jest-e2e.json              # Jest config untuk e2e tests

.env                            # Environment variables (tidak di-commit)
.env.example                    # Template untuk .env
```

---

## 📦 Instalasi & Setup

### 1. Clone atau Download Repository
```bash
git clone https://github.com/SiamAlSobari/StarterkitProjectBestPracticeNestJs.git
cd backend/nest
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Buat File .env
```bash
cp .env.example .env
# atau buat manual file .env di root folder
```

### 4. Setup Database
Buat database MySQL baru dengan nama sesuai `DB_NAME` di .env

---

## ⚙️ Konfigurasi Environment

Buat file `.env` di root folder dengan konfigurasi berikut:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password
DB_NAME=starterkit_db

# JWT Configuration
JWT_SECRET=your-super-secret-key-min-32-char-xxxxxxxxxxxxxxxxxx
JWT_EXPIRATION=3d

# Email Configuration (Optional)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password

# Application URLs
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

### Penjelasan Konfigurasi:
- **PORT** - Port aplikasi berjalan
- **NODE_ENV** - Development, staging, atau production
- **DB_*** - Konfigurasi koneksi database MySQL
- **JWT_SECRET** - Secret key untuk signing JWT token (gunakan string panjang yang random)
- **JWT_EXPIRATION** - Durasi token berlaku
- **MAIL_*** - Konfigurasi email (untuk fitur email verification)

---

## 🚀 Menjalankan Aplikasi

### Development Mode (dengan auto-reload)
```bash
npm run start:dev
```
Aplikasi berjalan di `http://localhost:3000`

### Debug Mode
```bash
npm run start:debug
```
Untuk debugging dengan inspector, buka `chrome://inspect`

### Production Build
```bash
npm run build
npm run start:prod
```

---

## 📝 Perintah NPM

```bash
# Development
npm run start           # Menjalankan aplikasi sekali
npm run start:dev      # Menjalankan dengan watch mode (auto-reload)
npm run start:debug    # Debug dengan inspector

# Database Migration
npm run mg:gen         # Generate migration berdasarkan entity changes
npm run mg:run         # Menjalankan pending migrations

# Build & Production
npm run build          # Build TypeScript ke JavaScript
npm run start:prod     # Menjalankan production build

# Code Quality
npm run lint           # Cek dan fix ESLint issues
npm run format         # Format code dengan Prettier

# Testing
npm test               # Menjalankan semua unit tests
npm run test:watch    # Unit tests dengan watch mode
npm run test:cov      # Unit tests dengan coverage report
npm run test:debug    # Debug unit tests
npm run test:e2e      # End-to-end tests
```

---

## 📚 Dokumentasi Fitur

### 1. Autentikasi (Auth Module)

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Response:
```json
{
  "id": "uuid-string",
  "email": "user@example.com",
  "role": "USER",
  "createdAt": "2024-12-04T10:00:00Z"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "role": "USER"
  }
}
```

### 2. User Management

#### Get User Profile (Protected)
```
GET /users/profile
Authorization: Bearer <access_token>
```

#### Update Profile
```
PUT /users/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+6281234567890"
}
```

### 3. Guards (Proteksi Endpoints)

#### AuthGuard - Memastikan User Terautentikasi
```typescript
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  // Endpoint ini memerlukan JWT token yang valid
}
```

#### RoleGuard - Memastikan User Memiliki Role yang Tepat
```typescript
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('admin')
@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.ADMIN)
export class AdminController {
  // Hanya ADMIN yang bisa akses
}
```

### 4. Database Entities

#### User Entity
```typescript
// src/entities/user.entity.ts
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashPassword: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
```

---

## 🎯 Best Practices

### 1. Struktur Kode
- **Separation of Concerns** - Pisahkan logic di service, bukan di controller
- **Modules** - Grup fitur-fitur terkait dalam satu module
- **DTOs** - Gunakan DTOs untuk validasi input
- **Guards** - Gunakan guards untuk autentikasi & autorisasi

### 2. Database
- **Migrations** - Selalu gunakan migration untuk perubahan schema
- **Entities** - Define relationships dengan proper decorators
- **Repositories** - Gunakan repository pattern untuk data access

### 3. Security
- **Hash Password** - Gunakan bcrypt untuk hash password
- **Environment Variables** - Jangan hardcode secrets di code
- **JWT Secret** - Gunakan string yang panjang dan random
- **CORS** - Konfigurasi CORS dengan proper origin

### 4. Testing
- **Unit Tests** - Test business logic di service
- **E2E Tests** - Test flow lengkap dari request hingga response
- **Coverage** - Target coverage minimal 80%

### 5. Code Quality
- **ESLint** - Jalankan linter sebelum commit
- **Prettier** - Format code konsisten
- **Type Safety** - Manfaatkan TypeScript typing

### 6. Environment
- **Development** - Gunakan `npm run start:dev` untuk development
- **Staging** - Setup testing environment sebelum production
- **Production** - Gunakan `npm run build` dan `start:prod`

---

## 🔗 Resources & Links

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [OWASP Security Guidelines](https://owasp.org)

---

## 📄 Lisensi

UNLICENSED - Private Project

---

## 👤 Author

Siam Al Sobari

---

**Happy Coding! 🎉**

Untuk pertanyaan atau kontribusi, silakan buka issue atau pull request.
