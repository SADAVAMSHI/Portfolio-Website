/* =================== TYPED JS =================== */
document.addEventListener('DOMContentLoaded', () => {
    const typed = new Typed('.typed', {
        strings: ["Web Developer", "B.Tech AIML Student", "Former Google Student Ambassador"],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1000,
        loop: true,
    });
});


/* =================== STICKY NAVBAR & ACTIVE LINKS =================== */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('header');
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            sec.classList.add('active-section');
        }
    });

    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}; 

/* =================== PINPOINT VECTOR FIELD (4 to 6 Dots, Brighter Grid) =================== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mouse interaction tracking
let mouse = {
    x: null,
    y: null,
    // EXTREMELY STRICT RADIUS: 55px combined with 40px spacing limits interaction to 4-6 dots
    radius: 55 
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function() {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas .height = window.innerHeight;
    init(); 
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x; 
        this.baseY = y; 
        // BRIGHTER RESTING STATE: Base size increased
        this.size = 2.0; 
    }

    draw(opacity, currentSize) {
        ctx.fillStyle = `rgba(255, 42, 42, ${opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.baseX;
        let dy = mouse.y - this.baseY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let targetX = this.baseX;
        let targetY = this.baseY;
        let targetSize = 2.0;
        
        // BRIGHTER RESTING STATE: Base opacity increased so the grid is always clearly visible
        let opacity = 0.4; 

        if (mouse.x != null && distance < mouse.radius) {
            
            let force = (mouse.radius - distance) / mouse.radius;
            let smoothForce = force * force * (3 - 2 * force);
            
            let angle = Math.atan2(dy, dx);
            let flowTwist = smoothForce * 1.5; 
            let displacement = smoothForce * 40; 
            
            targetX = this.baseX - Math.cos(angle + flowTwist) * displacement;
            targetY = this.baseY - Math.sin(angle + flowTwist) * displacement;
            
            // Gets even brighter and larger when touched
            targetSize = 2.0 + (smoothForce * 2.0);
            opacity = 0.4 + (smoothForce * 0.6); 
        }

        let ease = 0.08; // Slightly faster snap for a tighter feel
        this.x += (targetX - this.x) * ease;
        this.y += (targetY - this.y) * ease;
        this.size += (targetSize - this.size) * ease;

        this.draw(opacity, this.size);
    }
}

function init() {
    particlesArray = [];
    let spacing = 40; // Wider spacing works with the 55px radius to isolate 4-6 dots
    
    for (let y = 0; y < canvas.height; y += spacing) {
        for (let x = 0; x < canvas.width; x += spacing) {
            let randomOffsetX = x + (Math.random() * 4 - 2);
            let randomOffsetY = y + (Math.random() * 4 - 2);
            particlesArray.push(new Particle(randomOffsetX, randomOffsetY));
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    
    requestAnimationFrame(animate);
}

init();
animate();
