import Entity from './entity';
import Sprite from './sprite';

export default class Coin extends Entity {
  constructor(img, xPos, yPos, width, height) {
    const sprite = new Sprite(img, 5, 5, 10, 14);
    super('coin', sprite, xPos, yPos, width, height);

    const self = this;
    this.coinSound = new Audio(new URL('../assets/audio/sounds/coin.wav', import.meta.url).href);

    this.spriteAnimations = {
      spin: {
        frames: [
          new Sprite(img, 5, 5, 10, 14),
          new Sprite(img, 21, 5, 10, 14),
          new Sprite(img, 37, 5, 10, 14),
          new Sprite(img, 53, 5, 10, 14),
        ],
        currentFrame: 0,
      },
    };

    this.states = {
      spinning: {
        animation(data) {
          if (data.animationFrame % 13 === 0) {
            self.sprite =
              self.spriteAnimations.spin.frames[self.spriteAnimations.spin.currentFrame];
            self.spriteAnimations.spin.currentFrame += 1;

            if (self.spriteAnimations.spin.currentFrame > 3) {
              self.spriteAnimations.spin.currentFrame = 0;
            }
          }
        },
      },
    };

    this.currentState = this.states.spinning;
  }
}
