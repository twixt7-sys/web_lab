document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Shape {
        // Empty class for now, it could be extended later
    }

    class PhysicalObj {
        constructor() {
            this.attr = [[0, 0], [0, 0], [0, 0]]; // pos[x, y], vel[x, y], acc[x, y]
            this.mass = 1;
            this.shape = new Shape();
            this.doUpdates = false;
        }

        update() {
            if (this.doUpdates) {
                this.applyForce([0, 0]);
                this.applyFriction(0.98);
                this.applyBounce(0.9, [0, 1]); // Assuming a default bounce efficiency and normal

                this.attr[1][0] += this.attr[2][0];
                this.attr[1][1] += this.attr[2][1];
                this.attr[0][0] += this.attr[1][0];
                this.attr[0][1] += this.attr[1][1];
            }
        }

        applyForce(force) {
            this.attr[2][0] += force[0] / this.mass;
            this.attr[2][1] += force[1] / this.mass;
        }

        applyFriction(efficiency) {
            this.attr[2][0] *= efficiency;
            this.attr[2][1] *= efficiency;
        }

        applyBounce(efficiency, normal) {
            let dotProduct = this.attr[2][0] * normal[0] + this.attr[2][1] * normal[1];
            this.attr[2][0] -= 2 * dotProduct * normal[0];
            this.attr[2][1] -= 2 * dotProduct * normal[1];
            this.attr[2][0] *= efficiency;
            this.attr[2][1] *= efficiency;
        }

        applyGravity(gravity) {
            this.applyForce([0, gravity * this.mass]);
        }
    }

    class Circle extends PhysicalObj {
        constructor(radius, x, y) {
            super();
            this.radius = radius;
            this.attr[0][0] = x;
            this.attr[0][1] = y;
            this.doUpdates = true;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.attr[0][0], this.attr[0][1], this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fill();
            ctx.stroke();
        }
    }

    let circles = [];
    circles.push(new Circle(30, 100, 100));
    circles.push(new Circle(20, 200, 150));

    const gravity = 0.1;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        circles.forEach(circle => {
            circle.applyGravity(gravity);
            circle.update();
            circle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});
