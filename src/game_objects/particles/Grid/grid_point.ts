import { type AnimationView } from "../../../AnimationView";
import { type  GameEngine } from "../../../game_engine/game_engine";
import {GameObject} from "../../../game_engine/game_object";
import { type Transform } from "../../../game_engine/transform";
export class GridPoint extends GameObject {
    originalPosition: [number,number,number];
    radius: number;
    elasticity: number;
    dampening: number;
    constructor(engine: GameEngine | AnimationView, pos: [number, number, number], cameraTransform: Transform) {
        super(engine);
        this.originalPosition = [0,0,0];
        this.originalPosition[0] = pos[0];
        this.originalPosition[1] = pos[1];
        this.originalPosition[2] = pos[2];
        this.transform.pos = pos;
        this.transform.cameraTransform = cameraTransform;

        this.radius = 2;
        this.elasticity = -0.0025; // force provided to pull particle back into place
        this.dampening = -0.04; // force produced from velocity (allows things to eventually fall to rest)

        this.addPhysicsComponent();
        this.addCollider("General", this, this.radius);
    }

    // let's try moving their original position in the z direction 
    // depending on strength of gravity influence

    update() {
        this.transform.acc[0] += this.transform.vel[0] * this.dampening + (this.transform.pos[0] - this.originalPosition[0]) * this.elasticity;
        this.transform.acc[1] += this.transform.vel[1] * this.dampening + (this.transform.pos[1] - this.originalPosition[1]) * this.elasticity;
        this.transform.acc[2] += this.transform.vel[2] * this.dampening + (this.transform.pos[2] - this.originalPosition[2]) * this.elasticity;

        this.originalPosition[2] = 0;
    }
    animate() {}
}