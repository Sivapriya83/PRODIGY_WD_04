// Get all nav items
const navItems = document.querySelectorAll('.nav-item');

// Add click sound and animation
navItems.forEach((item) => {
    const soundId = item.getAttribute('data-sound');
    const sound = document.getElementById(soundId);

    item.addEventListener('click', () => {
        // Play sound
        sound.currentTime = 0; // Reset sound for consecutive clicks
        sound?.play();

        // Wiggle animation
        item.style.transform = 'rotate(-10deg)';
        setTimeout(() => {
            item.style.transform = 'rotate(10deg)';
        }, 100);
        setTimeout(() => {
            item.style.transform = 'rotate(0)';
        }, 200);
    });
});

// Smooth scrolling effect
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Adding bounce animation on section headers when visible
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const header = entry.target.querySelector('h1');
            if (header) {
                header.classList.add('bounce');
                setTimeout(() => {
                    header.classList.remove('bounce');
                }, 1000);
            }
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// Confetti effect for the Fun Zone section
document.querySelector('#fun-zone').addEventListener('click', () => {
    const funZone = document.querySelector('#fun-zone');
    funZone.classList.add('confetti');
    setTimeout(() => {
        funZone.classList.remove('confetti');
    }, 2000);
});

// Footer Buttons
const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('stop-button');
const balloonButton = document.getElementById('balloon-button');
const balloonCanvas = document.getElementById('balloon-canvas');
const ctx = balloonCanvas.getContext('2d');

// Background Music
const backgroundMusic = new Audio('https://www.bensound.com/bensound-music/bensound-ukulele.mp3');
backgroundMusic.loop = true;

// Play Music
playButton.addEventListener('click', () => {
    backgroundMusic.play();
    playButton.disabled = true;
    stopButton.disabled = false;
});

// Stop Music
stopButton.addEventListener('click', () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    stopButton.disabled = true;
    playButton.disabled = false;
});

// Balloon Animation
const balloons = [];
balloonCanvas.width = window.innerWidth;
balloonCanvas.height = window.innerHeight;  // Set height to full viewport height

function createBalloon() {
    const x = Math.random() * balloonCanvas.width;
    const size = Math.random() * 30 + 10;
    const speed = Math.random() * 2 + 1;
    const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    return { x, y: balloonCanvas.height + size, size, speed, color };
}

function drawBalloon(balloon) {
    ctx.beginPath();
    ctx.arc(balloon.x, balloon.y, balloon.size, 0, Math.PI * 2);
    ctx.fillStyle = balloon.color;
    ctx.fill();
    ctx.closePath();
}

function updateBalloons() {
    ctx.clearRect(0, 0, balloonCanvas.width, balloonCanvas.height);
    for (let i = 0; i < balloons.length; i++) {
        balloons[i].y -= balloons[i].speed;  // Move balloons up
        if (balloons[i].y + balloons[i].size < 0) {
            balloons.splice(i, 1); // Remove balloon once it goes off-screen
            i--;
        } else {
            drawBalloon(balloons[i]);
        }
    }
    requestAnimationFrame(updateBalloons);
}

balloonButton.addEventListener('click', () => {
    // Add multiple balloons at once
    for (let i = 0; i < 10; i++) {
        balloons.push(createBalloon());
    }
    updateBalloons();
});
