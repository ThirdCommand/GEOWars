const WallsSprite = require("./walls_sprite")
const GameObject = require("../../game_engine/game_object")

class Walls extends GameObject {
    constructor(engine, gameScript) {
        super(engine);
        this.gameScript = gameScript
        this.transform.pos = [0,0]
        this.addLineSprite(new WallsSprite(this.transform, this.gameScript.DIM_X, this.gameScript.DIM_Y))
    }

    update(deltaTime) {
        
    }
}

module.exports = Walls