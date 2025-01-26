import { Boot } from "./scenes/Boot";
import { MainMenu } from "./scenes/MainMenu";
import { Story } from "./scenes/Story"
import { MainScene } from "./scenes/MainScene";
import { Game } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { GameOver } from "./scenes/GameOver";

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: "game-container",
    backgroundColor: "#000000",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    input: { gamepad: true },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 }
        }
    },
    scene: [Boot, Preloader, MainMenu, Story, MainScene, GameOver],
};

export default new Game(config);