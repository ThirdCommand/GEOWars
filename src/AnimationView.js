import { BoxBox } from "./game_objects/enemies/BoxBox/boxbox";
import { Pinwheel } from "./game_objects/enemies/Pinwheel/pinwheel";
import { Arrow } from "./game_objects/enemies/Arrow/arrow";
import { Grunt } from "./game_objects/enemies/Grunt/grunt";
import { Weaver } from "./game_objects/enemies/Weaver/weaver";
import { Singularity } from "./game_objects/enemies/Singularity/singularity";
import { AlienShip } from "./game_objects/enemies/Singularity/alien_ship";

export class AnimationView {
  constructor(ctx) {
    this.ctx = ctx;
    this.gameObjects = [];
    this.lineSprites = [];
    this.zoomScale = 1;
    this.ship = {
      transform: {
        pos: [],
      },
    };
    this.lastTime = 0;
    this.animate = this.animate.bind(this);
  }

  start() {
    requestAnimationFrame(this.animate);
    this.lastTime = 0;
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.lastTime = time;
    this.animateGameObjects(timeDelta);
    this.clearCanvas();
    this.renderLineSprites(this.ctx);
    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }

  animateGameObjects(delta) {
    this.gameObjects.forEach((object) => {
      object.animate(delta);
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 200, 200);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 200, 200);
  }

  clear() {
    const removeList = [...this.gameObjects];
    removeList.forEach((gameObject) => {
      this.remove(gameObject);
    });
  }

  renderLineSprites(ctx) {
    // ctx.scale = gameEngine.currentCamera.zoomScale
    this.ctx.save();

    this.ctx.scale(this.zoomScale, this.zoomScale);
    this.lineSprites.forEach((sprite) => {
      sprite.draw(ctx);
    });
    this.ctx.restore();
    // ctx.scale(1,1)
  }

  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
  }

  queueSound(sound) {}

  addCollider() {}

  addPhysicsComponent(physicsComponent) {}

  remove(gameObject) {
    if (gameObject.lineSprite) {
      this.lineSprites.splice(
        this.lineSprites.indexOf(gameObject.lineSprite),
        1
      );
    }

    this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
  }

  addLineSprite(lineSprite) {
    this.lineSprites.push(lineSprite);
  }

  addEnemy(type) {
    const enemyMap = {
      BoxBox: (pos) => new BoxBox(this, pos),
      Pinwheel: (pos) => new Pinwheel(this, pos),
      Arrow: (pos, angle) => new Arrow(this, pos, angle),
      Grunt: (pos) => new Grunt(this, pos, this.ship.transform),
      Weaver: (pos) => new Weaver(this, pos, this.ship.transform),
      Singularity: (pos) => new Singularity(this, pos),
      AlienShip: (pos) => new AlienShip(this, pos, [0, 0], this.ship.transform),
    };
    enemyMap[type]([100, 100]);
  }
}
