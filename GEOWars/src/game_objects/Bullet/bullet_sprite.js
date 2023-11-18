import { LineSprite } from "../../game_engine/line_sprite";

export class BulletSprite extends LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
        this.length = 12;
    }

    draw(ctx) {
        const l = this.length;
        const pos = this.transform.absolutePosition();
        const vel = this.transform.absoluteVelocity();

        const w = this.length / 2;
        const movementDirection = Math.atan2(vel[0], -vel[1]);

        ctx.save();
        ctx.beginPath();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(movementDirection + 2 * Math.PI);

        ctx.beginPath();
        ctx.strokeStyle = "#FBFBC2";
        ctx.lineWidth = 1;

        ctx.moveTo(-l / 4, l / 2); //1
        ctx.lineTo(0, -l / 2); //2
        ctx.lineTo(l / 4, l / 2); //3

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}
