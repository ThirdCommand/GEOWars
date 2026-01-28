import { AnimationView } from "../../../AnimationView";
import { GameEngine } from "../../../game_engine/game_engine";
import { GameObject } from "../../../game_engine/game_object";
import { LineSprite } from "../../../game_engine/line_sprite";
import { Transform } from "../../../game_engine/transform";
import { VectorMath } from "../../../game_engine/util";

export class DeathAnimationLineObject extends GameObject {
    removeTime: number;
    timeAround: number;
    constructor(
        engine: GameEngine | AnimationView,
        objectTransform: Transform,// position of the parent object
        objectAngle: number, // angle of the parent object
        linePointPositions: [[number, number], [number, number]], // relative to parent object origin
        color?: string,
        width?: number,
        speedParam?: number,
    ) {
        super(engine);
        this.removeTime = 3000;
        this.timeAround = 0;
        const objectPos = [objectTransform.pos[0], objectTransform.pos[1]]
        const speed = speedParam || 1;

        const linePoint1 = linePointPositions[0];
        const linePoint2 = linePointPositions[1];

        const length = Math.sqrt(
            (linePoint2[0] - linePoint1[0])**2 + 
            (linePoint2[1] - linePoint1[1])**2
        )

        // its position is the average of these two
        const line1PositionOnPlane = [
            (linePoint1[0] + linePoint2[0] )/ 2,
            (linePoint1[1] + linePoint2[1]) / 2
        ]

        const linePositionAngleRelativeToAurora =  Math.atan2(line1PositionOnPlane[1], line1PositionOnPlane[0]) - Math.PI;
        const lineAngleRelativeToAurora =  Math.atan2(linePoint2[1] - linePoint1[1], linePoint2[0] - linePoint1[0]) - Math.PI;

        const planeOriginToLine1CenterDistance = Math.sqrt(line1PositionOnPlane[0]**2 + (line1PositionOnPlane[1])**2);

        const lineMidpointPosition: [number, number] = [
            objectPos[0] - planeOriginToLine1CenterDistance * Math.cos(objectAngle + linePositionAngleRelativeToAurora),
            objectPos[1] - planeOriginToLine1CenterDistance * Math.sin(objectAngle + linePositionAngleRelativeToAurora)
        ]

        const lineAngle = lineAngleRelativeToAurora + objectAngle;

        this.transform.pos = [lineMidpointPosition[0], lineMidpointPosition[1]];
        this.transform.angle = lineAngle;
        const velocityVariancePercentage = 0.1; // 10%
        const velocity = 0.05 * speed;
        const angularVelocityVariance = 0.1; // 10%
        const angularVelocity = 0.075 * 0.15 * speed

        // create a random velocity and random angular velocity
        const randomVelocity = VectorMath.vectorCartesian(
            2 * Math.random() * Math.PI, 
            velocity + (velocity * velocityVariancePercentage) * Math.random()
        );
        
        const newVelocity = [randomVelocity[0] + objectTransform.vel[0] * 8, randomVelocity[1] + objectTransform.vel[1] * 8];
        const randomAngularVelocity = (angularVelocity + (angularVelocity * angularVelocityVariance)) * Math.random();

        this.transform.vel[0] = newVelocity[0];
        this.transform.vel[1] = newVelocity[1];

        this.transform.aVel = randomAngularVelocity;
        this.addLineSprite(new DeathAnimationSprite(this.transform, length, width || 1.5, color));
        this.addPhysicsComponent();
    }

    animate() {}

    update(deltaTime: number, gameTime: number) {
        if(this.gameTimeCreated > gameTime) {
            // no need to track when it was created
            // since it will be created by the real events when going forward in time
            this.remove();
        }
        this.timeAround += deltaTime;
        if(this.timeAround > this.removeTime) {
            this.reversibleRemove();
        }

    }

