# 🌍 Animal Kingdom App 🐾

Aplikasi pembelajaran interaktif dunia hewan yang dirancang ramah anak (kid-friendly), penuh warna, dan responsif. Aplikasi ini menggunakan **React (Vite)** dan **Tailwind CSS v4** untuk menyajikan antarmuka visual yang sangat menarik dan dinamis.

---

## ✨ Fitur Utama
1. **Katalog Hewan**: Berisi 10 hewan lucu dilengkapi dengan klip video looping pendek (`.mp4`), fakta unik menarik, dan suara khas hewan (`.mp3`).
2. **Kuis Tebak Suara**: Mini-game kuis interaktif berisikan 5 pertanyaan acak untuk menguji kemampuan anak mengenali suara hewan dengan skor dan umpan balik langsung.
3. **Papan Skor (Leaderboard)**: Menyimpan nama dan skor tertinggi anak langsung ke dalam penyimpanan lokal peramban (*local storage*).
4. **Desain Ceria**: Menggunakan font khusus (**Fredoka** & **Nunito**) dari Google Fonts, efek bayangan ala komik (*playful shadow*), dan hiasan dekoratif emoji melayang.

---

## 📁 Struktur Folder Media
Semua aset media diletakkan di dalam folder `public` agar disajikan secara statis oleh Vite. Pastikan berkas ditempatkan pada struktur berikut:
- **Video**: `public/assets/video/` (berisi berkas video loop `.mp4` pendek 5 detik)
- **Audio**: `public/assets/audio/` (berisi berkas suara hewan `.mp3`)

Terdapat 10 hewan yang dikonfigurasi dalam aplikasi ini dengan penamaan berkas sebagai berikut:
1. Singa (`lion.mp4`, `lion.mp3`)
2. Gajah (`elephant.mp4`, `elephant.mp3`)
3. Katak (`frog.mp4`, `frog.mp3`)
4. Burung Hantu (`owl.mp4`, `owl.mp3`)
5. Lumba-lumba (`dolphin.mp4`, `dolphin.mp3`)
6. Serigala (`wolf.mp4`, `wolf.mp3`)
7. Berang-berang (`berang-berang.mp4`, `berang-berang.mp3`)
8. Anjing (`anjing.mp4`, `anjing.mp3`)
9. Kucing (`kucing.mp4`, `kucing.mp3`)
10. Monyet (`monyet.mp4`, `monyet.mp3`)

---

## 🚀 Cara Menjalankan Aplikasi

Ikuti langkah-langkah di bawah ini untuk menginstal dependensi dan menjalankan aplikasi di komputer lokal Anda:

### 1. Instalasi Dependensi
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/). Buka terminal/command prompt di direktori proyek ini, kemudian jalankan:
```bash
npm install
```
*Perintah ini akan menginstal React, Tailwind CSS v4, `@tailwindcss/vite`, Lucide React, dan dependensi pembantu lainnya.*

### 2. Menjalankan Server Pengembangan (Development Mode)
Untuk menjalankan server pengembangan lokal dengan fitur *Hot Module Replacement (HMR)*:
```bash
npm run dev
```
Setelah dijalankan, buka alamat URL yang tertera di terminal Anda (biasanya `http://localhost:5173/` atau `http://localhost:5174/`) di browser Anda.

### 3. Membangun Aplikasi untuk Produksi (Build for Production)
Untuk mengompilasi dan mengoptimalkan seluruh aset aplikasi menjadi berkas statis siap pakai yang terletak di folder `dist/`:
```bash
npm run build
```
Untuk menguji hasil kompilasi produksi tersebut secara lokal:
```bash
npm run preview
```
