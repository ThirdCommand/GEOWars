import { GameScript } from "../../game_script";
import { GameEngine } from "../game_engine";
import { GameObject } from "../game_object";
import { LineSprite } from "../line_sprite";
import { Transform } from "../transform";

export class PlacingPoint extends GameObject {
    constructor(engine: GameEngine) {
        super(engine);
        this.addLineSprite(new PlacingPointSprite(this.transform))
        this.addClickListener();
        this.addMousePosListener();
    }

    updateMousePos(mousePos: [number, number]) {
        const distancePerIncrement = GameScript.DIM_Y / 72

        const xPosIncremented = Math.round(mousePos[0]/distancePerIncrement) * distancePerIncrement;
        const yPosIncremented = Math.round(mousePos[1] / distancePerIncrement) * distancePerIncrement;
        this.transform.pos[0] = xPosIncremented;
        this.transform.pos[1] = yPosIncremented;
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
        ctx.arc(pos[0], pos[1], 3, 0, 2 * Math.PI);
        ctx.stroke();
    }

}

export class Point {
    pos: [number, number];
    constructor(pos: [number, number]) {
        this.pos = [pos[0], pos[1]];
    }
}
export class BezierCurve {
    startPos: [number, number];
    endPos?: [number,number];
    controlPoint1?: [number, number];
    controlPoint2?: [number, number];
    mirroredValue?: [number, number];
    isBeingPlaced: boolean;
    placingWhichPoint: 'start' | 'end' | 'controlPoint1' | 'controlPoint2';
    constructor(pos?: [number, number]) {
        this.isBeingPlaced = true;
        this.startPos = pos ? [pos[0], pos[1]] : null;
        this.placingWhichPoint = pos ? 'end' : 'start';
    }
    isDrawable(): boolean {
        return Boolean(this.startPos && this.endPos && this.controlPoint1 && this.controlPoint2)
    }
    placePoint(pos: [number, number]) {
        switch(this.placingWhichPoint) {
            case "start":
                this.startPos = [pos[0], pos[1]];
                this.placingWhichPoint = 'end';
                break;
            case "end": // start is entered on creation, so end is next
                this.endPos = [pos[0], pos[1]];
                this.placingWhichPoint = 'controlPoint1';
                break;
            case "controlPoint1":
                // I should also place the mirrored point
                this.controlPoint1 = [pos[0], pos[1]];
                this.placingWhichPoint = 'controlPoint2';
                break;
            case "controlPoint2":
                this.controlPoint2 = [pos[0], pos[1]];
                this.placingWhichPoint = 'controlPoint1';
                break;

        }
    }
}
export class Circle {
    centerPoint?: [number, number];
    radius?: number;
    pointBeingPlaced: 'center' | 'radius' |'done';
    isBeingPlaced: boolean;
    constructor(centerPoint?: [number, number], radius?: number) {
        this.isBeingPlaced = true;
        this.pointBeingPlaced = 'center';
        if(centerPoint && radius) {
            this.centerPoint = [centerPoint[0], centerPoint[1]];
            this.radius = radius;
        }
    }
    getRadius(pos: [number, number]): number {
        if(!this.centerPoint) throw Error('should have center already')
        const [c_x, c_y] = this.centerPoint;
        const [p_x, p_y] = pos;
        return Math.sqrt((c_x - p_x)**2 + (c_y - p_y)**2);
}
    placingPoint(pos: [number, number]) {
        switch(this.pointBeingPlaced) {
            case "center":
                this.centerPoint = [pos[0], pos[1]];
                this.pointBeingPlaced = 'radius';
                break;
            case "radius":
                this.radius = this.getRadius(pos)
                this.pointBeingPlaced = 'done';
                this.isBeingPlaced = false;
                break;

        }
    }
}

export class CircleData {
    centerPoint: [number, number];
    radius: number;
    constructor(centerPoint: [number, number],radius: number) {
        this.centerPoint = [centerPoint[0], centerPoint[1]];
        this.radius = radius;
    }
}

export class BezierCurveData {
    startPos: [number, number];
    endPos: [number,number];
    controlPoint1: [number, number];
    controlPoint2: [number, number];

    constructor(
        startPos: [number, number],
        endPos: [number,number],
        controlPoint1: [number, number],
        controlPoint2: [number, number]
    ) {
        this.startPos = [startPos[0], startPos[1]];
        this.endPos = [endPos[0], endPos[1]];
        this.controlPoint1 = [controlPoint1[0], controlPoint1[1]];
        this.controlPoint2 = [controlPoint2[0], controlPoint2[1]];
    }
}

export class PointData {
    point: [number, number]
    constructor(point: [number, number]) {
        this.point = [point[0], point[1]];
    }
}


