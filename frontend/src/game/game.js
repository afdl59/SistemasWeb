import render from './util/render';
import input from './util/input';
import animation from './util/animation';
import movement from './util/movement';
import physics from './util/physics';

import { levelOne } from './map/level_1-1';
import MapBuilder from './map/map_builder';

import Mario from './entities/mario';
import Goomba from './entities/goomba';
import Koopa from './entities/koopa';
import Score from './entities/score';

class Game {
  constructor(canvasElement, onComplete) {
    this.canvas = canvasElement;
    this.onComplete = onComplete;
    this.gameData = null;
    this.animationFrameId = null;
  }

  init() {
    const canvas = {
      element: this.canvas,
      ctx: this.canvas.getContext('2d'),
    };

    const viewport = {
      vX: 0,
      vY: 0,
      width: 760,
      height: 600,
    };

    const spriteSheet = new Image();
    spriteSheet.src = new URL('./assets/sprites/spritesheet.png', import.meta.url).href;

    const tileset = new Image();
    tileset.src = new URL('./assets/sprites/tileset_gutter.png', import.meta.url).href;

    const startTime = Date.now();

    spriteSheet.addEventListener('load', () => {
      const data = {
        spriteSheet,
        canvas,
        viewport,
        animationFrame: 0,
        mapBuilder: new MapBuilder(levelOne, tileset, spriteSheet),
        entities: {},
        sounds: {},
        userControl: true,
        reset: () => this.reset(),
        startTime,
      };

      const mario = new Mario(spriteSheet, 175, 0, 16, 16);
      const score = new Score(270, 15);

      input.init(data);
      data.entities.mario = mario;
      data.entities.score = score;
      data.entities.coins = [];
      data.entities.mushrooms = [];
      data.entities.goombas = [];
      data.entities.koopas = [];
      data.entities.scenery = [];

      // Load enemies from map
      levelOne.koopas.forEach((koopa) => {
        data.entities.koopas.push(
          new Koopa(spriteSheet, koopa[0], koopa[1], koopa[2], koopa[3]));
      });

      levelOne.goombas.forEach((goomba) => {
        data.entities.goombas.push(
          new Goomba(spriteSheet, goomba[0], goomba[1], goomba[2], goomba[3]));
      });

      render.init(data);
      this.gameData = data;
      this.run(data);
    });
  }

  updateView(data) {
    const viewport = data.viewport;
    const margin = viewport.width / 6;
    const center = {
      x: data.entities.mario.xPos + (data.entities.mario.width * 0.5),
      y: data.entities.mario.yPos + (data.entities.mario.height * 0.5),
    };

    if (center.x < viewport.vX + (margin * 2)) {
      viewport.vX = Math.max(center.x - margin, 0);
    } else if (center.x > (viewport.vX + viewport.width) - (margin * 2)) {
      viewport.vX = Math.min((center.x + margin) - viewport.width, 3400 - viewport.width);
    }

    // Check for level completion
    if (data.entities.mario.xPos >= 3168) {
      this.levelComplete(data);
    }
  }

  levelComplete(data) {
    data.userControl = false;
    const timeMs = Date.now() - data.startTime;
    const coins = data.entities.score.coinCount;
    
    if (this.onComplete) {
      setTimeout(() => {
        this.onComplete({
          success: true,
          coins,
          timeMs,
        });
      }, 1000);
    }
  }

  run(data) {
    data.animationFrame += 1;
    input.update;
    movement.update(data);
    animation.update(data);
    physics.update(data);
    this.updateView(data);
    render.update(data);

    this.animationFrameId = window.requestAnimationFrame(() => this.run(data));
  }

  reset() {
    if (this.onComplete) {
      this.onComplete({
        success: false,
        coins: this.gameData?.entities?.score?.coinCount || 0,
        timeMs: Date.now() - (this.gameData?.startTime || Date.now()),
      });
    }
  }

  destroy() {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }
}

export { Game as default };
