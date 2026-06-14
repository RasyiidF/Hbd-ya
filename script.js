let bgMusic = null;
let musicStarted = false;

function playBackgroundMusic() {
    if (bgMusic && !musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            console.log("Musik diputar");
        }).catch(err => {
            console.log("Autoplay diblokir, coba lagi setelah interaksi:", err);
        });
    }
}

function openCard() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    
    // Mulai musik saat amplop diklik (interaksi pertama)
    playBackgroundMusic();
    
    page1.classList.add('hide');
    setTimeout(() => {
        page2.classList.add('show');
    }, 400);
}

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

document.addEventListener('DOMContentLoaded', () => {
    bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.6;
        bgMusic.loop = true;
    }
    
    const envelopeBtn = document.getElementById('envelopeBtn');
    const noteBtn = document.getElementById('noteBtn');
    
    // Interaksi pertama: jika user tap di mana saja selain tombol, musik mulai
    const firstInteraction = () => {
        playBackgroundMusic();
        document.body.removeEventListener('click', firstInteraction);
        document.body.removeEventListener('touchstart', firstInteraction);
    };
    
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
