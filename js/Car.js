class Car {
    constructor(ctx, canvas, carImage, centerX_canvas, centerY_canvas, roadWidth) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.carImage = carImage;
        this.centerX_canvas = centerX_canvas;
        this.centerY_canvas = centerY_canvas;
        this.roadWidth = roadWidth;
        this.car = {
            x: this.centerX_canvas - 35 + Math.ceil(this.roadWidth * .25),
            y: this.canvas.height - 175,
            targetX: this.centerX_canvas - 35 + Math.ceil(this.roadWidth * .25),
            width: 70,
            height: 125,
            lastMove: 'right',
            rotation: 0
        };
    }

    getCar() {
        return [this.car.x, this.car.y, this.car.width, this.car.height];
    }

    drawCar() {
        this.ctx.save();
        this.ctx.translate(this.car.x + this.car.width / 2, this.car.y + this.car.height / 2);
        this.ctx.rotate(this.car.rotation * Math.PI / 200);
        this.ctx.drawImage(this.carImage, -this.car.width / 2, -this.car.height / 2, this.car.width, this.car.height);
        this.ctx.restore();
    }

    moveCar(event) {
        if ((event.key === 'ArrowLeft' || event.key === 'a') && this.car.lastMove !== 'left') {
            this.car.targetX -= Math.ceil(this.roadWidth * .5);
            this.car.lastMove = 'left';
        } else if ((event.key === 'ArrowRight' || event.key === 'd') && this.car.lastMove !== 'right') {
            this.car.targetX += Math.ceil(this.roadWidth * .5);
            this.car.lastMove = 'right';
        }
    }

    carRotation() {
        const targetRotation = this.car.targetX < this.car.x ? -5 : this.car.targetX > this.car.x ? 5 : 0;
        this.car.rotation += (targetRotation - this.car.rotation) * .25;

        if (this.car.x !== this.car.targetX) {
            if (this.car.x < this.car.targetX) {
                this.car.x += 1; 
            } else {
                this.car.x -= 1; 
            }
        }
    }

    carLoop() {        
        for (let i = 0; i < 5; i++) {
            this.carRotation();
        }
        this.drawCar();
    }

    start() {
        this.carLoop();
    }
}