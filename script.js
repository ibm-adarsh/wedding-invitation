// ============================================
// WEDDING INVITATION
// Hindu rituals · Universal warmth · Doctor & Dev views
// ============================================

let musicPlaying = false;
let darkMode = false;
let currentMode = localStorage.getItem('wedding-mode') || 'classic';
let ytPlayer = null;
let ytReady = false;
const musicIcon = document.getElementById('music-icon');
const themeIcon = document.getElementById('theme-icon');

const YT_VIDEO_ID = '3qpxJEp4Ec4';
const YT_START_SECONDS = 40;
const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;

// ============================================
// INVITATION OPENING
// ============================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function resetPageScroll() {
    if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

function finishLoader({ withMusic = false } = {}) {
    const loader = document.getElementById('invitation-loader');
    if (!loader || loader.dataset.done) return;
    loader.dataset.done = '1';

    resetPageScroll();
    document.body.classList.remove('loader-active');

    if (withMusic && !musicPlaying) {
        startBackgroundMusic(true);
    }

    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
        resetPageScroll();
        document.getElementById('main-content').style.opacity = '1';
        startAllAnimations();
    }, 500);
}

function updateLoaderMusicButton() {
    const btn = document.getElementById('open-invitation-music');
    if (!btn) return;
    if (ytReady) {
        btn.disabled = false;
        btn.textContent = '🎵 Open Invitation with Music';
    } else {
        btn.disabled = true;
        btn.textContent = 'Preparing music…';
    }
}

function playMusicFromUserGesture() {
    pendingMusicFromGesture = true;
    musicStartRequested = true;
    if (!ytReady || !ytPlayer?.playVideo) return false;
    playYouTubeMusic({ muted: false });
    stopMusicRetryLoop();
    setTimeout(() => {
        if (isYouTubePlaying()) setMusicPlayingState(true);
    }, 300);
    return true;
}

function openInvitationWithMusic(e) {
    e?.preventDefault();
    e?.stopPropagation();
    if (!playMusicFromUserGesture()) {
        startBackgroundMusic(true);
    }
    finishLoader({ withMusic: false });
}

function openInvitationQuietly(e) {
    e?.preventDefault();
    e?.stopPropagation();
    musicStartRequested = false;
    stopMusicRetryLoop();
    finishLoader({ withMusic: false });
}

document.getElementById('open-invitation-music')?.addEventListener('click', openInvitationWithMusic);
document.getElementById('skip-loader')?.addEventListener('click', openInvitationQuietly);

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loader-active');
    resetPageScroll();
    initGlobalHeartClicks();
    updateLoaderMusicButton();
    if (window.YT?.Player) initYouTubePlayer();

    setTimeout(() => {
        if (ytReady) return;
        const btn = document.getElementById('open-invitation-music');
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Music needs internet — use option below';
        }
    }, 12000);
});

// ============================================
// EXPERIENCE MODE SWITCHER
// Classic (everyone) · Doctor · Developer
// ============================================
function setExperienceMode(mode) {
    currentMode = mode;
    localStorage.setItem('wedding-mode', mode);
    document.body.classList.remove('mode-classic', 'mode-doctor', 'mode-developer');
    document.body.classList.add(`mode-${mode}`);
    document.body.dataset.mode = mode;
    document.body.classList.toggle('dark-mode', darkMode);

    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    if (mode === 'developer') {
        initDevEffects();
    }
}

function initModeSwitcher() {
    setExperienceMode('classic');
}

let devEffectsStarted = false;
function initDevEffects() {
    if (devEffectsStarted) return;
    devEffectsStarted = true;
    initMatrixRain();
    initDNAHelix();
}

// ============================================
// MATRIX RAIN EFFECT
// ============================================
function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01♥💕💻⚕️💍🏥💊🩺';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = darkMode ? '#00ff88' : 'rgba(0, 255, 136, 0.3)';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
}

// ============================================
// DNA HELIX ANIMATION
// ============================================
function initDNAHelix() {
    const canvas = document.getElementById('dna-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let offset = 0;
    
    function drawDNA() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const amplitude = 50;
        const frequency = 0.02;
        
        ctx.strokeStyle = darkMode ? 'rgba(255, 0, 136, 0.3)' : 'rgba(255, 0, 136, 0.15)';
        ctx.lineWidth = 2;
        
        // Draw left strand
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 2) {
            const x = centerX + Math.sin((y + offset) * frequency) * amplitude;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Draw right strand
        ctx.strokeStyle = darkMode ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0, 255, 136, 0.15)';
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 2) {
            const x = centerX - Math.sin((y + offset) * frequency) * amplitude;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Draw connecting lines
        ctx.strokeStyle = darkMode ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 215, 0, 0.1)';
        for (let y = 0; y < canvas.height; y += 20) {
            const x1 = centerX + Math.sin((y + offset) * frequency) * amplitude;
            const x2 = centerX - Math.sin((y + offset) * frequency) * amplitude;
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.stroke();
        }
        
        offset += 2;
        requestAnimationFrame(drawDNA);
    }
    
    drawDNA();
    
    // Easter egg: Click DNA to trigger special effect
    canvas.addEventListener('click', () => {
        createLoveExplosion();
    });
}

