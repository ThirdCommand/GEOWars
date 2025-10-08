import { Collider } from "../../../game_engine/collider";
import { GameEngine } from "../../../game_engine/game_engine";
import {GameObject} from "../../../game_engine/game_object";
import {Sound} from "../../../game_engine/sound";
import { type Transform } from "../../../game_engine/transform";
import {VectorMath} from "../../../game_engine/util";
import { GEOWarsScript } from "../../../GEOWarsScript";
import {EnemySpawn} from "../../particles/enemy_spawn";
import {LineSprite, Spawnable} from "../../../game_engine/line_sprite";
import { type AnimationView } from "../../../AnimationView";

export class Grunt extends GameObject {
    exists: boolean;
    stretchDirection: number;
    shipTransform: Transform;
    radius = 5;
    points = 70;
    speed = 1.5;
    bumpAcceleration = 1.5;
    bumpInfluencers: Array<[number,number]>;
    bumpDirectionInfluenced = false;
    spawnSound: Sound;
    lineSprite: GruntSprite;
    constructor(engine: GameEngine | AnimationView, pos: [number, number], shipTransform: Transform) {
        super(engine);
        this.transform.pos = pos;
        this.exists = false;
        this.stretchDirection = -1;
        this.shipTransform = shipTransform;
        this.radius = 5;
        this.points = 70;
        this.speed = 1.5;
        this.bumpAcceleration = 1.5;
        this.bumpInfluencers = [];
        this.bumpDirectionInfluenced = false;
        this.spawnSound = new Sound("sounds/Enemy_spawn_blue.wav", 0.5, this.gameEngine.muted);
        this.playSound(this.spawnSound);
        this.addLineSprite(new GruntSprite(this.transform));
        this.addChildGameObject(new EnemySpawn(this.gameEngine));
    }

    exist() {
        this.exists = true;
        // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        this.addCollider("Bump", this, this.radius, ["Grunt", "Weaver"], ["General"]);
        // now it will move
        this.addPhysicsComponent();
    }

    onCollision(collider: Collider, type: string){
        if (type === "Bump" && collider.gameObject !== this) {
            this.acceptBumpDirection(collider.gameObject.transform.pos);
        }
    }
    

    acceptBumpDirection(source: [number, number, number?]) {
        this.bumpDirectionInfluenced = true;
        const dy = this.transform.pos[1] - source[1];
        const dx = this.transform.pos[0] - source[0];
        const unitVector = VectorMath.dir([dx, dy]);
        this.bumpInfluencers.push(unitVector);
    // first 1
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





    // ADDING MOVEMENT MECHANICS FOR GRUNT

    chase(timeDelta: number) {
        const speed = this.speed; 
        const shipPos = this.shipTransform.pos;
        const pos = this.transform.pos;
        const dy = shipPos[1] - pos[1];
        const dx = shipPos[0] - pos[0];

        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const direction = Math.atan2(dy, dx);

        this.transform.pos[0] += speed * Math.cos(direction) * velocityScale;
        this.transform.pos[1] += speed * Math.sin(direction) * velocityScale;
    }

    animate(timeDelta: number) {
        const cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const cycleSpeed = 0.01;
        if (this.lineSprite.stretchScale_W < 0.7 || this.lineSprite.stretchScale_W > 1) {
            this.stretchDirection *= -1;
        }

        this.lineSprite.stretchScale_W = this.lineSprite.stretchScale_W + -this.stretchDirection * cycleSpeed * cycleSpeedScale;
        this.lineSprite.stretchScale_L = this.lineSprite.stretchScale_L + this.stretchDirection * cycleSpeed * cycleSpeedScale;

    }

    update(timeDelta: number) {
        if (this.exists) {
            const bumpAcceleration = this.bumpAcceleration;

            this.animate(timeDelta);

            if(this.bumpDirectionInfluenced) {
                const direction = this.influenceDirection(this.bumpInfluencers);
                this.transform.acc[0] += bumpAcceleration * Math.cos(direction) / 100;
                this.transform.acc[1] += bumpAcceleration * Math.sin(direction) / 100;
            } 
            this.chase(timeDelta);
      
            if (GEOWarsScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
                this.wallGraze();
            }
            this.bumpInfluencers = [];
            this.bumpDirectionInfluenced = false;
        }
    }

    wallGraze() {
        GEOWarsScript.wallGraze(this.transform, this.radius);
    }

  
}


export class GruntSprite extends LineSprite implements Spawnable{
    spawning: boolean;
    spawningScale: number;
    stretchScale_L: number;
    stretchScale_W: number;
    constructor(transform: Transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
        this.stretchScale_L = 1;
        this.stretchScale_W = 0.7;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.visible) return;
        const pos = this.transform.absolutePosition();
    
        const spawningScale = this.spawningScale;
        const shipLength = 10 * 2.2 * spawningScale * this.stretchScale_L;
        const shipWidth = 10 * 2.2 * spawningScale * this.stretchScale_W;
        const l = shipLength;
        const w = shipWidth;

        const r = 0;
        const g = 57;
        const b = 230;

        ctx.save();
        ctx.translate(pos[0], pos[1]);

        const blurFactor = 0.5;

        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.shadowBlur = 10;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5 * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.lineWidth = 6; // * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.lineWidth = 4.5; // * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.lineWidth = 3; // * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 1.5; // * blurFactor;
        this.drawDiamond(ctx, l, w);
    
        ctx.restore();
    }

    drawDiamond(ctx: CanvasRenderingContext2D, l: number, w: number) {
        ctx.beginPath();
        ctx.moveTo(0, -l / 2); //1
        ctx.lineTo(w / 2, 0); //2
        ctx.lineTo(0, l / 2); //3
        ctx.lineTo(-w / 2, -0); //4
        ctx.closePath();
        ctx.stroke();
    }




}


const NORMAL_FRAME_TIME_DELTA = 1000 / 60;