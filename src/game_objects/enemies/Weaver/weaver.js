
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
        this.weaverCloseHitBox = 20;
        this.shipTransform = shipTransform;
        this.directionInfluenced = false;
        this.influencers = [];
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
        // now it will move
        this.addPhysicsComponent();
        this.exists = true;
    }

    onCollision(collider, type){
        if (type === "BulletDodge") {
            this.acceptBulletDirection(collider.gameObject.transform.pos);
        }
    }

    influenceDirection() {
        let directionVector = [0, 0];

        this.influencers.forEach((influencer) => {
            const dx = directionVector[0] + influencer[0];
            const dy = directionVector[1] + influencer[1];
            const newVector = [dx, dy];
            directionVector = Util.dir(newVector);
        });
        const influencedDirection = Math.atan2(directionVector[1], directionVector[0]);
        return influencedDirection;
    }

    acceptBulletDirection(source) {
        this.directionInfluenced = true;
        const dy = this.transform.pos[1] - source[1];
        const dx = this.transform.pos[0] - source[0];
        const unitVector = Util.dir([dx, dy]);
        this.influencers.push(unitVector);
    // first 
    }

    animate(timeDelta) {
        const rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2);
    }

    update(timeDelta){
        if(this.exists){
            const speed = this.speed;
            const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

            this.animate(timeDelta);
      
      
            if (!this.directionInfluenced) {
                this.chase(timeDelta);
            } else {
                const direction = this.influenceDirection();
                this.transform.pos[0] += speed * Math.cos(direction) * velocityScale;
                this.transform.pos[1] += speed * Math.sin(direction) * velocityScale;
            }
  
            this.directionInfluenced = false;
  
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