// const Bullet = require("./game_objects/bullet");
// const Particle = require("./particles/particle");
// const EnemySpawn = require("./particles/enemy_spawn");
// const ParticleExplosion = require("./particles/particle_explosion");
// const BulletWallExplosion = require("./particles/bullet_wall_explosion");
// const SingularityExplosion = require("./particles/singularity_explosion");
const Ship = require("./game_objects/ship/ship");
const BoxBox = require("./game_objects/enemies/BoxBox/boxbox");
const Pinwheel = require("./game_objects/enemies/Pinwheel/pinwheel");
const Arrow = require("./game_objects/enemies/Arrow/arrow");
const Grunt = require("./game_objects/enemies/Grunt/grunt");
const Weaver = require("./game_objects/enemies/Weaver/weaver");
const Singularity = require("./game_objects/enemies/Singularity/singularity");

const Util = require("./game_engine/util");
const Sound = require("./game_engine/sound")

class GameScript {
  constructor(engine) {
    this.DIM_X = 1000;
    this.DIM_Y = 600;
    this.BG_COLOR = "#000000";
    this.gameTime = 0;
    this.engine = engine
    this.addShip();
    this.enemyCreatorList = this.createEnemyCreatorList()
    // this.deathSound = new Audio("GEOWars/sounds/Enemy_explode.wav")
    // this.deathSound.volume = 0.5;
    // this.bulletWallhit = new Audio("GEOWars/sounds/bullet_hitwall.wav")
    // this.bulletWallhit.volume = 0.25;

    this.intervalTiming = 1;
    this.intervalTime = 0;
    this.hugeSequenceTime = 0;
    this.sequenceCount = 0;
    this.lives = 3;
    this.soundsToPlay = {}

    this.spawnthing = false;
  }

  update(deltaTime){
    this.spawnSequence(deltaTime)

  }

  randomArrowDirection() {
    let angles = [0, Math.PI / 2, Math.PI, Math.PI * 3 / 2]
    return angles[Math.floor(Math.random() * angles.length) % angles.length]
  }

  createEnemyCreatorList() {
    let engine = this.engine 
    return {
      BoxBox:      (pos)        => (new BoxBox(engine, pos)),
      Pinwheel:    (pos)        => (new Pinwheel(engine, pos)),
      Arrow:       (pos, angle) => (new Arrow(engine, pos, angle)),
      Grunt:       (pos)        => (new Grunt(engine, pos, this.ship.transform)),
      Weaver:      (pos)        => (new Weaver(engine, pos, this.ship.transform)),
      Singularity: (pos)        => (new Singularity(engine, pos))
    };
  }

  randomSpawnEnemy(enemy) {
    let pos = this.randomPosition();
    let enemyCreators = Object.values(this.enemyCreatorList)
    // enemyCreators[Math.floor(Math.random() * enemyCreators.length) % enemyCreators.length](pos);
    this.enemyCreatorList["Arrow"](pos, Math.PI)
  }

  // spawnEnemies(spawnList) {
  //   if (this.enemies.length < 50) {
  //     spawnList.forEach((enemy) => {
  //       let spawn = new EnemySpawn(enemy, this)
  //       this.add(spawn)
  //     })
  //   }
  // }

  randomPosition() {
    return [
      this.DIM_X * Math.random(),
      this.DIM_Y * Math.random(),
      // 500,300
    ];
  }

