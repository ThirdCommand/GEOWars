import {GameObject} from "../../game_engine/game_object";
import {Sound} from "../../game_engine/sound";
import {BulletWallExplosion} from "../particles/bullet_wall_explosion";
import {BulletSprite} from "./bullet_sprite";
import {ParticleExplosion} from "../particles/particle_explosion";
export class Bullet extends GameObject {
    constructor(engine, pos, vel, bulletNumber) {
        super(engine);
        this.ID = bulletNumber;
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.transform.vel[0] = vel[0];
        this.transform.vel[1] = vel[1];
        this.length = 12;
        this.radius = this.length / 4;
        this.wrap = false;
        this.wallhit = new Sound("GEOWars/sounds/bullet_hitwall.wav", 1);
        this.addExplosionCollider();
        this.addPhysicsComponent();
        this.addLineSprite(new BulletSprite(this.transform));
        this.exploded = false;
        this.lifeTime = 4000;
        this.aliveTime = 0;
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

    update(deltaTime) {
        this.aliveTime += deltaTime;
        if (this.aliveTime > this.lifeTime) {
            this.remove();
        }
        if (
            this.gameEngine.gameScript.isOutOfBounds(
                this.transform.absolutePosition()
            ) &&
      !this.exploded
        ) {
            this.exploded = true;
            new BulletWallExplosion(this.gameEngine, this.transform.pos);

            this.gameEngine.queueSound(this.wallhit);
            this.remove();
        }
    }

    onCollision(collider, type) {
        if (type === "bulletHit") {
            if (collider.objectType === "Singularity") {
                collider.gameObject.bulletHit();
                this.remove();
            } else {
                const hitObjectTransform = collider.gameObject.transform;
                const pos = hitObjectTransform.absolutePosition();
                const vel = hitObjectTransform.absoluteVelocity();
                const explosion = new ParticleExplosion(this.gameEngine, pos);
                this.gameEngine.gameScript.tallyScore(collider.gameObject);
                collider.gameObject.remove();
                this.remove();
            }
        }
    }

    // move(timeDelta) {

    // }
}

Bullet.RADIUS = 3;
Bullet.SPEED = 7;
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
