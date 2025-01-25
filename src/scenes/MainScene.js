import { Scene } from 'phaser';

export class MainScene extends Scene {
  constructor() {
    super('MainScene');
    this.player = null;
    this.controls = null;
    this.npcs = [];
    this.bg2 = null;
    this.npcSpawnTimer = null;
  }

  preload() {
    this.load.setPath('assets');
    this.load.spritesheet('mega_sprite', 'animations/mega_sprite.png', {
      frameWidth: 98,
      frameHeight: 136,
    });
    this.load.image('bg2', 'bg2.jpg');
    this.load.image('npc-texture', 'npc.png'); // Adicione a textura para os NPCs
  }

  create() {
    // SCORE SYSTEM
    const highscore = this.registry.get('highscore');
    this.score = (highscore !== null && highscore !== undefined) ? highscore : 0;

    const textStyle = {
      fontFamily: 'Verdana',
      fontSize: 32,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
    };

    // Texto do score com scroll fixo e profundidade
    this.scoreText = this.add
      .text(32, 32, `Score: ${this.score}`, textStyle)
      .setDepth(1)
      .setScrollFactor(0);

    // Atualiza o score a cada segundo
    const ScoreByTime = this.time.addEvent({
      delay: 1000,
      callback: () => this.updateScore(),
      loop: true,
    });
    // END SCORE SYSTEM

    // Criando o fundo
    this.bg2 = this.add.image(0, 0, 'bg2').setOrigin(0, 0);
    this.bg2.setDisplaySize(3500, 3500);

    // Criando o jogador
    this.player = this.physics.add
      .sprite(1750, 1750, 'mega_sprite')
      .setCollideWorldBounds(true);

    // Criando animações
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('mega_sprite', { start: 0, end: 17 }),
      frameRate: 8,
      repeat: -1,
    });

    // Configurando os controles
    this.controls = createControls(this, 300);

    // Configurando a câmera
    this.cameras.main.setBounds(0, 0, 3500, 3500);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1); // Garante que o zoom seja padrão

    // Criando NPCs inicialmente
    for (let i = 0; i < 10; i++) {
      const npcInstance = createNPC(this);
      this.npcs.push(npcInstance);
    }

    // Timer para criar NPCs continuamente
    this.npcSpawnTimer = this.time.addEvent({
      delay: 4000,
      callback: () => spawnNPC(this),
      loop: true,
    });

    // Definindo os limites do mundo
    this.physics.world.setBounds(0, 0, 3500, 3500);
  }

  update() {
    const playerMoving = this.controls.update();

    // Atualizando NPCs
    this.npcs.forEach((npc) => {
      npc.update(this.player, this.npcs, playerMoving);
    });
  }

  updateScore() {
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
    console.log(`Score atualizado: ${this.score}`);
    this.registry.set('highscore', this.score);
  }
}

function createControls(scene, speed = 300) {
  const keys = scene.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });

  scene.anims.create({ key: 'walk-right', frames: scene.anims.generateFrameNumbers('mega_sprite', { start: 0, end: 5 }), frameRate: 8, repeat: -1, });
  scene.anims.create({ key: 'walk-left', frames: scene.anims.generateFrameNumbers('mega_sprite', { start: 0, end: 5 }), frameRate: 8, repeat: -1 });
  scene.anims.create({ key: 'walk-down', frames: scene.anims.generateFrameNumbers('mega_sprite', { start: 6, end: 11 }), frameRate: 8, repeat: -1 });
  scene.anims.create({ key: 'walk-up', frames: scene.anims.generateFrameNumbers('mega_sprite', { start: 12, end: 18 }), frameRate: 8, repeat: -1 });

  return {
    update() {
      let speedX = 0,
        speedY = 0;
      let animKey = null;

      if (keys.left.isDown) {
        speedX -= speed;
        animKey = 'walk-left';
        scene.player.setFlipX(false); // Flip sprite for left movement
      }
      if (keys.right.isDown) {
        speedX += speed;
        animKey = 'walk-right';
        scene.player.setFlipX(true); // Reset flip for right movement
      }
      if (keys.up.isDown) {
        speedY -= speed;
        animKey = 'walk-up';
      }
      if (keys.down.isDown) {
        speedY += speed;
        animKey = 'walk-down';
      }

      scene.player.setVelocity(speedX, speedY);

      if (animKey) {
        scene.player.anims.play(animKey, true);
        return true;
      } else {
        scene.player.anims.stop();
        return false;
      }
    },
  };
}

function createNPC(scene) {
  const x = Phaser.Math.Between(0, 3500);
  const y = Phaser.Math.Between(0, 3500);
  const randomFrame = Phaser.Math.Between(0, 18); // Random idle frame on spawn


  const npc = {
    sprite: scene.physics.add
      .sprite(x, y, 'mega_sprite', randomFrame)
      .setCollideWorldBounds(true),
    isFollowing: false,
    isAlly: false,

    update(player, allNpcs, playerMoving) {
      const distanceToPlayer = Phaser.Math.Distance.Between(
        npc.sprite.x,
        npc.sprite.y,
        player.x,
        player.y
      );

      if (distanceToPlayer < 50 && !npc.isAlly) {
        npc.isFollowing = true;
        npc.isAlly = true;
      }

      if (npc.isAlly && npc.isFollowing) {
        const allies = allNpcs.filter((n) => n.isAlly);
        const totalAllies = allies.length;

        // Calculate circular formation around player
        const index = allies.indexOf(npc);
        const angle = (index / totalAllies) * Phaser.Math.PI2;
        const radius = 100;

        const targetX = player.x + radius * Math.cos(angle);
        const targetY = player.y + radius * Math.sin(angle);

        // Smooth movement towards target position
        npc.sprite.x += (targetX - npc.sprite.x) * 0.1;
        npc.sprite.y += (targetY - npc.sprite.y) * 0.1;

        // Apply separation to avoid overlapping
        applySeparation(npc, allNpcs);

        // Manage animations
        if (playerMoving) {
          npc.sprite.anims.play('walk', true);
        } else {
          npc.sprite.anims.stop();
        }

      }
    },
  };

  return npc;
}

function spawnNPC(scene) {
  const npcInstance = createNPC(scene);
  scene.npcs.push(npcInstance);
}

function applySeparation(npc, allNpcs) {
  const separationDistance = 50; // Distância mínima entre NPCs
  allNpcs.forEach((otherNpc) => {
    if (otherNpc !== npc) {
      const distance = Phaser.Math.Distance.Between(
        npc.sprite.x,
        npc.sprite.y,
        otherNpc.sprite.x,
        otherNpc.sprite.y
      );

      if (distance < separationDistance) {
        const angle = Phaser.Math.Angle.Between(
          otherNpc.sprite.x,
          otherNpc.sprite.y,
          npc.sprite.x,
          npc.sprite.y
        );

        const offset = separationDistance - distance;
        npc.sprite.x += Math.cos(angle) * offset * 0.1;
        npc.sprite.y += Math.sin(angle) * offset * 0.1;
      }
    }
  });
}
