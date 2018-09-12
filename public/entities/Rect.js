import Vec from './Vec.js';

export default class Rect {
  constructor(x = 0, y = 0, size = 10) {
    this.pos = new Vec(x, y);
    this.size = size;
    this.color = '#fff'
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(
      this.pos.x - this.size / 2,
      this.pos.y - this.size / 2,
      this.size,
      this.size
    );
    ctx.fill();
  }
}
