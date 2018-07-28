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
    this.colliders = {};
    this.subscibers = {};
    this.muted = true;
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

  addCollider(collider){
    if (collider.subscribers) {
      this.subscribers.append(collider)
    }
    // collider: object absolute transform
    // collider { "objectType": "Bullet", "type": "general", "subscriptions": ["BoxBox", "Arrow"] }
    // colliders {"Singularity": {"General": [collider, collider], "GravityWell": [collider,collider]}}
    if (!colliders[collider.objectType]) {
      let collidersSameTypeAndObject = {}
      colliders[collider.objectType] = collidersSameTypeAndObject[collider.type] = [collider]
    } else {
      if (!colliders[collider.objectType][collider.type]){
        colliders[collider.objectType][collider.type] = [collider]
      } else {
        colliders[collider.objectType][collider.type].append(collider)
      }
    }
  }

  // must be a way to only retrieve 
  // the data for subscribed colliders once

  checkCollisions() {
    let subscribers = this.subscribers
    subscribers.forEach((subscribingCollider) => {
      subscribingCollider.subsciptions.forEach((subscribedType) => {
        colliders[subscriberType].forEach((subscribedCollider) => {
          subscribingCollider.collisionCheck(subscribedCollider)
        })
      })
    })
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
    if (!this.muted){
      this.soundsToPlay[sound.url] = sound
    }
  }

  remove(gameObject) {
    if (gameObject.physicsComponent) {
      this.physicsComponents.splice(this.physicsComponents.indexOf(gameObject), 1)
    }
    if (gameObject.lineSprites){
      this.lineSprites.splice(this.lineSprites.indexOf(gameObject.lineSprites), 1)
    }
    removeColliders(gameObject.colliders)
    this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1)
  }

  removeColliders(colliders){
    colliders.forEach((collider) => {
      if (collider.subscribers) {
        this.subscribers.splice(this.subscribers.indexOf(collider), 1)
      }
      objectAndColliderTypeList = this.colliders[collider.objectType][collider.type]
      objectAndColliderTypeList.splice(objectAndColliderTypeList.indexOf(gameObject), 1)
    })
  }
}

module.exports = GameEngine;

    // the idea:
    // engine takes in collider with gameobject type as string
    // this way subscriptions can be done via string names
    // enemy is subscribed to bullets..
    // each enemy will check every bullet
    // convert gameobject type to string
    // colliders can be added without subscriptions
    // subscriptions are an array of strings stored with the collider