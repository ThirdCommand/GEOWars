import { GameObject } from "../../../game_engine/game_object";
import { ParticleExplosion } from "../../particles/StrikeTimeParticleExplosion";
import { GameEngine } from "../../../game_engine/game_engine";
import { LineSprite, Spawnable } from "../../../game_engine/line_sprite";
import { type Transform } from "../../../game_engine/transform";
import { type AnimationView } from "../../../AnimationView";
import { Collider } from "../../../game_engine/collider";
import { type PatriotMissileSite } from "../Enemies/PatriotMissileSite";
import { type Building1 } from "../Buildings/Building1";

export class BombBasic extends GameObject {
    radius: number;
    lineSprite: BombSprite;
    speed: number;
    bombTime: number;
    bombFuseTime: number;
    spinSpeed: number;
    explosionRadius: number;
    gameElementsInExplosionRange: (PatriotMissileSite | Building1)[];


    constructor(engine: GameEngine | AnimationView, pos: [number, number], vel: [number, number]) {
        super(engine);
        this.transform.pos = pos;
        this.transform.vel = vel;
        this.explosionRadius = 20;

        this.exist();
        this.speed = 0.2;
        this.bombTime = 0;
        this.bombFuseTime = 2000;
        this.spinSpeed = 0.05;

        this.gameElementsInExplosionRange = [];

        this.addReplayablePhysicsComponent();
        this.addLineSprite(new BombSprite(this.transform));
    }

    exist() {
        this.addCollider("General", this, this.radius);
        this.addCollider("BombBasicExplosion", this, this.explosionRadius, ["PatriotMissileSite", "Building1"], ["General"]);
    }

    explode() {
        new ParticleExplosion(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], 0.05)
        this.remove();
    }

    onCollision(collider: Collider, type: string): void {
        if (type === "BombBasicExplosion") {
            this.gameElementsInExplosionRange.push(collider.gameObject as PatriotMissileSite);
        }
    }

    update(deltaTime: number) {
        this.animate(deltaTime);
        this.bombTime += deltaTime;
        if(this.bombTime >= this.bombFuseTime) {
            this.gameElementsInExplosionRange.forEach((gameElement) => {
                gameElement?.hit(); // should check for destruction animation to start
            })
            this.explode();
            // should I add a collider now, or keep track of collided things
            // and tell it to explode now
        }
        this.gameElementsInExplosionRange = [];
    }

    animate(timeDelta: number) {
        const rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        this.transform.angle = (this.transform.angle + this.spinSpeed * rotationSpeedScale) % (Math.PI * 2);
        this.lineSprite.w = 3 * easeOutQuart(this.bombTime / this.bombFuseTime + 0.01);
        // 3 is the original width
    }
}
// https://easings.net/#
function easeOutQuart(x: number): number {
    return 0.5* Math.pow((1 - x), 4) + 0.5;
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;




export class BombSprite extends LineSprite {
    w: number;
    constructor(transform: Transform) {
        super(transform);
        this.w = 3;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.drawBombBasic(ctx);
        ctx.restore();
    }

    drawBombBasic(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "#32a8a8";
        ctx.lineWidth = 1;
        const w = this.w;
        
        const pos = this.transform.absolutePosition();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        ctx.fillStyle = "#FFFFFF"

        ctx.beginPath();
        ctx.moveTo(0, 3 * w); // 10
        ctx.lineTo(3 * w, 0); // 13
        ctx.lineTo(0, -3 * w); // 16
        ctx.lineTo(-3 * w, 0); // 19
        ctx.closePath();
        ctx.fill()
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-3.5 * w, -2.5 * w); // 5
        ctx.lineTo(2.5 * w, 3.5 * w); // 6
        ctx.lineTo(3.5 * w, 2.5 * w); // 7
        ctx.lineTo(-2.5 * w, -3.5 * w); // 8
        ctx.closePath();
        ctx.fill()
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-3.5 * w, 2.5 * w); // 1
        ctx.lineTo(-2.5 * w, 3.5 * w); // 2
        ctx.lineTo(3.5 * w, -2.5 * w); // 3
        ctx.lineTo(2.5 * w, -3.5 * w); // 4
        ctx.closePath();
        ctx.fill()


        ctx.stroke();
    }
}