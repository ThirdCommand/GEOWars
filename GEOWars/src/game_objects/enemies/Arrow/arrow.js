const GameObject = require("../../../game_engine/game_object");
const Util = require("../../../game_engine/util");
const Sound = require("../../../game_engine/sound");

const EnemySpawn = require("../../particles/enemy_spawn");
const ArrowSprite = require("./arrow_sprite");

class Arrow extends GameObject {
  constructor(engine, pos, angle = Math.PI / 3) {
    super(engine);
    this.transform.pos = pos;
    this.transform.angle = angle;
    this.speed = 3;
    this.points = 50;
    this.transform.vel = Util.vectorCartisian(this.transform.angle, this.speed);
    this.radius = 6;
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_purple.wav", 0.5);
    this.playSound(this.spawnSound);
    this.addLineSprite(new ArrowSprite(this.transform));
    this.addChildGameObject(new EnemySpawn(this.gameEngine));
    this.exists = false;
    this.time = 0;
  }

  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, this.radius);
    // now it will move
    this.addPhysicsComponent();
    this.exists = true;
  }

  animate(delta) {
    this.time += delta;
    const cycleSpeedScale = delta / NORMAL_FRAME_TIME_DELTA;
    const cycleSpeed = 0.004;
    const widthRotate = Math.sin(this.time * cycleSpeedScale * cycleSpeed);
    const twoFullRotationCheck = this.time * cycleSpeedScale * cycleSpeed;

    if (twoFullRotationCheck >= Math.PI * 2 * 4) {
      this.time = 0;
    }
    this.lineSprite.yRotation = this.time * cycleSpeedScale * cycleSpeed;
    this.lineSprite.widthScaleForRotation = Math.sin(
      this.time * cycleSpeedScale * cycleSpeed
    );
    this.lineSprite.zScaleForRotation = Math.sin(
      this.time * cycleSpeedScale * cycleSpeed + Math.PI / 2
    );
  }

  update(delta) {
    // ADD TO UPDATE FOR THE OBJECTS
    this.animate(delta);

    let pos = this.transform.absolutePosition();
    if (this.gameEngine.gameScript.isOutOfBounds(pos)) {
      this.gameEngine.gameScript.redirect(this.transform);
    }
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = Arrow;
