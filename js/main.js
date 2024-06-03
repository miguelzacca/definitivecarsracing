const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const dotViewer = document.querySelector("#game #dotViewer");
const dotViewerLed = document.querySelector("#game div .led");
const homepoints = document.querySelectorAll(".points-box #homepoints");
const lostbox = document.querySelector("#game .lostbox");
const pause = document.querySelector("#game .pause");
const explosion = document.querySelector("#game img.explosion");

canvas.width = document.querySelector("#game").clientWidth;
canvas.height = document.querySelector("#game").clientHeight;
let centerX_canvas = canvas.width / 2;
let centerY_canvas = canvas.height / 2;

const mycar = localStorage.getItem("mycar") || "bluecar1.png";

const carImage = new Image();
carImage.src = `./assets/cars/${mycar}`;

const leftbackgroundImage = new Image();
leftbackgroundImage.src = './assets/main/leftbackground.png';

const rightbackgroundImage = new Image();
rightbackgroundImage.src = './assets/main/rightbackground.png';

const roadWidth = 275;
const laneWidth = 10;
const totalLanes = Math.ceil(canvas.height / 40) + 1;

let speedCar = Number(mycar.split("car")[1].split(".")[0]);
let speed = 0;
let gain = 0;

if (speedCar === 2) {
    speed = 22.5;
    gain = 300;
} else if (speedCar === 3) {
    speed = 30;
    gain = 400;
} else if (speedCar === 4) {
    speed = 40;
    gain = 1000;
} else if (speedCar === 5) {
    speed = 50;
    gain = 5000;
} else {
    speed = 15;
    gain = 200;
}

const moviment = new Moviment(ctx, canvas, roadWidth, centerX_canvas, centerY_canvas, totalLanes, speed);
const enemies = new Enemies(ctx, canvas, centerX_canvas, centerY_canvas, roadWidth, laneWidth, totalLanes, speed);
const car = new Car(ctx, canvas, carImage, centerX_canvas, centerY_canvas, roadWidth);
const collisions = new Collisions(car.car, enemies.enemies, canvas);

let points = 0;
let gameStarted = false;

let money = Number(localStorage.getItem("money")) || 0;
homepoints.forEach(element => {
    element.textContent = money.toString().padStart(5, "0");
});

const updatePoints = () => {
    enemies.returnEnemies().forEach(enemy => {
        if (enemy.y > canvas.height - 175 && enemy.y < canvas.height - 175 + speed / 2) {
            points += gain;
            money += gain;
            localStorage.setItem("money", money);
            dotViewerLed.style.backgroundColor = '#5f5';
            setTimeout(() => dotViewerLed.removeAttribute("style"), 500);
        }
        dotViewer.textContent = points.toString().padStart(5, "0");
    });
}

const gameLost = () => {
    lostbox.style.display = 'flex';
    const carArray = car.getCar();
    Object.assign(explosion.style, {
        display: 'flex',
        left: `${carArray[0] + carArray[2] - explosion.width / 2}px`,
        top: `${carArray[1] + carArray[3] / 2 - explosion.height / 2}px`
    }); 
}

const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moviment.start();
    enemies.update();
    car.start();
    updatePoints();

    if (collisions.update()) {
        gameStarted = false;
        gameLost();
        return;
    }

    if (gameStarted) {
        requestAnimationFrame(gameLoop);
    }
}

const control = (event) => {
    if (!gameStarted) {
        if (event.key === 'Enter') {
            if (collisions.update()) {
                location.href = '';
            } else {
                pause.style.display = 'none';
                gameStarted = true;
                gameLoop();
            }
        }
    } else {
        car.moveCar(event);
    }
}

window.addEventListener("keydown", (event) => {
    if (location.hash === '#game') {
        control(event);
    }    
});

pause.addEventListener("click", () => {
    control({key: 'Enter'});
});

for (let i = 0; i <= 50; i++) {
    setTimeout(() => {
        moviment.start();
        car.start();
    }, 1000 / 60);
}