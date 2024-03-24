import {GameObject} from "../../../game_engine/game_object";
import {Sound} from "../../../game_engine/sound";
import { Util } from "../../../game_engine/util";
import {EnemySpawn} from "../../particles/enemy_spawn";
import {GruntSprite} from "./grunt_sprite";
export class Grunt extends GameObject {
    constructor(engine, pos, shipTransform) {
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
        this.spawnSound = new Sound("sounds/Enemy_spawn_blue.wav", 0.5);
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

    onCollision(collider, type){
        if (type === "Bump" && collider.gameObject !== this) {
            this.acceptBumpDirection(collider.gameObject.transform.pos);
        }
    }
    

    acceptBumpDirection(source) {
        this.bumpDirectionInfluenced = true;
        const dy = this.transform.pos[1] - source[1];
        const dx = this.transform.pos[0] - source[0];
        const unitVector = Util.dir([dx, dy]);
        this.bumpInfluencers.push(unitVector);
    // first 
    }

    influenceDirection(influencers) {
        let directionVector = [0, 0];

        influencers.forEach((influencer) => {
            const dx = directionVector[0] + influencer[0];
            const dy = directionVector[1] + influencer[1];
            const newVector = [dx, dy];
            directionVector = Util.dir(newVector);
        });
        const influencedDirection = Math.atan2(directionVector[1], directionVector[0]);
        return influencedDirection;
    }





    // ADDING MOVEMENT MECHANICS FOR GRUNT

    chase(timeDelta) {
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

    animate(timeDelta) {
        const cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        const cycleSpeed = 0.01;
        if (this.lineSprite.stretchScale_W < 0.7 || this.lineSprite.stretchScale_W > 1) {
            this.stretchDirection *= -1;
        }

        this.lineSprite.stretchScale_W = this.lineSprite.stretchScale_W + -this.stretchDirection * cycleSpeed * cycleSpeedScale;
        this.lineSprite.stretchScale_L = this.lineSprite.stretchScale_L + this.stretchDirection * cycleSpeed * cycleSpeedScale;

    }

    update(timeDelta) {
        if (this.exists) {
            const bumpAcceleration = this.bumpAcceleration;

            this.animate(timeDelta);

            if(this.bumpDirectionInfluenced) {
                const direction = this.influenceDirection(this.bumpInfluencers);
                this.transform.acc[0] += bumpAcceleration * Math.cos(direction) / 100;
                this.transform.acc[1] += bumpAcceleration * Math.sin(direction) / 100;
            } 
            this.chase(timeDelta);
      
            if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
                this.wallGraze();
            }
            this.bumpInfluencers = [];
            this.bumpDirectionInfluenced = false;
        }
    }

    wallGraze() {
        this.gameEngine.gameScript.wallGraze(this.transform, this.radius);
    }

  
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;