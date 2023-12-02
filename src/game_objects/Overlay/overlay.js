

import { OverlaySprite } from "./overlay_sprite";
import { GameObject } from "../../game_engine/game_object";

export class Overlay extends GameObject {
    constructor(engine, gameScript, shipTransform) {
        super(engine);
        this.gameScript = gameScript;
        this.shipTransform = shipTransform;
        this.transform.pos = [0, 0];
        this.addLineSprite(new OverlaySprite(this.shipTransform, this.gameScript.DIM_X, this.gameScript.DIM_Y, this.gameEngine));
    }

    update(deltaTime) {
        this.lineSprite.score = this.gameScript.score;
        this.lineSprite.lives = this.gameScript.lives;
    }
}
