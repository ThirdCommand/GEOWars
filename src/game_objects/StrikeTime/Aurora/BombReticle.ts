import { AnimationView } from "../../../AnimationView";
import { Color } from "../../../game_engine/color";
import { type GameEngine } from "../../../game_engine/game_engine";
import { GameObject } from "../../../game_engine/game_object";
import { LineSprite } from "../../../game_engine/line_sprite";
import { Transform } from "../../../game_engine/transform";
import { getNumberFromRange } from "../../../game_engine/util";
import { Particle } from "../../particles/particle";


export interface BombTiming {
    refreshTime: number;
    reloadTime: number;
}
// If I had two it could be interesting to have to account for that
// or maybe it would just be fucking annoying lol
/*
        X
        |
        |
        |
        ^
     /     \
    /       \
   / _    _  \

   X
   |
   |
   |    
   |    ^
     /     \
    /       \
   / _    _  \

            X
            |
            |
            |
        ^   |
     /     \
    /       \
   / _    _  \

*/

export class BombReticle extends GameObject {

    positionOnPlane: [number, number];
    positionLength: number;
    positionAngle: number;
    length: number;
    visible: boolean;
    bombTiming: BombTiming;
    lineSprite: BombReticleSprite;
    reticlePosition: [number, number];
    bombLandPosition: number;

    // the position of the reticle is from the origin of the plane
    constructor(engine: GameEngine | AnimationView, transform: Transform, position: [number, number], length: number) {
        super(engine);
        this.transform = transform;
        this.positionLength = Math.sqrt((position[0])**2 + (position[1])**2);
        this.positionAngle = (position[0] === position[1] && position[0] === 0) ? Math.PI/2 : Math.atan2(position[1], position[0]);
        this.reticlePosition = this.getReticlePosition()
        this.bombLandPosition = length;
        this.addLineSprite(new BombReticleSprite(this.transform, this.reticlePosition, length))

        this.length = length;
    }   

    setVisibility(isVisible = true) {
        this.lineSprite.isVisible = isVisible;
    }

    getReticlePosition(): [number, number] {
        const angle = this.transform.angle;
        return [
            this.transform.pos[0] - this.positionLength * Math.cos(angle + this.positionAngle),
            this.transform.pos[1] - this.positionLength * Math.sin(angle + this.positionAngle)
        ]
    }
    
    animate() {}

    update(deltaTime: number) {
        const reticleLocation = this.getReticlePosition();
        this.reticlePosition[0] = reticleLocation[0];
        this.reticlePosition[1] = reticleLocation[1];
    }
}

export class BombReticleSprite extends LineSprite {
    length: number;
    isVisible: boolean;
    reticlePosition: [number, number];
    // origin is where the reticle starts
    constructor(transform: Transform, reticlePosition: [number, number], length: number) {
        super(transform);
        this.length = length;
        this.reticlePosition = reticlePosition;
        this.isVisible = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.isVisible) return;
        const pos = this.reticlePosition;
        
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle + -Math.PI / 2);
        this.drawReticle(ctx);
        ctx.restore();
        // draw dotted line from front of plane
    }

    drawReticle(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.setLineDash([4, 10]);
        ctx.strokeStyle = '#FFFFFF'
        ctx.moveTo(0,0);
        ctx.lineTo(0, this.length);
        ctx.stroke();
        ctx.translate(0, this.length);
        ctx.setLineDash([6, 2]);
        ctx.beginPath();
       
        ctx.arc(0,0, 10, 0, Math.PI * 2);
        ctx.stroke();
        
    }
}


