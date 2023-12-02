import { WallsSprite } from "./walls_sprite";
import { GameObject } from "../../game_engine/game_object";

export class Walls extends GameObject {
    constructor(engine, gameScript) {
        super(engine);
        this.gameScript = gameScript;
        this.transform.pos = [0,0];
        this.addLineSprite(new WallsSprite(this.transform, this.gameScript.DIM_X, this.gameScript.DIM_Y));
    }

    update(deltaTime) {
        
    }
}