    reversibleRemove() {
        const oldPosition: [number, number, number] = this.transform.clonePosition();
        const oldVelocity: [number, number, number] = this.transform.cloneVelocity();
        const oldSpinVelocity = this.transform.aVel;
        const oldAngle = this.transform.angle;
        const oldLength = (this.lineSprite as DeathAnimationSprite).length;
        const oldWidth = (this.lineSprite as DeathAnimationSprite).lineWidth;
        const oldColor = (this.lineSprite as DeathAnimationSprite).color
        const oldTimeAround = this.timeAround;
        const gameTimeCreated = this.gameTimeCreated;
        const reCreate = (engine: GameEngine) => {
            const newObject = new DeathAnimationLineObject(engine, new Transform(),0,[[0,1],[1,2]]);
            newObject.transform.pos = oldPosition;
            newObject.transform.vel = oldVelocity;
            newObject.transform.aVel = oldSpinVelocity;
            newObject.transform.angle = oldAngle;
            (newObject.lineSprite as DeathAnimationSprite).length = oldLength;
            (newObject.lineSprite as DeathAnimationSprite).lineWidth = oldWidth;
            (newObject.lineSprite as DeathAnimationSprite).color = oldColor;
            newObject.gameTimeCreated = gameTimeCreated;
            newObject.timeAround = oldTimeAround;
        }
        this.engineReversibleRemove(reCreate);
    }
}
export class DeathAnimationArcObject extends GameObject {
    timeAround: number;
    removeTime: number;
    constructor(
        engine: GameEngine | AnimationView,
        objectTransform: Transform,// position of the parent object
        objectAngle: number, // angle of the parent object
        arcData: {
            startPos: [number, number],
            endPos: [number, number],
            centerPosition: [number, number],
            radius: number,
            startAngle: number,
            endAngle: number,
            counterClockwise: boolean,
        }, // relative to parent object origin
        color?: string,
        width?: number,
        speedParam?: number,
    ) {
        super(engine);
        this.removeTime = 3000;
        this.timeAround = 0;
        const speed = speedParam || 1;
        const objectPos = [objectTransform.pos[0], objectTransform.pos[1]]
        const {centerPosition, radius, startAngle, endAngle, counterClockwise} = arcData;

        const arcCenterPositionAngleRelativeToObject =  Math.atan2(centerPosition[1], centerPosition[0]) - Math.PI;
        const startAngleRelativeToObject = startAngle;
        const endAngleRelativeToObject = endAngle;

        const objectOriginToCenterDistance = Math.sqrt(centerPosition[0]**2 + (centerPosition[1])**2);

        const newCenterPosition: [number, number] = [
            objectPos[0] - objectOriginToCenterDistance * Math.cos(objectAngle + arcCenterPositionAngleRelativeToObject),
            objectPos[1] - objectOriginToCenterDistance * Math.sin(objectAngle + arcCenterPositionAngleRelativeToObject)
        ]

        const newStartAngle = startAngleRelativeToObject + objectAngle;
        const newEndAngle = endAngleRelativeToObject + objectAngle;


        this.transform.pos = [newCenterPosition[0], newCenterPosition[1]];
        this.transform.angle = 0;

        // create a random velocity and random angular velocity
        const velocityVariancePercentage = 0.1; // 10%
        const velocity = 0.05 * speed;
        const angularVelocityVariance = 0.1; // 10%
        const angularVelocity = 0.075 * 0.15 * speed

        // create a random velocity and random angular velocity
        const randomVelocity = VectorMath.vectorCartesian(
            2 * Math.random() * Math.PI, 
            velocity + (velocity * velocityVariancePercentage) * Math.random()
        );
        
        const newVelocity = [randomVelocity[0] + objectTransform.vel[0] * 8, randomVelocity[1] + objectTransform.vel[1] * 8];
        const randomAngularVelocity = (angularVelocity + (angularVelocity * angularVelocityVariance)) * Math.random();

        this.transform.vel[0] = newVelocity[0];
        this.transform.vel[1] = newVelocity[1];

        this.transform.aVel = randomAngularVelocity;
        this.addLineSprite(new DeathAnimationArcSprite(
            this.transform, 
            {
                startAngle: newStartAngle, 
                endAngle: newEndAngle, 
                radius, 
                counterClockwise, 
                centerPosition: 
                    [0, 0]
                }, 
            width || 1.5, color
        ));
        this.addPhysicsComponent();
    }

