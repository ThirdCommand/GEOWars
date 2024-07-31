import { type AnimationView } from "../../AnimationView";
import { type GameEngine } from "../../game_engine/game_engine";
import {GameObject} from "../../game_engine/game_object";
import {LineSprite} from "../../game_engine/line_sprite";
import { type Transform } from "../../game_engine/transform";

type PlateSpriteParameters = {
    width: number;
    height: number;
    cornerRadius: number;
};

export class Plate extends GameObject {
    width: number;
    height: number;
    lineSprite: PlateSprite;
    spriteParameters: PlateSpriteParameters;
    constructor(engine: GameEngine | AnimationView, pos: [number, number]) {
        super(engine);
        this.transform.pos = pos;
        this.width = 75;
        this.height = 75;
        
        this.spriteParameters = {
            width: this.width,
            height: this.height,
            cornerRadius: 1/4 * this.width
        };

        this.addLineSprite(new PlateSprite(this.transform, this.spriteParameters));
    }
    update(){}

    exist() {
        this.addCollider("General", this, 5);
    }
}

export class PlateSprite extends LineSprite {
    spriteParameters: PlateSpriteParameters;
    bunColor: string;
    crimsonRed: string;
    brightGreen: string;
    creamWhite: string;
    fucia: string;
    cyan: string;
    indigo: string;
    constructor(transform: Transform, spriteParameters: PlateSpriteParameters) {
        super(transform);
        this.spriteParameters = spriteParameters;
        this.spawningScale = 1;
        this.transform = transform;
        this.bunColor = "#CD7F32";
        this.crimsonRed = "#DC143C";
        this.brightGreen = "#AAFF00";
        this.creamWhite = "#FFFDD0";
        this.fucia = "#FF00FF";
        this.cyan = "#00FFFF";
        this.indigo = "#00FFFF";
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.absolutePosition();

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.absoluteAngle());

        this.drawPlate(ctx, this.spriteParameters);
        ctx.restore();
    }

    drawPlate(ctx: CanvasRenderingContext2D, spriteParameters: PlateSpriteParameters) {
        const {width: w, height: h, cornerRadius: r} = spriteParameters;
        
        // ctx.fillStyle = this.bunColor;
        ctx.strokeStyle = "#708090"; // slate grey
        ctx.beginPath();
        ctx.lineWidth = 2; 
        ctx.moveTo(w / 2, h / 2 - r); // 1
        ctx.lineTo(w / 2, -h / 2 + r); // 2
        ctx.arcTo(w / 2, -h / 2, w / 2 - r, -h / 2, r); // 3
        ctx.lineTo(-w / 2 + r, -h / 2); // 4
        ctx.arcTo(-w / 2, -h / 2, -w / 2, -h / 2 + r, r); // 5
        ctx.lineTo(-w / 2, h / 2 - r); // 6
        ctx.arcTo(-w / 2, h / 2, -w / 2 + r, h / 2, r); // 7
        ctx.lineTo(w / 2 - r, h / 2); // 8
        ctx.arcTo(w / 2, h / 2, w / 2, h / 2 - r, r); // 1
        ctx.stroke();

        ctx.moveTo(w / 2, -h / 2 + r);
        ctx.bezierCurveTo(
            w / 2, -h / 2, 
            w / 2, -h / 2,
            w / 2 - r, -h / 2
        );
        ctx.stroke();

        ctx.moveTo(-w / 2 + r, -h / 2);
        ctx.bezierCurveTo(
            -w / 2, -h / 2,
            -w / 2, -h / 2,
            -w / 2, -h / 2 + r
        );
        ctx.stroke();

        ctx.moveTo(-w / 2, h / 2 - r);
        ctx.bezierCurveTo(
            -w / 2, h / 2,
            -w / 2, h / 2,
            -w / 2 + r, h / 2
        );
        ctx.stroke();

        ctx.moveTo(w / 2 - r, h / 2);
        ctx.bezierCurveTo(
            w / 2, h / 2,
            w / 2, h / 2,
            w / 2, h / 2 - r
        );
        ctx.stroke();

        

        

    }

}
