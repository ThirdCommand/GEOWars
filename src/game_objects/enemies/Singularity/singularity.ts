import { GameObject } from "../../../game_engine/game_object";
import { Sound } from "../../../game_engine/sound";
import { VectorMath } from "../../../game_engine/util";
import { ParticleExplosion } from "../../particles/particle_explosion";
import { SingularityHitExplosion } from "../../particles/singularity_hit_explosion";
import { EnemySpawn } from "../../particles/enemy_spawn";
import { SingularitySprite } from "./singularity_sprite";
import { SingularityParticles } from "../../particles/singularity_particles";
import { AlienShip } from "./alien_ship";
import { GridPoint } from "../../particles/Grid/grid_point";
import { GameEngine } from "../../../game_engine/game_engine";
import { type Collider } from "../../../game_engine/collider";
import {type  Grunt } from "../Grunt/grunt";
import {type  Pinwheel } from "../Pinwheel/pinwheel";
import {type  Bullet } from "../../Bullet/bullet";
import {type  Ship } from "../../Ship/ship";
import {type  BoxBox } from "../BoxBox/boxbox";
import {type  Arrow } from "../Arrow/arrow";
import {type  Weaver } from "../Weaver/weaver";
import {type  Particle } from "../../particles/particle";
import {type  SingularityParticle } from "../../particles/Singularity_Particle/singularity_particle";
import { GameScript } from "../../../game_script";
import { type AnimationView } from "../../../AnimationView";

type InfluencableObject = Grunt | Pinwheel | Bullet | Ship | BoxBox | Arrow | Singularity | Weaver | Particle | SingularityParticle | GridPoint | AlienShip

export class Singularity extends GameObject {
    gravityWellSize: number;
    gravityConstant: number;
    radius: number;
    points: number;
    throbbingCycleSpeed: number;
    numberAbsorbed: number;
    alienSpawnAmount: number;
    alienSpawnSpeed: number;
    gravityPulsateScale: number;
    deathSound: Sound;
    gravityWellHitSound: Sound;
    openGateSound: Sound;
    spawnSound: Sound;
    increasing: boolean;
    lineSprite: SingularitySprite;
    lives: number;

    constructor(engine: GameEngine | AnimationView, pos: [number, number]) {
        super(engine);
        this.transform.pos = pos;
        this.transform.pos[2] = 0;
        this.gravityWellSize = 1000;
        this.gravityConstant = 1000 * 0.5;
        this.radius = 15;
        this.points = 100;
        this.throbbingCycleSpeed = 0.002;
        this.numberAbsorbed = 0;
        this.alienSpawnAmount = 10;
        this.alienSpawnSpeed = 1.5;
        this.gravityPulsateScale = 1;
        this.deathSound = new Sound("sounds/Gravity_well_die.wav", 1, engine.muted);
        this.gravityWellHitSound = new Sound("sounds/Gravity_well_hit.wav", 0.5, engine.muted);
        this.openGateSound = new Sound("sounds/Gravity_well_explode.wav", 1, engine.muted);
        // this.id = options.id
        this.spawnSound = new Sound("sounds/Enemy_spawn_red.wav", 1, engine.muted);
        this.playSound(this.spawnSound);

        this.increasing = true;
        this.addLineSprite(new SingularitySprite(this.transform));
        this.addChildGameObject(new EnemySpawn(this.gameEngine));
        this.lineSprite.throbbingScale = 1;
        this.lives = 5;
    }

    exist() {
    // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        this.addCollider("GravityWell", this, this.gravityWellSize, ["Grunt", "Pinwheel", "Bullet", "Ship", "BoxBox", "Arrow", "Singularity", "Weaver", "Particle", "SingularityParticle", "GridPoint"],  ["General"]);
        this.addCollider("Absorb", this, this.radius, ["Grunt", "Pinwheel", "BoxBox", "Arrow", "Weaver"],  ["General"]);
        // now it will move
        this.addPhysicsComponent();
        this.lineSprite.spawning = false;
        this.addChildGameObject(new SingularityParticles(this.gameEngine, this.transform));
    }

    onCollision(collider: Collider, type: string){
        if (type === "GravityWell"){
            this.influenceAcceleration(collider.gameObject as InfluencableObject);
        } else if (type === "Absorb") {
            const hitObjectTransform = collider.gameObject.transform;
            const pos = hitObjectTransform.absolutePosition();
            // const vel = hitObjectTransform.vel;
            new ParticleExplosion(this.gameEngine, pos);
            collider.gameObject.remove();

            this.throbbingCycleSpeed *= 1.2;
            this.numberAbsorbed += 1; // put back to 1 
        }
    }