    animate() {}

    reversibleRemove() {
        const oldPosition = this.transform.clonePosition();
        const oldVelocity = this.transform.cloneVelocity();
        const oldAngle = this.transform.angle;
        const oldAngleVelocity = this.transform.aVel;

    }

    update(deltaTime: number) {
        this.timeAround += deltaTime;
        if(this.timeAround > this.removeTime) {
            this.remove();
        }

    }
}
export class DeathAnimationBezierCurveObject extends GameObject {
    timeAround: number;
    removeTime: number;
    constructor(
        engine: GameEngine | AnimationView,
        objectTransform: Transform,// position of the parent object
        objectAngle: number, // angle of the parent object
        bezierCurveData: {
            startPos: [number, number],
            endPos: [number, number],
            controlPoint1: [number, number],
            controlPoint2: [number, number],
        }, // relative to parent object origin
        color?: string,
        width?: number,
        speed?: number,
    ) {
        super(engine);
        this.timeAround = 0;
        this.removeTime = 3000;
        const objectPos = [objectTransform.pos[0], objectTransform.pos[1]]
        const {
            startPos, 
            endPos, 
            controlPoint1, 
            controlPoint2
        } = bezierCurveData;

        const midPoint = [(startPos[0] + endPos[0]) / 2, (startPos[1] + endPos[1])/ 2];

        const [
            startPosNewO,
            endPosNewO,
            controlPoint1NewO,
            controlPoint2NewO
        ] = [
            startPos,endPos,controlPoint1,controlPoint2
        ].map<[number, number]>((point) => [point[0] - midPoint[0], point[1] - midPoint[1]]);

        const midPointAngleRelativeToObject =  Math.atan2(midPoint[1], midPoint[0]) - Math.PI;

        // const startPosAngleRelativeToNewOrigin =  Math.atan2(startPosNewO[1], startPosNewO[0]) - Math.PI;
        // const endPosAngleRelativeToObject =  Math.atan2(endPosNewO[1], endPosNewO[0]) - Math.PI;
        // const controlPoint1AngleRelativeToObject =  Math.atan2(controlPoint1NewO[1], controlPoint1NewO[0]) - Math.PI;
        // const controlPoint2AngleRelativeToObject =  Math.atan2(controlPoint2NewO[1], controlPoint2NewO[0]) - Math.PI;

        const midPointToNewOriginDistance = Math.sqrt(midPoint[0]**2 + (midPoint[1])**2);

        // const startPosToNewOriginDistance = Math.sqrt(startPosNewO[0]**2 + (startPosNewO[1])**2);
        // const endPosNewOriginDistance = Math.sqrt(endPosNewO[0]**2 + (endPosNewO[1])**2);
        // const controlPoint1NewOriginDistance = Math.sqrt(controlPoint1NewO[0]**2 + (controlPoint1NewO[1])**2);
        // const controlPoint2NewOriginDistance = Math.sqrt(controlPoint2NewO[0]**2 + (controlPoint2NewO[1])**2);

        const newOriginPosition: [number, number] = [
            objectPos[0] - midPointToNewOriginDistance * Math.cos(objectAngle + midPointAngleRelativeToObject),
            objectPos[1] - midPointToNewOriginDistance * Math.sin(objectAngle + midPointAngleRelativeToObject)
        ]


        this.transform.pos = [newOriginPosition[0], newOriginPosition[1]];
        this.transform.angle = 0;

        const velocityVariancePercentage = 0.1; // 10%
        const velocity = 0.05;
        const angularVelocityVariance = 0.1; // 10%
        const angularVelocity = 0.075 * 0.15

        // create a random velocity and random angular velocity
        const randomVelocity = VectorMath.vectorCartesian(
            2 * Math.random() * Math.PI, 
            velocity + (velocity * velocityVariancePercentage) * Math.random()
        );
        
        const newVelocity = [randomVelocity[0] + objectTransform.vel[0] * 8, randomVelocity[1] + objectTransform.vel[1] * 8];
        const randomAngularVelocity = (angularVelocity + (angularVelocity * angularVelocityVariance)) * Math.random();

        this.transform.vel[0] = newVelocity[0];
        this.transform.vel[1] = newVelocity[1];

        this.transform.aVel = randomAngularVelocity;
        this.addLineSprite(new DeathAnimationBezierCurveSprite(
            this.transform, 
            {
                startPos: startPosNewO,
                endPos: endPosNewO,
                controlPoint1: controlPoint1NewO,
                controlPoint2: controlPoint2NewO,
                
            }, 
            width || 1.5, color
        ));
        this.addPhysicsComponent();
    }
    animate(dT: number): void {}