// ============================================
// ECG/HEARTBEAT ANIMATION
// ============================================
function initECG() {
    const canvas = document.getElementById('ecg-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let offset = 0;
    
    function drawECG() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ff0088';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const centerY = canvas.height / 2;
        
        for (let x = 0; x < canvas.width; x++) {
            let y = centerY;
            const position = (x + offset) % 200;
            
            // ECG pattern
            if (position > 80 && position < 85) {
                y = centerY - 20;
            } else if (position > 85 && position < 90) {
                y = centerY + 30;
            } else if (position > 90 && position < 95) {
                y = centerY - 10;
            }
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        offset += 2;
        requestAnimationFrame(drawECG);
    }
    
    drawECG();
}

// ============================================
// COUNTDOWN TIMER
// ============================================
let lastCountdownSeconds = -1;

function updateCountdown() {
    const weddingDate = new Date('2026-06-28T18:00:00+05:30').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(3, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (seconds !== lastCountdownSeconds) {
            const secEl = document.getElementById('seconds');
            secEl.classList.remove('tick');
            void secEl.offsetWidth;
            secEl.classList.add('tick');
            lastCountdownSeconds = seconds;
        }
        
        // Update progress bar
        const startDate = new Date('2024-01-15').getTime();
        const totalDuration = weddingDate - startDate;
        const elapsed = now - startDate;
        const progress = (elapsed / totalDuration) * 100;
        
        document.getElementById('progress-fill').style.width = progress + '%';
        document.getElementById('progress-percent').textContent = Math.floor(progress) + '%';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ============================================
// PARTICLE SYSTEM
// ============================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = isCoarsePointer ? 8 : 25;
    const drawConnections = !isCoarsePointer;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = ['#ff0088', '#00ff88', '#ffd700'][Math.floor(Math.random() * 3)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        if (drawConnections) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(255, 215, 0, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// ============================================
// YOUTUBE BACKGROUND MUSIC
// https://www.youtube.com/watch?v=3qpxJEp4Ec4
// ============================================
let pendingMusicFromGesture = false;
let musicUnmuteListenersAttached = false;
let musicStartRequested = false;
let musicRetryInterval = null;

function initYouTubePlayer() {
    if (ytPlayer || !document.getElementById('youtube-player')) return;

    ytPlayer = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: YT_VIDEO_ID,
        playerVars: {
            autoplay: 1,
            mute: 1,
            start: YT_START_SECONDS,
            loop: 1,
            playlist: YT_VIDEO_ID,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1
        },
        events: {
            onReady: () => {
                ytReady = true;
                updateLoaderMusicButton();
            },
            onStateChange: (event) => {
                if (event.data === YT.PlayerState.PLAYING && musicStartRequested && !musicPlaying) {
                    setMusicPlayingState(true);
                    stopMusicRetryLoop();
                    if (!pendingMusicFromGesture) attachMusicUnmuteOnInteraction();
                }
                if (event.data === YT.PlayerState.ENDED) {
                    ytPlayer.seekTo(YT_START_SECONDS, true);
                    ytPlayer.playVideo();
                }
            }
        }
    });
}

window.onYouTubeIframeAPIReady = initYouTubePlayer;

if (typeof YT !== 'undefined' && YT.Player) {
    initYouTubePlayer();
}

function setMusicPlayingState(playing) {
    musicPlaying = playing;
    if (musicIcon) musicIcon.textContent = playing ? '🎵' : '🔇';
}

function isYouTubePlaying() {
    if (!ytPlayer?.getPlayerState || typeof YT === 'undefined') return false;
    const state = ytPlayer.getPlayerState();
    return state === YT.PlayerState.PLAYING || state === YT.PlayerState.BUFFERING;
}

function attachMusicUnmuteOnInteraction() {
    if (musicUnmuteListenersAttached) return;
    musicUnmuteListenersAttached = true;

    const unmute = () => {
        if (ytPlayer?.unMute) {
            ytPlayer.unMute();
            ytPlayer.setVolume(100);
        }
        if (!musicPlaying) {
            playYouTubeMusic({ muted: false });
        }
        setMusicPlayingState(true);
        document.removeEventListener('click', unmute);
        document.removeEventListener('touchstart', unmute);
        document.removeEventListener('scroll', unmute);
        document.removeEventListener('keydown', unmute);
    };

    document.addEventListener('click', unmute, { passive: true });
    document.addEventListener('touchstart', unmute, { passive: true });
    document.addEventListener('scroll', unmute, { passive: true });
    document.addEventListener('keydown', unmute, { passive: true });
}

function playYouTubeMusic({ muted = false } = {}) {
    if (!ytReady || !ytPlayer?.playVideo) {
        if (window.YT && !ytPlayer) initYouTubePlayer();
        return false;
    }
    if (muted) ytPlayer.mute();
    else {
        ytPlayer.unMute();
        ytPlayer.setVolume(100);
    }
    const current = ytPlayer.getCurrentTime?.() || 0;
    if (current < YT_START_SECONDS - 2) {
        ytPlayer.seekTo(YT_START_SECONDS, true);
    }
    ytPlayer.playVideo();
    return true;
}

function pauseYouTubeMusic() {
    if (ytReady && ytPlayer?.pauseVideo) {
        ytPlayer.pauseVideo();
    }
}

function stopMusicRetryLoop() {
    if (musicRetryInterval) {
        clearInterval(musicRetryInterval);
        musicRetryInterval = null;
    }
}

function startMusicRetryLoop() {
    if (musicRetryInterval) return;
    musicRetryInterval = setInterval(() => {
        if (musicPlaying) {
            stopMusicRetryLoop();
            return;
        }
        attemptBackgroundMusic();
    }, 600);

    setTimeout(stopMusicRetryLoop, 30000);
}

function attemptBackgroundMusic() {
    if (!musicStartRequested || musicPlaying) return;

    if (!ytReady || !ytPlayer?.playVideo) {
        if (window.YT && !ytPlayer) initYouTubePlayer();
        return;
    }

    const useMuted = !pendingMusicFromGesture;
    playYouTubeMusic({ muted: useMuted });

    setTimeout(() => {
        if (isYouTubePlaying()) {
            setMusicPlayingState(true);
            stopMusicRetryLoop();
            if (useMuted) attachMusicUnmuteOnInteraction();
            return;
        }

        if (!useMuted) {
            playYouTubeMusic({ muted: true });
            setTimeout(() => {
                if (isYouTubePlaying()) {
                    setMusicPlayingState(true);
                    stopMusicRetryLoop();
                    attachMusicUnmuteOnInteraction();
                }
            }, 400);
        }
    }, 350);
}

function startBackgroundMusic(fromUserGesture = false) {
    pendingMusicFromGesture = fromUserGesture;
    musicStartRequested = true;
    attemptBackgroundMusic();
    startMusicRetryLoop();
}

// ============================================
// MUSIC CONTROL
// ============================================
function toggleMusic() {
    if (musicPlaying) {
        pauseYouTubeMusic();
        setMusicPlayingState(false);
    } else {
        musicStartRequested = true;
        pendingMusicFromGesture = true;
        if (playYouTubeMusic({ muted: false })) {
            setTimeout(() => {
                if (isYouTubePlaying()) setMusicPlayingState(true);
            }, 300);
        } else {
            showToast('Loading music… tap again in a moment');
            setTimeout(() => {
                if (playYouTubeMusic({ muted: false }) && isYouTubePlaying()) {
                    setMusicPlayingState(true);
                }
            }, 1500);
        }
    }
}

// ============================================
// THEME TOGGLE
// ============================================
function toggleTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    themeIcon.textContent = darkMode ? '☀️' : '🌙';
}
function sendWhatsApp() {
    const phoneNumber = '917398812420';
    const message = encodeURIComponent('Hello! I would like to confirm my attendance for Anjali & Adarsh\'s wedding celebration on 28th June 2026. 🎉💕');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

function makeCall() {
    window.location.href = 'tel:+917398812420';
}

const HOME_VENUE_NAME = 'Yadav Residence, Jaunpur';
const HOME_VENUE_MAP = 'https://maps.app.goo.gl/sqXq3p8eudzvBz9U7';
const WEDDING_VENUE_NAME = 'Laxmi Narayan Vatika, Jaunpur, UP';
const WEDDING_VENUE_ADDRESS = 'Laxmi Narayan Vatika Marriage Lawn, Anjaan Shaheed Road, Shahganj, Jaunpur, Uttar Pradesh 223101';

function openMap() {
    const address = encodeURIComponent(WEDDING_VENUE_ADDRESS);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
}

function openHomeMap() {
    window.open(HOME_VENUE_MAP, '_blank');
}

// ============================================
// EASTER EGGS
// ============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateSecretMode();
    }
});

