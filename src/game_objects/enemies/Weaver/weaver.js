
import { GameObject } from "../../../game_engine/game_object";
import { Sound } from "../../../game_engine/sound";
import { Util } from "../../../game_engine/util";
import { EnemySpawn } from "../../particles/enemy_spawn";
import { WeaverSprite } from "./weaver_sprite";


export class Weaver extends GameObject {
    constructor(engine, pos, shipTransform) {
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
        this.bulletDodgeSpeed = 6;

        this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_green.wav", 0.5);
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


    onCollision(collider, type){
        if (type === "BulletDodge") {
            this.acceptBulletDirection(collider.gameObject.transform.pos);
        }
        if(type === "Bump" && collider.gameObject !== this) {
            this.acceptBumpDirection(collider.gameObject.transform.pos);
        }
    }

    acceptBumpDirection(source) {
        this.bumpDirectionInfluenced = true;
        const dy = this.transform.pos[1] - source[1];
        const dx = this.transform.pos[0] - source[0];
        const unitVector = Util.dir([dx, dy]);
        this.bumpInfluencers.push(unitVector);
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

    acceptBulletDirection(source) {
        this.bulletDirectionInfluenced = true;
        const dy = this.transform.pos[1] - source[1];
        const dx = this.transform.pos[0] - source[0];
        const unitVector = Util.dir([dx, dy]);
        this.bulletInfluencers.push(unitVector);
    // first 
    }

    animate(timeDelta) {
        const rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2);
    }

    update(timeDelta){
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
  
            if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
                this.wallGraze();
            }
        }
    
    }

    wallGraze() {
        this.gameEngine.gameScript.wallGraze(this.transform, this.radius);
    }

    chase(timeDelta) {
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

Weaver.BOX_SIZE = 10;
Weaver.COLOR = "#3cff0b";

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;