import { Boot } from './scenes/Boot';
import { MainScene } from './scenes/MainScene'
import { Game } from 'phaser';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainScene,
    ]
};

export default new Game(config);