// this is a type of sprite for ui elements

export class UILineSprite {
    // 
    constructor(UITransform) {
        this.UITransform = UITransform;
        this.zoomScaling = 1;
    }
    // abstract functions
    draw(ctx) {
        // the context position is changed by the ui game engine
        const pos = [0,0];
        // if an element is being dragged, a ghost element replaces is for this drawing array
        // the part that is being dragged will be handled by a separate drawing function

        // allowing for drag and drop, and scrolling etc
        const angle = this.transform.absoluteAngle();
        this.drawFunction(ctx, pos, angle);
    }
    drawFunction(ctx, pos) {
        // abstract
        
    }
}