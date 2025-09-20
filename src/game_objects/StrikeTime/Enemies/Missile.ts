import { GameObject } from "../../../game_engine/game_object";
import { VectorMath } from "../../../game_engine/util";
import { ParticleExplosion } from "../../particles/particle_explosion";
import { GameEngine } from "../../../game_engine/game_engine";
import { type Collider } from "../../../game_engine/collider";
import { type Aurora } from "../Aurora/Aurora";
import { LineSprite, Spawnable } from "../../../game_engine/line_sprite";
import { type Transform } from "../../../game_engine/transform";
import { type AnimationView } from "../../../AnimationView";
import { MissileExhaust } from "./MissileExhaust";

type TargetableObject = Aurora;

export class Missile extends GameObject {
    explodeRange: number;
    radius: number;
    increasing: boolean;
    lineSprite: MissileSprite;
    lives: number;
    speed: number;

    exhaust: MissileExhaust;
    planeLockedOnTransform: Transform;

    constructor(engine: GameEngine | AnimationView, pos: [number, number], vel: [number, number], planeLockedOn: Transform) {
        super(engine);
        this.transform.pos = pos;
        this.transform.vel = vel;

        this.explodeRange = 3; // I could have it detect earlier and turn to face before within actual range. but this is a prototype so not now
        this.radius = 5; // visual range, where it would be acceptable for something to be considering hitting it
        this.exist();
        this.lives = 1;
        this.speed = 0.1;

        this.planeLockedOnTransform = planeLockedOn;

       

        this.addReplayablePhysicsComponent();
        this.addLineSprite(new MissileSprite(this.transform));
        this.exhaust = new MissileExhaust(engine,this.transform,[
            -this.lineSprite.w / 2, 
            1.1 * this.lineSprite.l
        ], this.lineSprite.w)
    }

    exist() {
        this.addCollider("General", this, this.radius);
        this.addCollider("ExplodeRange", this, this.explodeRange, ["Aurora"],  ["General"]);
        // this doesn't actually move... so I don't think I need a physics component...
        // I can just animate it instead... but I'll have to have the animations be reversible
    }

    chase(timeDelta: number) {
        const speed = this.speed; 
        const planePosition = this.planeLockedOnTransform.pos;
        const pos = this.transform.pos;
        const dy = planePosition[1] - pos[1];
        const dx = planePosition[0] - pos[0];

        const velocityScale = timeDelta * 0.8;
        const direction = Math.atan2(dy, dx);

        this.transform.pos[0] += speed * Math.cos(direction) * velocityScale;
        this.transform.pos[1] += speed * Math.sin(direction) * velocityScale;
    }

    onCollision(collider: Collider, type: string){
        if (type === "ExplodeRange"){
            this.explode(collider);
        }
    }

    explode(collider: Collider) {
        console.log('Aurora Killed/Hit')
        new ParticleExplosion(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]])
        this.exhaust.remove();
        this.remove();
        // create missiles at the fire rate while still in range
        // will have to be done reversibly
    }

    hit(){
        this.lives -= 1;
        const pos = this.transform.absolutePosition();
        if (this.lives <= 0) {
            new ParticleExplosion(this.gameEngine, pos);
            this.remove();
        } 
        // if not dead, I can have a different type of explosion
    }

    update(deltaTime: number) {
        this.animate(deltaTime);
        this.chase(deltaTime);

        let movementDirection = 0;
        if(this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
            movementDirection = this.transform.angle;
        } else {
            movementDirection = Math.atan2(
                this.transform.vel[0],
                -this.transform.vel[1]
            );
        }
        this.transform.angle = movementDirection - Math.PI / 2;

        // missile tracking will have to be reversible
        // honestly seems pretty shitty tough
    }

    animate(timeDelta: number) {
        // I should stick to no animation for now
        // for my own sanity
    }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;




export class MissileSprite extends LineSprite {
    l: number;
    w: number;
    constructor(transform: Transform) {
        super(transform);
        this.l = 10;
        this.w = 2;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.drawMissile(ctx);
        ctx.restore();
    }

    drawMissile(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1;
        const l = this.l;
        const w = this.w;
        const n = w;
        
        const pos = this.transform.absolutePosition();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        ctx.beginPath();
        ctx.moveTo(-l, - w / 2); // 4
        ctx.lineTo(0, - w / 2); // 5
        ctx.lineTo(n, 0); // 1
        ctx.lineTo(0, w / 2);  // 2
        ctx.lineTo(-l, w / 2); // 3
        ctx.stroke();
    }
}