// Type "love" easter egg
let typedText = '';
document.addEventListener('keypress', (e) => {
    typedText += e.key;
    typedText = typedText.slice(-4);
    
    if (typedText === 'love') {
        createLoveExplosion();
    }
});

function activateSecretMode() {
    alert('🎉 Secret Mode Activated! 🎉\n\nYou found the Konami Code!\nEnjoy the extra sparkles! ✨');
    document.body.style.animation = 'rainbow 5s infinite';
    createConfettiExplosion();
}

function createLoveExplosion() {
    const colors = ['#ff0088', '#00ff88', '#ffd700', '#ff6b6b', '#4d96ff'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.transition = 'all 2s ease-out';
            
            document.body.appendChild(heart);
            
            const angle = (Math.PI * 2 * i) / 30;
            const distance = 200;
            
            setTimeout(() => {
                heart.style.left = `calc(50% + ${Math.cos(angle) * distance}px)`;
                heart.style.top = `calc(50% + ${Math.sin(angle) * distance}px)`;
                heart.style.opacity = '0';
                heart.style.transform = 'scale(2) rotate(360deg)';
            }, 50);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 50);
    }
}

function createHeartExplosion(x, y, count = 16) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
            heart.style.position = 'fixed';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = '1.5rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.transition = 'all 1.5s ease-out';
            
            document.body.appendChild(heart);
            
            const angle = (Math.PI * 2 * i) / count;
            const distance = 120 + Math.random() * 40;
            
            setTimeout(() => {
                heart.style.left = (x + Math.cos(angle) * distance) + 'px';
                heart.style.top = (y + Math.sin(angle) * distance) + 'px';
                heart.style.opacity = '0';
                heart.style.transform = 'scale(1.5) rotate(360deg)';
            }, 50);
            
            setTimeout(() => heart.remove(), 1500);
        }, i * 25);
    }
}

