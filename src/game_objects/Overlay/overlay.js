

import { OverlaySprite } from "./overlay_sprite";
import { GameObject } from "../../game_engine/game_object";

export class Overlay extends GameObject {
    constructor(engine, gameScript, shipTransform) {
        super(engine);
        this.gameScript = gameScript;
        this.shipTransform = shipTransform;
        this.transform.pos = [0, 0];
        this.frameRateUpdateRate = 500;
        this.currentFrameRateUpdateTime = 0; 
        this.currentFrameCount = 0;
        this.frameRate = 0;
        this.addLineSprite(new OverlaySprite(this.shipTransform, this.gameScript.DIM_X, this.gameScript.DIM_Y, this.gameEngine));
    }

    update(deltaTime) {
        this.lineSprite.score = this.gameScript.score;
        this.lineSprite.lives = this.gameScript.lives;
        this.updateFrameRate(deltaTime);
        this.lineSprite.frameRate = this.frameRate;
    }

    updateFrameRate(deltaTime) {
        this.currentFrameRateUpdateTime += deltaTime;
        this.currentFrameCount += 1;
        if (this.currentFrameRateUpdateTime > this.frameRateUpdateRate) {
            this.currentFrameRateUpdateTime = 0;
            this.currentframeCount = 0;
            this.frameRate = Math.floor(this.currentFrameCount / (this.frameRateUpdateRate / 1000));
        }
    }
}
