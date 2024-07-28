import { type AnimationView } from "../../AnimationView";
import { type GameEngine } from "../../game_engine/game_engine";
import {GameObject} from "../../game_engine/game_object";
import {LineSprite} from "../../game_engine/line_sprite";
import { type Transform } from "../../game_engine/transform";

type SandwichSpriteParameters = {
    width: number;
    height: number;
}

type SandwichAnimationStates = {
    squishing: boolean;
    waiting: boolean;
    waitTime: number;
    timeToWait: number;
}
export class LeftSandwich extends GameObject {
    width: number;
    height: number;
    animationStates: SandwichAnimationStates;
    spriteParameters: SandwichSpriteParameters;
    lineSprite: LeftSandwichSprite;

    constructor(engine: GameEngine, pos: [number, number]) {
        super(engine);
        this.transform.pos = pos;
        this.width = 25;
        this.height = -22;

        this.animationStates = {
            squishing: true,
            waiting: false,
            waitTime: 0,
            timeToWait: 3000,
        };
        
        this.spriteParameters = {
            width: this.width,
            height: this.height,
        };

        this.addLineSprite(new LeftSandwichSprite(this.transform, this.spriteParameters));
    }
    update() {}

    animate(deltaTime: number) {
        const time = deltaTime / NORMAL_FRAME_TIME_DELTA / 2;

        if(this.animationStates.waiting) {
            this.animationStates.waitTime += deltaTime;
            if(this.animationStates.waitTime >= this.animationStates.timeToWait) {
                this.animationStates.waiting = false;
                this.animationStates.waitTime = 0;
            }
        } else {
            if (this.animationStates.squishing){
                this.spriteParameters.width -= time;
                this.spriteParameters.height -= time;
            } else {
                this.spriteParameters.width += time;
                this.spriteParameters.height += time;
            }
    
            if(this.spriteParameters.width <= this.width * 0.8) {
                this.animationStates.squishing = false;
            }
    
            if(this.spriteParameters.width >= this.width) {
                this.animationStates.squishing = true;
                this.animationStates.waiting = true;
                this.spriteParameters.width = this.width;
                this.spriteParameters.height = this.height;
            }
        }

    }

    exist() {
        this.addCollider("General", this, 5);
    }
}

export class LeftSandwichSprite extends LineSprite {
    spriteParameters: SandwichSpriteParameters;
    bunColor: string;
    crimsonRed: string;
    brightGreen: string;
    creamWhite: string;
    fucia: string;
    cyan: string;
    indigo: string;
    constructor(transform: Transform, spriteParameters: SandwichSpriteParameters) {
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

        this.drawLeftSandwich(ctx);
        ctx.restore();
    }

    drawLeftSandwich(ctx: CanvasRenderingContext2D) {
        const {width, height} = this.spriteParameters;
        
        ctx.fillStyle = this.bunColor;
        ctx.strokeStyle = this.bunColor;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(width / 2, height / 2 - 2/9 * height);
        ctx.lineTo(width / 2, height / 2);
        //rounded corners on the left side, square on the right
        ctx.lineTo(-width / 2 + 2/9 * width, height / 2);

        const curvePointTopLeftTop = [-width / 2 + 1/9 * width, height / 2];
        const curvePointTopLeftBottom = [-width / 2, height / 2 - 1/9 * height];
        ctx.bezierCurveTo(curvePointTopLeftTop[0], curvePointTopLeftTop[1], curvePointTopLeftBottom[0], curvePointTopLeftBottom[1], -width / 2, height / 2 - 2/9 * height);
        
        ctx.moveTo(-width / 2, -height / 2 + 2/9 * height);
        const curvePointBottomLeftTop = [-width / 2, -height / 2 + 1/9 * height];
        const curvePointBottomLeftBottom = [-width / 2 + 1/9 * width, -height / 2];
        ctx.bezierCurveTo(curvePointBottomLeftTop[0], curvePointBottomLeftTop[1], curvePointBottomLeftBottom[0], curvePointBottomLeftBottom[1], -width / 2 + 2/9 * width, -height / 2);

        ctx.lineTo(width / 2, -height / 2);
        ctx.lineTo(width / 2, -height / 2 + 2/9 * height);
        ctx.stroke();

        ctx.lineWidth = 0.75;
        ctx.moveTo(width / 2, height / 2 - 2/9 * height);
        ctx.lineTo(-width / 2, height / 2 - 2/9 * height);
        ctx.stroke();

        ctx.moveTo(width / 2, -height / 2 + 2/9 * height);
        ctx.lineTo(-width / 2, -height / 2 + 2/9 * height);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.strokeStyle = this.crimsonRed;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2 - 3/9 * height);
        ctx.lineTo(-width / 2, height / 2 - 3/9 * height);
        ctx.stroke();

        ctx.strokeStyle = this.brightGreen;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2 - 4/9 * height);
        ctx.lineTo(-width / 2, height / 2 - 4/9 * height);
        ctx.stroke();

        ctx.strokeStyle = this.fucia;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2 - 5/9 * height);
        ctx.lineTo(-width / 2, height / 2 - 5/9 * height);
        ctx.stroke();

        
        ctx.strokeStyle = this.cyan;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2 - 6/9 * height);
        ctx.lineTo(-width / 2, height / 2 - 6/9 * height);
        ctx.stroke();

    }

}

