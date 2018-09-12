import Rect from './Rect.js';
import Vec from './Vec.js';

export default class Player extends Rect {
  constructor(x = 0, y = 0, size = 20) {
    super(x, y, size);
    this.vel = new Vec(0, 0);
    this.speed = 10;
    this.acceleration = 6;
    this.direction = '';
  }

  listen() {
    ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].forEach(keyCode => {
      window.addEventListener('keydown', event => {
        if (event.code === keyCode) {
          this.direction = keyCode;
        }
      });
      window.addEventListener('keyup', event => {
        if (event.code === keyCode) {
          this.direction = '';
        }
      });
    });
  }

  update() {
    switch (this.direction) {
      case 'ArrowLeft':
        this.vel.x = Math.max(-this.speed, this.vel.x - this.acceleration / this.speed);
        break;
      case 'ArrowUp':
        this.vel.y = Math.max(-this.speed, this.vel.y - this.acceleration / this.speed);
        break;
      case 'ArrowRight':
        this.vel.x = Math.min(this.speed, this.vel.x + this.acceleration / this.speed);
        break;
      case 'ArrowDown':
        this.vel.y = Math.min(this.speed, this.vel.y + this.acceleration / this.speed);
        break;
      default:
        this.vel.x *= 1 - 1 / this.acceleration;
        this.vel.y *= 1 - 1 / this.acceleration;
        break;
    }

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}