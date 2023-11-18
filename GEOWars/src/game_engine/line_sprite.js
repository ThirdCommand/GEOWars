export class LineSprite {
    constructor(transform) {
        this.transform = transform;
        // this.drawFunction = draw
        this.zoomScaling = 1;
    }

    draw(ctx) {
        const pos = this.transform.absolutePosition();
        const angle = this.transform.abosluteAngle();
        this.drawFunction(ctx, pos, angle);
    }
    drawFunction(ctx, pos, angle) {}
}
