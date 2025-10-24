import { GameObject } from "../../../game_engine/game_object";
import { GameEngine } from "../../../game_engine/game_engine";
import { LineSprite } from "../../../game_engine/line_sprite";
import { type Transform } from "../../../game_engine/transform";
import { type AnimationView } from "../../../AnimationView";

export class EndingLine extends GameObject {
    lineSprite: EndingLineSprite;
    endLineXPosition: number;
    
    constructor(engine: GameEngine | AnimationView, xPosition: number) {
        super(engine);
        this.transform.pos = [xPosition,0];
        this.endLineXPosition = xPosition;
        this.addReplayablePhysicsComponent();
        this.addLineSprite(new EndingLineSprite(this.transform));
    }
    
    update(deltaTime: number) {
    }

    animate(timeDelta: number) {
    }
}


export class EndingLineSprite extends LineSprite {

    constructor(transform: Transform) {
        super(transform);
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.drawEndingLine(ctx);
        ctx.restore();
    }

    drawEndingLine(ctx: CanvasRenderingContext2D) { 
        ctx.strokeStyle = "#63b2e3ff";
        ctx.lineWidth = 2;
        const pos = this.transform.absolutePosition();
        ctx.setLineDash([10,20]);
        ctx.moveTo(pos[0], -20000);
        ctx.lineTo(pos[0], 20000);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}