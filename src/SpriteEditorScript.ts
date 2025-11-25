import { type GameEngine, type GameScript } from "./game_engine/game_engine";
import { Transform } from "./game_engine/transform";
import { DrawingGridSprite } from "./game_engine/SpriteEditor/DrawingGridSprite";
import { Sound } from "./game_engine/sound";

export const DIM_X =  1000;
export const DIM_Y = 600;

export class SpriteEditorScript implements GameScript {
    
    spriteCreatorOpened: boolean;
    
    static BG_COLOR: string = '#000000';

    gameTime: number;
    engine: GameEngine;
    theme: Sound;

    constructor(engine: GameEngine) {
       
        this.gameTime = 0;
        this.engine = engine;

        this.spriteCreatorOpened = true;
        this.theme = new Sound("sounds/Geometry_OST.mp3", 0.1);
        engine.gameObjects = [];
        engine.lineSprites = [];
        engine.activeCamera.zoomScale = 1;
        engine.activeCamera.transform.pos = [DIM_X/2,DIM_Y/2,engine.activeCamera.transform.pos[2]];
        engine.addLineSprite(new DrawingGridSprite(new Transform()));
    }


    update(deltaTime: number) {
    }


    onPause() {
        const modal = document.getElementById("pauseModal");
        modal.style.display = "block";
    }

    onUnPause() {
        const modal = document.getElementById("pauseModal");
        modal.style.display = "none";
    }
}