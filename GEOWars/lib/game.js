// Asteroids #APP ACADEMY 


const Asteroid = require("./asteroid");
const Bullet = require("./bullet");
const Ship = require("./ship");
const Util = require("./util");
const ParticleExplosion = require("./particles/particle_explosion");
const Particle = require("./particles/particle");
const BoxBox = require("./enemies/boxbox");
const Pinwheel = require("./enemies/pinwheel");
const Arrow = require("./enemies/arrow");
const Grunt = require("./enemies/grunt");
const Weaver = require("./enemies/weaver")
const Singularity = require("./enemies/singularity")
const EnemySpawn = require("./particles/enemy_spawn");

class Game {
  constructor() {
    this.asteroids = [];
    this.enemies = [];
    this.bullets = [];
    this.ships = [];
    this.particleExplosions = [];
    this.spawningEnemies = [];
    this.singularities = [];
    // this.addEnemies();
    this.gameTime = 0;
    this.spawned = false; // REFACTOR PLEASE
    this.enemyCreatorList = this.createEnemyCreatorList()
    this.deathSound = new Audio("GEOWars/sounds/Enemy_explode.wav")
    this.deathSound.volume = 0.5;
    this.bulletWallhit = new Audio("GEOWars/sounds/bullet_hitwall.wav")
    this.bulletWallhit.volume = 0.5;

    this.intervalTiming = 1;
    this.intervalTime = 0;
    this.hugeSequenceTime = 0;
    this.sequenceCount = 0;
    this.lives = 3;
  }

  

  randomArrowDirection () {
    let angles = [0, Math.PI / 2, Math.PI, Math.PI * 3/2]
    return angles[Math.floor(Math.random() * angles.length) % angles.length]
  }
  createEnemyCreatorList() {
    return {
      BoxBox: (pos) => (new BoxBox({ game: this, pos: pos})),
      Pinwheel: (pos) => (new Pinwheel({ game: this, pos: pos })),
      Arrow: (pos, angle) => (new Arrow({game: this, pos: pos, angle: this.randomArrowDirection()})),
      Grunt: (pos) => (new Grunt({game: this, pos: pos})),
      Weaver: (pos) => (new Weaver({game: this, pos: pos}))
      // Singularity: () => (new Singularity({game: this}))
    };
    
  }

  add(object) {
    if (this.enemies.length < 50 || object instanceof Bullet){
      if (object instanceof Asteroid) {
        this.asteroids.push(object);
      } else if (object instanceof BoxBox || object instanceof Pinwheel || object instanceof Arrow || object instanceof Grunt || object instanceof Weaver) {
        this.enemies.push(object)
      } else if (object instanceof Singularity) {
        this.singularities.push(object)
      } else if (object instanceof Bullet) {
        this.bullets.push(object);
      } else if (object instanceof Ship) {
        this.ships.push(object);
      } else if (object instanceof ParticleExplosion) {
        this.particleExplosions.push(object);
      } else if (object instanceof EnemySpawn) {
        this.spawningEnemies.push(object);
      } else {
        throw new Error("unknown type of object");
      }
    }
    
  }

