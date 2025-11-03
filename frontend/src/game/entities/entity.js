export default class Entity {
  constructor(type, sprite, xPos, yPos, width, height) {
    this.type = type;
    this.sprite = sprite;
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
  }
  
  render(ctx, viewport) {
    if (!this.sprite || !this.sprite.img) return;
    
    ctx.drawImage(
      this.sprite.img,
      this.sprite.srcX,
      this.sprite.srcY,
      this.sprite.srcW,
      this.sprite.srcH,
      Math.floor(this.xPos - viewport.vX),
      Math.floor(this.yPos - viewport.vY),
      this.width,
      this.height
    );
  }
}
