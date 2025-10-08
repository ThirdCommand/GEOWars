import { DIM_X, DIM_Y } from "../../SpriteEditorScript";
import { LineSprite } from "../line_sprite";
import { Transform } from "../transform";


export class DrawingGridSprite extends LineSprite {
    constructor(transform: Transform) {
        super(transform);
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.absolutePosition();

        ctx.save();
        ctx.translate(pos[0], pos[1]);

        const blurFactor = 0.5;
        
        this.drawXLines(ctx);
        this.drawYLines(ctx)
    
        ctx.restore();
    }

    drawXLines(ctx: CanvasRenderingContext2D) {
        DIM_X;
        DIM_Y;
        const xLineCount = 36;
        const xLineIncrement = DIM_Y / xLineCount;
        for(let i=0;i<xLineCount;i++) {
            ctx.beginPath();
            if(i%3 === 0) {
                ctx.strokeStyle = "#606060";
                if(i === 18) {
                    ctx.strokeStyle = "#808080";
                }
                ctx.setLineDash([]);  
            } else {
                ctx.strokeStyle = "#808080";
                ctx.setLineDash([1, (DIM_X - 121) / 120]);
            }
            ctx.moveTo(0,0 + i * xLineIncrement);
            ctx.lineTo(DIM_X,0 + i * xLineIncrement);
            ctx.stroke();
        }
    }

    drawYLines(ctx: CanvasRenderingContext2D) {
        DIM_X;
        DIM_Y;
        const yLineCount = 20;
        const yLineIncrement = DIM_X / yLineCount;
        for(let i=0;i<yLineCount;i++) {
            if(i ===10) {
                ctx.strokeStyle = "#FFFFFF";
                ctx.beginPath();
                ctx.setLineDash([1, (DIM_Y - 73) / 72]);
                ctx.moveTo(0 + i * yLineIncrement,0);
                ctx.lineTo(0 + i * yLineIncrement,DIM_X,);
                ctx.stroke();
            } else {
                ctx.strokeStyle = "#808080";
                ctx.beginPath();
                ctx.setLineDash([1, (DIM_Y - 73) / 72]);
                ctx.moveTo(0 + i * yLineIncrement,0);
                ctx.lineTo(0 + i * yLineIncrement,DIM_X,);
                ctx.stroke();
            }
        }
        
    }
}