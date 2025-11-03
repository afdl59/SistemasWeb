import Entity from './entity';
import Sprite from './sprite';

class Ground extends Entity {
  constructor(tileset, xPos, yPos, width, height) {
    const sprite = new Sprite(tileset, 0, 0, 16, 16);
    super('ground', sprite, xPos, yPos, width, height);
    this.tileset = tileset;
  }
  
  // Override render to draw tiled ground
  render(ctx, viewport) {
    const startX = Math.max(0, this.xPos - viewport.vX);
    const endX = Math.min(this.width, (viewport.vX + viewport.width) - this.xPos);
    const tilesCount = Math.ceil(this.width / 16);
    
    for (let i = 0; i < tilesCount; i++) {
      const tileX = this.xPos + (i * 16);
      if (tileX + 16 >= viewport.vX && tileX <= viewport.vX + viewport.width) {
        ctx.drawImage(
          this.sprite.img,
          this.sprite.srcX,
          this.sprite.srcY,
          this.sprite.srcW,
          this.sprite.srcH,
          Math.floor(tileX - viewport.vX),
          Math.floor(this.yPos - viewport.vY),
          16,
          this.height
        );
      }
    }
  }
}

class Pipe extends Entity {
  constructor(tileset, xPos, yPos, width, height) {
    const sprite = new Sprite(tileset, 0, 180, 35, 35);

    super('pipe', sprite, xPos, yPos, width, height);
  }
}
class Brick extends Entity {
  constructor(tileset, xPos, yPos, width, height) {
    const sprite = new Sprite(tileset, 0, 18, 18, 18);

    super('brick', sprite, xPos, yPos, width, height);
  }
}
class Shrub extends Entity {
  constructor(img, xPos, yPos, width, height) {
    const sprite = new Sprite(img, 419, 142, 48, 17);

    super('shrub', sprite, xPos, yPos, width, height);
  }
}

class Mountain extends Entity {
  constructor(img, xPos, yPos, width, height) {
    const sprite = new Sprite(img, 0, 0, 80, 35);

    super('mountain', sprite, xPos, yPos, width, height);
  }
}

class SmallCloud extends Entity {
  constructor(img, xPos, yPos, width, height) {
    const sprite = new Sprite(img, 0, 0, 32, 24);

    super('smallCloud', sprite, xPos, yPos, width, height);
  }
}

class MediumCloud extends Entity {
  constructor(img, xPos, yPos, width, height) {
    const sprite = new Sprite(img, 0, 24, 48, 24);

    super('mediumCloud', sprite, xPos, yPos, width, height);
  }
}

class LargeCloud extends Entity {
  constructor(img, xPos, yPos, width, height) {
    const sprite = new Sprite(img, 0, 48, 64, 24);

    super('largeCloud', sprite, xPos, yPos, width, height);
  }
}

class Flag extends Entity {
  constructor(img, xPos, yPos, width, height) {
    const sprite = new Sprite(img, 0, 0, 18, 18);

    super('flag', sprite, xPos, yPos, width, height);
  }
}

class Flagpole extends Entity {
  constructor(img, xPos, yPos, width, height) {
    const sprite = new Sprite(img, 18, 0, 3, 162);

    super('flagpole', sprite, xPos, yPos, width, height);
  }
}

class Castle extends Entity {
  constructor(img, xPos, yPos, width, height) {
    const sprite = new Sprite(img, 0, 0, 80, 80);

    super('castle', sprite, xPos, yPos, width, height);
  }
}

export {
  Ground,
  Pipe,
  Brick,
  Shrub,
  Mountain,
  SmallCloud,
  MediumCloud,
  LargeCloud,
  Flag,
  Flagpole,
  Castle,
};