let globalHeartsInit = false;
function initGlobalHeartClicks() {
    if (globalHeartsInit) return;
    globalHeartsInit = true;

    let lastBurst = 0;
    document.addEventListener('click', (e) => {
        const now = Date.now();
        if (now - lastBurst < 100) return;
        lastBurst = now;
        createHeartExplosion(e.clientX, e.clientY);
    }, { passive: true });
}

function createConfettiExplosion() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff8fab'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = '0.8';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.transition = 'all 3s ease-in-out';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.style.top = '100vh';
                confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
                confetti.style.opacity = '0';
            }, 100);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}

// ============================================
// GUEST COUNTER ANIMATION
// ============================================
function animateCounter(elementId, target) {
    let current = 0;
    const increment = target / 100;
    const element = document.getElementById(elementId);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

function initRitualPetals() {
    const container = document.querySelector('.ritual-petals');
    if (!container) return;

    const petals = ['🌼', '🌸', '✿', '🪷'];
    for (let i = 0; i < 10; i++) {
        const petal = document.createElement('span');
        petal.className = 'ritual-petal';
        petal.textContent = petals[i % petals.length];
        petal.style.left = `${8 + Math.random() * 84}%`;
        petal.style.animationDelay = `${Math.random() * 12}s`;
        petal.style.animationDuration = `${10 + Math.random() * 8}s`;
        petal.style.fontSize = `${0.9 + Math.random() * 0.8}rem`;
        container.appendChild(petal);
    }
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const EXPECTED_GUEST_COUNT = 150;
const CONFIRMED_GUEST_COUNT = 111;

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger specific animations
            if (entry.target.classList.contains('rsvp-section')) {
                animateCounter('guest-count', EXPECTED_GUEST_COUNT);
                animateCounter('confirmed-count', CONFIRMED_GUEST_COUNT);
            }
        }
    });
}, observerOptions);

