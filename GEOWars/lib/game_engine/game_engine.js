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
  }

  tick(delta) {
    movePhysicsComponents(delta)
    checkCollisions()
    updateGameObjects(delta)
    renderLineSprites()
    updateGameScript(delta)
  }

  movePhysicsComponents(delta) {
    this.physicsComponents.forEach((component) => {
      component.move(delta)
    })
  }

  checkCollisions() {

  }

  updateGameObjects(delta) {
    this.gameObjects.forEach((object) => {
      object.update(delta)
    })
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

  remove(gameObject) {
    if (gameObject.physicsComponent) {
      this.physicsComponents.splice(this.physicsComponents.indexOf(gameObject), 1)
    }
    if (gameObject.lineSprite){
      this.lineSprites.splice(this.lineSprites.indexOf(gameObject.linesSprite), 1)
    }
    this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1)
  }

}

module.exports = GameEngine;