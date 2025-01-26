import { Scene } from "phaser";

export class Story extends Scene {
    constructor() {
        super("Story");
    }

    create() {
        const fogo = this.add.image(960, 540, "fogo");
        const trovao = this.add.image(960, 540, "trovao");

        this.time.delayedCall(1000, () => {
            trovao.destroy(); // Remove o trovão após 1 segundo

            // Só cria o texto e o fundo depois que o trovão sumir
            const textStyle = {
                fontFamily: "Arial Black",
                fontSize: 26,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                wordWrap: { width: 800, useAdvancedWrap: true }, // Define a largura máxima da linha
                align: "center",
            };

            const storyTelling = "No mundo primitivo, uma simples faísca mudou tudo. UGA descobriu o fogo, atraindo outros para sua luz e iniciando uma revolução. Mas como toda bolha, o crescimento desenfreado trouxe riscos: escassez, fome e caos. Em Fire Bubble, você deve equilibrar expansão e sobrevivência, reunindo seguidores sem deixar a bolha estourar. Cresça com sabedoria e torne-se o líder da primeira grande tribo da humanidade!";

            // Criar um fundo para o texto (caixa)
            const background = this.add.rectangle(960, 240, 850, 500, 0x000000, 0.5) // Caixa semi-transparente
                .setOrigin(0.5);

            // Criar o texto sobre a caixa
            const text = this.add.text(960, 240, storyTelling, textStyle)
                .setOrigin(0.5);
        });

        this.input.once("pointerdown", () => {
            this.scene.start("MainScene");
        });

        this.input.gamepad.once(
            "down",
            () => {
                this.scene.start("MainScene");
            },
            this
        );
    }
}