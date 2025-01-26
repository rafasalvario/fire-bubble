import { Scene } from "phaser";
export default class Controls {
    constructor(scene, speed = 300) {
        this.scene = scene;
        this.speed = speed;

        this.keys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
    }

    update() {
        let speedX = 0,
            speedY = 0;

        // const pad = this.scene.input.gamepad.getPad(0);

        // console.log(this.scene.input.gamepad);

        // if (pad.axes.length) {
        //     const axisH = pad.axes[0].getValue();
        //     const axisV = pad.axes[1].getValue();

        //     this.sprite.x += 4 * axisH;
        //     this.sprite.y += 4 * axisV;

        //     this.sprite.flipX = axisH > 0;
        // }

        const pad = this.scene.input.gamepad.getPad(0);

        // if (this.gamepadDetected) {
        const leftStickX = pad.axes[0].getValue(),
            leftStickY = pad.axes[1].getValue();

        // const gamepad = pads[0];

        if (leftStickX > 0.25) {
            speedX += this.speed;
            this.scene.player.anims.play("wup", true);
        }

        if (leftStickX < -0.25) {
            speedX -= this.speed;
            //this.scene.player.setVelocityX(-this.speed);
            this.scene.player.anims.play("wup", true);
        }

        if (leftStickY > 0.25) {
            //this.scene.player.setVelocityY(this.speed);
            speedY += this.speed;
            this.scene.player.anims.play("wup", true);
        }

        if (leftStickY < -0.25) {
            //this.scene.player.setVelocityY(-this.speed);
            speedY -= this.speed;
            this.scene.player.anims.play("wup", true);
        }
        // }

        if (this.keys.left.isDown) {
            speedX -= this.speed;
            //this.scene.player.setVelocityX(-this.speed);
            this.scene.player.anims.play("wup", true);
        }

        if (this.keys.right.isDown) {
            //this.scene.player.setVelocityX(this.speed);
            speedX += this.speed;
            this.scene.player.anims.play("wup", true);
        }

        if (this.keys.up.isDown) {
            //this.scene.player.setVelocityY(-this.speed);
            speedY -= this.speed;
            this.scene.player.anims.play("wup", true);
        }

        if (this.keys.down.isDown) {
            //this.scene.player.setVelocityY(this.speed);
            speedY += this.speed;
            this.scene.player.anims.play("wup", true);
        }

        if (
            !this.keys.left.isDown &&
            !this.keys.right.isDown &&
            !this.keys.up.isDown &&
            !this.keys.down.isDown &&
            leftStickX === 0 &&
            leftStickY === 0
        ) {
            this.scene.player.anims.stop();
            //this.scene.player.setVelocity(0);
        }

        this.scene.player.setVelocityX(speedX);
        this.scene.player.setVelocityY(speedY);
    }
}