// ============================================
// INITIALIZE ALL ANIMATIONS
// ============================================
function startAllAnimations() {
    initModeSwitcher();
    initECG();
    if (!isCoarsePointer) {
        initParticles();
        initCursorTrail();
        initCardTilt();
    }
    initScrollProgress();
    initFloatingNav();
    initProfileCardFlip();
    initStoryTimeline();
    initMilestoneTooltips();
    initCalendarButtons();
    initBlessingsWall();
    initDeityCards();
    initCoupleInteractions();
    initHeroInteractions();
    initRitualPetals();

    if (currentMode === 'developer') {
        initDevEffects();
    }
    
    const revealSelectors = [
        '.animate-reveal',
        '.timeline-item',
        '.profile-card',
        '.deity-card',
        '.love-story-box',
        '.blessings-wall-section',
        '.venue-card',
        '.rsvp-section'
    ].join(', ');

    document.querySelectorAll(revealSelectors).forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.timeline-item').forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${i * 0.12}s`);
    });

    document.querySelectorAll('.profile-card').forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${i * 0.15}s`);
    });
    
    document.querySelectorAll('.profile-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    loadBlessings();
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
window.addEventListener('resize', () => {
    const matrixCanvas = document.getElementById('matrix-canvas');
    const dnaCanvas = document.getElementById('dna-canvas');
    const particlesCanvas = document.getElementById('particles-canvas');

    [matrixCanvas, dnaCanvas, particlesCanvas].forEach((canvas) => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}, { passive: true });

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🪔 Anjali & Adarsh — Wedding Invitation', 'font-size: 22px; color: #8B1538; font-weight: bold;');
// ============================================
// HINDU RITUAL BACKGROUND ANIMATION
// ============================================
function createRitualBackground() {
    const ritualBg = document.getElementById('ritual-background');
    if (!ritualBg) return;
    
    // Create multiple diyas (lamps)
    for (let i = 0; i < 8; i++) {
        const diya = document.createElement('div');
        diya.className = 'diya';
        diya.style.left = `${Math.random() * 100}%`;
        diya.style.top = `${Math.random() * 100}%`;
        diya.style.animationDelay = `${Math.random() * 5}s`;
        ritualBg.appendChild(diya);
    }
    
    // Create flowers
    for (let i = 0; i < 10; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.style.left = `${Math.random() * 100}%`;
        flower.style.top = `${Math.random() * 100}%`;
        flower.style.animationDelay = `${Math.random() * 8}s`;
        ritualBg.appendChild(flower);
    }
    
    // Create lotus flowers
    for (let i = 0; i < 6; i++) {
        const lotus = document.createElement('div');
        lotus.className = 'lotus';
        lotus.style.left = `${Math.random() * 100}%`;
        lotus.style.top = `${Math.random() * 100}%`;
        lotus.style.animationDelay = `${Math.random() * 10}s`;
        ritualBg.appendChild(lotus);
    }
    
    // Create Om symbols
    for (let i = 0; i < 4; i++) {
        const om = document.createElement('div');
        om.className = 'om-symbol';
        om.style.left = `${Math.random() * 100}%`;
        om.style.top = `${Math.random() * 100}%`;
        om.style.animationDelay = `${Math.random() * 15}s`;
        ritualBg.appendChild(om);
    }
    
    // Create mandalas
    for (let i = 0; i < 3; i++) {
        const mandala = document.createElement('div');
        mandala.className = 'mandala';
        mandala.style.left = `${Math.random() * 100}%`;
        mandala.style.top = `${Math.random() * 100}%`;
        mandala.style.animationDelay = `${Math.random() * 20}s`;
        ritualBg.appendChild(mandala);
    }
}

// Initialize ritual background after page load
window.addEventListener('load', () => {
    createRitualBackground();
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }, { passive: true });
}

// ============================================
// FLOATING NAVIGATION
// ============================================
function closeFloatingNav() {
    const nav = document.getElementById('floating-nav');
    const toggle = document.getElementById('nav-toggle');
    nav?.classList.remove('open');
    toggle?.classList.remove('active');
}

function initFloatingNav() {
    const nav = document.getElementById('floating-nav');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!nav || !toggle) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (nav.classList.contains('open') && !nav.contains(e.target)) {
            closeFloatingNav();
        }
    });

    links?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            closeFloatingNav();
        });
    });

    const sections = ['spiritual-opening', 'hero-section', 'couple-section', 'rituals-section', 'events-section', 'venue-section', 'rsvp-section', 'blessings-wall'];
    const navLinks = links?.querySelectorAll('a') || [];

    window.addEventListener('scroll', () => {
        if (nav.classList.contains('open')) {
            closeFloatingNav();
        }

        let current = '';
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section && window.scrollY >= section.offsetTop - 200) {
                current = id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });

        if (window.scrollY > 280) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
    }, { passive: true });
}

// ============================================
// 3D CARD TILT EFFECT
// ============================================
function initCardTilt() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (card.classList.contains('flipped')) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('flipped')) {
                card.style.transform = '';
            }
        });
    });
}

// ============================================
// FLIP PROFILE CARDS
// ============================================
function initProfileCardFlip() {
    document.querySelectorAll('.profile-card').forEach(card => {
        if (!card.querySelector('.card-back')) return;
        card.addEventListener('click', (e) => {
            if (e.target.closest('.heartbeat-monitor') || e.target.closest('.code-animation')) return;
            card.classList.toggle('flipped');
            card.style.transform = '';
            if (card.classList.contains('flipped')) {
                createLoveExplosion();
            }
        });
    });
}

// ============================================
// INTERACTIVE LOVE STORY TIMELINE
// ============================================
const storyData = {
    meet: 'Two souls met, and from the very first conversation, it felt like coming home. Different paths, one beautiful destination.',
    date: 'With every shared moment — laughter, long talks, and quiet understanding — their bond grew deeper and stronger.',
    proposal: 'Under a sky full of stars, with families\' blessings in their hearts, they chose forever. She said yes. The happiest day.',
    forever: 'Now they invite you to witness their sacred union — Saat Phere, seven vows, and a lifetime of love ahead.'
};

function initStoryTimeline() {
    const milestones = document.querySelectorAll('.story-milestone');
    const storyText = document.getElementById('story-text');

    milestones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            milestones.forEach(m => m.classList.remove('active'));
            btn.classList.add('active');
            const key = btn.dataset.story;
            if (storyText && storyData[key]) {
                storyText.style.opacity = '0';
                storyText.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    storyText.textContent = storyData[key];
                    storyText.style.opacity = '1';
                    storyText.style.transform = 'translateY(0)';
                }, 200);
            }
        });
    });
}

// ============================================
// MILESTONE TOOLTIPS
// ============================================
const milestoneMessages = {
    meet: '💫 January 2024 — Where it all began',
    date: '🌹 First date — Hearts officially synced',
    proposal: '💍 The moment she said YES!',
    wedding: '💒 28th June 2026 — The big day!',
    forever: '♾️ A lifetime of love ahead'
};

function initMilestoneTooltips() {
    const tooltip = document.getElementById('milestone-tooltip');
    document.querySelectorAll('.progress-milestones .milestone').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.milestone;
            if (tooltip && milestoneMessages[key]) {
                tooltip.textContent = milestoneMessages[key];
                tooltip.classList.add('show');
                createConfettiExplosion();
            }
        });
    });
}

// ============================================
// ADD TO CALENDAR
// ============================================
function initCalendarButtons() {
    document.querySelectorAll('.add-calendar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const event = btn.dataset.event;
            const date = btn.dataset.date;
            const time = btn.dataset.time;
            const location = btn.dataset.location === 'home' ? HOME_VENUE_NAME : WEDDING_VENUE_NAME;
            const description = `Wedding celebration of Anjali & Adarsh - ${event}`;

            const startDate = `${date}T${time.slice(0,2)}${time.slice(2,4)}${time.slice(4,6)}`;
            const endHour = parseInt(time.slice(0,2)) + 3;
            const endDate = `${date}T${String(endHour).padStart(2,'0')}${time.slice(2,4)}${time.slice(4,6)}`;

            const icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'BEGIN:VEVENT',
                `DTSTART:${startDate}`,
                `DTEND:${endDate}`,
                `SUMMARY:${event} - Anjali & Adarsh Wedding`,
                `DESCRIPTION:${description}`,
                `LOCATION:${location}`,
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\r\n');

            const blob = new Blob([icsContent], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${event.replace(/\s+/g, '_')}.ics`;
            a.click();
            URL.revokeObjectURL(url);

            btn.textContent = '✅ Added!';
            btn.classList.add('added');
            setTimeout(() => {
                btn.textContent = '📅 Add to Calendar';
                btn.classList.remove('added');
            }, 2000);
        });
    });
}

