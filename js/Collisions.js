class Collisions {
    constructor(player, enemies, canvas) {
        this.player = player;
        this.enemies = enemies;
        this.canvas = canvas;
        this.isGameOver = false;
    }

    updateEnemies(enemies) {
        this.enemies = enemies;
    }

    checkCollisions() {
        for (let enemy of this.enemies) {
            if (this.isCollided(this.player, enemy)) {
                this.isGameOver = true;
                break;
            }
        }
    }

    isCollided(obj1, obj2) {
        const margin = 25;
        return obj1.x + obj1.width - margin >= obj2.x &&
           obj1.x + margin <= obj2.x + obj2.width &&
           obj1.y + obj1.height - margin >= obj2.y &&
           obj1.y + margin <= obj2.y + obj2.height;
    }

    update() {
        this.checkCollisions();
        if (this.isGameOver) {
            return true;
        }
        return false;
    }
}