document.addEventListener('DOMContentLoaded', () => {
    const circle = document.querySelector('.circle');

    let positionX = 0;
    let positionY = 0;
    const moveDistance = 10;

    function moveCircle() {
        circle.style.transform = `translate(${positionX}px, ${positionY}px)`;
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                positionY -= moveDistance;
                break;
            case 'ArrowDown':
                positionY += moveDistance;
                break;
            case 'ArrowLeft':
                positionX -= moveDistance;
                break;
            case 'ArrowRight':
                positionX += moveDistance;
                break;
        }
        moveCircle();
    });

    moveCircle();
});
