import { GameObject } from "../../game_engine/game_object";
import { LineSprite } from "../../game_engine/line_sprite";
export class RandomRandom extends GameObject {
    constructor(engine, pos) {
        super(engine);
        this.transform.pos = pos;
        this.addLineSprite(new RandomRandomSprite(this.transform));
    }
}
export class RandomRandomSprite extends LineSprite {
    constructor(transform) {
        super(transform);
        this.widthHeight = [20,20];
        this.spawningScale = 1;
        // center is in the corning since I don't want to deal   
    }

    draw(ctx) {
        if(!this.visible) return;
        const pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);

        this.drawRandomRandom(ctx, this.radius);
        
        ctx.restore();
    }

    drawRandomRandom(ctx) {
        const h = this.widthHeight[1] * this.spawningScale;
        const w = this.widthHeight[0] * this.spawningScale;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(-w/2,-h/2);
        ctx.lineTo(w/2,-h/2);
        ctx.lineTo(w/2,h/2);
        ctx.lineTo(-w/2,h/2);
        ctx.closePath();
        ctx.stroke();
    }
}