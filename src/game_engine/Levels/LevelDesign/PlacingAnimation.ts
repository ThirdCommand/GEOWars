import { type GameEngine } from "../../game_engine";
import { GameObject } from "../../game_object";
import { type LineSprite } from "../../line_sprite";

interface PlacerObject extends GameObject {
    place: () => {}
    lineSprite: LineSprite
}
export class PlacingAnimation extends GameObject {
    initialSpawningScale: number;
    cycleSpeed: number;
    parentObject: PlacerObject;
    constructor(engine: GameEngine) {
        super(engine);
        this.initialSpawningScale = 1.5;
        this.cycleSpeed = 0.1;
        this.addClickListener();
        this.addMousePosListener();
    }

    // Mouse handling should call this I think?
    placeEnemy() {
        this.parentObject.lineSprite.spawningScale = 1;
        this.removeMouseListeners();
        this.parentObject.place();
        this.remove();
    }

    // why is the position not mapping right
    updateMousePos(mousePos: [number, number]) {
        this.parentObject.transform.pos[0] = mousePos[0] + this.gameEngine.activeCamera.transform.pos[0];
        this.parentObject.transform.pos[1] = mousePos[1] + this.gameEngine.activeCamera.transform.pos[1];
    }

    mouseDoubleClicked() {
        
    }

    mouseClicked() {
        this.placeEnemy();
    }

    update(timeDelta: number) {
        const cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

        if (this.parentObject.lineSprite.spawningScale < 0.7) {
            this.parentObject.lineSprite.spawningScale = this.initialSpawningScale;
        } else {
            this.parentObject.lineSprite.spawningScale -=
        this.cycleSpeed * cycleSpeedScale;
        }
    }
    animate() {
        
    }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