  spawnSequence(delta) {
    this.intervalTime += delta;
    if(!this.spawnthing){
      this.randomSpawnEnemy();
      this.spawnthing = true
    }
    this.gameTime += delta;
    // if (this.intervalTime > (500 * this.intervalTiming) && this.sequenceCount < 10) {
    //   this.intervalTime = 0;
    //   this.randomSpawnEnemy();
    //   this.sequenceCount += 1

    // } 
    // else if (this.intervalTime > (2500 * this.intervalTiming) && this.sequenceCount === 10 && this.hugeSequenceTime % 2 === 0) {
    //   this.intervalTime = 0
    //   this.sequenceCount += 1
    //   let enemies_to_spawn = []
    //   let randomPos = this.randomPosition();
    //   for (let i = 0; i < 2; i++) {
    //     for (let j = 0; j < 2; j++) {
    //       enemies_to_spawn.push(
    //         this.enemyCreatorList["BoxBox"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
    //       )
    //     }
    //   }

    // } else if (this.intervalTime > (2500 * this.intervalTiming) && this.sequenceCount === 10 && this.hugeSequenceTime % 2 === 1) {
    //   this.intervalTime = 0
    //   this.sequenceCount += 1
    //   let enemies_to_spawn = []
    //   let randomPos = this.randomPosition();
    //   for (let i = 0; i < 2; i++) {
    //     for (let j = 0; j < 2; j++) {
    //       this.enemyCreatorList["Weaver"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
    //     }
    //   }

    // } else if (this.intervalTime > (5000 * this.intervalTiming) && this.sequenceCount === 11) {
    //   this.intervalTime = 0;
    //   this.sequenceCount += 1;
    // } else if (this.intervalTime > 250 && this.sequenceCount < (11 + 15) && (this.sequenceCount > 11) && this.hugeSequenceTime % 2 === 0) {
    //   this.intervalTime = 0;
    //   this.sequenceCount += 1;

    //   let enemies_to_spawn = [];
    //   let fourCorners = [
    //     [40, 40],
    //     [GameScript.DIM_X - 40, 40],
    //     [40, GameScript.DIM_Y - 40],
    //     [GameScript.DIM_X - 40, GameScript.DIM_Y - 40]
    //   ]
    //   fourCorners.forEach((corner) => {
    //     this.enemyCreatorList["Grunt"](corner)
    //   })

    // } else if (this.intervalTime > 250 && this.sequenceCount < (11 + 15) && (this.sequenceCount > 11) && this.hugeSequenceTime % 2 === 1) {
    //   this.intervalTime = 0;
    //   this.sequenceCount += 14;

    //   let enemies_to_spawn = [];
    //   let arrowWallPositions = []
    //   let arrowDirection = Math.PI * 3 / 2 + Math.PI
    //   for (let i = 40; i < GameScript.DIM_X; i += 40) {
    //     arrowWallPositions.push([i, 50])
    //   }

    //   arrowWallPositions.forEach((position) => {
    //     this.enemyCreatorList["Arrow"](position, arrowDirection)
    //   })

    // } else if (this.sequenceCount >= 26) {
    //   this.sequenceCount = 0;
    //   if (!(this.intervalTiming < 0.5)) {
    //     this.intervalTiming *= 0.9;
    //   }
    //   this.hugeSequenceTime += 1;
    // }





    // if (this.gameTime % 2000 === 0){
    //   this.spawned = false
    // }
    // if( !this.spawned){
    //   this.spawnEnemy()
    //   this.spawned = true
    // }
  }

  addShip() {
    // console.log(this.engine);
    
    this.ship = new Ship(this.engine, [500,500])
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > GameScript.DIM_X) || (pos[1] > GameScript.DIM_Y);
  }

  updateShipFireAngle() {
    this.ships[0].setFireAngle()
  }

  // bounce(pos){
  //   return [
  //     Util.bounce(pos[0], GameScript.DIM_X), Util.bounce(pos[1], GameScript.DIM_Y)
  //   ];
  // }

  bounce(transform) {
    let max = [this.DIM_X, this.DIM_Y]

    if (transform.pos[0] <= 0 || transform.pos[0] >= max[0]) {
      transform.vel[0] = -transform.vel[0];
    }
    if (transform.pos[1] <= 0 || transform.pos[1] >= max[1]) {
      transform.vel[1] = -transform.vel[1];
    }
  }

  redirect(transform) {
    let max = [this.DIM_X, this.DIM_Y]
    
    
    if (transform.pos[0] <= 0 || transform.pos[0] >= max[0]) {
      if (transform.pos[0] <= 0) {
        transform.pos[0] = 1

        
      }
      if (transform.pos[0] >= max[0]) {
        transform.pos[0] = max[0] - 1

      }
    }
    if (transform.pos[1] <= 0 || transform.pos[1] >= max[1]) {
      if (transform.pos[1] <= 0) {
        transform.pos[1] = 1

      }
      if (transform.pos[1] >= max[1]) {
        transform.pos[1] = max[1] - 1

      }
    }
    // console.log(transform);
    // debugger

    transform.vel[0] = -transform.vel[0];
    transform.vel[1] = -transform.vel[1];
    // console.log(transform);
    // debugger
  }

}

GameScript.BG_COLOR = "#000000";

GameScript.DIM_X = 1000;
GameScript.DIM_Y = 600;
// GameScript.FPS = 32;
// GameScript.NUM_BOXES = 10;
// GameScript.NUM_PINWHEELS = 0;
// GameScript.NUM_ARROWS = 0;
// GameScript.NUM_GRUNTS = 0;
// GameScript.NUM_WEAVERS = 0;
// GameScript.NUM_SINGULARITIES = 1;
module.exports = GameScript;

GameScript.Spawn1 = {
  BoxBox: 50,
}

GameScript.spawnListList = [
  GameScript.Spawn1
]