// ============================================
// RSVP MODAL
// ============================================
function openRSVPModal() {
    document.getElementById('rsvp-modal')?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRSVPModal() {
    document.getElementById('rsvp-modal')?.classList.remove('active');
    document.body.style.overflow = '';
}

function adjustGuests(delta) {
    const input = document.getElementById('rsvp-guests');
    if (!input) return;
    const val = parseInt(input.value) + delta;
    input.value = Math.max(1, Math.min(10, val));
}

function submitRSVP(e) {
    e.preventDefault();
    const name = document.getElementById('rsvp-name').value;
    const phone = document.getElementById('rsvp-phone').value;
    const attendance = document.querySelector('input[name="attendance"]:checked')?.value;
    const guests = document.getElementById('rsvp-guests').value;
    const message = document.getElementById('rsvp-message').value;

    const rsvpData = { name, phone, attendance, guests, message, timestamp: Date.now() };
    const existing = JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
    existing.push(rsvpData);
    localStorage.setItem('wedding-rsvps', JSON.stringify(existing));

    closeRSVPModal();

    const attendanceText = attendance === 'yes' ? 'Joyfully Accepting' : attendance === 'maybe' ? 'Maybe Attending' : 'Regretfully Declining';
    showToast(`Thank you, ${name}! RSVP recorded: ${attendanceText} (${guests} guest${guests > 1 ? 's' : ''})`);

    if (attendance === 'yes') {
        createConfettiExplosion();
        createLoveExplosion();
    }

    const whatsappMsg = encodeURIComponent(
        `RSVP for Anjali & Adarsh Wedding:\nName: ${name}\nAttendance: ${attendanceText}\nGuests: ${guests}${message ? `\nNote: ${message}` : ''}`
    );
    setTimeout(() => {
        if (confirm('Would you like to also send this RSVP via WhatsApp to confirm with the family?')) {
            window.open(`https://wa.me/917398812420?text=${whatsappMsg}`, '_blank');
        }
    }, 500);

    document.getElementById('rsvp-form').reset();
    document.getElementById('rsvp-guests').value = 1;
}

function showToast(message) {
    const toast = document.getElementById('rsvp-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

document.getElementById('rsvp-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'rsvp-modal') closeRSVPModal();
});

// ============================================
// BLESSINGS WALL
// ============================================
function getBlessingsConfig() {
    return window.BLESSINGS_CONFIG || { endpoint: '', adminKey: '' };
}

function isBlessingsAdmin() {
    const cfg = getBlessingsConfig();
    if (!cfg.adminKey) return false;
    return new URLSearchParams(location.search).get('blessings') === cfg.adminKey;
}

const LOCAL_BLESSINGS_INBOX_KEY = 'wedding-blessings-inbox';

function initBlessingsWall() {
    document.getElementById('submit-blessing')?.addEventListener('click', submitBlessing);

    document.querySelectorAll('.emoji-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const textarea = document.getElementById('blessing-message');
            if (textarea) {
                textarea.value += btn.dataset.emoji;
                textarea.focus();
            }
        });
    });

    if (isBlessingsAdmin()) {
        initBlessingsAdmin();
    }
}

