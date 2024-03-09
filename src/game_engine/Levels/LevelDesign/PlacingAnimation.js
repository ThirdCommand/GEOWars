import { GameObject } from "../../game_object";

export class PlacingAnimation extends GameObject {
    constructor(engine) {
        super(engine);
        this.initialSpawningScale = 1.5;
        this.cycleSpeed = 0.1;
        this.addClickListener();
    }

    // Mouse handling should call this I think?
    placeEnemy() {
        this.parentObject.place();
        this.parentObject.lineSprite.spawningScale = 1;
        this.removeClickListener();
        this.remove();
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
