import { Scene } from "phaser";

export class MainScene extends Scene {
    player;
    cursors;

    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.setBaseURL("http://localhost:5173/");
        this.load.image("walk-down-1", "assets/animations/walk-down/1.png");
        this.load.image("walk-down-2", "assets/animations/walk-down/2.png");
        this.load.image("walk-down-3", "assets/animations/walk-down/3.png");
        this.load.image("walk-down-4", "assets/animations/walk-down/4.png");
        this.load.image("walk-down-5", "assets/animations/walk-down/5.png");
        this.load.image("walk-down-6", "assets/animations/walk-down/6.png");
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: "walk-down",
            frames: [
                { key: "walk-down-1" },
                { key: "walk-down-2" },
                { key: "walk-down-3" },
                { key: "walk-down-4" },
                { key: "walk-down-5" },
                { key: "walk-down-6" },
            ],

            frameRate: 8,
            repeat: -1,
        });

        this.player = this.physics.add.sprite(500, 500, "walk-down-1");

        this.player.setScale(0.1);

        this.player.setCollideWorldBounds(true);
    }

    update() {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
            this.player.anims.play("walk-down", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
            this.player.anims.play("walk-down", true);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-300);
            this.player.anims.play("walk-down", true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(300);
            this.player.anims.play("walk-down", true);
        }

        if (
            !this.cursors.left.isDown &&
            !this.cursors.right.isDown &&
            !this.cursors.up.isDown &&
            !this.cursors.down.isDown
        ) {
            this.player.anims.stop();
            this.player.setTexture("walk-down-3");
        }
    }
}

