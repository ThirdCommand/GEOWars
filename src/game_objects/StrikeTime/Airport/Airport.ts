import { GameObject } from "../../../game_engine/game_object";
import { GameEngine } from "../../../game_engine/game_engine";
import { LineSprite } from "../../../game_engine/line_sprite";
import { type Transform } from "../../../game_engine/transform";
import { type AnimationView } from "../../../AnimationView";
export class Airport extends GameObject {
   
    lineSprite: AirportSprite;
    
    constructor(engine: GameEngine | AnimationView, pos: [number, number]) {
        super(engine);
        this.transform.pos = pos;

        this.addReplayablePhysicsComponent();
        this.addLineSprite(new AirportSprite(this.transform));
    }
    
    update(deltaTime: number) {
        this.animate(deltaTime);
    }

    animate(timeDelta: number) {
       
    }
}


export class AirportSprite extends LineSprite {
    constructor(transform: Transform) {
        super(transform);
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.drawAirport(ctx);
        ctx.restore();
    }

    drawAirport(ctx: CanvasRenderingContext2D) { 
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        const s = 3;
        const pos = this.transform.absolutePosition();
        ctx.translate(pos[0], pos[1]);

        // Piece 1: 
        ctx.beginPath();
        ctx.moveTo(-30 * s, -6 * s);
        ctx.lineTo(30 * s, -6 * s);
        ctx.stroke();

        // Piece 2: 
        ctx.beginPath();
        ctx.moveTo(-30 * s, 6 * s);
        ctx.lineTo(30 * s, 6 * s);
        ctx.stroke();

        // Piece 3: 
        ctx.beginPath();
        ctx.setLineDash([10,20]);
        ctx.moveTo(-30 * s, 0 * s);
        ctx.lineTo(30 * s, 0 * s);
        ctx.stroke();
         ctx.setLineDash([])

        // Piece 4: 
        ctx.beginPath();
        ctx.moveTo(6 * s, -6 * s);
        ctx.lineTo(6 * s, -18 * s);
        ctx.lineTo(3 * s, -20 * s);
        ctx.lineTo(3 * s, -24 * s);
        ctx.lineTo(6 * s, -27 * s);
        ctx.lineTo(12 * s, -27 * s);
        ctx.lineTo(15 * s, -24 * s);
        ctx.lineTo(15 * s, -20 * s);
        ctx.lineTo(12 * s, -18 * s);
        ctx.lineTo(12 * s, -6 * s);
        ctx.stroke();

        // Piece 5: 
        ctx.beginPath();
        ctx.moveTo(0 * s, -6 * s);
        ctx.lineTo(0 * s, -12 * s);
        ctx.bezierCurveTo(
            -1 * s, -15 * s,
            -5 * s, -15 * s,
            -6 * s, -12 * s
        );
        ctx.lineTo(-6 * s, -6 * s);
        ctx.stroke();

        // Piece 6: 
        ctx.beginPath();
        ctx.moveTo(-9 * s, -6 * s);
        ctx.lineTo(-9 * s, -12 * s);
        ctx.bezierCurveTo(
            -10 * s, -15 * s,
            -14 * s, -15 * s,
            -15 * s, -12 * s
        );
        ctx.lineTo(-15 * s, -6 * s);
        ctx.stroke();

        // Piece 7: 
        ctx.beginPath();
        ctx.moveTo(-18 * s, -6 * s);
        ctx.lineTo(-18 * s, -12 * s);
        ctx.bezierCurveTo(
            -19 * s, -15 * s,
            -23 * s, -15 * s,
            -24 * s, -12 * s
        );
        ctx.lineTo(-24 * s, -6 * s);
        ctx.stroke();

        // Piece 8: 
        ctx.beginPath();
        ctx.moveTo(18 * s, -6 * s);
        ctx.lineTo(18 * s, -12 * s);
        ctx.bezierCurveTo(
            19 * s, -15 * s,
            23 * s, -15 * s,
            24 * s, -12 * s
        );
        ctx.lineTo(24 * s, -6 * s);
        ctx.stroke();
    }
}