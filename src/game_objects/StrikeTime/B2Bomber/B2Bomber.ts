import { GameObject } from "../../../game_engine/game_object";
import { LineSprite, Spawnable } from "../../../game_engine/line_sprite";
import { Transform } from "../../../game_engine/transform";
import { GameEngine } from "../../../game_engine/game_engine";
import { Camera } from "../../../game_engine/camera";
import {NextInstructionAccelerate, NextInstructionTurn} from "../../../game_engine/physics_component"
import { EngineExhaust } from "../Aurora/EngineExhaust";
import { AirDecelerationParticles } from "../Aurora/AirDecelerationParticles";
import { BombBasic } from "../Bombs/BombBasic";

export class B2Bomber extends GameObject {
    lineSprite: B2BomberSprite;
    radius: number;
    minSpeed: number;
    maxSpeed: number;
    controlsDirection: [number, number] = [0,0];
    controlsAngle: number | null = null;
    jetAcceleration: number;
    jetDeceleration: number;
    controllerInUse: boolean;
    gameEditorHasBeenOpened: boolean;
    isTurning: boolean;
    isAccelerating: boolean;
    leftExhaust: EngineExhaust
    rightExhaust: EngineExhaust
    airDecelerationParticles: AirDecelerationParticles;
    bombRefreshTime: number;

    constructor(
        engine: GameEngine,
        pos: [number, number],
        angle = Math.random() * Math.PI * 2
    ) {
        super(engine);
        this.transform.pos = pos;
        this.transform.angle = angle;
        this.transform.vel = [0, 0];

        this.radius = 30;
        this.minSpeed = 1;
        this.maxSpeed = 0.025 * 6;
        this.controlsDirection = [0,0];

        this.bombRefreshTime = 0;

        this.jetAcceleration =  0.0001;
        this.jetDeceleration = -0.00035;
        this.jetDeceleration = -0.0001;
        this.controllerInUse = false;
        this.gameEditorHasBeenOpened = false;

        this.isTurning = false;
        this.isAccelerating = false;

        this.camera = new Camera(engine, new Transform(null, [pos[0], pos[1]]), "Aurora Camera");
        this.setAsControllableGameObject();
        this.addBButtonListener();
        this.addReplayablePhysicsComponent();
        this.addLineSprite(new B2BomberSprite(this.transform));

        this.leftExhaust = new EngineExhaust(engine, this.transform, [
            -this.lineSprite.length/8,
            17/18* this.lineSprite.length
        ], 5);

        this.rightExhaust = new EngineExhaust(engine, this.transform, [
            this.lineSprite.length/8,
            17/18* this.lineSprite.length
        ], 5);
        this.airDecelerationParticles = new AirDecelerationParticles(engine, this.transform, this.lineSprite.length / 2, this.lineSprite.length);
        this.addCollider("General", this, this.radius);
    }

    updateBButtonListener(bButton: boolean) {
        if(bButton && this.bombRefreshTime > 2000) {
            new BombBasic(this.gameEngine,[this.transform.pos[0], this.transform.pos[1]], [0,0.05])
            this.bombRefreshTime = 0;
        }
    }

    animate(delta: number) {
        let movementDirection = 0;
        if(this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
            movementDirection = this.transform.angle;
        } else {
            movementDirection = Math.atan2(
                this.transform.vel[0],
                -this.transform.vel[1]
            );
        }
        this.transform.angle = movementDirection;
    }
    update(delta: number) {
        this.bombRefreshTime += delta;
        if(this.controlsAngle !== null) {
            // compare angle with controls angle
            // if angle is greater than 
            this.transform.angle
        }

        if(this.replayablePhysicsComponent.movementTangentAngle !== null) {
            this.transform.angle = this.replayablePhysicsComponent.movementTangentAngle;
        }

        if(this.isFocussedGameObject) {
            this.movementMechanics();
        }

        const shipXPos = this.transform.pos[0];
        const shipYPos = this.transform.pos[1];
        this.camera.transform.pos[0] = shipXPos;
        this.camera.transform.pos[1] = shipYPos;

        // visuals (animation)
        // if(this.replayablePhysicsComponent.isAccelerating) {
        //     if(this.replayablePhysicsComponent.accelerationInformation.isDecelerating) {
        //         this.leftExhaust.isDecelerating = true;
        //         this.rightExhaust.isDecelerating = true;
        //         this.leftExhaust.isAccelerating = false;
        //         this.rightExhaust.isAccelerating = false;
        //         this.airDecelerationParticles.isDecelerating = true;
        //     } else {
        //         this.airDecelerationParticles.isDecelerating = false;;
        //         this.leftExhaust.isAccelerating = true;
        //         this.rightExhaust.isAccelerating = true;
        //     }
            
        // } else {
        //     this.airDecelerationParticles.isDecelerating = false;

        //     this.leftExhaust.isAccelerating = false;
        //     this.rightExhaust.isAccelerating = false;
        //     this.leftExhaust.isDecelerating = false;
        //         this.rightExhaust.isDecelerating = false;
        // }

        // if(this.replayablePhysicsComponent.isTurning) {
        //     if(this.replayablePhysicsComponent.turnInformation.rotationDirection > 0) {
        //         this.leftExhaust.isAccelerating = true;
        //         this.rightExhaust.isAccelerating = false;
        //     } else {
        //         this.leftExhaust.isAccelerating = false;
        //         this.rightExhaust.isAccelerating = true;
        //     }
        // }


    }