    update(deltaTime: number) {
        this.timeAround += deltaTime;
        if(this.timeAround > this.removeTime) {
            this.remove();
        }

    }
}
export class DeathAnimationSprite extends LineSprite {
    length: number;
    color: string;
    lineWidth: number;
    
    constructor(transform: Transform, length: number, lineWidth?: number, color?: string) {
        // the color should be slightly less vibrant
        // and chosen by the parent object.. but for the future
        super(transform);
        this.length = length;
        this.color = color ? color : "rgb(255, 255, 255)";
        this.lineWidth = lineWidth ? lineWidth : 1.5;
    }
    draw(ctx: CanvasRenderingContext2D) {
        // I'm given a midpoint and a length

        const pos = this.transform.absolutePosition();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        
        ctx.beginPath();
        ctx.moveTo(-this.length / 2, 0);
        ctx.lineTo(this.length / 2, 0);
        ctx.stroke();

        ctx.restore();
    }
}
export class DeathAnimationArcSprite extends LineSprite {
    length: number;
    color: string;
    lineWidth: number;
    arcData: {
        centerPosition: [number, number],
        radius: number,
        startAngle: number,
        endAngle: number,
        counterClockwise: boolean,
    };
    constructor(
        transform: Transform, 
        arcData: {
            centerPosition: [number, number],
            radius: number,
            startAngle: number,
            endAngle: number,
            counterClockwise: boolean,
        }, 
        lineWidth?: number, 
        color?: string
    ) {
        // the color should be slightly less vibrant
        // and chosen by the parent object.. but for the future
        super(transform);
        this.arcData = arcData;
        this.color = color ? color : "rgb(255, 255, 255)";
        this.lineWidth = lineWidth ? lineWidth : 1.5;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const {centerPosition, radius, startAngle, endAngle, counterClockwise} = this.arcData;

        const pos = this.transform.absolutePosition();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        
        ctx.beginPath();
        ctx.arc(centerPosition[0], centerPosition[1], radius, startAngle, endAngle, counterClockwise);
        ctx.lineTo(this.length / 2, 0);
        ctx.stroke();

        ctx.restore();
    }
}
export class DeathAnimationBezierCurveSprite extends LineSprite {
    length: number;
    color: string;
    lineWidth: number;
    bezierCurveData: {
        startPos: [number, number],
        endPos: [number, number],
        controlPoint1: [number, number],
        controlPoint2: [number, number],
    };
    constructor(
        transform: Transform, 
        bezierCurveData: {
            startPos: [number, number],
            endPos: [number, number],
            controlPoint1: [number, number],
            controlPoint2: [number, number],
        }, 
        lineWidth?: number, 
        color?: string
    ) {
        // the color should be slightly less vibrant
        // and chosen by the parent object.. but for the future
        super(transform);
        this.bezierCurveData = bezierCurveData;
        this.color = color ? color : "rgb(255, 255, 255)";
        this.lineWidth = lineWidth ? lineWidth : 1.5;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const {
            startPos,
            endPos,
            controlPoint1,
            controlPoint2
        } = this.bezierCurveData;

        const pos = this.transform.absolutePosition();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        
        ctx.beginPath();
        ctx.moveTo(startPos[0], startPos[1]);
        ctx.bezierCurveTo(
            controlPoint1[0], 
            controlPoint1[1], 
            controlPoint2[0], 
            controlPoint2[1], 
            endPos[0], 
            endPos[0]
        );
        ctx.stroke();

        ctx.restore();
    }
}