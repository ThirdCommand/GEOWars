import { GameObject } from "../../../game_engine/game_object";
import { Sound } from "../../../game_engine/sound";
import { Util } from "../../../game_engine/util";
import { AlienShipSprite } from "./alien_ship_sprite";

export class AlienShip extends GameObject {
    constructor(engine, pos, velocity, shipTransform) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.transform.vel[0] = velocity[0];
        this.transform.vel[1] = velocity[1];

        this.shipTransform = shipTransform;
        this.radius = 4;
        this.points = 120;
        this.chaseSpeed = 3.5;
        this.chaseAcceleration = 0.125 / 3;
        this.addLineSprite(new AlienShipSprite(this.transform));
        this.addCollider("General", this, this.radius);
        this.addPhysicsComponent();
    }

    // change to acceleration
   

    update(timeDelta) {
        // console.log(this.transform.pos)
        this.chase();

        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            this.bounce();
        }
    }

    bounce() {
        this.gameEngine.gameScript.bounce(this.transform, this.radius);
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

        const shipPos = this.shipTransform.absolutePosition();
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

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;