let bgMusic = null;
let musicStarted = false;

// Fungsi untuk memutar musik (dipanggil setelah interaksi user)
function playBackgroundMusic() {
    if (!bgMusic) return;
    
    // Jika musik belum diputar sama sekali
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            console.log("Musik mulai diputar");
        }).catch(err => {
            console.log("Gagal memutar musik:", err);
            // Fallback: coba lagi nanti dengan cara lain
            setTimeout(() => {
                if (!musicStarted && bgMusic) {
                    bgMusic.play().catch(e => console.log("Fallback gagal:", e));
                }
            }, 500);
        });
    } else {
        // Jika musik sudah pernah diputar tapi mungkin pause karena sesuatu
        if (bgMusic.paused) {
            bgMusic.play().catch(err => console.log("Resume musik gagal:", err));
        }
    }
}

// Fungsi pindah ke halaman 2
function openCard() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    
    // Mulai musik (jika belum)
    playBackgroundMusic();
    
    page1.classList.add('hide');
    setTimeout(() => {
        page2.classList.add('show');
    }, 400);
}

// Fungsi pindah ke halaman 3
function openLetter() {
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    
    // Pastikan musik tetap berjalan
    playBackgroundMusic();
    
    page2.classList.remove('show');
    page2.classList.add('hide');
    setTimeout(() => {
        page3.classList.add('show');
    }, 400);
}

// Event listener ketika halaman siap
document.addEventListener('DOMContentLoaded', () => {
    bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.5;   // volume 50%
        bgMusic.loop = true;
        
        // Debug: cek apakah file audio bisa dimuat
        bgMusic.addEventListener('canplaythrough', () => {
            console.log("Audio siap diputar");
        });
        bgMusic.addEventListener('error', (e) => {
            console.log("Error loading audio:", e);
        });
    }
    
    const envelopeBtn = document.getElementById('envelopeBtn');
    const noteBtn = document.getElementById('noteBtn');
    
    // Interaksi pertama: sentuh di mana saja (termasuk amplop) akan mulai musik
    // Ini untuk mengatasi browser yang sangat ketat (seperti Safari)
    const firstInteraction = () => {
        playBackgroundMusic();
        // Hapus listener setelah interaksi pertama
        document.body.removeEventListener('click', firstInteraction);
        document.body.removeEventListener('touchstart', firstInteraction);
        console.log("First interaction detected");
    };
    
    // Pasang listener untuk seluruh body (agar tap di area kosong juga memicu)
    document.body.addEventListener('click', firstInteraction);
    document.body.addEventListener('touchstart', firstInteraction);
    
    // Tombol amplop
    if (envelopeBtn) {
        envelopeBtn.addEventListener('click', openCard);
        envelopeBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            openCard();
        }, { passive: false });
    }
    
    // Tombol note (kertas) di halaman 2
    if (noteBtn) {
        noteBtn.addEventListener('click', openLetter);
        noteBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            openLetter();
        }, { passive: false });
    }
});