    updateRightControlFocussedStickInput(direction: [number, number]): void {}
    updateFocussedMousePos(pos: [number, number]): void {}

    roundAngleTo16thsDegrees(radians: number) {
        return ((Math.round(radians / (2 * Math.PI) * 16) % 16) / 16) * 360
    }

    movementMechanics() {        
    }

    getTurnRadiusAndSpeed(angleChangeDegrees: number): {turnRadius: number, tangentSpeed: number} {
        const tightestRadius = 100;
        let tangentSpeed = 0;
        const fastestTurnSpeed = this.maxSpeed * 4/5;
        const radii = [
            tightestRadius * 4,
            tightestRadius * 3,
            tightestRadius * 2,
            tightestRadius
        ]   
        if(angleChangeDegrees >= 90) {
            tangentSpeed = Math.sqrt(radii[3] / radii[0]) * fastestTurnSpeed
            return {turnRadius: tightestRadius, tangentSpeed }
        } else if(angleChangeDegrees >= 67.5) {
            tangentSpeed = Math.sqrt(radii[2] / radii[0]) * fastestTurnSpeed
            return {turnRadius:  radii[2], tangentSpeed}
        } else if(angleChangeDegrees >= 45) {
            tangentSpeed = Math.sqrt(radii[1] / radii[0]) * fastestTurnSpeed
            return {turnRadius:  radii[1], tangentSpeed}
        } else if(angleChangeDegrees >= 22.5) {
            tangentSpeed = fastestTurnSpeed
            return {turnRadius:  radii[0], tangentSpeed}
        }
    }

    updateLeftControlFocussedStickInput(direction: [number, number]) {

        if (Math.abs(direction[0]) + Math.abs(direction[1]) > 0.20) {
            // round to nearest 1/16th of a circle
            
            const angle = (Math.atan2(direction[1], direction[0]) + Math.PI * 2) % (Math.PI * 2);
            const roundedAngle = ((Math.round((angle / (2 * Math.PI)) * 16) % 16) / 16) * 2 * Math.PI;
            this.controlsAngle = roundedAngle;
        } else {
            this.controlsAngle = null;
        }
    } 

    // there's a maximum speed that you can go
    // you accelerate to it when moving straight
    // when you turn, the maximum speed drops depending on the turn angle
    // tightest turn has the minimum speed;

    // the turn radius is determine by the difference in angle moving, and angle pointing
    // smallest radius turn angle is when 90 degrees or greater difference

    // when the stick is not pointing anywhere, the angle is not applied and the ship 
    // updateMovement(deltaTime: number) {
    //     if(!this.controllerInUse) return;

    // }
}

export class B2BomberSprite extends LineSprite {
    color: string;
    length: number;
    acceleration: number;

    constructor(transform: Transform) {
        super(transform);
        this.length = 60;
        this.acceleration = 0;
        this.color = "rgb(255, 255, 255)";
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.visible) return;
        const pos = this.transform.absolutePosition();

        const r = 255;
        const g = 255;
        const b = 50;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle);
        this.drawB2Bomber(ctx);
        ctx.restore();
    }

    drawB2Bomber(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(0,0);
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        const s = 1;

        ctx.moveTo(0 * s, 18 * s);
        ctx.beginPath();
        ctx.lineTo(51 * s, -12 * s);
        ctx.lineTo(36 * s, -12 * s);
        ctx.lineTo(27 * s, -6 * s);
        ctx.lineTo(21 * s, -12 * s);
        ctx.lineTo(-21 * s, -12 * s);
        ctx.lineTo(-27 * s, -6 * s);
        ctx.lineTo(-36 * s, -12 * s);
        ctx.lineTo(-51 * s, -12 * s);
        ctx.lineTo(0 * s, 18 * s);
        ctx.stroke();

        //Piece 2: 
        ctx.beginPath();
        ctx.moveTo(-3 * s, 6 * s);
        ctx.bezierCurveTo(
            -2 * s, 9 * s,
            2 * s, 9 * s,
            3 * s, 6 * s
        );
        ctx.bezierCurveTo(
            4 * s, -2 * s,
            -4 * s, -2 * s,
            -3 * s, 6 * s
        );
        ctx.stroke();

    }

}