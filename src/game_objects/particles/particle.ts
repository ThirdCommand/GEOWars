// direction of the particle is the direction of the velocity vector
// the direction of the 
// the particle dies when the hue reaches 0 

// random movement angle created
// initial speed (scale)
// vel = VectorMath.vectorCartesian(angle, scale)
//
// 

// because the particle is drawn the correct way now, 
// from position out, the particle's center is located 
// far from the center of the particle

import {VectorMath} from "../../game_engine/util";
import {GameObject} from "../../game_engine/game_object";
import { GameScript } from "../../game_script";

type WallHitDirection = "BOTTOM" | "RIGHT" | "TOP" | "LEFT";

export class Particle extends GameObject{
    color: Color;
    movementAngle: [number, number];
    radius: number;
    explosionDeceleration: number;
    dampening: number;
    lineSprite: ParticleSprite;

    constructor(engine: GameEngine | AnimationView, pos: [number, number, number?], initialSpeed: number, color: Color, wallHit?: WallHitDirection) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.transform.pos[2] = pos[2];
        
        if(engine instanceof GameEngine) {
            this.transform.cameraTransform = engine.gameScript.ship.cameraTransform;
        }
        this.color = color;
        this.movementAngle = this.createMovementAngle(wallHit); // [plane, out of plane]
        this.transform.movementAngle = this.movementAngle;
        this.transform.vel = VectorMath.vector3Cartesian(this.movementAngle, initialSpeed);
        this.radius = 3;
        this.explosionDeceleration = -0.004; // in the direction the particle is moving
        this.transform.acc = VectorMath.vector3Cartesian(this.movementAngle, -this.explosionDeceleration);
        this.addLineSprite(new ParticleSprite(this.transform, this.color));
        this.addPhysicsComponent();
        this.dampening = -0.045;
        // this.addCollider("General", this, this.radius)
    }

    createMovementAngle(wallHit: WallHitDirection): [number, number] {
        if (!wallHit){ 
            return [(Math.random() * Math.PI * 2), Math.random() * Math.PI * 2];
        } else {
            if (wallHit === "BOTTOM") {
                // need to give second angle still
                return [Math.random() * Math.PI + Math.PI, Math.random() * Math.PI * 2];
            } else if (wallHit === "RIGHT") {
                return [Math.random() * Math.PI + Math.PI / 2, Math.random() * Math.PI * 2];
            } else if (wallHit === "TOP") {
                return [Math.random() * Math.PI, Math.random() * Math.PI * 2];
            } else if (wallHit === "LEFT") {
                return [Math.random() * Math.PI + 3 * Math.PI / 2, Math.random() * Math.PI * 2];
            }
        }
    }
  

    update(deltaTime: number){
        // this.lineSprite.rectLength -= 0.01 * deltaTime;
        this.lineSprite.color.a -= 0.0005 * deltaTime;
        // this.lineSprite.hue < 0.06 ||
        if ( this.lineSprite.rectLength < 0.25 || ((Math.abs(this.transform.vel[0]) + Math.abs(this.transform.vel[1]) + Math.abs(this.transform.vel[2])) < 0.15)) {
            this.remove();
        }
        this.checkBounds();
        // acc is influenced by singularities, then changed to usual acc
        this.movementAngle = [Math.atan2(this.transform.vel[1], this.transform.vel[0]), Math.atan2(this.transform.vel[2], Math.sqrt(this.transform.vel[0] ** 2 + this.transform.vel[1] ** 2)/this.transform.vel[2])];
        // this.transform.acc = VectorMath.vector3Cartesian(this.movementAngle, -this.explosionDeceleration);
        this.transform.acc[0] += this.transform.vel[0] * this.dampening;
        this.transform.acc[1] += this.transform.vel[1] * this.dampening;
        this.transform.acc[2] += this.transform.vel[2] * this.dampening;
    }
    
    checkBounds() {
        if (GameScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
            this.remove();
        }
    }

}

import { LineSprite } from "../../game_engine/line_sprite";
import { GameEngine } from "../../game_engine/game_engine";
import { Color } from "../../game_engine/color";
import { Transform } from "../../game_engine/transform";
import { AnimationView } from "../../AnimationView";
// import { 
//     VectorMath
// } from "../../../game_engine/util";

export class ParticleSprite extends LineSprite {
    rectLength: number;
    rectWidth: number;
    color: Color;

    constructor(transform: Transform, color: Color) {
        super(transform);
        this.rectLength = 15;
        this.rectWidth = 2;
        this.color = color;
        // test
    }

    drawTwoDimensionNoParallax(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.absolutePosition();
        const vel = this.transform.absoluteVelocity();
        // const l = this.rectLength;
        const w = this.rectWidth;
        const movementDirection = Math.atan2(vel[0], -vel[1]);

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(movementDirection - Math.PI);

        ctx.beginPath();
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = w;

        ctx.moveTo(0, 0); //1
        // ctx.lineTo(0, l * Math.cos(this.transform.movementAngle[1])); //2
        ctx.beginPath();
        const r = 1;
        ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
        ctx.fill();
        // 
        ctx.closePath();
        // ctx.stroke();
        ctx.restore();
    }

    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.absolutePosition();
        const r = this.transform.absoluteLength(3);
        const vel = this.transform.absoluteVelocity();
        // const l = this.rectLength;
        // const w = this.transform.absoluteLength(this.rectWidth);

        const movementDirection = Math.atan2(vel[0], -vel[1]);

        // calculate x, y, z of second point of line
        // use same calc, then add to current pos to get second point
        // const point2Position = VectorMath.vector3Add(this.transform.pos, VectorMath.vector3Cartesian(this.transform.movementAngle, l));

        // const Xc = this.transform.cameraTransform.pos[0];
        // const Yc = this.transform.cameraTransform.pos[1];
        // const Zc = this.transform.cameraTransform.pos[2];
        // const X1 = this.transform.pos[0];
        // const Y1 = this.transform.pos[1];
        // const Z1 = this.transform.pos[2];

        // const X2 = point2Position[0];
        // const Y2 = point2Position[1];
        // const Z2 = point2Position[2];

        // const Yp1 = Yc + (Y1-Yc)/(Z1-Zc) * (0 - Zc);
        // const Xp1 = Xc + (X1-Xc)/(Z1-Zc) * (0 - Zc);

        // const Yp2 = Yc + (Y2-Yc)/(Z2-Zc) * (0 - Zc);
        // const Xp2 = Xc + (X2-Xc)/(Z2-Zc) * (0 - Zc);

        

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(movementDirection - Math.PI);
        ctx.strokeStyle  = this.color.evaluateColor();
        ctx.fillStyle = this.color.evaluateColor();

        // the length and width should be closer as the particle gets closer to the camera
        
        ctx.fillRect(0,0,r, r*3);
        // ctx.beginPath();
        // ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
        // ctx.fill();
        // ctx.strokeStyle = this.color.evaluateColor();
        // ctx.lineWidth = w;

        // ctx.moveTo(Xp1, Yp1); //1
        // ctx.lineTo(Xp2, Yp2); //2
        // ctx.stroke();

        ctx.restore();
    }
}
