// E-DUCATI ON ENTERPRISE - DATA LAYER (FULL)

// Data awal hanya berisi Semester 1 (Taken). Semester mendatang akan diisi via Form.
const CURRICULUM_DB = [
    { kode: "200002101", matkul: "Pendidikan Pancasila", sks: 2, dosen: "Hj. Trayanti Wisalina, A.Md., S.S., M.Si", kategori: "Humanis", tahun_ajaran: "2025/2026", semester: 1, status: "Taken" },
    { kode: "200002106", matkul: "Estetika Humanisme", sks: 2, dosen: "Lia Amelia Nurkhazanah, S.Pd., M.Hum", kategori: "Humanis", tahun_ajaran: "2025/2026", semester: 1, status: "Taken" },
    { kode: "200302207", matkul: "Kalkulus", sks: 3, dosen: "Ambros Magnus Rudolf Mekeng, S.T., M.T", kategori: "Logika", tahun_ajaran: "2025/2026", semester: 1, status: "Taken" },
    { kode: "200302208", matkul: "Statistika dan Probabilitas", sks: 3, dosen: "Dr. Silvana Syah, S.Si., M.Si", kategori: "Logika", tahun_ajaran: "2025/2026", semester: 1, status: "Taken" },
    { kode: "200302209", matkul: "Sistem Basis Data", sks: 3, dosen: "Rima Tamara Aldisa, S. Kom., M. Kom.", kategori: "Teknis", tahun_ajaran: "2025/2026", semester: 1, status: "Taken" },
    { kode: "200302210", matkul: "Struktur Data dan Algoritma", sks: 3, dosen: "Alun Sujjada, S.Kom., M.T", kategori: "Logika", tahun_ajaran: "2025/2026", semester: 1, status: "Taken" },
    { kode: "200302211", matkul: "Pemrograman Web I", sks: 3, dosen: "Riad Sahara, S.SI, MT", kategori: "Teknis", tahun_ajaran: "2025/2026", semester: 1, status: "Taken" }
];

const STATS_DB = [
    { matkul: "Kalkulus", tingkat_kesulitan: 85 },
    { matkul: "Struktur Data dan Algoritma", tingkat_kesulitan: 80 },
    { matkul: "Sistem Basis Data", tingkat_kesulitan: 70 },
    { matkul: "Pemrograman Web I", tingkat_kesulitan: 65 },
    { matkul: "Statistika dan Probabilitas", tingkat_kesulitan: 75 },
    { matkul: "Estetika Humanisme", tingkat_kesulitan: 40 },
    { matkul: "Pendidikan Pancasila", tingkat_kesulitan: 30 }
];

