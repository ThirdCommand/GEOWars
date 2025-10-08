import { type GameEngine, type GameScript } from "./game_engine/game_engine";
import { Transform } from "./game_engine/transform";
import { DrawingGridSprite } from "./game_engine/SpriteEditor/DrawingGridSprite";

export const DIM_X =  1000;
export const DIM_Y = 600;

export class SpriteEditorScript implements GameScript {
    
    spriteCreatorOpened: boolean;
    
    static BG_COLOR: string = '#000000';

    gameTime: number;
    engine: GameEngine;
    theme: {
        play: () => void;
        mute: () => void;
        unmute: () => void;
    }

    constructor(engine: GameEngine) {
       
        this.gameTime = 0;
        this.engine = engine;

        this.spriteCreatorOpened = true;
        this.theme = {
            play: () => null,
            mute: () => null,
            unmute: () => null
        };
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