async function saveBlessingPrivately(blessing) {
    const cfg = getBlessingsConfig();
    const payload = {
        name: blessing.name,
        message: blessing.message,
        timestamp: blessing.timestamp
    };

    if (cfg.endpoint) {
        try {
            await fetch(cfg.endpoint, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            });
            return { ok: true, remote: true };
        } catch {
            // fall through to local inbox backup
        }
    }

    const inbox = JSON.parse(localStorage.getItem(LOCAL_BLESSINGS_INBOX_KEY) || '[]');
    inbox.unshift(payload);
    localStorage.setItem(LOCAL_BLESSINGS_INBOX_KEY, JSON.stringify(inbox));
    return { ok: true, remote: false };
}

let blessingsAdminCache = [];

function initBlessingsAdmin() {
    const section = document.getElementById('blessings-admin');
    if (!section) return;
    section.hidden = false;

    document.getElementById('blessings-admin-refresh')?.addEventListener('click', loadBlessingsAdminInbox);
    document.getElementById('blessings-admin-export')?.addEventListener('click', exportBlessingsAdminInbox);
    loadBlessingsAdminInbox();
}

async function loadBlessingsAdminInbox() {
    const statusEl = document.getElementById('blessings-admin-status');
    const listEl = document.getElementById('blessings-admin-list');
    if (!listEl) return;

    statusEl.textContent = 'Loading…';
    const cfg = getBlessingsConfig();

    if (cfg.endpoint) {
        try {
            const url = `${cfg.endpoint}?key=${encodeURIComponent(cfg.adminKey)}`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.ok && Array.isArray(data.blessings)) {
                blessingsAdminCache = data.blessings;
                renderBlessingsAdminInbox(blessingsAdminCache);
                statusEl.textContent = `${blessingsAdminCache.length} blessing(s) from Google Sheet`;
                return;
            }
            statusEl.textContent = data.error || 'Could not load remote inbox';
        } catch {
            statusEl.textContent = 'Could not reach Google Sheet — showing local backup only';
        }
    }

    blessingsAdminCache = JSON.parse(localStorage.getItem(LOCAL_BLESSINGS_INBOX_KEY) || '[]');
    renderBlessingsAdminInbox(blessingsAdminCache);
    statusEl.textContent = cfg.endpoint
        ? `${blessingsAdminCache.length} local backup item(s)`
        : `${blessingsAdminCache.length} item(s) — set up Google Sheet (see BLESSINGS_SETUP.md) to collect from all guests`;
}

