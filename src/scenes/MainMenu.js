import { Scene } from "phaser";

export class MainMenu extends Scene {
    constructor() {
        super("MainMenu");
    }

    preload() {
        // Carregar as músicas
        this.load.audio("menu_intro", "assets/soundtrack/menu_intro.wav");
        this.load.audio("menu_loop", "assets/soundtrack/menu_loop.wav");
        // Carregar o background e o logo
        this.load.image("main_menu_bg", "assets/background.png");
        this.load.image("logo", "assets/logo.png");
    }

    create() {
        // Começar a música de introdução (menu_intro.wav)
        const introMusic = this.sound.add("menu_intro");
        introMusic.play();

        //  Get the current highscore from the registry
        const score = this.registry.get("highscore");

        const textStyle = {
            fontFamily: "Arial Black",
            fontSize: 38,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8,
        };

        this.add.image(960, 540, "main_menu_bg");

        const logo = this.add.image(960, 540, "logo").setAlpha(0); // Set initial alpha to 0

        // Intro - Logo vai aparecer de forma suave (fade-in)
        this.tweens.add({
            targets: logo,
            alpha: 1, // Fade in
            duration: 1000,
            ease: "Linear",
        });

        this.add.text(32, 32, `High Score: ${score}`, textStyle);

        const instructions = ["Clique com o botão esquerdo do mouse ou A do controle para começar"];

        this.add
            .text(960, 840, instructions, textStyle)
            .setAlign("center")
            .setOrigin(0.5);

        // Quando a música de introdução terminar, toca a música de loop
        introMusic.on("complete", () => {
            // Começar a música de loop (menu_loop.wav)
            const loopMusic = this.sound.add("menu_loop", { loop: true });
            loopMusic.play();

            // Permitir interação após a introdução
            this.time.delayedCall(500, () => {
                this.input.once("pointerdown", () => {
                    this.stopAndDestroyMusic(introMusic, loopMusic);
                    this.scene.start("Story");
                });

                this.input.gamepad.once(
                    "down",
                    () => {
                        this.stopAndDestroyMusic(introMusic, loopMusic);
                        this.scene.start("Story");
                    },
                    this
                );
            });
        });
    }

    stopAndDestroyMusic(introMusic, loopMusic) {
        // Parar as músicas e destruir os objetos de áudio
        if (introMusic) {
            introMusic.stop();
            introMusic.destroy();
        }
        if (loopMusic) {
            loopMusic.stop();
            loopMusic.destroy();
        }
    }
}