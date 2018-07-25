const gameScript = require("../game_script");

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

  renderLineSprites() {
    this.lineSprites.forEach((sprite) => {
      sprite.draw()
    })
  }

  updateGameScript(delta) {
    gameScript.update(delta)
  }
}