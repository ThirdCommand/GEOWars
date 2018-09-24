const Particle = require("./Particle/particle")
const GameObject = require("../../game_engine/game_object")
const Sound = require("../../game_engine/sound")
const Color = require("../../game_engine/color")
class ShipExplosion extends GameObject {
    constructor(engine, pos) {
        super(engine)
        this.transform.pos[0] = pos[0]
        this.transform.pos[1] = pos[1]
        let startingH = (this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60) % 360
        let opacity = Math.random() * 0.35 + 0.6
        this.currentColor = new Color({
            "hsla": [startingH, 100, 50, opacity]
        });
        this.particleNum = 400;
        let explosionSound = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.2)
        this.playSound(explosionSound)
        this.createExplosionParticles()
    }

    createExplosionParticles() {
        for (var i = 0; i < this.particleNum; i++) {
            const speed = Math.random() * 10 + 4

            const colorVarienceDelta = 30
            let colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2
            let color = this.currentColor.dup()
            // color.a = Math.random() * 0.35 + 0.6
            // color.h = (color.h + colorVarience) % 360

            this.addChildGameObject(new Particle(this.gameEngine, this.transform.absolutePosition(), speed, color));
        }
    }

    update() {
        if (this.childObjects.length === 0) {
            this.remove()
        }
    }
    // ANIMATION = requestAnimationFrame(drawScene);
}




module.exports = ShipExplosion;