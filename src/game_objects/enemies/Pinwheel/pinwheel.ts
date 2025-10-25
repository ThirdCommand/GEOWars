import {Sound} from "../../../game_engine/sound";
import {VectorMath} from "../../../game_engine/util";
import {GameObject} from "../../../game_engine/game_object";
import {EnemySpawn} from "../../particles/enemy_spawn";
import { type GameEngine } from "../../../game_engine/game_engine";
import { GEOWarsScript } from "../../../GEOWarsScript";
import { LineSprite, Spawnable } from "../../../game_engine/line_sprite";
import { type Transform } from "../../../game_engine/transform";
import { type AnimationView } from "../../../AnimationView";

export class Pinwheel extends GameObject {
    rotation_speed: number;
    points: number;
    spawnSound: Sound;
    radius: number;
    lineSprite: PinwheelSprite;
    static SPAWN_SOUND_URL =  "sounds/Enemy_spawn_blue.wav";
    constructor(engine: GameEngine | AnimationView, pos: [number, number]) {
        super(engine);
        this.rotation_speed = 0.05;
        const speed = 1;
        this.points = 20;
        this.transform.pos = pos;
        this.transform.vel = VectorMath.randomVec(speed);
        this.playSound(Pinwheel.SPAWN_SOUND_URL);
        this.addLineSprite(new PinwheelSprite(this.transform));
        this.addChildGameObject(new EnemySpawn(this.gameEngine, this));
        this.radius = 5;
    }
  
    exist() {
    // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        // now it will move
        this.addPhysicsComponent();
    }

    animate(deltaTime: number) {
        const rotationSpeedScale = deltaTime / NORMAL_FRAME_TIME_DELTA;
        this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2);
    }

    update(deltaTime: number){
        this.animate(deltaTime);
        if (GEOWarsScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            GEOWarsScript.bounce(this.transform, this.radius); // HARD CODED
        }
    }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;


export class PinwheelSprite extends LineSprite implements Spawnable{
    spawning: boolean;
    spawningScale: number;
    constructor(transform: Transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.visible) return;
        
        const spawningScale = this.spawningScale || 1;
        const pos = this.transform.absolutePosition();
        const angle = this.transform.absoluteAngle();

        const shipWidth = 18 * spawningScale;
        const s = shipWidth / 2;

        const r = 59;
        const g = 10;
        const b = 87;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(angle);

        const blurFactor = 0.5;
        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.shadowBlur = 10 * blurFactor * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5 * blurFactor * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        this.drawPinwheel(ctx, s);
        ctx.lineWidth = 6 * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.6)";
        this.drawPinwheel(ctx, s);
        ctx.lineWidth = 4.5;
        this.drawPinwheel(ctx, s);
        ctx.lineWidth = 3;
        this.drawPinwheel(ctx, s);
        ctx.strokeStyle = 'rgb(200, 100, 255)';
        ctx.lineWidth = 1.5;
        this.drawPinwheel(ctx, s);

        // ctx.strokeStyle = "#971adf";
        // ctx.lineWidth = 1.8;

        ctx.restore();
    }

    drawPinwheel(ctx: CanvasRenderingContext2D, s: number) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 0); //1
        ctx.lineTo(-s, -s); //2
        ctx.lineTo(0, -s); //3
        ctx.lineTo(0, 0); //1
        ctx.lineTo(s, -s); //4
        ctx.lineTo(s, 0); //5
        ctx.lineTo(0, 0); //1
        ctx.lineTo(s, s); //6
        ctx.lineTo(0, s); //7
        ctx.lineTo(0, 0); //1
        ctx.lineTo(-s, s); //8
        ctx.lineTo(-s, 0); //9
        // ctx.lineTo(); //1

        ctx.closePath();
        ctx.stroke();
    }




}
