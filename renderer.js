const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

// Resize canvas to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
        this.speed = Math.random() * 2 + 1;
    }

    update() {
        this.z -= this.speed;
        if (this.z <= 0) {
            this.reset();
        }
    }

    draw() {
        const perspective = canvas.width / this.z;
        const x = (this.x - canvas.width / 2) * perspective + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * perspective + canvas.height / 2;
        
        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
            const size = Math.max(1, 3 * (1 - this.z / canvas.width));
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            
            // Draw trail
            const prevX = (this.x - canvas.width / 2) * (canvas.width / (this.z + this.speed)) + canvas.width / 2;
            const prevY = (this.y - canvas.height / 2) * (canvas.width / (this.z + this.speed)) + canvas.height / 2;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.stroke();
        }
    }
}

class Starfield {
    constructor() {
        this.stars = Array(300).fill().map(() => new Star());
    }

    animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Fading effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.stars.forEach(star => {
            star.update();
            star.draw();
        });

        requestAnimationFrame(() => this.animate());
    }
}

const starfield = new Starfield();
starfield.animate();

// Exit with ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        window.close();
    }
});
