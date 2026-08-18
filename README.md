# EduCourse Fullstack Application

Aplikasi web responsif dan dinamis untuk platform pembelajaran (Video Course), dibangun dengan arsitektur Fullstack menggunakan React (Vite) untuk antarmuka pengguna, dan Node.js (Express) serta MySQL untuk backend.

## Fitur Utama
- **Autentikasi Aman:** Sistem pendaftaran dan masuk (Login) menggunakan enkripsi kata sandi (Bcrypt) dan Token (JWT).
- **Verifikasi Email:** Pengguna baru wajib memverifikasi email yang didaftarkan.
- **Pencarian & Filter Dinamis:** Kemampuan memfilter kursus berdasarkan kategori dan judul, dengan integrasi langsung dari backend (`Query Params`).
- **Manajemen Profil Pengguna:** Pengguna yang telah masuk dapat melihat informasi profil, memperbarui Nama Lengkap, Nomor Ponsel, hingga mengunggah Foto Profil (Avatar).
- **Pengelolaan File/Gambar:** Mendukung fitur unggah (upload) file langsung ke server.

---

## 💻 Panduan Instalasi & Menjalankan Aplikasi

Aplikasi ini terbagi menjadi dua bagian: **Backend (API)** dan **Frontend (App)**. Kamu harus menjalankan keduanya secara bersamaan.

### 1. Persiapan Database (MySQL)
Sebelum menjalankan backend, kamu wajib menyiapkan database dan struktur tabelnya.
1. Buka **MySQL Workbench** atau terminal MySQL kamu.
2. Jalankan baris perintah SQL berikut ini secara berurutan:

```sql
-- 1. Buat Database
CREATE DATABASE IF NOT EXISTS videobelajar_db;
USE videobelajar_db;

-- 2. Buat Tabel Users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  verification_token VARCHAR(255) DEFAULT NULL,
  is_verified BOOLEAN DEFAULT false,
  phone VARCHAR(20) DEFAULT NULL,
  avatar VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Buat Tabel Categories
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Buat Tabel Tutors
CREATE TABLE IF NOT EXISTS tutors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  avatar VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Buat Tabel Courses (dengan Foreign Key)
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INT DEFAULT 0,
  image VARCHAR(255) DEFAULT NULL,
  category_id INT,
  tutor_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE SET NULL
);
```

### 2. Menjalankan Backend (Node.js)
1. Buka Terminal/Command Prompt baru.
2. Masuk ke direktori backend:
   ```bash
   cd education-course-api
   ```
3. Install semua *dependencies*:
   ```bash
   npm install
   ```
4. Pastikan kamu memiliki file `.env` dengan konfigurasi berikut (sesuaikan password database-mu):
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password_database_kamu
   DB_NAME=videobelajar_db
   JWT_SECRET=rahasia_jwt_sangat_aman
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_USER=email_dummy_ethereal_kamu
   SMTP_PASS=password_dummy_ethereal_kamu
   ```
5. Jalankan server:
   ```bash
   npm run dev
   ```
   *(Server akan berjalan di http://localhost:5000)*

### 3. Menjalankan Frontend (React/Vite)
1. Buka Terminal/Command Prompt baru (jangan tutup terminal backend).
2. Masuk ke direktori frontend:
   ```bash
   cd education-course-app
   ```
3. Install semua *dependencies*:
   ```bash
   npm install
   ```
4. Buka atau buat file `.env` di folder ini, lalu pastikan terhubung ke backend lokal:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```
5. Jalankan aplikasi frontend:
   ```bash
   npm run dev
   ```
   *(Aplikasi bisa diakses melalui http://localhost:5173 di browser kamu)*

