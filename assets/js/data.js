// E-DUCATI ON ENTERPRISE - DATA LAYER (FULL)

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
    { 
        nama: "Riad Sahara, S.SI, MT", 
        nim: "NIDN: 0306018902", 
        peran: "Dosen Pembimbing Akademik (UNSIA)",
        email: "riad.sahara@acu.ac.id",
        instagram: "",
        linkedin: "riadsahara",
        github: "",
        foto: "assets/media/img/profiles/riad.png",
        hierarchy: 1
    },
    { 
        nama: "Rama Eka Yudha", 
        nim: "250401010385", 
        peran: "Lead Developer & Arsitek",
        email: "250401010385@mhs.unsia.ac.id",
        instagram: "ramaekayudha",
        linkedin: "ramaekayudha",
        github: "ramaekayudha",
        foto: "assets/media/img/profiles/rama.png",
        hierarchy: 2
    },
    { 
        nama: "Aditya Nanda", 
        nim: "250401010388", 
        peran: "Full Stack Developer",
        email: "250401010388.aditya@mhs.unsia.ac.id",
        instagram: "",
        linkedin: "",
        github: "seinsation",
        foto: "assets/media/img/profiles/aditya.png",
        hierarchy: 2
    },
    { 
        nama: "[Nama Anggota 3]", 
        nim: "[NIM]", 
        peran: "Algorithm Specialist",
        email: "email@mhs.unsia.ac.id",
        instagram: "username_ig",
        linkedin: "username_linkedin",
        github: "username_gh",
        foto: "",
        hierarchy: 2
    },
    { 
        nama: "[Nama Anggota 4]", 
        nim: "[NIM]", 
        peran: "Database Engineer",
        email: "email@mhs.unsia.ac.id",
        instagram: "username_ig",
        linkedin: "username_linkedin",
        github: "username_gh",
        foto: "",
        hierarchy: 2
    },
    { 
        nama: "[Nama Anggota 5]", 
        nim: "[NIM]", 
        peran: "Documentation & Testing",
        email: "email@mhs.unsia.ac.id",
        instagram: "username_ig",
        linkedin: "username_linkedin",
        github: "username_gh",
        foto: "",
        hierarchy: 2
    }
];

const CHALLENGES_DB = [
    {
        id: 1,
        title: "Logic Error: Infinite Loop",
        code: "let lap = 0;\nwhile (lap < 10) {\n  console.log('Lap completed');\n}",
        options: [
            "while (lap > 10)",
            "while (lap < 10) { lap++; }",
            "while (lap = 10)",
            "while (lap < 10) { lap--; }"
        ],
        answer: 1,
        explanation: "FIX ACCEPTED. Variable 'lap' must be incremented to break the loop, preventing engine overheat."
    },
    {
        id: 2,
        title: "Syntax Error: Assignment vs Comparison",
        code: "let engine = 'off';\nif (engine = 'on') {\n  igniteFuel();\n}",
        options: [
            "if (engine == 'on')",
            "if (engine = 'on')",
            "if (engine != 'on')",
            "if (engine => 'on')"
        ],
        answer: 0,
        explanation: "FIX ACCEPTED. Using single '=' assigns value instead of comparing. Use '==' or '===' to check condition."
    },
    {
        id: 3,
        title: "DOM Error: Null Reference",
        code: "const btn = document.getElementById('startBtn');\nbtn.innerText = 'Start';",
        options: [
            "The script is loaded in <head> before DOM exists",
            "innerText should be innerHTML",
            "btn needs to be a const",
            "getElementById should be querySelector"
        ],
        answer: 0,
        explanation: "FIX ACCEPTED. If JS runs before HTML loads, 'btn' is null. Use 'defer' or place script at end of body."
    }
];

// DATABASE FITUR BARU: KNOWLEDGE BASE / LIBRARY
const LIBRARY_DB = [
    { 
        title: "MDN Web Docs", 
        author: "Mozilla Developer Network", 
        category: "Web Development", 
        description: "Dokumentasi resmi HTML, CSS, dan JavaScript. Fondasi mutlak bagi mahasiswa Pemrograman Web I.", 
        link: "https://developer.mozilla.org/" 
    },
    { 
        title: "Introduction to Algorithms", 
        author: "Thomas H. Cormen", 
        category: "Struktur Data & Algoritma", 
        description: "Buku suci (CLRS) dasar algoritma sorting, Big O Notation, dan kompleksitas waktu.", 
        link: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/" 
    },
    { 
        title: "Clean Code", 
        author: "Robert C. Martin", 
        category: "Software Engineering", 
        description: "Panduan menulis kode yang mudah dibaca, di-refactor, dan dipelihara. Estetika dalam pemrograman.", 
        link: "https://www.oreilly.com/library/view/clean-code/9780136083238/" 
    },
    { 
        title: "W3Schools Online Web Tutorials", 
        author: "Refnes Data", 
        category: "Web Development", 
        description: "Platform interaktif untuk belajar sintaks dasar web dengan Try-It-Yourself editor.", 
        link: "https://www.w3schools.com/" 
    },
    { 
        title: "Database System Concepts", 
        author: "Silberschatz, Korth, Sudarshan", 
        category: "Sistem Basis Data", 
        description: "Memahami normalisasi, ERD, query SQL, dan manajemen transaksi database relasional.", 
        link: "https://www.db-book.com/" 
    },
    { 
        title: "Calculus: Early Transcendentals", 
        author: "James Stewart", 
        category: "Matematika", 
        description: "Buku rujukan standar untuk limit, turunan, dan integral yang applicative di Informatika.", 
        link: "https://www.stewartcalculus.com/" 
    }
];