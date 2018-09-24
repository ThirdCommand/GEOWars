const LineSprite = require("../../game_engine/line_sprite")
const Color = require("../../game_engine/color")
class OverlaySprite extends LineSprite {
    constructor(transform, DIM_X, DIM_Y) {
        super(transform)
        this.transform = transform
        this.width = DIM_X
        this.height = DIM_Y
        this.score = 0;
        this.lives = 0;
        this.fontSize = 20;
        this.fontStyle = "Arial"
        this.shadowColor = new Color({
            "hsla": [202, 100, 70, 1]
        });
        this.color = new Color({
            "hsla": [202, 100, 70, 0.5]
        });
    }

    draw(ctx) {
        ctx.save()
        // debugger
        ctx.translate(-350, -170)
        ctx.font = this.fontSize + "px " + this.fontStyle;
        ctx.fillStyle = this.color.evaluateColor();

        ctx.fillText("Score: " + this.score + "      " + "Lives: " + this.lives, this.transform.pos[0], this.transform.pos[1]);
        ctx.restore()
    }
}
module.exports = OverlaySprite