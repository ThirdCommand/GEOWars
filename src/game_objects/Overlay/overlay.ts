import { GameObject } from "../../game_engine/game_object";
import { GameEngine } from "../../game_engine/game_engine";
import { GameScript } from "../../game_script";
import { type Transform } from "../../game_engine/transform";

import { LineSprite } from "../../game_engine/line_sprite";
import { Color } from "../../game_engine/color";
import { type AnimationView } from "../../AnimationView";

interface Scoreboardable {
    score: number;
    lives: number;
}
export class Overlay extends GameObject {
    gameScript: Scoreboardable;
    shipTransform: Transform;
    frameRateUpdateRate: number;
    currentFrameRateUpdateTime: number;
    currentFrameCount: number;
    frameRate: number;
    lineSprite: OverlaySprite;

    constructor(engine: GameEngine, gameScript: Scoreboardable, shipTransform: Transform) {
        super(engine);
        this.gameScript = gameScript;
        this.shipTransform = shipTransform;
        this.transform.pos = [0, 0];
        this.frameRateUpdateRate = 500;
        this.currentFrameRateUpdateTime = 0; 
        this.currentFrameCount = 0;
        this.frameRate = 0;
        this.addLineSprite(new OverlaySprite(this.shipTransform, GameScript.DIM_X, GameScript.DIM_Y, engine));
    }

    update(deltaTime: number) {
        this.lineSprite.score = this.gameScript.score;
        this.lineSprite.lives = this.gameScript.lives;
        this.updateFrameRate(deltaTime);
        this.lineSprite.frameRate = this.frameRate;
    }

    updateFrameRate(deltaTime: number) {
        this.currentFrameRateUpdateTime += deltaTime;
        this.currentFrameCount += 1;
        if (this.currentFrameRateUpdateTime > this.frameRateUpdateRate) {
            this.currentFrameRateUpdateTime = 0;
            this.currentFrameCount = 0;
            this.frameRate = Math.floor(this.currentFrameCount / (this.frameRateUpdateRate / 1000));
        }
    }
    animate() {}
}


export class OverlaySprite extends LineSprite {
    gameEngine: GameEngine;
    width: number;
    height: number;
    score: number;
    lives: number;
    frameRate: number;
    fontSize: number;
    fontStyle: string;
    shadowColor: Color;
    color: Color;
    constructor(transform: Transform, DIM_X: number, DIM_Y: number, gameEngine: GameEngine) {
        super(transform);
        this.gameEngine = gameEngine;
        this.transform = transform;
        this.width = DIM_X;
        this.height = DIM_Y;
        this.score = 0;
        this.lives = 0;
        this.frameRate = 0;
        this.fontSize = 20;
        this.fontStyle = "Arial";
        this.shadowColor = new Color(
            "hsla", [202, 100, 70, 1]
        );
        this.color = new Color(
            "hsla", [202, 100, 70, 0.5]
        );
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.scale(1 / this.gameEngine.activeCamera.zoomScale, 1 / this.gameEngine.activeCamera.zoomScale);
        const zoomFactor = this.gameEngine instanceof GameEngine ? 
            this.gameEngine.activeCamera.zoomScale / this.gameEngine.activeCamera.defaultZoomScale : 
            1;
        ctx.font = this.fontSize * 1.3 + "px " + this.fontStyle;
        ctx.fillStyle = this.color.evaluateColor();
        const displayText = "Score: " + this.score + "      " + "Lives: " + this.lives;
        // if(this.gameEngine.gameScript.testing) {
        //     displayText += "      " + "FPS: " + this.frameRate;
        // }
        ctx.fillText(
            displayText,
            (this.transform.pos[0] - 350 / zoomFactor) * this.gameEngine.activeCamera.zoomScale, 
            (this.transform.pos[1] - 150 / zoomFactor) * this.gameEngine.activeCamera.zoomScale
        );
        ctx.restore();
    }
}