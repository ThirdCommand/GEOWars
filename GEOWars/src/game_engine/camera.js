import { Util } from "./util";

import { Transform } from "./transform";
import { Collider } from "./collider";
import { GameObject } from "./game_object";

export class Camera extends GameObject {
    constructor(engine, transform, width, height, currentCamera) {
        super(engine);
        this.transform = transform;
        this.width = width;
        this.height = height;
        this.currentCamera = currentCamera;
        this.zoomScale = 1;
    }

    update() {
        this.gameEngine.ctx.restore();
        this.gameEngine.ctx.save();
        const xPos = this.transform.pos[0];
        const yPos = this.transform.pos[1];
        const zoomScale = this.zoomScale;
        const width = this.width;
        const height = this.height;

        this.gameEngine.ctx.translate(
            -xPos * zoomScale + width / 2,
            -yPos * zoomScale + height / 2
        );
    }

    // contains the transformation info
    // contains the scaling info
    // zooming in and out is possible because of this
    // custom collider
    // contains a list of linesprites to draw
    // If the object is outside of the view it doesn't draw
    //
}
