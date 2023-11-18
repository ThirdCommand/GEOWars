import {GameObject} from "../../../game_engine/game_object";


export class GridPoint extends GameObject {
    constructor(engine, pos) {
        super(engine);
        this.origionalPosition = [];
        this.origionalPosition[0] = pos[0];
        this.origionalPosition[1] = pos[1];
        this.transform.pos = pos;
        this.radius = 2;
        this.elasticity = -0.0035; // force provided to pull particle back into place
        this.dampening = -0.04; // force produced from velocity (allows things to eventuall fall to rest)

        this.addPhysicsComponent();
        this.addCollider("General", this, this.radius);
    }

    update(deltaTime) {
        this.transform.acc[0] += this.transform.vel[0] * this.dampening + (this.transform.pos[0] - this.origionalPosition[0]) * this.elasticity;
        this.transform.acc[1] += this.transform.vel[1] * this.dampening + (this.transform.pos[1] - this.origionalPosition[1]) * this.elasticity;
    }

}
