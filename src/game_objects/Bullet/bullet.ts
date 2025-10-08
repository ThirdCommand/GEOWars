import {GameObject} from "../../game_engine/game_object";
import {Sound} from "../../game_engine/sound";
import {BulletWallExplosion} from "../particles/bullet_wall_explosion";
import {BulletSprite} from "./bullet_sprite";
import {ParticleExplosion} from "../particles/particle_explosion";
import {VectorMath} from "../../game_engine/util";
import { type GameEngine } from "../../game_engine/game_engine";
import { type Collider } from "../../game_engine/collider";
import { Singularity } from "../enemies/Singularity/singularity";
import { GEOWarsScript, Scorable } from "../../GEOWarsScript";
import { type AnimationView } from "../../AnimationView";

export class Bullet extends GameObject {
    ID: number;
    length: number;
    radius: number;
    wrap: boolean;
    wallhit: Sound;
    exploded: boolean;
    lifeTime: number;
    aliveTime: number;
    powerUpSide: string;
    bending: boolean;
    bendTime: number;
    timeToBend: number;
    powerLevel: number;

    static RADIUS = 3;
    static SPEED = 7;

    constructor(
        engine: GameEngine | AnimationView,
        pos: [number, number, number?], // we ignore the third one here
        vel: [number, number], 
        bulletNumber: number, 
        powerUpSide: string, 
        powerLevel?: number | null
    ) {
        super(engine);
        this.ID = bulletNumber;
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.transform.pos[2] = 0;
        this.transform.vel[0] = vel[0];
        this.transform.vel[1] = vel[1];
        this.transform.vel[2] = 0;
        this.length = 12;
        this.radius = this.length / 4;
        this.wrap = false;
        this.addExplosionCollider();
        this.addPhysicsComponent();
        this.addLineSprite(new BulletSprite(this.transform));
        this.exploded = false;
        this.lifeTime = 4000;
        this.aliveTime = 0;
        this.powerUpSide = powerUpSide;
        this.bending = true;
        this.bendTime = 0;
        this.timeToBend = 1000;
        this.powerLevel = powerLevel || 1; 
        if (!powerUpSide) {
            this.bending = false;
        }
    }

    addExplosionCollider() {
        const subscribers = [
            "Grunt",
            "Pinwheel",
            "BoxBox",
            "Arrow",
            "Singularity",
            "Weaver",
            "AlienShip",
        ];
        this.addCollider("bulletHit", this, this.radius, subscribers, ["General"]);
        this.addCollider("General", this, this.radius);
    }

    update(deltaTime: number) {
        this.aliveTime += deltaTime;
        if (this.aliveTime > this.lifeTime) {
            this.remove();
        }

        if (this.bending) {
            this.bend(deltaTime);
        } 
        if (
            GEOWarsScript.isOutOfBounds(
                this.transform.absolutePosition(), this.radius
            ) &&
            !this.exploded
        ) {
            this.exploded = true;
            new BulletWallExplosion(this.gameEngine, this.transform.pos);
            this.remove();
        }
    }
    animate() {

    }

    bend(deltaTime: number) {  
        this.bendTime += deltaTime;
        if (this.bendTime > this.timeToBend) {
            this.bending = false;
        } else {
            const speed = VectorMath.norm(this.transform.vel);
            const velDir = Math.atan2(this.transform.vel[1], this.transform.vel[0]);
            let bendSpeed;
            if(this.powerLevel > 2){
                // maybe I control the speed with trigger pressure
                bendSpeed = this.powerUpSide === 'left' ? -0.0098 * deltaTime : 0.0098 * deltaTime;// (pi/32) / 1000 radians per milisecond
            } else {
                bendSpeed = this.powerUpSide === 'left' ? -0.000098 * deltaTime : 0.000098 * deltaTime;// (pi/32) / 1000 radians per milisecond
            }
            

            this.transform.vel[0] = Math.cos(velDir + bendSpeed) * speed;
            this.transform.vel[1] = Math.sin(velDir + bendSpeed) * speed;
        }
        // take speed, take velocity direction, change direction with bend speed, apply speed to that direction 
    }

    onCollision(collider: Collider, type: string) { 
        if (type === "bulletHit") {
            if (collider.gameObject instanceof Singularity) {
                collider.gameObject.bulletHit();
                this.remove();
            } else {
                const hitObjectTransform = collider.gameObject.transform;
                const pos = hitObjectTransform.absolutePosition();
                new ParticleExplosion(this.gameEngine, pos);

                // only scorable things are included in the subscriptions..
                // not sure how to get typescript to agree with that yet
                // feels like a pain and a waste of time for now
                (this.gameEngine.gameScript as GEOWarsScript).tallyScore(collider.gameObject as unknown as Scorable);
                collider.gameObject.remove();
                this.remove();
            }
        }
    }

    // move(timeDelta) {

    // }
}

