# Panduan cepat mengedit SAPA FIND

## 1. Ganti data kantor
Buka `data/config.js`, lalu ubah `address`, `hours`, `phone`, `email`, dan `website`.

## 2. Tambah jawaban chatbot
Buka `data/content.js`, bagian `knowledge`. Format sederhana:

`['kata kunci','Judul jawaban','Isi jawaban']`

Pisahkan kata kunci dengan `|` jika ingin beberapa kata kunci.

## 3. Tambah kategori
Tambahkan objek pada `categories`, lalu buat detail dengan ID yang sama pada `details`.

## 4. Ubah tampilan
Gunakan `style.css`. Warna utama ada di bagian `:root`.
