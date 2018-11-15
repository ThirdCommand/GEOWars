const LineSprite = require("../../../game_engine/line_sprite")

class AlienShipSprite extends LineSprite {
    constructor(transform) {
        super(transform)
        this.radius = 3;
        this.spawned = false;
    }

    draw(ctx) {

        ctx.strokeStyle = "#F173BA"

        let r = 180;
        let g = 180;
        let b = 255;

        ctx.save();
        // ctx.translate(pos[0], pos[1]);

        // ctx.strokeStyle = "#4286f4";
        // ctx.lineWidth = 4;
        let blurFactor = 0.5

        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.shadowBlur = 10
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 4;
        this.drawAlienShip(ctx, this.radius);
        ctx.lineWidth = 3
        this.drawAlienShip(ctx, this.radius);
        ctx.lineWidth = 2
        this.drawAlienShip(ctx, this.radius);
        ctx.lineWidth = 1
        this.drawAlienShip(ctx, this.radius);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 0.75
        this.drawAlienShip(ctx, this.radius);
        ctx.restore();
    }

    drawAlienShip(ctx, radius) {
        ctx.beginPath();
        let pos = this.transform.absolutePosition()
        ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, true);
        ctx.stroke();
    }
}

module.exports = AlienShipSprite