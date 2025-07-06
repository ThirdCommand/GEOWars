export class Transform {

    cameraTransform: Transform | null;
    parentTransform: Transform | null;
    angle: number;
    aVel: number;
    aAcc: number;
    pos: [number, number, number?];
    vel: [number, number, number?];
    acc: [number, number, number?];
    movementAngle?: [number, number];

    constructor(
        cameraTransform: Transform | null = null,
        pos: [number, number, number?] = [0, 0, 0],
        vel: [number, number, number?] = [0, 0, 0],
        acc: [number, number, number?] = [0, 0, 0],
        angle = 0,
        aVel = 0,
        aAcc = 0,
        parentTransform: Transform | null = null
    ) {
        this.cameraTransform = cameraTransform;
        this.parentTransform = parentTransform;
        this.angle = angle;
        this.aVel = aVel;
        this.aAcc = aAcc;
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
    }

    // object will have a render position projected on to the field based on where the camera is and the object's position (z)

    getRenderPosition() {
        // takes in the camera position and the object's position
        // returns the render position (position projected on to the field)
        
        //Yp = -Zc(Ys - Yc)/(-Zc + Zs)
        //Xp = -Zc(Xs - Xc)/(-Zc + Zs)


    }

    // call up the tree of parent transforms until null
    // performing the transformation each step for the absolute
    absoluteAngle(): number {
        if (this.parentTransform == null) {
            return this.angle;
        } else {
            return this.angleAdd(this.angle, this.parentTransform.absoluteAngle());
        }
    }
    // might have to make a more obvious function name
    // if the return type wrong. Like getScreenPosition
    absolutePosition(): [number, number, number?] {
        let absPos: [number, number] = [0,0];
       
        if (this.parentTransform == null) {
            if (this.pos[2] !== 0 && !isNaN(this.pos[2])) {
                const Xc = this.cameraTransform.pos[0];
                const Yc = this.cameraTransform.pos[1];
                const Zc = this.cameraTransform.pos[2];
                const Xs = this.pos[0];
                const Ys = this.pos[1];
                const Zs = this.pos[2];

                const Yp = Yc + (Ys-Yc)/(Zs-Zc) * (0 - Zc);
                const Xp = Xc + (Xs-Xc)/(Zs-Zc) * (0 - Zc);
                absPos = [Xp, Yp];
            } else {
                absPos = [this.pos[0], this.pos[1]];
            }
            
            return absPos;
        } else {
            return this.vectorAdd([this.pos[0], this.pos[1]], this.parentTransform.absolutePosition());
        }
    }

    absoluteLength(length: number): number {
        // doesn't care about line orientation
        // center of the line is current position, or adjusted by relative position
        // assuming camera is on top of the line
        if(this.cameraTransform) {
            const linePosition = this.vectorAdd([0,0,0], this.pos);
            const Zc = this.cameraTransform.pos[2];
            const pointOne = length / 2;
            const pointTwo = -length / 2;
            const Zs = linePosition[2];
            const absPointOne = (pointOne)/(Zs-Zc) * (0 - Zc);
            const absPointTwo = (pointTwo)/(Zs-Zc) * (0 - Zc);
            return absPointOne - absPointTwo;
        }
        return length;
    }

    absoluteVelocity(): [number, number, number?] {
        let absVel = [];
        if (this.parentTransform == null) {
            absVel = this.vel;
            return absVel;
        } else {
            return this.vectorAdd(this.vel, this.parentTransform.absoluteVelocity());
        }
    }

    absoluteAcceleration(): [number, number, number?] {
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

    vectorAdd(
        vector1: [number, number, number?], 
        vector2: [number, number, number?] ): [number, number, number?] {
        return vector1.length === 3 && vector2.length === 3 ? 
            [vector1[0] + vector2[0], vector1[1] + vector2[1], vector1[2] + vector2[2]] : 
            [vector1[0] + vector2[0], vector1[1] + vector2[1]];
    }

    angleAdd(angle1: number, angle2: number): number {
        return (angle1 + angle2) % (2 * Math.PI);
    }
}
