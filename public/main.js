import Player from './entities/Player.js';
import Rect from './entities/Rect.js';

const frameRate = 60; // Hz - client drawing rate
const serverTick = 40; // Hz - game server update speed
const clientTick = 10; // controls the rate at which the client receive data
const delayTime = 0.140 // in seconds
const delay = Math.floor(delayTime * clientTick); // in frames of client tick

const canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 400;

const ctx = canvas.getContext('2d');

const background = new Rect(
  canvas.width / 2,
  canvas.height / 2,
  canvas.width,
  canvas.height
);
background.color = '#000';

const serverPlayer = new Player(canvas.width / 2, canvas.height / 2);
serverPlayer.color = 'red';
serverPlayer.listen();

const clientPlayerInterpolated = new Player(canvas.width / 2, canvas.height / 2);
const clientPlayer = new Player(canvas.width / 2, canvas.height / 2);
clientPlayer.color = 'orange';

const positions = [];

let frame = 0;
function draw() {
  if (positions.length > 1 + delay) {
    const n = (frame - positions[0].frame) / (positions[0 + delay].frame - positions[1 + delay].frame);
    clientPlayerInterpolated.pos.x = (1 - n) * positions[1 + delay].x + n * positions[0 + delay].x;
    clientPlayerInterpolated.pos.y = (1 - n) * positions[1 + delay].y + n * positions[0 + delay].y;

    clientPlayer.pos.x = positions[0 + delay].x;
    clientPlayer.pos.y = positions[0 + delay].y;
  }
  background.draw(ctx);
  clientPlayerInterpolated.draw(ctx);
  clientPlayer.draw(ctx);
  serverPlayer.draw(ctx);
  frame += 1;
}

function clientUpdate() {
  positions.unshift({
    x: serverPlayer.pos.x,
    y: serverPlayer.pos.y,
    frame
  });
}

function serverUpdate() {
  serverPlayer.update();
}

setInterval(clientUpdate, 1000 / clientTick);
setInterval(serverUpdate, 1000 / serverTick);
setInterval(draw, 1000 / frameRate);
