# e-Ducati ON V1.0 Enterprise

Aplikasi Web Prediksi Kesiapan Jurusan Informatika & Simulator Akademik
Proyek Ujian Akhir Semester (UAS) - Pemrograman Web I (IF207)
--------------------------------------------------------------

LINK APLIKASI & REPOSITORY
--------------------------------------------------------------
- Live Website (GitHub Pages): https://ramaekayudha.github.io/e-Ducati-ON/
- Repository GitHub: https://github.com/ramaekayudha/e-Ducati-ON

INFORMASI PROYEK
--------------------------------------------------------------
- Universitas: Universitas Siber Asia (UNSIA)
- Program Studi: PJJ Informatika
- Kelas: IF207
- Dosen Pengampu: Riad Sahara, S.SI, MT.

TIM PENGEMBANG - KELOMPOK 2 (KONTRIBUTOR)
--------------------------------------------------------------
1. Rama Eka Yudha (250401010385) - Mahasiswa PJJ Informatika IF207
2. Aditya Nanda (250401010388) - Mahasiswa PJJ Informatika IF207
3. Rosalina May Puspita (250401010370) - Mahasiswa PJJ Informatika IF207
4. Cili Tajul Arifin (250401010354) - Mahasiswa PJJ Informatika IF207
5. Charel Junior Rattu (250401010375) - Mahasiswa PJJ Informatika IF207

FITUR UTAMA
--------------------------------------------------------------
1. Ignition Sequence Preloader: Animasi booting terminal CLI yang mensimulasikan penyalaan mesin logika sebelum mengakses aplikasi.
2. Cinematic Hero Reel: Latar belakang slider hitam-pekat berganti tiap 5 detik, dipadukan dengan tipografi raksasa High-Performance Logic dan animasi statistik real-time.
3. Informatika Readiness Assessment: Mesin prediksi yang mengambil 20 soal dari database, mengacaknya menggunakan Math.random(), dan menampilkan 5 soal. Fitur tombol Regenerate dibatasi 1x untuk melatih keputusan tegas.
4. The Matrix (KRS Blueprint): Tabel dinamis yang merender data KRS asli (Semester 1, 19 SKS) berdasarkan status Taken/Planned.
5. Future KRS Planner: Form input yang menambahkan mata kuliah secara real-time ke dalam tabel tanpa me-refresh halaman (Manipulasi DOM).
6. Statistical Difficulty Map: Visualisasi bar chart murni CSS yang merepresentasikan tingkat kesulitan mata kuliah.
7. IPK Target Simulator: Kalkulator matematis yang terkunci rapat (math.js). Hanya memproses mata kuliah berstatus Taken sehingga perhitungan tidak terdistorsi oleh input KRS perencanaan.
8. The Algorithm Redline: Visualizer algoritma sorting (Bubble, Selection, Quick Sort) dengan simulasi RPM Gauge. Mengedukasi pengguna tentang Big O Notation secara visual.
9. The Pit Stop: Debug Terminal: Antarmuka terminal interaktif untuk latihan troubleshooting 3 jenis bug JavaScript umum (Infinite Loop, Syntax Error, Null Reference).
10. Enterprise Media Hub: Pemutar video lokal (tag video) dan dua pemutar audio lokal (tag audio) untuk Podcast & Manual, serta materi eksternal dari YouTube.
11. The Knowledge Base: Perpustakaan referensi interaktif (MDN, CLRS, dll) yang dirender dari database array.
12. The Architect's Gallery: Galeri visual behind-the-scenes dengan efek hover grayscale-to-color.
13. The Enterprise Team: Halaman kontributor dengan struktur Vertical Flowchart dan kartu 3D Y-axis Flip. Menampilkan logo UNSIA di atas jabatan anggota.
14. Mobile Responsive Design: Aplikasi 100% Mobile Friendly menggunakan Media Queries tanpa framework eksternal.

TEKNOLOGI YANG DIGUNAKAN
--------------------------------------------------------------
- HTML5 Semantik: Paragraf, heading, text formatting (bold, italic, underline, mark), link, image, table, list (ul, li), form (textarea, select, input range), video, audio.
- Custom CSS3: Tanpa Bootstrap/Tailwind. Menggunakan CSS Variables, Flexbox, CSS Grid, 3D Transforms (rotateY), IntersectionObserver, Cinematic Filters, dan Media Queries.
- Vanilla JavaScript (ES6): Array of Objects (In-Memory Database), Math Randomization, DOM Manipulation, Event Listeners, Async/Await (untuk visualisasi algoritma).

STRUKTUR FOLDER
--------------------------------------------------------------
e-Ducati-ON/
├── index.html             (Halaman Utama & Hero Reel)
├── assessment.html        (Mesin Prediksi Assessment)
├── curriculum.html        (KRS, IPK Simulator, Humanist Section)
├── redline.html           (Visualizer Kompleksitas Algoritma)
├── pitstop.html           (Debug Terminal Interaktif)
├── media.html             (Video, Audio, Library & Gallery)
├── contributor.html       (Tim & Sosial Media - Flowchart)
├── license.html           (Halaman Lisensi Aplikasi)
├── assets/
│   ├── css/
│   │   └── style.css      (Custom CSS murni - Dark Mode Enterprise)
│   ├── js/
│   │   ├── data.js        (Database In-Memory: KRS, Stats, Soal, Tim)
│   │   ├── app.js         (Logika Utama, DOM Controller, Algoritma)
│   │   └── math.js        (Algoritma Kalkulator IPK)
│   └── media/
│       ├── img/           (Logo UNSIA, Gallery, Foto Profil .png)
│       ├── video/         (intro.mp4)
│       └── audio/         (podcast.mp3, manual.mp3)
├── LICENSE                (Educational Open License)
└── README.md

LISENSI
--------------------------------------------------------------
Proyek ini dilindungi di bawah Educational Open License (EOL). Lihat file LICENSE atau kunjungi halaman lisensi (https://ramaekayudha.github.io/e-Ducati-ON/license.html) untuk detail lengkap.