function renderBlessingsAdminInbox(items) {
    const listEl = document.getElementById('blessings-admin-list');
    if (!listEl) return;

    if (!items.length) {
        listEl.innerHTML = '<p class="blessings-admin-empty">No guest blessings yet.</p>';
        return;
    }

    listEl.innerHTML = items.map((b) => {
        const when = b.timestamp ? new Date(b.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '';
        return `
            <article class="blessings-admin-item">
                <header>
                    <strong>${escapeHtml(b.name)}</strong>
                    ${when ? `<time>${when}</time>` : ''}
                </header>
                <p>${escapeHtml(b.message)}</p>
            </article>
        `;
    }).join('');
}

function exportBlessingsAdminInbox() {
    if (!blessingsAdminCache.length) {
        showToast('Nothing to export yet');
        return;
    }
    const blob = new Blob([JSON.stringify(blessingsAdminCache, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `wedding-blessings-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
}

const BLOCKED_BLESSING_NAMES = new Set(['aaaaaa']);

function isBlockedBlessing(blessing) {
    const name = (blessing.name || '').trim().toLowerCase();
    return BLOCKED_BLESSING_NAMES.has(name);
}

function sanitizeStoredBlessings(stored) {
    const clean = stored.filter((b) => !isBlockedBlessing(b));
    if (clean.length !== stored.length) {
        localStorage.setItem('wedding-blessings', JSON.stringify(clean));
    }
    return clean;
}

async function submitBlessing() {
    const name = document.getElementById('blessing-name')?.value.trim();
    const message = document.getElementById('blessing-message')?.value.trim();
    if (!name || !message) {
        showToast('Please enter your name and blessing message');
        return;
    }
    if (isBlockedBlessing({ name, message })) {
        return;
    }

    const blessing = { name, message, timestamp: Date.now() };
    const submitBtn = document.getElementById('submit-blessing');
    if (submitBtn) submitBtn.disabled = true;

    await saveBlessingPrivately(blessing);

    document.getElementById('blessing-name').value = '';
    document.getElementById('blessing-message').value = '';

    if (submitBtn) submitBtn.disabled = false;
    createLoveExplosion();
    showToast(`Thank you, ${name}! Your blessing has been received 💕`);

    if (isBlessingsAdmin()) {
        loadBlessingsAdminInbox();
    }
}

function loadBlessings() {
    const container = document.getElementById('blessings-wall-container');
    if (!container) return;

    const defaultBlessings = [
        { name: 'The Yadav Families', message: 'May your union be blessed with eternal happiness, prosperity, and divine grace 🙏💕', timestamp: 0 },
        { name: 'Friends & Well-wishers', message: 'Wishing you a lifetime of love, laughter, and beautiful memories together! 🎉✨', timestamp: 0 },
        { name: 'Pari', message: 'Mama Mami, Pari abhi ghar pe hai — bas wait kar rahi hai aapke paas aane ka! Shaadi ka din jaldi aaye. Bahut excited hoon, bahut saara pyaar 🌸💕', timestamp: 0 },
        { name: 'Lucky', message: 'Mama Mami, Lucky bol raha hai ghar se! Jaldi aapke paas aana hai shaadi ke liye. Aap dono par bahut garv hai — milte hain jald hi 🎈🤗💙', timestamp: 0 }
    ];

    container.innerHTML = '';
    defaultBlessings.forEach(b => renderBlessing(b, false));
}

function renderBlessing(blessing, animate) {
    const container = document.getElementById('blessings-wall-container');
    if (!container) return;

    const card = document.createElement('div');
    card.className = 'blessing-card' + (animate ? ' new-blessing' : '');
    card.innerHTML = `
        <div class="blessing-card-header">
            <span class="blessing-avatar">${blessing.name.charAt(0).toUpperCase()}</span>
            <span class="blessing-author">${escapeHtml(blessing.name)}</span>
        </div>
        <p class="blessing-text">${escapeHtml(blessing.message)}</p>
        <button class="blessing-like" onclick="likeBlessing(this)">💕 <span>0</span></button>
    `;
    container.prepend(card);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function likeBlessing(btn) {
    const count = btn.querySelector('span');
    const current = parseInt(count.textContent);
    if (!btn.classList.contains('liked')) {
        count.textContent = current + 1;
        btn.classList.add('liked');
    }
}

// ============================================
// DEITY CARDS INTERACTION
// ============================================
const deityBlessings = {
    ganesha: { icon: '🕉️', text: 'May Lord Ganesha remove all obstacles from your path and bless this sacred union with wisdom and prosperity.' },
    lakshmi: { icon: '🪷', text: 'May Goddess Lakshmi shower your home with abundance, happiness, and eternal prosperity.' },
    shiva: { icon: '🔱', text: 'May Lord Shiva bless your marriage with unwavering devotion, strength, and eternal bliss.' },
    krishna: { icon: '🦚', text: 'May Lord Krishna fill your hearts with divine love, joy, and the melody of togetherness.' }
};

function initDeityCards() {
    document.querySelectorAll('.deity-card[data-deity]').forEach(card => {
        card.addEventListener('click', () => {
            const deity = card.dataset.deity;
            const blessing = deityBlessings[deity];
            if (!blessing) return;

            const toast = document.getElementById('deity-toast');
            const toastIcon = document.getElementById('deity-toast-icon');
            const toastText = document.getElementById('deity-toast-text');
            if (!toast) return;

            toastIcon.textContent = blessing.icon;
            toastText.textContent = blessing.text;
            toast.classList.add('show');
            card.classList.add('blessed');

            setTimeout(() => {
                toast.classList.remove('show');
                card.classList.remove('blessed');
            }, 4000);
        });
    });
}

// ============================================
// COUPLE CARD INTERACTIONS
// ============================================
function showCoupleWhisper(card, message, chip) {
    const whisper = card.querySelector('.couple-whisper');
    if (!whisper) return;

    card.querySelectorAll('.couple-chip').forEach((c) => c.classList.remove('active'));
    if (chip) chip.classList.add('active');

    whisper.textContent = message;
    whisper.classList.add('visible');
}

function initCoupleInteractions() {
    document.querySelectorAll('.couple-card').forEach((card) => {
        card.querySelectorAll('.couple-chip, .couple-tap').forEach((el) => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                const message = el.dataset.whisper;
                if (!message) return;
                showCoupleWhisper(card, message, el.classList.contains('couple-chip') ? el : null);
            });
        });
    });

    document.querySelector('.couple-heart-btn')?.addEventListener('click', () => {
        createLoveExplosion();
    });
}

// ============================================
// HERO INTERACTIONS
// ============================================
function initHeroInteractions() {
    document.getElementById('hero-heart')?.addEventListener('click', () => {
        createLoveExplosion();
    });

    document.getElementById('scroll-hint')?.addEventListener('click', () => {
        document.getElementById('couple-section')?.scrollIntoView({ behavior: 'smooth' });
    });
}

// ============================================
// CURSOR SPARKLE TRAIL
// ============================================
function initCursorTrail() {
    const canvas = document.getElementById('cursor-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const maxParticles = 30;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
        if (particles.length < maxParticles) {
            particles.push({
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 4 + 2,
                life: 1,
                color: ['#ff0088', '#00ff88', '#ffd700'][Math.floor(Math.random() * 3)]
            });
        }
    }, { passive: true });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.life -= 0.03;
            p.size *= 0.97;
            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    animate();
}

// Made with 💻 Code, ⚕️ Care, and ❤️ Love
