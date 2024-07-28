import { type AnimationView } from "../../AnimationView";
import { type GameEngine } from "../../game_engine/game_engine";
import {  GameObject } from "../../game_engine/game_object";
import {  LineSprite, Spawnable } from "../../game_engine/line_sprite";
import { type Transform } from "../../game_engine/transform";
export class RandomRandom extends GameObject {
    constructor(engine: GameEngine | AnimationView, pos: [number, number]) {
        super(engine);
        this.transform.pos = pos;
        this.addLineSprite(new RandomRandomSprite(this.transform));
    }
    update(){}
}
export class RandomRandomSprite extends LineSprite implements Spawnable{
    widthHeight: [number, number];
    spawningScale: number;
    spawning: boolean;
    constructor(transform: Transform) {
        super(transform);
        this.widthHeight = [20,20];
        this.spawningScale = 1;
        // center is in the corning since I don't want to deal   
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.visible) return;
        const pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);

        this.drawRandomRandom(ctx);
        
        ctx.restore();
    }

    drawRandomRandom(ctx: CanvasRenderingContext2D) {
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