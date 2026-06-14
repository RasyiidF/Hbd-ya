let bgMusic = null;
let musicStarted = false;

// Fungsi untuk memutar musik (hanya sekali)
function playMusicOnPage2() {
    if (bgMusic && !musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            console.log("Musik diputar di halaman 2");
        }).catch(err => {
            console.log("Gagal memutar musik:", err);
        });
    }
}

// Pindah dari halaman 1 ke halaman 2
function openCard() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    
    page1.classList.add('hide');
    setTimeout(() => {
        page2.classList.add('show');
        // Musik mulai SETELAH halaman 2 tampil
        playMusicOnPage2();
    }, 400);
}

// Pindah dari halaman 2 ke halaman 3
function openLetter() {
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    
    page2.classList.remove('show');
    page2.classList.add('hide');
    setTimeout(() => {
        page3.classList.add('show');
        // Musik sudah berjalan dari halaman 2, tidak perlu diputar lagi
    }, 400);
}

// Inisialisasi setelah halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.5;
        bgMusic.loop = true;
    }
    
    const envelopeBtn = document.getElementById('envelopeBtn');
    const noteBtn = document.getElementById('noteBtn');
    
    // Hapus atau komentar bagian firstInteraction karena musik hanya dipicu dari openCard
    // (tidak perlu interaksi global lagi)
    
    if (envelopeBtn) {
        envelopeBtn.addEventListener('click', openCard);
        envelopeBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            openCard();
        }, { passive: false });
    }
    if (noteBtn) {
        noteBtn.addEventListener('click', openLetter);
        noteBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            openLetter();
        }, { passive: false });
    }
});
