import { GameEngine } from "../../../game_engine/game_engine";
import { GameObject } from "../../../game_engine/game_object";
import { GameScript } from "../../../game_script";
import { type Transform } from "../../../game_engine/transform";
// import { Sound } from "../../../game_engine/sound";
// import { Util } from "../../../game_engine/util";

export class AlienShip extends GameObject {
    radius: number;
    points: number;
    chaseSpeed: number;
    chaseAcceleration: number;
    lineSprite: AlienShipSprite;

    constructor(engine: GameEngine | AnimationView, pos: [number, number, number?], velocity: [number, number]) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.transform.vel[0] = velocity[0];
        this.transform.vel[1] = velocity[1];
        this.radius = 4;
        this.points = 120;
        this.chaseSpeed = 3.5;
        this.chaseAcceleration = 0.125 / 3;
        this.addLineSprite(new AlienShipSprite(this.transform));
        this.addCollider("General", this, this.radius);
        this.addPhysicsComponent();
    }

    exist(){}

    // change to acceleration
   
    animate() {}
    update() {
        // console.log(this.transform.pos)
        this.chase();

        if (GameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            this.bounce();
        }
    }

    bounce() {
        GameScript.bounce(this.transform, this.radius);
    }

    chase() {
        // take current velocity
        // find ideal velocity using max speed, current position, and ship position
        // get unit vector of current position - ship position
        // take difference
        // apply acceleration in that direction

        // get dV
        //    mV => max speed in the direction it should be moving
        //    Vo => current velocity
        //    dV =  mV - Vo
        //    alpha = dV angle

        const speed = this.chaseSpeed;

        const shipPos = this.transform.cameraTransform.pos; // will need this to grab the camera's object in the future
        const pos = this.transform.absolutePosition();
        const deltaPosition = [shipPos[0] - pos[0], shipPos[1] - pos[1]];
        let chaseDirection = Math.atan2(deltaPosition[1], deltaPosition[0]);

        // Math.atan2 was giving me negative numbers.... when it shouldn't
        if (chaseDirection < 0) {
            chaseDirection = 2 * Math.PI + chaseDirection;
        }
        // console.log(chaseDirection / (2 * Math.PI) * 360)
        const Vm = [speed * Math.cos(chaseDirection), speed * Math.sin(chaseDirection)];
        const Vo = this.transform.vel;

        const dV = [Vm[0] - Vo[0], Vm[1] - Vo[1]];
        const accelerationDirection = Math.atan2(dV[1], dV[0]);
        this.transform.acc[0] += this.chaseAcceleration * Math.cos(accelerationDirection);
        this.transform.acc[1] += this.chaseAcceleration * Math.sin(accelerationDirection);
        // console.log(this.transform.acc)
    }

}

import { LineSprite, Spawnable } from "../../../game_engine/line_sprite";
import { AnimationView } from "../../../AnimationView";

export class AlienShipSprite extends LineSprite implements Spawnable {
    spawning: boolean;
    spawningScale: number;
    radius: number;
    constructor(transform: Transform) {
        super(transform);
        this.radius = 4;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        const r = 180;
        const g = 180;
        const b = 255;

        ctx.save();

        // ctx.strokeStyle = "#4286f4";
        // ctx.lineWidth = 4;
        // const blurFactor = 0.5;

        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 4;
        this.drawAlienShip(ctx, this.radius);
        ctx.lineWidth = 3;
        this.drawAlienShip(ctx, this.radius);
        ctx.lineWidth = 2;
        this.drawAlienShip(ctx, this.radius);
        ctx.lineWidth = 1;
        this.drawAlienShip(ctx, this.radius);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 0.75;
        this.drawAlienShip(ctx, this.radius);
        ctx.restore();
    }

    drawAlienShip(ctx: CanvasRenderingContext2D, radius: number) {
        ctx.beginPath();
        const pos = this.transform.absolutePosition();
        ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, true);
        ctx.stroke();
    }
}