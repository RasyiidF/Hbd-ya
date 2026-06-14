let bgMusic = null;
let musicStarted = false;

// Fungsi memutar musik (hanya sekali)
function playMusicOnPage2() {
    if (bgMusic && !musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            console.log("Musik diputar setelah halaman 2 muncul");
        }).catch(err => {
            console.log("Gagal memutar musik:", err);
        });
    }
}

// Buka halaman 2 (amplop diklik)
function openCard() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    
    page1.classList.add('hide');
    setTimeout(() => {
        page2.classList.add('show');
        // Musik mulai saat halaman 2 muncul
        playMusicOnPage2();
    }, 400);
}

// Buka halaman 3 (kertas diklik)
function openLetter() {
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    
    page2.classList.remove('show');
    page2.classList.add('hide');
    setTimeout(() => {
        page3.classList.add('show');
        // Musik sudah berjalan, tidak perlu diputar lagi
    }, 400);
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.5;
        bgMusic.loop = true;
    }
    
    const envelopeBtn = document.getElementById('envelopeBtn');
    const noteBtn = document.getElementById('noteBtn');
    
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