const QUESTIONS_DB = [
    { id: 1, q: "Saat menghadapi bug yang tidak ketemu, reaksi pertama Anda?", a: "Bedah baris demi baris", val_a: 10, b: "Coba-coba acak", val_b: 5, c: "Nyerah & cari di Google", val_c: 0 },
    { id: 2, q: "Ketahanan Anda di depan layar saat coding?", a: "Lupa waktu", val_a: 10, b: "Butuh istirahat 1 jam", val_b: 5, c: "Tidak tahan 30 menit", val_c: 0 },
    { id: 3, q: "Seberapa tertarik Anda pada Matematika Diskrit?", a: "Membuat berpikir jernih", val_a: 10, b: "Biasa saja", val_b: 5, c: "Alergi angka", val_c: 0 },
    { id: 4, q: "Bagaimana pendapat Anda tentang logika if-else?", a: "Fondasi berpikir", val_a: 10, b: "Hanya sintaks", val_b: 5, c: "Membingungkan", val_c: 0 },
    { id: 5, q: "Reaksi saat melihat tumpukan error merah di console?", a: "Tantangan seru", val_a: 10, b: "Sedikit panik", val_b: 5, c: "Langsung tutup laptop", val_c: 0 },
    { id: 6, q: "Pendapat Anda tentang belajar sepanjang hayat (lifetime learning)?", a: "Jalan hidup", val_a: 10, b: "Hanya saat perlu", val_b: 5, c: "Ingin aman", val_c: 0 },
    { id: 7, q: "Bagaimana Anda menyelesaikan masalah logika fisika/matematika?", a: "Buat model alur", val_a: 10, b: "Pakai rumus instan", val_b: 5, c: "Tidak suka logika", val_c: 0 },
    { id: 8, q: "Saat membuat program, fokus utama Anda?", a: "Optimasi performa", val_a: 10, b: "Yang penting jalan", val_b: 5, c: "Tampilan visual", val_c: 0 },
    { id: 9, q: "Bagaimana sikap Anda saat mengerjakan tugas kelompok coding?", a: "Jadi arsitek logika", val_a: 10, b: "Ikut saja", val_b: 5, c: "Tunggu jadi", val_c: 0 },
    { id: 10, q: "Seberapa nyaman Anda dengan teks putih di latar hitam?", a: "Sangat nyaman", val_a: 10, b: "Biasa saja", val_b: 5, c: "Sakit mata", val_c: 0 },
    { id: 11, q: "Apa pendapat Anda tentang algoritma sorting?", a: "Karya seni logika", val_a: 10, b: "Tools biasa", val_b: 5, c: "Membuat pusing", val_c: 0 },
    { id: 12, q: "Bagaimana Anda menghadapi tugas mendesak (deadline)?", a: "Tenang & susun strategi", val_a: 10, b: "Panik tapi selesai", val_b: 5, c: "Kabur", val_c: 0 },
    { id: 13, q: "Ketertarikan pada bahasa mesin/biner?", a: "Sangat penasaran", val_a: 10, b: "Tidak terlalu", val_b: 5, c: "Mengerikan", val_c: 0 },
    { id: 14, q: "Bagaimana sikap Anda pada struktur data (Array, Tree)?", a: "Peta harta karun", val_a: 10, b: "Hanya teori", val_b: 5, c: "Bosan", val_c: 0 },
    { id: 15, q: "Saat device Anda lemot, apa yang Anda lakukan?", a: "Cek task manager/proses", val_a: 10, b: "Restart aja", val_b: 5, c: "Banting meja", val_c: 0 },
    { id: 16, q: "Seberapa sering Anda membaca dokumentasi API/bahasa?", a: "Tiap hari", val_a: 10, b: "Saat lupa", val_b: 5, c: "Tidak pernah", val_c: 0 },
    { id: 17, q: "Bagaimana pendapat Anda tentang pola desain (Design Pattern)?", a: "Kunci skalabilitas", val_a: 10, b: "Hanya formalitas", val_b: 5, c: "Buang waktu", val_c: 0 },
    { id: 18, q: "Ketika menemukan cara lebih efisien, Anda?", a: "Langsung refactor", val_a: 10, b: "Catat untuk nanti", val_b: 5, c: "Biarin saja", val_c: 0 },
    { id: 19, q: "Seberapa siap Anda menghabiskan waktu hanya untuk mencari 1 typo?", a: "Itu resiko pekerjaan", val_a: 10, b: "Agak kesal", val_b: 5, c: "Bukan tanggung jawab saya", val_c: 0 },
    { id: 20, q: "Mengapa Anda memilih Informatika?", a: "Passion murni", val_a: 10, b: "Ikut tren/janjikerja", val_b: 5, c: "Dipaksa orang tua", val_c: 0 }
];

const TEAM_DB = [
    { nama: "Rama Eka Yudha", nim: "250401010385", peran: "Lead Developer & Arsitek" },
    { nama: "Aditya Nanda", nim: "250401010388", peran: "UI/UX Designer" },
    { nama: "[Nama Anggota 3]", nim: "[NIM]", peran: "Algorithm Specialist" },
    { nama: "[Nama Anggota 4]", nim: "[NIM]", peran: "Database Engineer" },
    { nama: "[Nama Anggota 5]", nim: "[NIM]", peran: "Documentation & Testing" }
];