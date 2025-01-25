import { Scene } from "phaser";

export class GameOver extends Scene {
    constructor() {
        super("GameOver");
    }

    create() {
        //  Get the current highscore from the registry
        const score = this.registry.get("highscore");

        const textStyle = {
            fontFamily: "Arial Black",
            fontSize: 38,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8,
        };

        this.add.image(512, 384, "game_over");

        this.add.text(32, 32, `High Score: ${score}`, textStyle);

        const instructions = ["Clique para tentar de novo!"];

        this.add
            .text(512, 600, instructions, textStyle)
            .setAlign("center")
            .setOrigin(0.5);

        this.input.once("pointerdown", () => {
            this.scene.start("MainMenu");
        });

        this.input.gamepad.once(
            "down",
            () => {
                this.scene.start("MainMenu");
            },
            this
        );
    }
}

