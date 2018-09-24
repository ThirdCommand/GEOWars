const OverlaySprite = require("./overlay_sprite")
const GameObject = require("../../game_engine/game_object")

class Overlay extends GameObject {
    constructor(engine, gameScript, shipTransform) {
        super(engine);
        this.gameScript = gameScript
        this.shipTransform = shipTransform
        this.transform.pos = [0, 0]
        this.addLineSprite(new OverlaySprite(this.shipTransform, this.gameScript.DIM_X, this.gameScript.DIM_Y))
    }

    update(deltaTime) {
        this.lineSprite.score = this.gameScript.score
        this.lineSprite.lives = this.gameScript.lives
    }
}

module.exports = Overlay