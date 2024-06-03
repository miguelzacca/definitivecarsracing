class Moviment {
    constructor(ctx, canvas, roadWidth, centerX_canvas, centerY_canvas, totalLanes, speed) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.roadWidth = roadWidth;
        this.centerX_canvas = centerX_canvas;
        this.centerY_canvas = centerY_canvas;
        this.totalLanes = totalLanes;
        this.speed = speed;
        this.roadOffset = 0;
        this.yPos = 0;
    }

    drawRoad() {
        this.ctx.fillStyle = '#aaa';
        this.ctx.fillRect(this.centerX_canvas - this.roadWidth / 2 - 10, 0, this.roadWidth + 20, this.canvas.height);

        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(this.centerX_canvas - this.roadWidth / 2, 0, this.roadWidth, this.canvas.height);

        this.ctx.fillStyle = '#aaa';
        for (let i = 0; i < this.totalLanes; i++) {
            const laneY = (i * 50) - this.roadOffset % 50 - 25;
            this.ctx.fillRect(this.centerX_canvas - laneWidth / 2, laneY, 10, 25);
        }
    }

    drawBack() {
        this.ctx.drawImage(leftbackgroundImage, 0, this.yPos, this.centerX_canvas - this.roadWidth / 2 - 8, this.canvas.height);
        this.ctx.drawImage(leftbackgroundImage, 0, this.yPos - this.canvas.height, this.centerX_canvas - this.roadWidth / 2 - 8, this.canvas.height);

        this.ctx.drawImage(rightbackgroundImage, this.canvas.width, this.yPos, - this.centerX_canvas + this.roadWidth / 2 + 8, this.canvas.height);
        this.ctx.drawImage(rightbackgroundImage, this.canvas.width, this.yPos - this.canvas.height, - this.centerX_canvas + this.roadWidth / 2 + 8, this.canvas.height);

        this.yPos += this.speed;

        if (this.yPos >= this.canvas.height) {
            this.yPos = 0;
        }
    }

    roadLoop() {
        this.roadOffset -= this.speed;
        this.drawRoad();
        this.drawBack();
    }

    start() {
        this.roadLoop();
    }
}