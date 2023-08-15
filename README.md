# Jadwal SSG (Static Site Generator)

Sebuah website yang dibuat untuk mempermudah akses ke jadwal pelajaran yang sudah dibuat list seluruh kelas dan mata pelajarannya.

## Prerequisites

Anda butuh

- Node.js dan NPM (atau Package Manager lainnya)

## Pemakaian

### Menggunakan Template Repositori

Pertama gunakan repo template ini untuk membuat repo baru, bisa menggunakan tombol [`Use this template`](https://github.com/reacto11mecha/jadwal-ssg/generate). Di step ini tampilannya mirip membuat repositori baru di github seperti biasa.

### Mengubah Jadwal dan Waktu

Untuk mengubah jadwal, terlebih dahulu clone repositori template yang sudah dibuat sebelumnya. Clone sesuai apa yang sudah kamu isikan pada saat mengenerate repositori. Contoh perintah:

```sh
# HTTPS
git clone https://github.com/{username}/{nama_repositori}.git

# SSH
git clone git@github.com:{username}/{nama_repositori}.git
```

Setelah mengkloning repositori, baiknya menginstal package-package yang diperlukan agar mudah dalam melakukan validasi data. Untuk itu, jalankan perintah berikut.

```sh
npm install

# atau menggunakan pnpm
pnpm install
```

Informasi statis yang ada di website ini terdapat pada file [`src/data/jadwal.json`](src/data/jadwal.json) dan [`src/data/waktu.json`](src/data/waktu.json). Ubah kedua file tersebut sesuai apa yang di inginkan. Untuk masalah struktur, cek typing yang sesuai pada file [`src/utils/schedule.ts`](src/utils/schedule.ts).

> Sumber data statis yang ada di project ini berasal dari [`xlsx-schedule-generator`](https://github.com/reacto11mecha/xlsx-schedule-generator) yang menghasilkan jadwal pelajaran dari sebuah file xlsx excel. Cek repositori tersebut untuk lebih lengkapnya.

### Menjalankan Aplikasi

Setelah mengubah jadwal pelajaran, build next js agar website bisa diakses.

```sh
npm run build

# atau menggunakan pnpm
pnpm build
```

Setelahnya jalankan astro, laman default berada di http://localhost:3000

```sh
npm start

# atau menggunakan pnpm
pnpm start
```

## Local Development

Anda bisa melakukan perubahan secara local dan mengubah tampilan atau apapun sesuka hati. Cara tersebut sudah dijelaskan pada poin [`pemakaian`](#pemakaian).

## Lisensi

Project ini bernaung di bawah lisensi [GPL-3.0 License](LICENSE).
