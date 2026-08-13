// E-DUCATI ON ENTERPRISE - APP LOGIC (FULL)

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Dynamic Copyright Year
    const yearSpan = document.getElementById('currentYear');
    if(yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

    // 1. Hero Slider Frame Cycle (5 detik per frame)
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let slideIndex = 0;
        showSlides();
        function showSlides() {
            slides.forEach(slide => slide.classList.remove('active'));
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1; }
            if (slides[slideIndex-1]) slides[slideIndex-1].classList.add('active');
            setTimeout(showSlides, 5000);
        }
    }

    // 2. Slow Statistics Counter
    const statNum = document.querySelector('.stat-num');
    if(statNum) {
        let count = 0;
        const target = 98;
        const interval = setInterval(() => {
            count += 1;
            statNum.innerText = count + "%";
            if (count >= target) clearInterval(interval);
        }, 30);
    }

    // 3. Intersection Observer untuk Reveal Staggered
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });
    reveals.forEach(reveal => observer.observe(reveal));

    // 4. Render Tabel Kurikulum (Dinamis)
    const tableBody = document.getElementById('curriculumTableBody');
    if(tableBody) {
        window.renderCurriculumTable = function() {
            tableBody.innerHTML = '';
            let totalSksTaken = 0;
            let currentSemester = 0;
            
            // Sort berdasarkan semester agar urut
            const sortedDB = [...CURRICULUM_DB].sort((a,b) => a.semester - b.semester);
            
            sortedDB.forEach(item => {
                if(item.status === "Taken") totalSksTaken += item.sks;
                
                if(item.semester !== currentSemester) {
                    currentSemester = item.semester;
                    tableBody.innerHTML += `
                        <tr style="background: #000;">
                            <td colspan="6" style="color: var(--accent-orange); font-family: var(--font-display); font-size: 1.5rem; padding: 20px 15px;">
                                SEMESTER ${currentSemester} <span style="color: var(--text-muted); font-size: 0.9rem; font-family: var(--font-mono);">| T.A ${item.tahun_ajaran} | (${item.status})</span>
                            </td>
                        </tr>
                    `;
                }

                const rowStyle = item.status === "Planned" ? "opacity: 0.6; font-style: italic;" : "";
                tableBody.innerHTML += `
                    <tr style="${rowStyle}">
                        <td>${item.kode}</td>
                        <td>${item.matkul}</td>
                        <td>${item.sks}</td>
                        <td>${item.dosen}</td>
                        <td>${item.kategori}</td>
                        <td>${item.status}</td>
                    </tr>
                `;
            });
            document.getElementById('totalSks').innerText = totalSksTaken + " SKS (Locked)";
        }
        renderCurriculumTable();
    }

    // 5. Logika Form Penambahan KRS Mendatang
    const krsForm = document.getElementById('krsForm');
    if(krsForm) {
        krsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const matkul = document.getElementById('matkulInput').value;
            const sks = parseInt(document.getElementById('sksInput').value);
            const dosen = document.getElementById('dosenInput').value;
            const kategori = document.getElementById('kategoriInput').value;
            const tahun = document.getElementById('tahunInput').value;
            const semester = parseInt(document.getElementById('semesterInput').value);

            const newCourse = {
                kode: "PLN-" + Math.floor(Math.random() * 10000),
                matkul: matkul,
                sks: sks,
                dosen: dosen,
                kategori: kategori,
                tahun_ajaran: tahun,
                semester: semester,
                status: "Planned"
            };

            CURRICULUM_DB.push(newCourse);
            renderCurriculumTable(); // Render ulang tabel
            krsForm.reset();
            
            // Feedback visual
            const btn = krsForm.querySelector('button[type="submit"]');
            btn.innerText = "Mata Kuliah Ditambahkan!";
            btn.style.background = "#FF5400";
            btn.style.color = "#000";
            setTimeout(() => {
                btn.innerText = "Tambahkan ke KRS";
                btn.style.background = "transparent";
                btn.style.color = "#FF5400";
            }, 2000);
        });
    }

    // 6. Render Statistik Kesulitan
    const chartContainer = document.getElementById('statsChart');
    if(chartContainer) {
        STATS_DB.forEach(stat => {
            chartContainer.innerHTML += `
                <div class="bar-item">
                    <div class="bar-label">
                        <span>${stat.matkul}</span>
                        <span>${stat.tingkat_kesulitan}%</span>
                    </div>
                    <div class="bar-bg">
                        <div class="bar-fill" data-width="${stat.tingkat_kesulitan}%"></div>
                    </div>
                </div>
            `;
        });
        setTimeout(() => {
            document.querySelectorAll('.bar-fill').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }, 500);
    }

    // 7. Assessment Engine (20 Soal, Tampil 5 Acak, Regenerate 1x)
    const questionContainer = document.getElementById('questionContainer');
    if(questionContainer) {
        let regenerateCount = 0;
        renderRandomQuestions();

        const regenerateBtn = document.getElementById('regenerateBtn');
        regenerateBtn.addEventListener('click', () => {
            if(regenerateCount === 0) {
                renderRandomQuestions();
                regenerateCount++;
                regenerateBtn.disabled = true;
                regenerateBtn.innerText = "No Regrets";
            }
        });

        const assessForm = document.getElementById('assessmentForm');
        assessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let totalScore = 0;
            const maxScore = 50;
            
            for(let i=0; i<5; i++) {
                const selected = document.querySelector(`input[name="q${i}"]:checked`);
                if(selected) totalScore += parseInt(selected.value);
            }
            
            let percentage = (totalScore / maxScore) * 100;
            let category = "", message = "";
            
            if(percentage <= 40) {
                category = "ENGINE COLD";
                message = "Anda membutuhkan pemahaman dasar yang lebih kuat. Jangan menyerah, mesin butuh pemanasan!";
            } else if(percentage <= 75) {
                category = "WARMING UP";
                message = "Anda cukup siap. Dengan ketekunan ekstra, Anda akan bertahan di Informatika.";
            } else {
                category = "HIGH-PERFORMANCE";
                message = "Anda lahir untuk ini! Logika dan mental Anda sangat cocok untuk Jurusan Informatika.";
            }
            
            const resultBox = document.getElementById('resultBox');
            document.getElementById('resultCategory').innerText = category;
            document.getElementById('resultPercentage').innerText = percentage + "%";
            document.getElementById('resultMessage').innerText = message;
            resultBox.classList.add('active');
            resultBox.scrollIntoView({ behavior: 'smooth' });
        });
    }

    function renderRandomQuestions() {
        const shuffled = QUESTIONS_DB.sort(() => 0.5 - Math.random()).slice(0, 5);
        questionContainer.innerHTML = '';
        shuffled.forEach((q, index) => {
            questionContainer.innerHTML += `
                <div class="form-group">
                    <label>${index + 1}. ${q.q}</label><br>
                    <input type="radio" name="q${index}" value="${q.val_a}" id="q${index}a" required>
                    <label for="q${index}a" style="display:inline; margin-left:10px;">${q.a}</label><br>
                    <input type="radio" name="q${index}" value="${q.val_b}" id="q${index}b">
                    <label for="q${index}b" style="display:inline; margin-left:10px;">${q.b}</label><br>
                    <input type="radio" name="q${index}" value="${q.val_c}" id="q${index}c">
                    <label for="q${index}c" style="display:inline; margin-left:10px;">${q.c}</label>
                </div>
            `;
        });
    }

    // 8. Render Contributor Cards
    const contributorGrid = document.getElementById('contributorGrid');
    if(contributorGrid) {
        TEAM_DB.forEach(member => {
            contributorGrid.innerHTML += `
                <div class="flip-card reveal">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <h3>${member.nama}</h3>
                            <p style="color: var(--text-muted); font-size: 0.8rem;">(Hover to Reveal)</p>
                        </div>
                        <div class="flip-card-back">
                            <p style="color: var(--accent-orange); font-family: var(--font-display); font-size: 2rem;">${member.nim}</p>
                            <p style="margin-top: 10px;">${member.peran}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
});