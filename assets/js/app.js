// E-DUCATI ON ENTERPRISE - APP LOGIC (FULL)

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Dynamic Copyright Year
    const yearSpan = document.getElementById('currentYear');
    if(yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

    // Global Observer untuk Reveal Staggered
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });
    reveals.forEach(reveal => observer.observe(reveal));

    // 0.5 IGNITION SEQUENCE PRELOADER LOGIC
    const preloader = document.getElementById('preloader');
    if(preloader) {
        const lines = [
            "> Initializing Logic Core...",
            "> Injecting e-DucatiON Fuel...",
            "> Loading Assessment Engine...",
            "> Booting High-Performance Logic...",
            "> SYSTEM ONLINE."
        ];
        const terminalText = document.getElementById('terminalText');
        let lineIndex = 0;
        let charIndex = 0;
        
        function typeLine() {
            if (lineIndex < lines.length) {
                if (charIndex < lines[lineIndex].length) {
                    terminalText.innerHTML += lines[lineIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(typeLine, 30);
                } else {
                    terminalText.innerHTML += "\n";
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeLine, 300);
                }
            } else {
                setTimeout(() => {
                    preloader.classList.add('hide');
                    document.body.classList.remove('no-scroll');
                    const heroContent = document.querySelector('.hero-content');
                    if(heroContent) heroContent.style.animation = "fadeInUp 1s ease-out forwards";
                    initHeroAnimations();
                }, 1000);
            }
        }
        typeLine();
    } else {
        initHeroAnimations();
    }

    function initHeroAnimations() {
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
    }

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
                        </tr>`;
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
                    </tr>`;
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
            const newCourse = { kode: "PLN-" + Math.floor(Math.random() * 10000), matkul, sks, dosen, kategori, tahun_ajaran: tahun, semester, status: "Planned" };
            CURRICULUM_DB.push(newCourse);
            renderCurriculumTable();
            krsForm.reset();
            const btn = krsForm.querySelector('button[type="submit"]');
            btn.innerText = "Mata Kuliah Ditambahkan!";
            btn.style.background = "#FF5400";
            btn.style.color = "#000";
            setTimeout(() => { btn.innerText = "Tambahkan ke KRS"; btn.style.background = "transparent"; btn.style.color = "#FF5400"; }, 2000);
        });
    }

    // 6. Render Statistik Kesulitan
    const chartContainer = document.getElementById('statsChart');
    if(chartContainer) {
        STATS_DB.forEach(stat => {
            chartContainer.innerHTML += `
                <div class="bar-item">
                    <div class="bar-label"><span>${stat.matkul}</span><span>${stat.tingkat_kesulitan}%</span></div>
                    <div class="bar-bg"><div class="bar-fill" data-width="${stat.tingkat_kesulitan}%"></div></div>
                </div>`;
        });
        setTimeout(() => { document.querySelectorAll('.bar-fill').forEach(bar => { bar.style.width = bar.getAttribute('data-width'); }); }, 500);
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
            if(percentage <= 40) { category = "ENGINE COLD"; message = "Anda membutuhkan pemahaman dasar yang lebih kuat. Jangan menyerah, mesin butuh pemanasan!"; }
            else if(percentage <= 75) { category = "WARMING UP"; message = "Anda cukup siap. Dengan ketekunan ekstra, Anda akan bertahan di Informatika."; }
            else { category = "HIGH-PERFORMANCE"; message = "Anda lahir untuk ini! Logika dan mental Anda sangat cocok untuk Jurusan Informatika."; }
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
                </div>`;
        });
    }

    // 8. Render Contributor Tree (Vertikal Flowchart - 2 Level)
    const contributorGrid = document.getElementById('contributorGrid');
    if(contributorGrid) {
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
                            <img src="assets/media/img/unsia.png" alt="Logo UNSIA" class="unsia-logo-card">
                            <p style="font-size: 0.8rem; color: var(--text-silver); margin-top: 5px;">${member.peran}</p>
                            <div class="social-links">${socialHTML}</div>
                        </div>
                    </div>
                </div>`;
        }
        let treeHTML = `<div class="tree-wrapper">`;
        const parent = TEAM_DB.find(m => m.hierarchy === 1);
        if(parent) {
            treeHTML += `<div class="tree-node">${renderCard(parent)}</div>`;
            const children = TEAM_DB.filter(m => m.hierarchy === 2);
            if(children.length > 0) {
                treeHTML += `<div class="tree-children">`;
                children.forEach(m => { treeHTML += `<div class="tree-child">${renderCard(m)}</div>`; });
                treeHTML += `</div>`;
            }
        }
        treeHTML += `</div>`;
        contributorGrid.innerHTML = treeHTML;
        
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        document.querySelectorAll('.flip-card').forEach(card => {
            card.addEventListener('click', () => { card.classList.toggle('flipped'); });
            card.addEventListener('mouseleave', () => { if (card.classList.contains('flipped')) { card.classList.remove('flipped'); } });
        });
    }

    // 9. THE PIT STOP: DEBUG TERMINAL LOGIC
    const pitstopContainer = document.getElementById('pitstopContainer');
    if(pitstopContainer) {
        let currentChallengeIndex = 0;
        let score = 0;
        function renderChallenge() {
            if (currentChallengeIndex >= CHALLENGES_DB.length) {
                pitstopContainer.innerHTML = `
                    <div class="terminal-output">
                        <p>> SYSTEM RESTORED.</p>
                        <p>> All bugs fixed. Engine running at 100% efficiency.</p>
                        <h3 class="terminal-score">Final Score: ${score}/${CHALLENGES_DB.length}</h3>
                        <button id="restartTerminal" class="btn-primary">Restart Sequence</button>
                    </div>`;
                document.getElementById('restartTerminal').addEventListener('click', () => { currentChallengeIndex = 0; score = 0; renderChallenge(); });
                return;
            }
            const challenge = CHALLENGES_DB[currentChallengeIndex];
            let optionsHTML = '';
            challenge.options.forEach((opt, index) => { optionsHTML += `<button class="btn-terminal-opt" data-index="${index}">${opt}</button>`; });
            pitstopContainer.innerHTML = `
                <div class="terminal-header">
                    <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                    <span class="terminal-title">debug_terminal.sh</span>
                </div>
                <div class="terminal-body">
                    <p class="terminal-prompt">> ERROR DETECTED: ${challenge.title}</p>
                    <textarea class="code-box" readonly>${challenge.code}</textarea>
                    <p class="terminal-prompt">> Select the correct fix to proceed:</p>
                    <div class="terminal-options">${optionsHTML}</div>
                    <div class="terminal-feedback" id="terminalFeedback"></div>
                </div>`;
            document.querySelectorAll('.btn-terminal-opt').forEach(btn => {
                btn.addEventListener('click', function() {
                    const selectedIdx = parseInt(this.getAttribute('data-index'));
                    const feedbackDiv = document.getElementById('terminalFeedback');
                    if (selectedIdx === challenge.answer) {
                        score++;
                        feedbackDiv.innerHTML = `<p class="success">> ${challenge.explanation}</p>`;
                        this.classList.add('correct');
                        currentChallengeIndex++;
                        setTimeout(renderChallenge, 2500);
                    } else {
                        feedbackDiv.innerHTML = `<p class="error">> FIX REJECTED. Engine stall. Try again.</p>`;
                        this.classList.add('wrong');
                        setTimeout(() => { this.classList.remove('wrong'); feedbackDiv.innerHTML = ''; }, 2000);
                    }
                });
            });
        }
        renderChallenge();
    }

    // 10. THE ALGORITHM REDLINE VISUALIZER LOGIC
    const startRedlineBtn = document.getElementById('startRedline');
    if (startRedlineBtn) {
        let array = [];
        let isSorting = false;
        let comparisons = 0;
        const barContainer = document.getElementById('barContainer');
        const rpmNeedle = document.getElementById('rpmNeedle');
        const rpmValue = document.getElementById('rpmValue');
        const opsValue = document.getElementById('opsValue');
        const resetBtn = document.getElementById('resetRedline');
        const sizeSlider = document.getElementById('sizeSlider');
        const sizeValue = document.getElementById('sizeValue');
        const algoSelect = document.getElementById('algoSelect');

        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        function generateArray(size) {
            array = [];
            for(let i=0; i<size; i++) { array.push(Math.floor(Math.random() * 100) + 10); }
            renderBars();
        }

        function renderBars(activeIdx1 = -1, activeIdx2 = -1, sortedIdxs = []) {
            if(!barContainer) return;
            barContainer.innerHTML = '';
            const maxHeight = Math.max(...array);
            array.forEach((val, idx) => {
                const bar = document.createElement('div');
                bar.classList.add('array-bar');
                bar.style.height = `${(val / maxHeight) * 100}%`;
                if (idx === activeIdx1 || idx === activeIdx2) { bar.classList.add('active'); } 
                else if (sortedIdxs.includes(idx)) { bar.classList.add('sorted'); }
                barContainer.appendChild(bar);
            });
        }

        function updateGauge() {
            let rpm = Math.min(8000, comparisons * 5);
            let rotation = (rpm / 8000) * 180 - 90;
            if(rpmNeedle) rpmNeedle.style.transform = `rotate(${rotation}deg)`;
            if(rpmValue) rpmValue.innerText = Math.floor(rpm);
            if(opsValue) opsValue.innerText = comparisons;
            if (rpm > 6500) {
                if(rpmNeedle) rpmNeedle.style.background = '#ff4444';
                if(rpmNeedle) rpmNeedle.style.boxShadow = '0 0 15px #ff4444';
            } else if (rpm > 4000) {
                if(rpmNeedle) rpmNeedle.style.background = '#FF5400';
                if(rpmNeedle) rpmNeedle.style.boxShadow = '0 0 10px #FF5400';
            } else {
                if(rpmNeedle) rpmNeedle.style.background = '#00cc66';
                if(rpmNeedle) rpmNeedle.style.boxShadow = '0 0 10px #00cc66';
            }
        }

        async function bubbleSort() {
            let n = array.length;
            let sortedIdxs = [];
            for (let i = 0; i < n-1; i++) {
                for (let j = 0; j < n-i-1; j++) {
                    if (!isSorting) return;
                    comparisons++;
                    updateGauge();
                    if (array[j] > array[j+1]) {
                        let temp = array[j];
                        array[j] = array[j+1];
                        array[j+1] = temp;
                        renderBars(j, j+1, sortedIdxs);
                        await sleep(10);
                    }
                }
                sortedIdxs.push(n-1-i);
            }
            sortedIdxs.push(0);
            renderBars(-1, -1, sortedIdxs);
        }

        async function selectionSort() {
            let n = array.length;
            let sortedIdxs = [];
            for (let i = 0; i < n; i++) {
                let minIdx = i;
                for (let j = i+1; j < n; j++) {
                    if (!isSorting) return;
                    comparisons++;
                    updateGauge();
                    if (array[j] < array[minIdx]) { minIdx = j; }
                    renderBars(i, minIdx, sortedIdxs);
                    await sleep(20);
                }
                let temp = array[i];
                array[i] = array[minIdx];
                array[minIdx] = temp;
                sortedIdxs.push(i);
            }
            renderBars(-1, -1, sortedIdxs);
        }

        async function quickSort(low, high) {
            if (!isSorting) return;
            if (low < high) {
                let pi = await partition(low, high);
                await quickSort(low, pi - 1);
                await quickSort(pi + 1, high);
            }
            if (low === 0 && high === array.length - 1) {
                let sortedIdxs = [];
                for(let i=0; i<array.length; i++) sortedIdxs.push(i);
                renderBars(-1, -1, sortedIdxs);
            }
        }

        async function partition(low, high) {
            let pivot = array[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                if (!isSorting) return;
                comparisons++;
                updateGauge();
                if (array[j] < pivot) {
                    i++;
                    let temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                    renderBars(i, j);
                    await sleep(30);
                }
            }
            let temp = array[i + 1];
            array[i + 1] = array[high];
            array[high] = temp;
            renderBars(i+1, high);
            await sleep(30);
            return i + 1;
        }

        startRedlineBtn.addEventListener('click', async () => {
            if (isSorting) return;
            isSorting = true;
            comparisons = 0;
            startRedlineBtn.innerText = "Running...";
            startRedlineBtn.disabled = true;
            algoSelect.disabled = true;
            sizeSlider.disabled = true;
            const algo = algoSelect.value;
            if (algo === 'bubble') await bubbleSort();
            else if (algo === 'selection') await selectionSort();
            else if (algo === 'quick') await quickSort(0, array.length - 1);
            isSorting = false;
            startRedlineBtn.innerText = "Sequence Complete";
            setTimeout(() => {
                comparisons = 0;
                updateGauge();
                startRedlineBtn.innerText = "Ignite Sequence";
                startRedlineBtn.disabled = false;
                algoSelect.disabled = false;
                sizeSlider.disabled = false;
            }, 2000);
        });

        resetBtn.addEventListener('click', () => {
            isSorting = false;
            comparisons = 0;
            updateGauge();
            generateArray(parseInt(sizeSlider.value));
            startRedlineBtn.innerText = "Ignite Sequence";
            startRedlineBtn.disabled = false;
            algoSelect.disabled = false;
            sizeSlider.disabled = false;
        });

        sizeSlider.addEventListener('input', (e) => {
            if (!isSorting) {
                sizeValue.innerText = e.target.value;
                generateArray(parseInt(e.target.value));
                comparisons = 0;
                updateGauge();
            }
        });

        generateArray(parseInt(sizeSlider.value));
        updateGauge();
    }

    // 11. KNOWLEDGE BASE / LIBRARY RENDER LOGIC
    const libraryGrid = document.getElementById('libraryGrid');
    if(libraryGrid) {
        LIBRARY_DB.forEach(item => {
            libraryGrid.innerHTML += `
                <a href="${item.link}" target="_blank" class="library-card reveal">
                    <span class="lib-category">${item.category}</span>
                    <h4 class="lib-title">${item.title}</h4>
                    <p class="lib-author">by ${item.author}</p>
                    <p class="lib-desc">${item.description}</p>
                </a>
            `;
        });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
});