const gameScript = require("../game_script");
// const GameObject = require("./game_boject");
// const LineRenderer = require("./line_renderer");
// const PhysicsComponent = require("./physics_component")
const Sound = require("./sound")
// const Transform = require("./transform")
const Util = require("./util")

class GameEngine {
  constructor() {
    this.gameScript = new gameScript;
    this.gameObjects = [];
    this.physicsComponents = [];
    this.lineSprites = [];
    this.soundsToPlay = {};
    // the idea:
    // engine takes in collider with gameobject type as string
    // this way subscriptions can be done via string names
    // enemy is subscribed to bullets..
    // each enemy will check every bullet
    // convert gameobject type to string
    // colliders can be added without subscriptions
    // subscriptions are an array of strings stored with the collider
    
    // collider: object absolute transform
    // collider { "transform" transform, "subscriptions" ["name", "name"] }
    // colliders {"BoxBox" [collider, collider]}

    // colliders.
    this.colliders = {};

  }

  tick(delta) {
    movePhysicsComponents(delta)
    checkCollisions()
    updateGameObjects(delta)
    renderLineSprites()
    updateGameScript(delta)
    playSounds()
  }

  movePhysicsComponents(delta) {
    this.physicsComponents.forEach((component) => {
      component.move(delta)
    })
  }

  checkCollisions() {
    const bullets = this.bullets;
    const allObjects = this.allObjects();
    const allObjects2 = this.allObjects2();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects2.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects2[j];
        // if (obj1 instanceof Singularity && obj2 instanceof Singularity){
        //   if (obj1.id === obj2.id){
        //     continue;
        //   }
        // }
        if (obj2 instanceof Singularity) {
          obj2.isCollidedWith(obj1)
          continue
        }
        if (obj1.isCollidedWith(obj2)) {
          const explosionId = this.particleExplosions.length

          if (!this.muted) {
            let death = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.4)
            this.soundsToPlay[death.url] = death
          }
          if (obj1 instanceof Singularity) {
            this.add(new SingularityExplosion(obj1.pos[0], obj1.pos[1], ctx, this, explosionId))
            const collision = obj1.collideWith(obj2);
          } else {
            this.add(new ParticleExplosion(obj1.pos[0], obj1.pos[1], ctx, this, explosionId))
            const collision = obj1.collideWith(obj2);
          }
          // if (collision) return;
        }
      }
    }
  }

  updateGameObjects(delta) {
    this.gameObjects.forEach((object) => {
      object.update(delta)
    })
  }

  playSounds(){
    Object.values(this.soundsToPlay).forEach((sound) => {
      sound.play();
    })
    this.soundsToPlay = {};
  }

  renderLineSprites(ctx) {
    this.lineSprites.forEach((sprite) => {
      sprite.draw(ctx)
    })
  }

  updateGameScript(delta) {
    gameScript.update(delta)
  }

  addGameObject(object) {
    this.gameObjects.append(object)
  }

  addLineSprite(lineSprite) {
    this.lineSprite.append(lineSprite)
  }

  queueSound(sound){
    this.soundsToPlay[sound.url] = sound
  }

  remove(gameObject) {
    if (gameObject.physicsComponent) {
      this.physicsComponents.splice(this.physicsComponents.indexOf(gameObject), 1)
    }
    if (gameObject.lineSprites){
      this.lineSprites.splice(this.lineSprites.indexOf(gameObject.lineSprites), 1)
    }
    if (gameObject.collider)
    this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1)
  }

}

module.exports = GameEngine;