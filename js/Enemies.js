class Enemies {
    constructor(ctx, canvas, centerX_canvas, centerY_canvas, roadWidth, laneWidth, totalLanes, speed) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.centerX_canvas = centerX_canvas;
        this.centerY_canvas = centerY_canvas;
        this.roadWidth = roadWidth;
        this.laneWidth = laneWidth;
        this.totalLanes = totalLanes;
        this.speed = speed / 2;
        this.enemies = [];
        this.spawnRate = 5000;
        this.lastSpawn = 0;
        this.carImages = [];
    }
    
    returnEnemies() {
        return this.enemies;
    }
    
    spawnEnemy() {
        const laneIndex = Math.floor(Math.random() * this.totalLanes);
        const spawnX = Math.random() < .5 ? this.centerX_canvas - 35 + Math.ceil(this.roadWidth * .25) : this.centerX_canvas - 35 - Math.ceil(this.roadWidth * .25);
        const enemy = {
            x: spawnX,
            y: -1000,
            width: 70,
            height: 125,
            lane: laneIndex
        };
        
        const randCarArray = [
            "redcar1",
            "bluecar1",
            "yellowcar3",
            "whitecar2",
            "redcar2",
            "redcar3",
            "sportcar4",
            "twowhitecar2",
            "whitecar3",
            "challengecar5",
            "greencar4"
        ];
        let rand = Math.floor(Math.random() * randCarArray.length);
        const enemyImage = new Image();
        enemyImage.src = `./assets/cars/${randCarArray[rand]}.png`;
        enemy.carImage = enemyImage;

        this.enemies.push(enemy);
    }


    moveEnemies() {
        for (let enemy of this.enemies) {
            enemy.y += this.speed;
        }
        this.enemies = this.enemies.filter(enemy => enemy.y < this.canvas.height);
    }

    update() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastSpawn > this.spawnRate) {
            this.spawnEnemy();
            this.lastSpawn = currentTime;
        }
        this.moveEnemies();
        this.drawEnemies();
        this.spawnRate = Math.floor(Math.random() * (5000 - 500 + 1)) + 500;
        collisions.updateEnemies(this.enemies);
    }

    drawEnemies() {
        for (let enemy of this.enemies) {
            this.ctx.drawImage(enemy.carImage, enemy.x, enemy.y, enemy.width, enemy.height);
        }
    }
}