export class RightSandwich extends GameObject {
    spriteParameters: SandwichSpriteParameters;
    width: number;
    height: number;
    animationStates: SandwichAnimationStates;
    lineSprite: RightSandwichSprite;
    constructor(engine: GameEngine | AnimationView, pos: [number, number]) {
        super(engine);
        this.transform.pos = pos;
        this.width = 25;
        this.height = -22;

        this.animationStates = {
            squishing: true,
            waiting: false,
            waitTime: 0,
            timeToWait: 3000,
        };
        
        this.spriteParameters = {
            width: this.width,
            height: this.height,
        };

        this.addLineSprite(new RightSandwichSprite(this.transform, this.spriteParameters));
    }
    update(){}

    animate(deltaTime: number) {
        const time = deltaTime / NORMAL_FRAME_TIME_DELTA / 2;

        if(this.animationStates.waiting) {
            this.animationStates.waitTime += deltaTime;
            if(this.animationStates.waitTime >= this.animationStates.timeToWait) {
                this.animationStates.waiting = false;
                this.animationStates.waitTime = 0;
            }
        } else {
            if (this.animationStates.squishing){
                this.spriteParameters.width -= time;
                this.spriteParameters.height -= time;
            } else {
                this.spriteParameters.width += time;
                this.spriteParameters.height += time;
            }
    
            if(this.spriteParameters.width <= this.width * 0.8) {
                this.animationStates.squishing = false;
            }
    
            if(this.spriteParameters.width >= this.width) {
                this.animationStates.squishing = true;
                this.animationStates.waiting = true;
                this.spriteParameters.width = this.width;
                this.spriteParameters.height = this.height;
            }
        }

    }

    exist() {
        this.addCollider("General", this, 5);
    }
}

export class RightSandwichSprite extends LineSprite {
    spriteParameters: SandwichSpriteParameters;
    bunColor: string;
    crimsonRed: string;
    brightGreen: string;
    creamWhite: string;
    fucia: string;
    cyan: string;
    indigo: string;
    constructor(transform: Transform, spriteParameters: SandwichSpriteParameters) {
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

        this.drawRightSandwich(ctx);
        ctx.restore();
    }

    drawRightSandwich(ctx: CanvasRenderingContext2D) {
        const {width, height} = this.spriteParameters;
        
        ctx.fillStyle = this.bunColor;
        ctx.strokeStyle = this.bunColor;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(-width / 2, height / 2 - 2/9 * height);
        ctx.lineTo(-width / 2, height / 2);
        //rounded corners on the left side, square on the right
        ctx.lineTo(width / 2 + 2/9 * -width, height / 2);

        const curvePointTopLeftTop = [width / 2 + 1/9 * -width, height / 2];
        const curvePointTopLeftBottom = [width / 2, height / 2 - 1/9 * height];
        ctx.bezierCurveTo(curvePointTopLeftTop[0], curvePointTopLeftTop[1], curvePointTopLeftBottom[0], curvePointTopLeftBottom[1], width / 2, height / 2 - 2/9 * height);
        
        ctx.moveTo(width / 2, -height / 2 + 2/9 * height);
        const curvePointBottomLeftTop = [width / 2, -height / 2 + 1/9 * height];
        const curvePointBottomLeftBottom = [width / 2 + 1/9 * -width, -height / 2];
        ctx.bezierCurveTo(curvePointBottomLeftTop[0], curvePointBottomLeftTop[1], curvePointBottomLeftBottom[0], curvePointBottomLeftBottom[1], width / 2 + 2/9 * -width, -height / 2);

        ctx.lineTo(-width / 2, -height / 2);
        ctx.lineTo(-width / 2, -height / 2 + 2/9 * height);
        ctx.stroke();

        ctx.lineWidth = 0.75;
        ctx.moveTo(-width / 2, height / 2 - 2/9 * height);
        ctx.lineTo(width / 2, height / 2 - 2/9 * height);
        ctx.stroke();

        ctx.moveTo(-width / 2, -height / 2 + 2/9 * height);
        ctx.lineTo(width / 2, -height / 2 + 2/9 * height);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.strokeStyle = this.crimsonRed;
        ctx.beginPath();
        ctx.moveTo(-width / 2, height / 2 - 3/9 * height);
        ctx.lineTo(width / 2, height / 2 - 3/9 * height);
        ctx.stroke();

        ctx.strokeStyle = this.brightGreen;
        ctx.beginPath();
        ctx.moveTo(-width / 2, height / 2 - 4/9 * height);
        ctx.lineTo(width / 2, height / 2 - 4/9 * height);
        ctx.stroke();

        ctx.strokeStyle = this.fucia;
        ctx.beginPath();
        ctx.moveTo(-width / 2, height / 2 - 5/9 * height);
        ctx.lineTo(width / 2, height / 2 - 5/9 * height);
        ctx.stroke();

        
        ctx.strokeStyle = this.cyan;
        ctx.beginPath();
        ctx.moveTo(-width / 2, height / 2 - 6/9 * height);
        ctx.lineTo(width / 2, height / 2 - 6/9 * height);
        ctx.stroke();

    }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;