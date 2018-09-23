const OverlaySprite = require("./overlay_sprite")
const GameObject = require("../../game_engine/game_object")

class Overlay extends GameObject {
    constructor(engine, gameScript) {
        super(engine);
        this.gameScript = gameScript
        this.transform.pos = [0, 0]
        this.addLineSprite(new OverlaySprite(this.transform, this.gameScript.DIM_X, this.gameScript.DIM_Y))
    }

    update(deltaTime) {

    }
}

module.exports = Walls