import { GameObject } from "../../../game_engine/game_object";
import { VectorMath } from "../../../game_engine/util";
import { ParticleExplosion } from "../../particles/particle_explosion";
import { GameEngine } from "../../../game_engine/game_engine";
import { type Collider } from "../../../game_engine/collider";
import { type Aurora } from "../Aurora/Aurora";
import { LineSprite, Spawnable } from "../../../game_engine/line_sprite";
import { type Transform } from "../../../game_engine/transform";
import { type AnimationView } from "../../../AnimationView";

type TargetableObject = Aurora;

export class PatriotMissileSite extends GameObject {
    launchRange: number;
    radius: number;
    increasing: boolean;
    lineSprite: PatriotMissileSiteSprite;
    lives: number;

    constructor(engine: GameEngine | AnimationView, pos: [number, number]) {
        super(engine);
        this.transform.pos = pos;
        this.launchRange = 75; // I could have it detect earlier and turn to face before within actual range. but this is a prototype so not now
        this.radius = 15;
        this.lives = 1;
        this.exist();

        this.addLineSprite(new PatriotMissileSiteSprite(this.transform));
    }

    exist() {
        this.addCollider("General", this, this.radius);
        this.addCollider("LaunchRange", this, this.launchRange, ["Aurora"],  ["General"]);
        // this doesn't actually move... so I don't think I need a physics component...
        // I can just animate it instead... but I'll have to have the animations be reversible
    }

    onCollision(collider: Collider, type: string){
        if (type === "LaunchRange"){
            this.startLaunchSequence();
        } 
    }

    startLaunchSequence() {
        console.log('launch missile sequencing')
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
    }

    animate(timeDelta: number) {
        // I should stick to no animation for now
        // for my own sanity
    }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;




export class PatriotMissileSiteSprite extends LineSprite {
    constructor(transform: Transform) {
        super(transform);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.drawPatriotMissileSite(ctx);
        ctx.restore();
    }

    drawPatriotMissileSite(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "#339966";
        ctx.lineWidth = 1.5;
        const w = 5;
        
        const pos = this.transform.absolutePosition();
        ctx.translate(pos[0], pos[1]);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(-1/2 * w, 4 * w); // 7
        ctx.lineTo(1/5 * w, 8 * w); // 6
        ctx.lineTo(3.5 * w, 7 * w); // 5
        
        ctx.rotate(-Math.atan(1/4));
        ctx.lineTo(4 * w, 4 * w);  // 3
        ctx.lineTo(0, 4 * w);      // 4
        ctx.stroke(); 

        ctx.rotate(Math.atan(1/4));
        ctx.lineTo(1/5 * w, 8 * w) // 6
        ctx.stroke();
        ctx.rotate(-Math.atan(1/4));

        ctx.beginPath();
        ctx.moveTo(0,0);            // 1
        ctx.lineTo(4 * w, 0);       // 2
        ctx.lineTo(4 * w, 4 * w);  // 3
        ctx.lineTo(0, 4 * w);      // 4
        ctx.lineTo(0, 0);           // 1
        ctx.stroke();

       

        
        ctx.beginPath(); // cross
        ctx.moveTo(2 * w,0);
        ctx.lineTo(2 * w, 4 * w);
        ctx.stroke();

        ctx.beginPath(); // cross 
        ctx.moveTo(4 * w, 2 * w);
        ctx.lineTo(0, 2 * w);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0.5 * w, 0.5 * w);
        ctx.lineTo(1.5 * w, 0.5 * w);
        ctx.lineTo(1.5 * w, 1.5 * w);
        ctx.lineTo(0.5 * w, 1.5 * w);
        ctx.lineTo(0.5 * w, 0.5 * w);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(2.5 * w, 0.5 * w);
        ctx.lineTo(3.5 * w, 0.5 * w);
        ctx.lineTo(3.5 * w, 1.5 * w);
        ctx.lineTo(2.5 * w, 1.5 * w);
        ctx.lineTo(2.5 * w, 0.5 * w);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(2.5 * w, 2.5 * w);
        ctx.lineTo(3.5 * w, 2.5 * w);
        ctx.lineTo(3.5 * w, 3.5 * w);
        ctx.lineTo(2.5 * w, 3.5 * w);
        ctx.lineTo(2.5 * w, 2.5 * w);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0.5 * w, 2.5 * w); // 24
        ctx.lineTo(1.5 * w, 2.5 * w); // 25
        ctx.lineTo(1.5 * w, 3.5 * w); // 26
        ctx.lineTo(0.5 * w, 3.5 * w); // 27
        ctx.lineTo(0.5 * w, 2.5 * w); // 24
        ctx.stroke();
    }
}