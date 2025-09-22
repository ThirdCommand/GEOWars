import { AnimationView } from "../../AnimationView";
import { GameScript } from "../../game_script";
import { GameEngine } from "../game_engine";
import { GameObject } from "../game_object";
import { LineSprite } from "../line_sprite";
import { Transform } from "../transform";

export class PlacingPoint extends GameObject {
    previousPoint: Point;
    constructor(engine: GameEngine, previousPoint?: Point) {
        super(engine);
        this.previousPoint = previousPoint
        this.addLineSprite(new PlacingPointSprite(this.transform))
        this.addClickListener();
        this.addMousePosListener();
    }

    updateMousePos(mousePos: [number, number]) {
        this.transform.pos[0] = mousePos[0];
        this.transform.pos[1] = mousePos[1];
    }

    mouseDoubleClicked() {
        
    }

    update(timeDelta: number) {
    }
    animate() {
    }
}

class PlacingPointSprite extends LineSprite {
    constructor(transform: Transform) {
        super(transform);
    }
    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.absolutePosition();
        ctx.save();
        this.drawPlacingPoint(ctx, [pos[0], pos[1]]);
        ctx.restore()
    }
    drawPlacingPoint(ctx: CanvasRenderingContext2D, pos: [number, number]) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#702963"
        ctx.beginPath();
        const distancePerIncrement = GameScript.DIM_Y / 72

        const xPosIncremented = Math.round(pos[0]/distancePerIncrement) * distancePerIncrement;
        const yPosIncremented = Math.round(pos[1] / distancePerIncrement) * distancePerIncrement;
        ctx.arc(xPosIncremented, yPosIncremented, 3, 0, 2 * Math.PI);
        ctx.stroke();
    }

}

export class Point {
    pos: [number, number];
    constructor(pos: [number, number]) {
        this.pos = [pos[0], pos[1]];
    }
}