    bulletHit(){
        this.lives -= 1;
        const pos = this.transform.absolutePosition();
        if (this.lives <= 0) {
            new ParticleExplosion(this.gameEngine, pos);
            this.gameEngine.gameScript.tallyScore(this);
            this.playSound(this.deathSound);
            this.remove();
        } else {
            new SingularityHitExplosion(this.gameEngine, pos);
            this.playSound(this.gravityWellHitSound);
            this.throbbingCycleSpeed /= 1.2;
            this.numberAbsorbed -= 1;
        }
    }

    wallGraze() {
        GameScript.wallGraze(this.transform, this.radius);
    }
  

    update(deltaTime: number) {

        if (GameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            this.wallGraze();
        }
        if (this.numberAbsorbed === 5) {
            // this.soundAlarm(deltaTime);
        }

        this.animate(deltaTime);
        if (this.numberAbsorbed >= 6) {
            this.openGate();
        }
    }

    // soundAlarm(deltaTime: number){

    // }

    animate(timeDelta: number) {

        const cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const cycleSpeed = this.throbbingCycleSpeed;
        // increase scale until 1.2, decrease until 0.8

        if (this.increasing) {
            this.lineSprite.throbbingScale += cycleSpeed * cycleSpeedScale;
            this.gravityPulsateScale += cycleSpeed * 2 * cycleSpeedScale;
            if (this.lineSprite.throbbingScale > 1.2) {
                this.increasing = !this.increasing;
            }
        } else {
            this.lineSprite.throbbingScale -= cycleSpeed * cycleSpeedScale;
            this.gravityPulsateScale -= cycleSpeed * 2 * cycleSpeedScale;
            if (this.lineSprite.throbbingScale < 0.8) {
                this.increasing = !this.increasing;
            }
        }
    }

    influenceAcceleration(object: InfluencableObject) {
        const pos = this.transform.absolutePosition();

        if(object instanceof GridPoint) {
            // let's try moving their original position in the z direction 
            // depending on strength of gravity influence
            const objectPos3D = [object.transform.pos[0], object.transform.pos[1], object.transform.pos[2]];
            const dVector: [number, number, number] = [pos[0] - objectPos3D[0], pos[1] - objectPos3D[1], -200 - objectPos3D[2]]; // -200 is the z position of the gravity well for the grid
            const dVectorZOrigin: [number, number, number] = [pos[0] - objectPos3D[0], pos[1] - objectPos3D[1],0]; // -200 is the z position of the gravity well for the grid
            let r = VectorMath.dist([0,0,0], dVector);
            let rZOrigin = VectorMath.dist([0,0,0], dVectorZOrigin);
            
            if(r < 25) r = 25;
            if(rZOrigin < 25) rZOrigin = 25;
            // I think I can use both effects, but this one should be a lot smaller
            // and then tuning it would be harder
                
            // I really like the wave effect that happens with z acceleration being 25, and the spring -0.0025 + dampening -0.04
            // but Z's effect distends too far
            const unitVector3D = VectorMath.scale(dVector, 1/r);
            const accContribution= [
                unitVector3D[0] * this.gravityConstant * 20 * this.gravityPulsateScale / (r * r),
                unitVector3D[1] * this.gravityConstant * 20 * this.gravityPulsateScale / (r * r),
                unitVector3D[2] * this.gravityConstant * 10 * this.gravityPulsateScale / (r * r)
            ];

            // *************
            // will need to multiply this a good amount
            // if(r < 25) r=25;
            const zContribution = this.gravityConstant * 20 * this.gravityPulsateScale / (rZOrigin ** 2) * 150;
            //// ************

            object.transform.acc[0] += accContribution[0];
            object.transform.acc[1] += accContribution[1];
            object.transform.acc[2] += accContribution[2];
            object.originalPosition[2] += zContribution;
        } else {
            const objectPos = object.transform.absolutePosition();
            const dVector2D: [number, number] = [pos[0] - objectPos[0], pos[1] - objectPos[1]];
            const r = VectorMath.dist([0,0], dVector2D);
            if (!(r > this.gravityWellSize * 7 / 8 || r < this.radius * 2)){
                const unitVector = VectorMath.scale(dVector2D, 1/r);
                const accContribution= [
                    unitVector[0] * this.gravityConstant / (r * r),
                    unitVector[1] * this.gravityConstant / (r * r)
                ];
                object.transform.acc[0] += accContribution[0];
                object.transform.acc[1] += accContribution[1];
            }
        }
        
    }

    openGate(){
        this.playSound(this.openGateSound);
        for (let i = 0; i < this.alienSpawnAmount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity: [number, number] = [this.alienSpawnSpeed * Math.cos(angle), this.alienSpawnSpeed * Math.sin(angle)];
            new AlienShip(this.gameEngine, this.transform.pos, velocity, this.gameEngine.gameScript.ship.transform);
        }
        this.remove();

    }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;