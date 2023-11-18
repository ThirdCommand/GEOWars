export class Transform {
    constructor(
        pos = [0, 0],
        vel = [0, 0],
        acc = [0, 0],
        angle = 0,
        aVel = 0,
        aAcc = 0,
        parentTransform = null
    ) {
        this.parentTransform = parentTransform;
        this.angle = angle;
        this.aVel = aVel;
        this.aAcc = aAcc;
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
    }

    // call up the tree of parent transforms until null
    // performing the transformation each step for the absolute
    absoluteAngle() {
        if (this.parentTransform == null) {
            return this.angle;
        } else {
            return this.angleAdd(this.angle, this.parentTransform.absoluteAngle());
        }
    }

    absolutePosition() {
        let absPos = [];
        if (this.parentTransform == null) {
            absPos = this.pos;
            return absPos;
        } else {
            return this.vectorAdd(this.pos, this.parentTransform.absolutePosition());
        }
    }

    absoluteVelocity() {
        let absVel = [];
        if (this.parentTransform == null) {
            absVel = this.vel;
            return absVel;
        } else {
            return this.vectorAdd(this.vel, this.parentTransform.absoluteVelocity());
        }
    }

    absoluteAcceleration() {
        let absAcc = [];
        if (this.parentTransform == null) {
            absAcc = this.acc;
            return absAcc;
        } else {
            return this.vectorAdd(
                this.acc,
                this.parentTransform.absoluteAcceleration()
            );
        }
    }

    vectorAdd(vector1, vector2) {
        return [vector1[0] + vector1[0], vector1[1] + vector2[1]];
    }

    angleAdd(angle1, angle2) {
        return (angle1 + angle2) % (2 * Math.PI);
    }
}
