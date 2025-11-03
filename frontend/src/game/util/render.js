const render = {
  init(data) {
    data.entities.scenery = [];
    data.mapBuilder.create(data);
  },

  // Clear canvas and redraw entities
  update(data) {
    data.canvas.ctx.clearRect(0, 0, 760, 600);
    data.canvas.ctx.fillStyle = '#63adff';
    data.canvas.ctx.fillRect(0, 0, 760, 600);

    data.mapBuilder.renderMap(data);

    data.entities.coins.forEach((coin) => {
      this.drawEntity(coin, data);
    });

    data.entities.mushrooms.forEach((mushroom) => {
      this.drawEntity(mushroom, data);
    });

    data.entities.goombas.forEach((goomba) => {
      this.drawEntity(goomba, data);
    });

    data.entities.koopas.forEach((koopa) => {
      this.drawEntity(koopa, data);
    });

    this.drawText(data);
    this.drawEntity(data.entities.mario, data);
  },

  // Only draw entities that fall in viewport
  drawEntity(entity, data) {
    if (((entity.xPos + entity.width >= data.viewport.vX &&
        entity.xPos + entity.width <= data.viewport.vX + data.viewport.width) ||
        (entity.xPos >= data.viewport.vX &&
        entity.xPos <= data.viewport.vX + data.viewport.width)) &&
      ((entity.yPos + entity.height >= data.viewport.vY &&
        entity.yPos + entity.height <= data.viewport.vY + data.viewport.height) ||
        (entity.yPos >= data.viewport.vY &&
        entity.yPos <= data.viewport.vY + data.viewport.height))) {
      
      // Use entity's render method if available
      if (entity.render) {
        entity.render(data.canvas.ctx, data.viewport);
      } else {
        // Fallback to direct drawing
        data.canvas.ctx.drawImage(
          entity.sprite.img,
          entity.sprite.srcX,
          entity.sprite.srcY,
          entity.sprite.srcW,
          entity.sprite.srcH,
          Math.floor(entity.xPos - data.viewport.vX),
          Math.floor(entity.yPos - data.viewport.vY),
          entity.width,
          entity.height,
        );
      }
    }
  },

  // Render hud
  drawText(data) {
    data.canvas.ctx.font = '16px "Press Start 2P"';
    data.canvas.ctx.fillStyle = 'white';
    data.canvas.ctx.fillText(`COINS: ${data.entities.score.coinCount}`, data.entities.score.xPos, data.entities.score.yPos);
  },
};

export { render as default };
