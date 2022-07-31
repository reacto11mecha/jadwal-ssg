# Jadwal SSG (Static Site Generator)

Sebuah website yang dibuat untuk mempermudah akses ke jadwal pelajaran yang sudah dibuat list seluruh kelas dan mata pelajarannya.

## Prerequisites

Anda butuh

- Node.js dan NPM (atau Package Manager lainnya)

## Pemakaian

### Cloning Dari Github

Jalankan perintah ini Command Line.

```sh
# HTTPS
git clone https://github.com/reacto11mecha/jadwal-ssg.git

# SSH
git clone git@github.com:reacto11mecha/jadwal-ssg.git
```

### Menginstall package

Anda ke root directory project dan menginstall package yang diperlukan.

```sh
npm install

# atau menggunakan pnpm
pnpm install
```

### Mengubah Jadwal dan Waktu

Informasi statis yang ada di website ini terdapat pada file [`data/jadwal.json`](data/jadwal.json) dan [`data/waktu.json`](data/waktu.json). Ubah kedua file tersebut sesuai apa yang di inginkan. Untuk masalah struktur, cek typing yang sesuai pada file [`types/jadwal.ts`](types/jadwal.ts).

> Sumber data statis yang ada di project ini berasal dari [`xlsx-schedule-generator`](https://github.com/reacto11mecha/xlsx-schedule-generator) yang menghasilkan jadwal pelajaran dari sebuah file xlsx excel. Cek repositori tersebut untuk lebih lengkapnya.

### Menjalankan Aplikasi

Setelah mengubah jadwal pelajaran, build next js agar website bisa diakses.

```sh
npm run build

# atau menggunakan pnpm
pnpm build
```

Setelahnya jalankan next js, laman default berada di http://localhost:3000

```sh
npm start

# atau menggunakan pnpm
pnpm start
```

## Lisensi

Project ini bernaung di bawah lisensi [GPL-3.0 License](LICENSE)
