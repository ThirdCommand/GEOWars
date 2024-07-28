import { WallsSprite } from "./walls_sprite";
import { GameObject } from "../../game_engine/game_object";
import { type GameEngine } from "../../game_engine/game_engine";
import { GameScript } from "../../game_script";

export class Walls extends GameObject {
    constructor(engine: GameEngine) {
        super(engine);
        this.transform.pos = [0,0];
        this.addLineSprite(new WallsSprite(this.transform, GameScript.DIM_X, GameScript.DIM_Y));
    }

    update() {
        
    }
}