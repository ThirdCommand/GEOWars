import { GameObject } from "../../game_object";

export class PlacingAnimation extends GameObject {
    constructor(engine) {
        super(engine);
        this.initialSpawningScale = 1.5;
        this.cycleSpeed = 0.1;
        this.addClickListener();
        this.addMousePosListener();
    }

    // Mouse handling should call this I think?
    placeEnemy() {
        this.parentObject.place();
        this.remove();

    }

    updateMousePos(mousePos) {
        this.parentObject.transform.pos[0] = mousePos[0];
        this.parentObject.transform.pos[1] = mousePos[1];
    }

    mouseDoubleClicked() {
        
    }

    mouseClicked(mousePos) {
        this.placeEnemy();
    }

    update(timeDelta) {
        const cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

        if (this.parentObject.lineSprite.spawningScale < 0.7) {
            this.parentObject.lineSprite.spawningScale = this.initialSpawningScale;
        } else {
            this.parentObject.lineSprite.spawningScale -=
        this.cycleSpeed * cycleSpeedScale;
        }
    }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
