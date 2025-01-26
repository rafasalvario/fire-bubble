import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        this.add.rectangle(960, 540, 1920, 1080, 0x000000); // Fullscreen black rectangle

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(960, 540, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(960-230, 540, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with the path to your own assets
        this.load.setPath('assets');

        this.load.image('terreno', 'terreno.png');
        this.load.image('fire_bubble', 'fire_bubble.png');
        this.load.image('main_menu_bg', 'main_menu.png');
        this.load.image('fogo', 'fogo.png');
        this.load.image('trovao', 'trovao.png');
        this.load.image('game_over', 'game_over.png');
        this.load.image('logo', 'cc-logo.png');
    }

    create ()
    {
        this.scene.transition({
            target: 'MainMenu',
            duration: 1000,
            moveBelow: true,
            onUpdate: (progress) => {
                this.cameras.main.setAlpha(1 - progress);
            }
        });
    }
}
