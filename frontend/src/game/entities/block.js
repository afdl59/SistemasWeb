import Entity from './entity';
import Sprite from './sprite';
import Coin from './coin';
import Mushroom from './mushroom';

export default class Block extends Entity {
  constructor(contents, tileset, xPos, yPos, width, height) {
    const sprite = new Sprite(tileset, 433, 1, 17, 17);
    super('block', sprite, xPos, yPos, width, height);

    this.contents = contents;
    this.coinSound = new Audio(new URL('../assets/audio/sounds/coin.wav', import.meta.url).href);
    this.powerupSpawnSound = new Audio(new URL('../assets/audio/sounds/powerup_spawn.wav', import.meta.url).href);
    this.used = new Sprite(tileset, 486, 0, 18, 18);
    this.tileset = tileset;
  }

  createMushroom(data) {
    const mushroom = new Mushroom(data.spriteSheet, this.xPos, this.yPos - 18, 16, 16);
    data.entities.mushrooms.push(mushroom);
    this.powerupSpawnSound.play();
    this.contents = 'empty';
  }

  collectCoin(data) {
    const coin = new Coin(data.spriteSheet, this.xPos + 4, this.yPos - 25, 10, 14);
    data.entities.coins.push(coin);
    data.entities.score.coinCount += 1;
    this.coinSound.play();
    this.contents = 'empty';
  }
}
