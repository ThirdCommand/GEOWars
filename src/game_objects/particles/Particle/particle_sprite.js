import { LineSprite } from "../../../game_engine/line_sprite";
import { Util } from "../../../game_engine/util";

export class ParticleSprite extends LineSprite {
    constructor(transform, color) {
        super(transform);
        this.rectLength = 15;
        this.rectWidth = 2;
        this.color = color;
        // test
    }

    drawTwoDimensionNoParallax(ctx) {
        const pos = this.transform.absolutePosition();
        const vel = this.transform.absoluteVelocity();
        const l = this.rectLength;
        const w = this.rectWidth;
        const movementDirection = Math.atan2(vel[0], -vel[1]);

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(movementDirection - Math.PI);

        ctx.beginPath();
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = w;

        ctx.moveTo(0, 0); //1
        // ctx.lineTo(0, l * Math.cos(this.transform.movementAngle[1])); //2
        ctx.beginPath();
        const r = 1;
        ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
        ctx.fill();
        // 
        ctx.closePath();
        // ctx.stroke();
        ctx.restore();
    }

    draw(ctx) {
        const pos = this.transform.absolutePosition();
        const r = this.transform.absoluteLength(3);
        const vel = this.transform.absoluteVelocity();
        const l = this.rectLength;
        const w = this.transform.absoluteLength(this.rectWidth);

        const movementDirection = Math.atan2(vel[0], -vel[1]);

        // calculate x, y, z of second point of line
        // use same calc, then add to current pos to get second point
        // const point2Position = Util.vector3Add(this.transform.pos, Util.vector3Cartesian(this.transform.movementAngle, l));

        // const Xc = this.transform.cameraTransform.pos[0];
        // const Yc = this.transform.cameraTransform.pos[1];
        // const Zc = this.transform.cameraTransform.pos[2];
        // const X1 = this.transform.pos[0];
        // const Y1 = this.transform.pos[1];
        // const Z1 = this.transform.pos[2];

        // const X2 = point2Position[0];
        // const Y2 = point2Position[1];
        // const Z2 = point2Position[2];

        // const Yp1 = Yc + (Y1-Yc)/(Z1-Zc) * (0 - Zc);
        // const Xp1 = Xc + (X1-Xc)/(Z1-Zc) * (0 - Zc);

        // const Yp2 = Yc + (Y2-Yc)/(Z2-Zc) * (0 - Zc);
        // const Xp2 = Xc + (X2-Xc)/(Z2-Zc) * (0 - Zc);

        

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(movementDirection - Math.PI);
        ctx.strokeStyle  = this.color.evaluateColor();
        ctx.fillStyle = this.color.evaluateColor();

        // the length and width should be closer as the particle gets closer to the camera
        
        ctx.fillRect(0,0,r, r*3);
        // ctx.beginPath();
        // ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
        // ctx.fill();
        // ctx.strokeStyle = this.color.evaluateColor();
        // ctx.lineWidth = w;

        // ctx.moveTo(Xp1, Yp1); //1
        // ctx.lineTo(Xp2, Yp2); //2
        // ctx.stroke();

        ctx.restore();
    }
}
