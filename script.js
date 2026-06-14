// Variabel audio dan status apakah sudah diputar
let bgMusic = null;
let musicStarted = false;

function playBackgroundMusic() {
    if (bgMusic && !musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            console.log("Musik diputar");
        }).catch(err => {
            console.log("Autoplay diblokir, diperlukan interaksi lagi:", err);
            // fallback: coba lagi nanti
        });
    }
}

function openCard() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    
    // Start musik jika belum
    playBackgroundMusic();
    
    page1.classList.add('hide');
    setTimeout(() => {
        page2.classList.add('show');
    }, 400);
}

function openLetter() {
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    
    // Pastikan musik tetap jalan
    playBackgroundMusic();
    
    page2.classList.remove('show');
    page2.classList.add('hide');
    setTimeout(() => {
        page3.classList.add('show');
    }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi audio
    bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.6; // atur volume (0-1)
        bgMusic.loop = true;
    }
    
    const envelopeBtn = document.getElementById('envelopeBtn');
    const noteBtn = document.getElementById('noteBtn');
    
    // Fungsi untuk menangani tap pertama (mulai musik)
    const firstInteraction = () => {
        playBackgroundMusic();
        // Hapus listener setelah interaksi pertama agar tidak double
        document.body.removeEventListener('click', firstInteraction);
        document.body.removeEventListener('touchstart', firstInteraction);
    };
    
    // Pasang listener global untuk interaksi pertama (jika user tap di mana saja)
    document.body.addEventListener('click', firstInteraction);
    document.body.addEventListener('touchstart', firstInteraction);
    
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