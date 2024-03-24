import {Sound} from "../../../game_engine/sound";
import {Util} from "../../../game_engine/util";
import {GameObject} from "../../../game_engine/game_object";
import {EnemySpawn} from "../../particles/enemy_spawn";
import {PinwheelSprite} from "./pinwheel_sprite";

export class Pinwheel extends GameObject {
    constructor(engine, pos) {
        super(engine);
        this.rotation_speed = 0.05;
        const speed = 1;
        this.points = 20;
        this.transform.pos = pos;
        this.transform.vel = Util.randomVec(speed);
        this.spawnSound = new Sound("sounds/Enemy_spawn_blue.wav", 0.5);
        this.playSound(this.spawnSound);
        this.addLineSprite(new PinwheelSprite(this.transform));
        this.addChildGameObject(new EnemySpawn(this.gameEngine));
        this.radius = 5;
    }
  
    exist() {
    // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius);
        // now it will move
        this.addPhysicsComponent();
    }

    animate(deltaTime) {
        const rotationSpeedScale = deltaTime / NORMAL_FRAME_TIME_DELTA;
        this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2);
    }

    update(deltaTime){
        this.animate(deltaTime);
        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
            this.gameEngine.gameScript.bounce(this.transform, this.radius); // HARD CODED
        }
    }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;