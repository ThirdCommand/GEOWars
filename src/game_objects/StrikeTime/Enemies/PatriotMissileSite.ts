import { GameObject } from "../../../game_engine/game_object";
import { ParticleExplosion } from "../../particles/StrikeTimeParticleExplosion";
import { GameEngine } from "../../../game_engine/game_engine";
import { type Collider } from "../../../game_engine/collider";
import { type Aurora } from "../Aurora/Aurora";
import { LineSprite, Spawnable } from "../../../game_engine/line_sprite";
import { type Transform } from "../../../game_engine/transform";
import { type AnimationView } from "../../../AnimationView";
import { Missile } from "./Missile";
import {DeathAnimationLineObject} from "../DeathAnimation/DeathAnimation";

type TargetableObject = Aurora;

const DeathAnimationLineBaseObjectWithSpeed = (
    engine: GameEngine | AnimationView,
    objectTransform: Transform,// position of the parent object
    objectAngle: number, // angle of the parent object
    linePointPositions: [[number, number], [number, number]], // relative to parent object origin
    color?: string,
    width?: number,
) => new DeathAnimationLineObject(engine, objectTransform, objectAngle, linePointPositions, color, width, 2)

export class PatriotMissileSite extends GameObject {
    launchRange: number;
    radius: number;
    increasing: boolean;
    lineSprite: PatriotMissileSiteSprite;
    lives: number;

    isMissileLaunched: boolean;
    missilesPerGroup: number;
    numberOfMissilesLaunched: number;
    reloadTime: number;

    isGroupLaunched: boolean;
    groupReloadTime: number;

    timeSinceLaunch: number;
    timeSinceGroupLaunch: number;
    destructedColor: string;
    destructionLineWidth: number;

