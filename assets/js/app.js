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
            renderCurriculumTable();
            krsForm.reset();
            
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

    // 8. Render Contributor Tree (Vertikal Flowchart)
    const contributorGrid = document.getElementById('contributorGrid');
    if(contributorGrid) {
        
        // Fungsi pembuat kartu individual
        function renderCard(member) {
            const photoFrontHTML = member.foto 
                ? `<img src="${member.foto}" alt="${member.nama}" class="profile-img-front">` 
                : `<div class="avatar-placeholder-front"><i class="fas fa-user-secret"></i></div>`;

            const photoBackHTML = member.foto 
                ? `<img src="${member.foto}" alt="${member.nama}" class="profile-img-back">` 
                : `<div class="avatar-placeholder-back"><i class="fas fa-user-secret"></i></div>`;

            let socialHTML = '';
            if (member.email) socialHTML += `<a href="mailto:${member.email}" target="_blank" title="Email"><i class="fas fa-envelope"></i></a>`;
            if (member.instagram) socialHTML += `<a href="https://instagram.com/${member.instagram}" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>`;
            if (member.linkedin) socialHTML += `<a href="https://linkedin.com/in/${member.linkedin}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>`;
            if (member.github) socialHTML += `<a href="https://github.com/${member.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>`;

            return `
                <div class="flip-card reveal">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            ${photoFrontHTML}
                            <h3 style="color: var(--text-silver); font-size: 1.2rem; text-align: center;">${member.nama}</h3>
                            <p style="color: var(--text-muted); font-size: 0.7rem; margin-top: 5px;">(Click to Reveal)</p>
                        </div>
                        <div class="flip-card-back">
                            ${photoBackHTML}
                            <h3>${member.nama}</h3>
                            <p style="color: var(--accent-orange); font-family: var(--font-mono); font-size: 0.8rem;">${member.nim}</p>
                            <p style="font-size: 0.8rem; color: var(--text-silver); margin-top: 5px;">${member.peran}</p>
                            <div class="social-links">
                                ${socialHTML}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Algoritma Vertical Flowchart
        let treeHTML = `<div class="tree-wrapper">`;
        
        const l1 = TEAM_DB.find(m => m.hierarchy === 1);
        if(l1) {
            treeHTML += `<div class="tree-node">${renderCard(l1)}<div class="tree-dot"></div></div>`;
            
            const l2 = TEAM_DB.find(m => m.hierarchy === 2);
            if(l2) {
                treeHTML += `<div class="tree-node">${renderCard(l2)}<div class="tree-dot"></div></div>`;
                
                const l3_members = TEAM_DB.filter(m => m.hierarchy === 3);
                if(l3_members.length > 0) {
                    treeHTML += `<div class="tree-children">`;
                    l3_members.forEach(m => {
                        treeHTML += `<div class="tree-child">${renderCard(m)}</div>`;
                    });
                    treeHTML += `</div>`;
                }
            }
        }
        treeHTML += `</div>`;
        
        contributorGrid.innerHTML = treeHTML;

        // Pasang Event Listener untuk Kartu yang baru dirender
        document.querySelectorAll('.flip-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
            card.addEventListener('mouseleave', () => {
                if (card.classList.contains('flipped')) {
                    card.classList.remove('flipped');
                }
            });
        });

        // Re-observe for reveal animations
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
});