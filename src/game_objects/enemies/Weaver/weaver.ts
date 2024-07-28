import { type Collider } from "../../../game_engine/collider";
import { type GameEngine } from "../../../game_engine/game_engine";
import { GameObject } from "../../../game_engine/game_object";
import { Sound } from "../../../game_engine/sound";
import { type Transform } from "../../../game_engine/transform";
import {VectorMath} from "../../../game_engine/util";
import { GameScript } from "../../../game_script";
import {EnemySpawn} from "../../particles/enemy_spawn";
import { LineSprite, Spawnable } from "../../../game_engine/line_sprite";
import { type AnimationView } from "../../../AnimationView";

export class Weaver extends GameObject {
    rotation_speed: number;
    speed: number;
    points: number;
    radius: number;
    weaverCloseHitBox: number;
    shipTransform: Transform;
    bulletDirectionInfluenced: boolean;
    bumpDirectionInfluenced: boolean;
    bulletInfluencers: Array<[number, number]>;
    bumpInfluencers: Array<[number, number]>;
    bumpAcceleration: number;
    bulletDodgeSpeed: number;
    spawnSound: Sound;
    exists: boolean;
    lineSprite: WeaverSprite;

    BOX_SIZE = 10;
    COLOR = "#3cff0b";
    constructor(engine: GameEngine | AnimationView, pos: [number, number], shipTransform: Transform) {
        super(engine);
        this.rotation_speed = 0.075;
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.speed = 3;
        
        this.points = 80;
        this.radius = 5;
        this.weaverCloseHitBox = 30;
        this.shipTransform = shipTransform;

        this.bulletDirectionInfluenced = false;
        this.bumpDirectionInfluenced = false;
        this.bulletInfluencers = [];
        this.bumpInfluencers = [];
        this.bumpAcceleration = 1.5;
        this.bulletDodgeSpeed = 4;

        this.spawnSound = new Sound("sounds/Enemy_spawn_green.wav", 0.5);
        this.playSound(this.spawnSound);
        this.addLineSprite(new WeaverSprite(this.transform));
        this.addChildGameObject(new EnemySpawn(this.gameEngine));
        this.exists = false;
    
    }

    exist() {
    // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        this.addCollider("BulletDodge", this, this.weaverCloseHitBox, ["Bullet"], ["General"]);
        this.addCollider("Bump", this, this.radius, ["Grunt", "Weaver"], ["General"]);
        // now it will move
        this.addPhysicsComponent();
        this.exists = true;
    }


    onCollision(collider: Collider, type: string){
        if (type === "BulletDodge") {
            this.acceptBulletDirection(collider.gameObject.transform.pos);
        }
        if(type === "Bump" && collider.gameObject !== this) {
            this.acceptBumpDirection(collider.gameObject.transform.pos);
        }
    }

    acceptBumpDirection(source: [number, number, number?]) {
        this.bumpDirectionInfluenced = true;
        const dy = this.transform.pos[1] - source[1];
        const dx = this.transform.pos[0] - source[0];
        const unitVector = VectorMath.dir([dx, dy]);
        this.bumpInfluencers.push(unitVector);
    }

    influenceDirection(influencers: Array<[number, number]>) {
        let directionVector = [0, 0];

        influencers.forEach((influencer) => {
            const dx = directionVector[0] + influencer[0];
            const dy = directionVector[1] + influencer[1];
            const newVector: [number, number] = [dx, dy];
            directionVector = VectorMath.dir(newVector);
        });
        const influencedDirection = Math.atan2(directionVector[1], directionVector[0]);
        return influencedDirection;
    }

    acceptBulletDirection(source: [number, number, number?]) {
        this.bulletDirectionInfluenced = true;
        const dy = this.transform.pos[1] - source[1];
        const dx = this.transform.pos[0] - source[0];
        const unitVector: [number, number] = VectorMath.dir([dx, dy]);
        this.bulletInfluencers.push(unitVector);
    // first 
    }

    animate(timeDelta: number) {
        const rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2);
    }

    update(timeDelta: number){
        if(this.exists){
            const bumpAcceleration = this.bumpAcceleration;

            const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

            this.animate(timeDelta);

            if(this.bulletDirectionInfluenced) {
                const direction = this.influenceDirection(this.bulletInfluencers);
                this.transform.pos[0] += this.bulletDodgeSpeed * Math.cos(direction) * velocityScale;
                this.transform.pos[1] += this.bulletDodgeSpeed * Math.sin(direction) * velocityScale;
            } else {
                this.chase(timeDelta);
            }
            if (this.bumpDirectionInfluenced) {
                const direction = this.influenceDirection(this.bumpInfluencers);
                this.transform.acc[0] += bumpAcceleration * Math.cos(direction) / 100;
                this.transform.acc[1] += bumpAcceleration * Math.sin(direction) / 100;
            } 
  
            this.bumpDirectionInfluenced = false;
            this.bulletDirectionInfluenced = false;
            this.bumpInfluencers = [];
            this.bulletInfluencers = [];
  
            if (GameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
                this.wallGraze();
            }
        }
    
    }

    wallGraze() {
        GameScript.wallGraze(this.transform, this.radius);
    }

    chase(timeDelta: number) {
        const speed = 2;
        const shipPos = this.shipTransform.pos;
        const dy = shipPos[1] - this.transform.pos[1];
        const dx = shipPos[0] - this.transform.pos[0];

        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const direction = Math.atan2(dy, dx);

        this.transform.pos[0] += speed * Math.cos(direction) * velocityScale;
        this.transform.pos[1] += speed * Math.sin(direction) * velocityScale;
    }

}



const NORMAL_FRAME_TIME_DELTA = 1000 / 60;




export class WeaverSprite extends LineSprite implements Spawnable{
    spawningScale: number;
    spawning: boolean;
    constructor(transform: Transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.visible) return;
        // drawing this guy is taking waaay too much time.
        // I took out the blurr factor and it's way better.
        // doesn't look as nice, but it's a starting point
        const pos = this.transform.absolutePosition();
        const angle = this.transform.absoluteAngle();
        const spawningScale = this.spawningScale;
        // const shipLength = 10 * 2.2 * spawningScale;
        const shipWidth = 10 * 2.2 * spawningScale;
        const s = shipWidth / 2;

        const r = 24;
        const g = 255;
        const b = 4;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(angle);
    
        // const blurFactor = 0.5;
        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        // ctx.shadowBlur = 10 * blurFactor
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        this.drawWeaver(ctx, s);
        ctx.lineWidth = 6;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.6)";
        this.drawWeaver(ctx, s);
        // ctx.lineWidth = 4.5;
        // this.drawWeaver(ctx, s)
        // ctx.lineWidth = 3;
        // this.drawWeaver(ctx, s)
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 1.5;
        this.drawWeaver(ctx, s);

        ctx.restore();
    }

    drawWeaver(ctx: CanvasRenderingContext2D, s: number) {

        ctx.beginPath();
        // ctx.strokeStyle = "#3cff0b";
        ctx.lineWidth = 2;
        ctx.moveTo(0, -s); //1
        ctx.lineTo(s, 0); //2
        ctx.lineTo(0, s); //3
        ctx.lineTo(-s, 0); //4
        ctx.lineTo(0, -s); //1
        ctx.lineTo(-s / 2, -s / 2); //5
        ctx.lineTo(s / 2, -s / 2); //6
        ctx.lineTo(s / 2, s / 2); //7
        ctx.lineTo(-s / 2, s / 2); //8
        ctx.lineTo(-s / 2, -s / 2); //5
        // ctx.closePath();
        ctx.stroke();
    }
}