    constructor(engine: GameEngine | AnimationView, pos: [number, number]) {
        super(engine);
        this.transform.pos = pos;
        this.launchRange = 180; // I could have it detect earlier and turn to face before within actual range. but this is a prototype so not now
        this.radius = 15;
        this.lives = 1;
        this.destructedColor = "#67997fff"
        this.destructionLineWidth = 1.5;

        this.missilesPerGroup = 3;

        this.numberOfMissilesLaunched = 0;
        this.isMissileLaunched = false;
        this.isGroupLaunched = false;

        this.reloadTime = 350;
        this.groupReloadTime = 3000;

        this.timeSinceLaunch = 0;
        this.timeSinceGroupLaunch = 0;

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
            this.startLaunchSequence(collider);
        }
    }

    startLaunchSequence(airplaneDetected: Collider) {

        if(!this.isMissileLaunched) { 
            console.log('launching');
            this.isMissileLaunched = true;
            this.numberOfMissilesLaunched += 1;

            if(this.numberOfMissilesLaunched >= 3) {
                this.isGroupLaunched = true;
            }

            const airplanePosition = airplaneDetected.gameObject.transform.pos;
            const ourPosition = this.transform.pos;
            const dy = airplanePosition[1] - ourPosition[1];
            const dx = airplanePosition[0] - ourPosition[0];
            const direction = Math.atan2(dy, dx);

            const missileSpeed = 0.09;

            const vel: [number, number] = [
                missileSpeed * Math.cos(direction),
                missileSpeed * Math.sin(direction)
            ]
            const launchedMissile = new Missile(this.gameEngine, [this.transform.pos[0], this.transform.pos[1]], vel, airplaneDetected.gameObject.transform)
        }
        console.log('launch missile sequencing')
        // create missiles at the fire rate while still in range
        // will have to be done reversibly
    }

    hit(){
        this.lives -= 1;
        const pos = this.transform.absolutePosition();
        if (this.lives <= 0) {
            new ParticleExplosion(this.gameEngine, pos);
            this.createDestructionObjects()
            this.reversibleRemove();
        } 
        // if not dead, I can have a different type of explosion
    }

    reversibleRemove() {
        const oldTimeSinceLaunched = this.timeSinceLaunch = 0;
        const oldTimeSinceGroupLaunched = this.timeSinceGroupLaunch = 0;
        const oldPosition = this.transform.clonePosition();
        const oldGameTimeCreated = this.gameTimeCreated;
        const reCreate = (engine: GameEngine) => {
            const newPatriotMissileSite = new PatriotMissileSite(
                engine, 
                [oldPosition[0], oldPosition[1]]
            )
            newPatriotMissileSite.gameTimeCreated = oldGameTimeCreated;
            newPatriotMissileSite.timeSinceLaunch = oldTimeSinceLaunched;
            newPatriotMissileSite.timeSinceGroupLaunch = oldTimeSinceGroupLaunched;
            return newPatriotMissileSite;
        }
        this.engineReversibleRemove(reCreate);

    }

    update(deltaTime: number, gameTime: number) {
        // if(this.gameTimeCreated > gameTime) {
            // no need to track when it was created
            // since it will be created by the real events when going forward in time
            // oh and these only get created once at the beginning
        //     this.remove();
        // }
        this.animate(deltaTime);
        if(this.isMissileLaunched && !this.isGroupLaunched) {
            this.timeSinceLaunch += deltaTime
            if(this.timeSinceLaunch > this.reloadTime) {
                this.isMissileLaunched = false;
                this.timeSinceLaunch = 0;
            }

        }
        if(this.isGroupLaunched) {
            this.timeSinceGroupLaunch += deltaTime;
            if(this.timeSinceGroupLaunch > this.groupReloadTime) {
                this.isMissileLaunched = false;
                this.numberOfMissilesLaunched = 0;
                this.timeSinceLaunch = 0;
                this.isGroupLaunched = false;
                this.timeSinceGroupLaunch = 0;
            }
        }
    }

    animate(timeDelta: number) {
        
        // I should stick to no animation for now
        // for my own sanity
    }
    createDestructionObjects() {
        const s = 1;
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [0 * s, 0 * s],
                [-6 * s, 24 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [-6 * s, 24 * s],
                [18 * s, 30 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [18 * s, 30 * s],
                [24 * s, 6 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [24 * s, 6 * s],
                [0 * s, 0 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [6 * s, 27 * s],
                [12 * s, 3 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [-3 * s, 12 * s],
                [21 * s, 18 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [5 * s, 25 * s],
                [-4 * s, 23 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [-4 * s, 23 * s],
                [-2 * s, 14 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [-2 * s, 14 * s],
                [7 * s, 16 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [7 * s, 16 * s],
                [5 * s, 25 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [17 * s, 28 * s],
                [8 * s, 26 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [8 * s, 26 * s],
                [10 * s, 17 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [10 * s, 17 * s],
                [19 * s, 19 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [19 * s, 19 * s],
                [17 * s, 28 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [-1 * s, 11 * s],
                [8 * s, 13 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [8 * s, 13 * s],
                [10 * s, 4 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [10 * s, 4 * s],
                [1 * s, 2 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [1 * s, 2 * s],
                [-1 * s, 11 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [11 * s, 14 * s],
                [20 * s, 16 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [20 * s, 16 * s],
                [22 * s, 7 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [22 * s, 7 * s],
                [13 * s, 5 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [13 * s, 5 * s],
                [11 * s, 14 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [-6 * s, 24 * s],
                [-12 * s, 0 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [-12 * s, 0 * s],
                [-6 * s, -18 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [-6 * s, -18 * s],
                [12 * s, -12 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [12 * s, -12 * s],
                [24 * s, 6 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
        DeathAnimationLineBaseObjectWithSpeed(
            this.gameEngine,
            this.transform,
            this.transform.angle,
            [
                [0 * s, 0 * s],
                [-6 * s, -18 * s]
            ],
            this.destructedColor,
            this.destructionLineWidth
        );
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
        const s = 1;
        const pos = this.transform.absolutePosition();
        ctx.translate(pos[0], pos[1]);

        // Piece 1: 
        ctx.beginPath();
        ctx.moveTo(0 * s, 0 * s);
        ctx.lineTo(-6 * s, 24 * s);
        ctx.lineTo(18 * s, 30 * s);
        ctx.lineTo(24 * s, 6 * s);
        ctx.lineTo(0 * s, 0 * s);
        ctx.stroke();
        // Piece 2: 
        ctx.beginPath();
        ctx.moveTo(6 * s, 27 * s);
        ctx.lineTo(12 * s, 3 * s);
        ctx.stroke();
        // Piece 4: 
        ctx.beginPath();
        ctx.moveTo(-3 * s, 10 * s);
        ctx.stroke();
        // Piece 6: 
        ctx.beginPath();
        ctx.moveTo(-2 * s, 10 * s);
        ctx.stroke();
        // Piece 8: 
        ctx.beginPath();
        ctx.moveTo(-3 * s, 12 * s);
        ctx.lineTo(21 * s, 18 * s);
        ctx.stroke();
        // Piece 10: 
        ctx.beginPath();
        ctx.moveTo(5 * s, 25 * s);
        ctx.lineTo(-4 * s, 23 * s);
        ctx.lineTo(-2 * s, 14 * s);
        ctx.lineTo(7 * s, 16 * s);
        ctx.lineTo(5 * s, 25 * s);
        ctx.stroke();
        // Piece 11: 
        ctx.beginPath();
        ctx.moveTo(17 * s, 28 * s);
        ctx.lineTo(8 * s, 26 * s);
        ctx.lineTo(10 * s, 17 * s);
        ctx.lineTo(19 * s, 19 * s);
        ctx.lineTo(17 * s, 28 * s);
        ctx.stroke();
        // Piece 12: 
        ctx.beginPath();
        ctx.moveTo(-1 * s, 11 * s);
        ctx.lineTo(8 * s, 13 * s);
        ctx.lineTo(10 * s, 4 * s);
        ctx.lineTo(1 * s, 2 * s);
        ctx.lineTo(-1 * s, 11 * s);
        ctx.stroke();
        // Piece 13: 
        ctx.beginPath();
        ctx.moveTo(11 * s, 14 * s);
        ctx.lineTo(20 * s, 16 * s);
        ctx.lineTo(22 * s, 7 * s);
        ctx.lineTo(13 * s, 5 * s);
        ctx.lineTo(11 * s, 14 * s);
        ctx.stroke();
        // Piece 14: 
        ctx.beginPath();
        ctx.moveTo(-6 * s, 24 * s);
        ctx.lineTo(-12 * s, 0 * s);
        ctx.lineTo(-6 * s, -18 * s);
        ctx.lineTo(12 * s, -12 * s);
        ctx.lineTo(24 * s, 6 * s);
        ctx.stroke();
        // Piece 16: 
        ctx.beginPath();
        ctx.moveTo(0 * s, 0 * s);
        ctx.lineTo(-6 * s, -18 * s);
        ctx.stroke();
    }

    drawPatriotMissileSiteOriginal(ctx: CanvasRenderingContext2D) {
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