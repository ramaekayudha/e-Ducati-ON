// E-DUCATI ON ENTERPRISE - MATH LOGIC & IPK SIMULATOR (FULL)

document.addEventListener('DOMContentLoaded', () => {
    const ipkForm = document.getElementById('ipkForm');
    if(ipkForm) {
        const ipkInputs = document.getElementById('ipkInputs');
        
        // Filter ketat: Hanya mata kuliah berstatus "Taken" yang masuk kalkulator
        const activeCourses = CURRICULUM_DB.filter(item => item.status === "Taken");
        let totalSks = 0;
        
        activeCourses.forEach((matkul, index) => {
            totalSks += matkul.sks;
            ipkInputs.innerHTML += `
                <div class="form-group">
                    <label>${matkul.matkul} (${matkul.sks} SKS)</label>
                    <select id="nilai_${index}" data-sks="${matkul.sks}" onchange="hitungIPK()">
                        <option value="4">A (Sangat Baik)</option>
                        <option value="3">B (Baik)</option>
                        <option value="2">C (Cukup)</option>
                        <option value="1">D (Kurang)</option>
                    </select>
                </div>
            `;
        });
        
        window.hitungIPK = function() {
            let totalPoin = 0;
            
            activeCourses.forEach((matkul, index) => {
                const select = document.getElementById(`nilai_${index}`);
                const nilai = parseFloat(select.value);
                const sks = parseInt(select.getAttribute('data-sks'));
                totalPoin += (nilai * sks);
            });
            
            const ipk = (totalPoin / totalSks).toFixed(2);
            const ipkResult = document.getElementById('ipkResult');
            ipkResult.innerText = ipk;
            
            if(ipk >= 3.5) {
                ipkResult.style.color = "#FF5400";
                ipkResult.style.textShadow = "0 0 15px #FF5400";
            } else if(ipk >= 3.0) {
                ipkResult.style.color = "#E0E0E0";
                ipkResult.style.textShadow = "none";
            } else {
                ipkResult.style.color = "#ff4444";
                ipkResult.style.textShadow = "none";
            }
        };
        
        hitungIPK();
    }
});