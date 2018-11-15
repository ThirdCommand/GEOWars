const GameObject = require("../../../game_engine/game_object")
const Sound = require("../../../game_engine/sound")
const Util = require("../../../game_engine/util")

const AlienShipSprite = require("./alien_ship_sprite")

class AlienShip extends GameObject {
    constructor(engine, pos, shipTransform) {
        super(engine)
        this.transform.pos = pos
        this.shipTransform = shipTransform
        this.radius = 3;
        this.points = 120
        this.chaseSpeed = 3;
        this.addLineSprite(new GruntSprite(this.transform))
        this.addChildGameObject(new EnemySpawn(this.gameEngine))
        this.addCollider("General", this, this.radius)
        this.addPhysicsComponent()
    }

    // change to acceleration
    chase(timeDelta) {
        let speed = this.chaseSpeed;
        let shipPos = this.shipTransform.absolutePosition();
        let pos = this.transform.absolutePosition()
        let dy = shipPos[1] - pos[1];
        let dx = shipPos[0] - pos[0];

        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
        let direction = Math.atan2(dy, dx);

        pos[0] += speed * Math.cos(direction) * velocityScale
        pos[1] += speed * Math.sin(direction) * velocityScale
    }

    update(timeDelta) {
        if (this.exists) {
            this.chase(timeDelta)
            let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
            let cycleSpeed = 0.01;
            if (this.lineSprite.stretchScale_W < 0.7 || this.lineSprite.stretchScale_W > 1) {
                this.stretchDirection *= -1
            }

            this.lineSprite.stretchScale_W = this.lineSprite.stretchScale_W + -this.stretchDirection * cycleSpeed * cycleSpeedScale;
            this.lineSprite.stretchScale_L = this.lineSprite.stretchScale_L + this.stretchDirection * cycleSpeed * cycleSpeedScale;

            if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
                this.wallGraze()
            }
        }
    }

    bounce() {
        this.gameEngine.gameScript.bounce(this.transform, this.radius)
    }


}

module.exports = AlienShip;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;