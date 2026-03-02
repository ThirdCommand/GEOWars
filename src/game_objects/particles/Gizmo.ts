// line gizmo
// dot gizmo
// has a location

import { GameObject } from "../../game_engine/game_object";
import { GameEngine } from "../../game_engine/game_engine";
import { LineSprite, Spawnable } from "../../game_engine/line_sprite";
import { Transform } from "../../game_engine/transform";
import { type AnimationView } from "../../AnimationView";

export class DotGizmo extends GameObject {
    radius: number;
    lineSprite: DotGizmoSprite;


    constructor(engine: GameEngine | AnimationView, pos: [number, number], radius: number, color: string) {
        super(engine);
        this.transform.pos = pos;
        this.radius = radius;

        this.addLineSprite(new DotGizmoSprite(this.transform, radius, color));
    }
    update() {}

    animate(timeDelta: number) {
    }
}

export class DotGizmoSprite extends LineSprite {
    radius: number;
    color: string;
    constructor(transform: Transform, radius: number, color: string) {
        super(transform);
        this.radius = radius;
        this.color = color
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.drawDotGizmo(ctx);
        ctx.restore();
    }

    drawDotGizmo(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        const radius = this.radius;
        
        const pos = this.transform.pos;
        ctx.fillStyle = this.color

        ctx.beginPath();
        ctx.arc(pos[0], pos[1], radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill()
        ctx.stroke();
    }
}


export class LineGizmo extends GameObject {
    radius: number;
    lineSprite: LineGizmoSprite;
    endPos: [number, number];


    constructor(engine: GameEngine | AnimationView, startPos: [number, number], endPos: [number, number], color?: string) {
        super(engine);
        this.transform.pos = startPos;
        this.endPos = endPos

        this.addLineSprite(new LineGizmoSprite(this.transform, this.endPos, color));
    }
    update() {}

    animate(timeDelta: number) {
    }
}

export class LineGizmoSprite extends LineSprite {
    w: number;
    endPos: [number, number]
    color: string | undefined;
    constructor(transform: Transform, endPos: [number, number], color?: string) {
        super(transform);
        this.endPos = endPos
        this.color = color
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.drawLineGizmo(ctx);
        ctx.restore();
    }

    drawLineGizmo(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.color || "#FFFFFF";
        // ctx.setLineDash([4, 10]);
        ctx.lineWidth = 1;
        
        const pos = this.transform.pos;
        const endPos = this.endPos;
        ctx.translate(pos[0], pos[1]);
        ctx.beginPath();
        ctx.lineTo(endPos[0], endPos[1]);
        ctx.stroke();
    }
}
export class ArcGizmo extends GameObject {
    radius: number;
    lineSprite: ArcGizmoSprite;
    endPos: [number, number];


    constructor(engine: GameEngine | AnimationView, centerPoint: [number, number], radius: number, startAngle: number, endAngle: number, isRightTurn: boolean){
        super(engine);
        this.transform.pos = centerPoint;

        this.addLineSprite(new ArcGizmoSprite(this.transform, radius, startAngle, endAngle, isRightTurn));
    }
    update() {}

    animate(timeDelta: number) {
    }
}

export class ArcGizmoSprite extends LineSprite {
    radius: number;
    startAngle: number;
    endAngle: number;
    isTurningRight: boolean;

    constructor(transform: Transform, radius: number, startAngle: number, endAngle: number, isRightTurn: boolean) {
        super(transform);

        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.isTurningRight = isRightTurn;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.drawDotGizmo(ctx);
        ctx.restore();
    }

    drawDotGizmo(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "#FFFFFF";
        ctx.setLineDash([4, 10]);
        ctx.lineWidth = 1;
        
        const pos = this.transform.pos;
        const radius = this.radius;
        const endAngle = this.endAngle;
        const startAngle = this.startAngle;
        const isTurningRight = this.isTurningRight;

        ctx.beginPath();
        ctx.arc(pos[0], pos[1], radius, startAngle, endAngle, !isTurningRight);
        ctx.stroke();
    }
}