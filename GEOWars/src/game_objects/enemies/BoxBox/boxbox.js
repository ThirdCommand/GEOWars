import {GameObject} from "../../../game_engine/game_object";
import {Util} from "../../../game_engine/util";
import {Sound} from "../../../game_engine/sound";
import {EnemySpawn} from "../../particles/enemy_spawn";
import {BoxBoxSprite} from "./boxbox_sprite";

export class BoxBox extends GameObject {
    constructor(engine, pos) {
        super(engine)
        this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
        this.transform.pos = pos
        this.radius = 10
        this.points = 20
        // this.addPhysicsComponent()
        this.addLineSprite(new BoxBoxSprite(this.transform))
        this.addChildGameObject(new EnemySpawn(this.gameEngine))
        this.playSound(this.spawnSound)
    }

    exist() {
    // leaving off subscriptions means that things will subscribe to it
        this.addCollider("General", this, this.radius)
        // now it will move
        this.addPhysicsComponent()
    }
 
    wallGraze(){
        this.gameEngine.gameScript.wallGraze(this.transform, this.radius)
    }

    update(delta){
        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius * 2)) {
            this.wallGraze() 
        }
    }
}