  addEnemies() {
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroid({ game: this }));
    }
    for (let i = 0; i < Game.NUM_BOXES; i++) {
      this.add(new BoxBox({ game: this}));
    }
    for (let i = 0; i < Game.NUM_PINWHEELS; i++) {
      this.add(new Pinwheel({game: this}));
    }
    for (let i = 0; i < Game.NUM_ARROWS; i++) {
      this.add(new Arrow({ game: this }));
    }
    for (let i = 0; i < Game.NUM_GRUNTS; i++) {
      this.add(new Grunt({ game: this }));
    }
    for (let i = 0; i < Game.NUM_WEAVERS; i++) {
      this.add(new Weaver({ game: this }));
    }
    for (let i = 0; i < Game.NUM_SINGULARITIES; i++) {
      this.add(new Singularity({ game: this, id: this.singularities.length }));
    }
    
  
  }

  randomSpawnEnemy(enemy){
    let pos = this.randomPosition();
    let enemyCreators = Object.values(this.enemyCreatorList)
    let spawn = new EnemySpawn(enemyCreators[Math.floor(Math.random() * enemyCreators.length) % enemyCreators.length](), this);

    this.add(spawn)
  }
  

  spawnEnemies(spawnList) {
    spawnList.forEach((enemy) => {
      let spawn = new EnemySpawn(enemy, this)
      this.add(spawn)
    })
  }

  spawnSequence(delta) {
    this.intervalTime += delta;
    // this.gameTime += delta;
    if (this.intervalTime > (500 * this.intervalTiming) && this.sequenceCount < 10) {
      this.intervalTime = 0;
      this.randomSpawnEnemy();
      this.sequenceCount += 1
    } else if (this.intervalTime > (2500 * this.intervalTiming) && this.sequenceCount === 10 && this.hugeSequenceTime % 2 === 0) {
      this.intervalTime = 0
      this.sequenceCount +=1
      let enemies_to_spawn = []
      let randomPos = this.randomPosition();
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          enemies_to_spawn.push(
            this.enemyCreatorList["BoxBox"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
          )
        }
      }
      this.spawnEnemies(enemies_to_spawn);

    } else if (this.intervalTime > (2500 * this.intervalTiming) && this.sequenceCount === 10 && this.hugeSequenceTime % 2 === 1) {
      this.intervalTime = 0
      this.sequenceCount += 1
      let enemies_to_spawn = []
      let randomPos = this.randomPosition();
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          enemies_to_spawn.push(
            this.enemyCreatorList["Weaver"]([i * 40 + randomPos[0], j * 40 + randomPos[1]])
          )
        }
      }
      this.spawnEnemies(enemies_to_spawn);
    } else if (this.intervalTime > (5000 * this.intervalTiming) && this.sequenceCount === 11) {
      this.intervalTime = 0;
      this.sequenceCount += 1;
    } else if (this.intervalTime > 250 && this.sequenceCount < (11 + 15) && (this.sequenceCount > 11) && this.hugeSequenceTime % 2 === 0) {
      this.intervalTime = 0;
      this.sequenceCount += 1 ;

      let enemies_to_spawn = [];
      let fourCorners = [
        [40,              40],
        [Game.DIM_X - 40, 40],
        [40, Game.DIM_Y - 40],
        [Game.DIM_X - 40, Game.DIM_Y - 40]
      ]
      fourCorners.forEach((corner) => {
        enemies_to_spawn.push(this.enemyCreatorList["Grunt"]( corner))
      })
      this.spawnEnemies(enemies_to_spawn);
    } else if (this.intervalTime > 250 && this.sequenceCount < (11 + 15) && (this.sequenceCount > 11) && this.hugeSequenceTime % 2 === 1) {
      this.intervalTime = 0;
      this.sequenceCount += 1;

      let enemies_to_spawn = [];
      let fourCorners = [
        [40, 40],
        [Game.DIM_X - 40, 40],
        [40, Game.DIM_Y - 40],
        [Game.DIM_X - 40, Game.DIM_Y - 40]
      ]
      fourCorners.forEach((corner) => {
        enemies_to_spawn.push(this.enemyCreatorList["Weaver"](corner))
      })
      this.spawnEnemies(enemies_to_spawn);
    } else if( this.sequenceCount === 26) {
      this.sequenceCount = 0;
      this.intervalTiming *= 0.9;
      this.hugeSequenceTime += 1;
    }
    // if (this.gameTime % 2000 === 0){
    //   this.spawned = false
    // }
    // if( !this.spawned){
    //   this.spawnEnemy()
    //   this.spawned = true
    // }
  }

  addShip() {
    const ship = new Ship({
      pos: this.randomPosition(),
      game: this
    });

    this.add(ship);

    return ship;
  }

  allObjects() {
    return [].concat(this.asteroids, this.enemies, this.singularities); //this.bullets);
  }

  //explosions
  particleObjects() {
    return [].concat(this.particleExplosions, this.spawningEnemies);
  }

  allObjects2() {
    return [].concat(this.bullets, this.singularities, this.ships)
  }

  checkCollisions(ctx) {
    const bullets = this.bullets;
    const allObjects = this.allObjects();
    const allObjects2 = this.allObjects2();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects2.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects2[j];
        if (obj1 instanceof Singularity && obj2 instanceof Singularity){
          if (obj1.id === obj2.id){
            continue;
          }
        }
        if (obj1.isCollidedWith(obj2)) {
          const explosionId = this.particleExplosions.length 
          let death = new Audio("GEOWars/sounds/Enemy_explode.wav")
          death.volume = 0.4;
          death.play();
          this.add(new ParticleExplosion(obj1.pos[0], obj1.pos[1], ctx, this, explosionId))
          const collision = obj1.collideWith(obj2);
          // if (collision) return;
        }
      }
    }

  }
  die(){
    this.intervalTiming = this.intervalTiming;
    this.intervalTime = 0;
    this.hugeSequenceTime = 0;
    this.sequenceCount = 0;
    this.lives -= 1;
    this.enemies = [];
    if (this.lives === 0){
      this.intervalTiming = 1;
      this.lives = 3;
      location.reload();
    }
  }


  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.ships.forEach((object) => {
      object.draw(ctx);
    })
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
    this.bullets.forEach((object) => {
      object.draw(ctx)
    });
    this.particleObjects().forEach((particle) => {
      particle.draw(ctx);
    });

  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
    this.bullets.forEach((object) => {
      object.move(delta);
    });
    this.ships.forEach((object) => {
      object.move(delta);
    });
    this.particleObjects().forEach((object) => {
      object.move(delta)
    });
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random(),
      // 500,300
    ];
  }

  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else if (object instanceof ParticleExplosion) {
      this.particleObjects.splice(this.particleObjects.indexOf(object), 1);
    } else if (object instanceof Particle){
      object.active = false
    } else if (object instanceof BoxBox) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Pinwheel) {
      this.enemies.splice(this.enemies.indexOf(object),1);
    } else if (object instanceof Arrow) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Grunt) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Weaver) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Singularity) {
      this.singularities.splice(this.singularities.indexOf(object), 1)
    } else if (object instanceof EnemySpawn) {
      this.spawningEnemies.splice(this.spawningEnemies.indexOf(object), 1)
    }
    else {
      throw new Error("unknown type of object");
    }
  }
  updateShipFireAngle(){
    this.ships[0].setFireAngle()
  }

 

  // spawning handled here. checks the delta time, 
  // adds units when appropriate
  step(delta, ctx) {
    this.spawnSequence(delta);
    this.checkCollisions(ctx);
    this.moveObjects(delta);
    this.updateShipFireAngle();
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  }
}

Game.BG_COLOR = "#000000";

Game.DIM_X = 1000;
Game.DIM_Y = 600;
// Game.FPS = 32;
Game.NUM_ASTEROIDS = 0;
Game.NUM_BOXES = 0;
Game.NUM_PINWHEELS = 0;
Game.NUM_ARROWS = 0;
Game.NUM_GRUNTS = 0;
Game.NUM_WEAVERS = 0;
Game.NUM_SINGULARITIES = 0;
module.exports = Game;

Game.Spawn1 = {
  BoxBox: 50,
  
  
}
  
  


Game.spawnListList = [
  Game.Spawn1
]