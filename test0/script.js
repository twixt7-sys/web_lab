document.addEventListener('DOMContentLoaded', () => {
    class CircleMover {
        constructor(circle) {
            this.circle = circle;
            this.pos = [0, 0]; // [positionX, positionY]
            this.vel = [0, 0]; // [moveX, moveY]
            this.acc = [0, 0]; // [accelerationX, accelerationY]
            this.accelerationFactor = 0.05;
            this.friction = 0.98; // Add a friction factor
            this.mousePos = [0, 0]; // [mouseX, mouseY]
            this.trailInterval = 1; // Interval in milliseconds for creating trails
            this.lastTrailTime = 0;
            this.trailPoints = [];
            this.init();
        }

        init() {
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            this.moveCircle();
        }

        handleMouseMove(event) {
            this.mousePos = [event.clientX, event.clientY];
        }

        moveCircle() {
            const dx = this.mousePos[0] - this.pos[0];
            const dy = this.mousePos[1] - this.pos[1];
            this.acc[0] = dx * this.accelerationFactor;
            this.acc[1] = dy * this.accelerationFactor;

            this.vel[0] += this.acc[0];
            this.vel[1] += this.acc[1];
            this.vel[0] *= this.friction;
            this.vel[1] *= this.friction;
            this.pos[0] += this.vel[0];
            this.pos[1] += this.vel[1];
            this.circle.style.transform = `translate(${this.pos[0] - this.circle.offsetWidth / 2}px, ${this.pos[1] - this.circle.offsetHeight / 2}px)`; // Adjust to center
            this.createTrail(); // Create individual trail elements
            requestAnimationFrame(this.moveCircle.bind(this));
        }

        createTrail() {
            const now = Date.now();
            if (now - this.lastTrailTime >= this.trailInterval) {
                const trail = document.createElement('div');
                trail.className = 'trail';
                trail.style.left = `${this.pos[0] - 7.5}px`; // Adjust to center trail element
                trail.style.top = `${this.pos[1] - 7.5}px`; // Adjust to center trail element
                document.body.appendChild(trail);
                setTimeout(() => {
                    trail.remove();
                }, 1000); // Remove trail element after 1 second
                this.lastTrailTime = now;
            }
        }
    }

    const circle = document.querySelector('.circle');
    new CircleMover(circle);
});