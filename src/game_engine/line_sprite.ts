import { type Transform } from "./transform";

export abstract class LineSprite {
    transform: Transform;
    zoomScaling: number;
    spawningScale: number;
    visible: boolean;
    constructor(transform: Transform) {
        this.transform = transform;
        this.zoomScaling = 1;
        this.visible = true;
    }

    makeVisible() {
        this.visible = true;
    }
    makeInvisible() {
        this.visible = false;
    }
    // abstract functions
    abstract draw(ctx: CanvasRenderingContext2D): void;

}

export interface Spawnable {
    spawning: boolean;
    spawningScale: number;
}
