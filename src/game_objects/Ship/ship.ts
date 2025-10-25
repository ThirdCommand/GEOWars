import { GameObject } from "../../game_engine/game_object";
import { Bullet } from "../Bullet/bullet";
import { Transform } from "../../game_engine/transform";

import { LineSprite } from "../../game_engine/line_sprite";
import { GameEngine } from "../../game_engine/game_engine";
import { GEOWarsScript, DIM_X, DIM_Y } from "../../GEOWarsScript";
import { type Collider } from "../../game_engine/collider";
import { Camera } from "../../game_engine/camera";

export type DirectionKey = 'w' | 'a' | 's' | 'd'

export class Ship extends GameObject {
    lineSprite: ShipSprite;
    radius: number;
    maxSpeed: number;
    mousePos: [number,number];
    fireAngle: number;
    bulletTimeCheck: number;
    bulletInterval: number;
    controlsDirection = [0,0];
    powerLevel: number;
    bulletNumber: number;
    speed: number;
    shipEngineAcceleration: number; // 0.125
    dontShoot: boolean;
    keysPressed: DirectionKey[];
    pauseKeyedUp: boolean;
    spawning: boolean;
    spawningTime: number;
    flashingTime: number;
    flashTime: number;
    flashing: boolean;
    flashIntervalTime: number;
    flashInterval: number;
    spawnTime: number;
    controllerInUse: boolean;
    isLevelDesignerOpened: boolean;
    static MOVES = {
        s: [0, 1],
        a: [-1, 0],
        w: [0, -1],
        d: [1, 0],
    };
    previousVelocityCorrection: [number, number];

    static BULLET_SOUND_URL = "sounds/Fire_normal.wav";
    static UPGRADE_BULLET_SOUND_URL = "sounds/Hi_Score_achieved.wav";

    constructor(engine: GameEngine, pos: [number, number, number?]) { 
        super(engine);
        this.transform.pos = pos;
        this.transform.pos[2] = 0;
        // I should add this to GameObject as this.addCamera
        this.camera = new Camera(engine, new Transform(null, [pos[0], pos[1]]), "ShipCamera");
        this.camera.zoomScale = 1.3;
        this.camera.defaultZoomScale = 1.3;
        this.previousVelocityCorrection = [0,0]
        
        this.setAsControllableGameObject();
        // when you add it as a focus controllable game object, 
        // I think you're forced to add functions to handle the different focussed input
        // like mouse position, left control stick input, right control stick input, etc.
        if(engine.activeCamera?.name !== "ShipCamera") {
            this.makeFocussedGameObject();
        }
        
        this.addPhysicsComponent();

        this.addMousePosListener();
        

        // will need to differentiate between direct focus and not
        // this.addLeftControlStickListener();
        // this.addRightControlStickListener();

        this.addStartButtonListener();
        this.radius = 10;
        this.addCollider("General", this, this.radius);
        this.addCollider("ShipDeath", this, this.radius, ["BoxBox", "Singularity", "Weaver", "Grunt", "Arrow", "Pinwheel", "AlienShip"], ["General"]);
        this.addLineSprite(new ShipSprite(this.transform));
        this.maxSpeed = 2.5; // 2.5
        this.mousePos = [0,0];
        this.fireAngle = 0;
        this.bulletTimeCheck = 0;
        this.bulletInterval = 120;
        this.controlsDirection = [0,0];
        this.powerLevel = 1;
        this.bulletNumber = 0;
        this.speed;
        this.shipEngineAcceleration = 0.5; // 0.125
        this.dontShoot = false;

        this.keysPressed = [];
        this.pauseKeyedUp = true;

        this.spawning = true;
        this.spawningTime = 0;
        this.flashingTime = 0;
        this.flashTime = 1000 / 8;
        this.flashing = true;
        this.flashIntervalTime = 0;
        this.flashInterval = 250 - 1000 / 8;
        this.spawnTime = 2500;
        this.lineSprite.flashHide = true;
        this.controllerInUse = false;
        this.isLevelDesignerOpened = false;
    // 1/8 of a second flash every half second
    }

    animate() {

    }

  
    update(deltaTime: number){
        // no idea where this shit will have to belong
        // brain currently melted
        if(this.gameEngine instanceof GameEngine && this.gameEngine.isLevelDesignerOpened) {
            if(!this.isLevelDesignerOpened) {
                const _width = DIM_X;
                const _height = DIM_Y;
                const _zoomScale = this.gameEngine.activeCamera.zoomScale;
                const _yPosition = this.transform.pos[1];
                const _xPosition = this.transform.pos[0];
                console.log({_width, _height, _zoomScale, _xPosition, _yPosition});
                this.gameEngine.ctx.translate(
                    ((_xPosition*_zoomScale - _width/(2))) ,
                    ((_yPosition*_zoomScale - _height/(2)))
                );
                this.gameEngine.activeCamera.zoomScale = 1 
            }
            this.isLevelDesignerOpened = true;
            return;
        } else {
            this.isLevelDesignerOpened = false;
        }
        this.bulletTimeCheck += deltaTime;

        // game state stuff that doesn't belong in the ship #gamestate
        if (this.bulletTimeCheck >= this.bulletInterval && !this.spawning && !this.dontShoot) {
            this.bulletNumber += 1;
            this.bulletTimeCheck = 0;
            this.fireBullet();
        } 

        if (this.spawning){

            this.spawningTime += deltaTime;
            if (this.flashing) {
                this.flashingTime += deltaTime;
                if (this.flashingTime > this.flashTime) {
                    this.flashingTime = 0;
                    this.flashing = false;
                    this.lineSprite.flashHide = false;
                } 
            } else {
                this.flashIntervalTime += deltaTime;
                if (this.flashIntervalTime > this.flashInterval) {
                    this.flashIntervalTime = 0;
                    this.flashing = true;
                    this.lineSprite.flashHide = true;
                } 
            }

            if (this.spawningTime > this.spawnTime) {
                this.spawning = false;
                this.flashing = false;
                this.lineSprite.flashHide = false;
                this.spawningTime = 0;
                this.flashIntervalTime = 0;
                this.flashingTime = 0;
            }
      
        }

        // this.moveInControllerDirection(deltaTime)

        if (this.isOutOfBounds()) {
            this.wallGraze();
        } else {
            if(this.isFocussedGameObject) {
                this.movementMechanics();
            } else {
                // slow to stop. This is wrong, but maybe an okay start?
                const Vo = this.transform.absoluteVelocity();
                const dV = [0 - Vo[0], 0 - Vo[1]];
                const alpha = Math.atan2(dV[1], dV[0]);
                this.transform.acc[0] += this.shipEngineAcceleration * Math.cos(alpha);
                this.transform.acc[1] += this.shipEngineAcceleration * Math.sin(alpha);
            }
        }
        // if ship is out of x bounds, maintain y speed, keep x at edge value

        this.updateZoomScale();

        const shipXPos = this.transform.pos[0];
        const shipYPos = this.transform.pos[1];

        this.camera.transform.pos[0] = shipXPos;
        this.camera.transform.pos[1] = shipYPos;
        
    }

    upgradeBullets() {
        if(this.powerLevel === 1) this.playSound(Ship.UPGRADE_BULLET_SOUND_URL);
        this.powerLevel = 3;
    }
  
    findSmallestDistanceToAWall(){
        const pos = this.transform.pos;
        const leftDistance = pos[0] - 0;
        const rightDistance = DIM_X - pos[0];
        const upDistance = pos[1] - 0;
        const downDistance = DIM_Y - pos[1];
        const distances = [leftDistance, rightDistance, upDistance, downDistance];
        return Math.min.apply(null, distances); 
    }

    updateZoomScale(){
        const distanceToZoomChange = 100;
        const smallestZoomScale = 0.75; // of the origional zoomscale
        const smallest = this.findSmallestDistanceToAWall();
        if (smallest < distanceToZoomChange) {
            this.camera.zoomScale = this.camera.defaultZoomScale * (smallest / distanceToZoomChange * (1 - smallestZoomScale) + smallestZoomScale);
        } else {
            this.camera.zoomScale = this.camera.defaultZoomScale
                
        }

        // this should also update the camera's Z position
    }

    // 
    calcControlsDirection(){
    
        this.controlsDirection = [0,0];
        this.keysPressed.forEach((key) => {
            this.controlsDirection[0] += Ship.MOVES[key][0];
            this.controlsDirection[1] += Ship.MOVES[key][1];
        });
    }

    movementMechanics() {
        // get dV
        //    mV => max speed in the direction of the controller
        //    Vo => current velocity
        //    dV~ =  mV - Vo
        // if dv~ > 0.2 (or something)
        //    a = ma~ 

        // TODO: uhhhh this is somehow causing absurd performance issues. especially when not moving
        // okay it's way better now but still a huge problem
        if (!this.controllerInUse) {
            this.calcControlsDirection();
        }

        const movementAngle = Math.atan2(this.controlsDirection[1], this.controlsDirection[0]);
        const Vo = this.transform.absoluteVelocity();
        let mV = [];

        if(this.controlsDirection[0] === 0 && this.controlsDirection[1] === 0){
            mV = [0, 0];
            if(this.transform.vel[0] === 0 && this.transform.vel[1] === 0) return;
        } else {
            mV = [this.maxSpeed * Math.cos(movementAngle), this.maxSpeed * Math.sin(movementAngle)];
            this.transform.angle = movementAngle;
        }

        const dV = [mV[0] - Vo[0], mV[1] - Vo[1]];
        const alpha = Math.atan2(dV[1], dV[0]);
        const vC = this.previousVelocityCorrection;

        if(this.signsSwapped(dV[0], vC[0]) && this.signsSwapped(dV[1], vC[1])) {
            this.transform.vel[0] = 0;
            this.transform.vel[1] = 0;
        } else if ( mV[0]===0 && mV[1]===0 ) {
            this.transform.acc[0] += this.shipEngineAcceleration/4 * Math.cos(alpha);
            this.transform.acc[1] += this.shipEngineAcceleration/4 * Math.sin(alpha);
        } else {
            this.transform.acc[0] += this.shipEngineAcceleration * Math.cos(alpha);
            this.transform.acc[1] += this.shipEngineAcceleration * Math.sin(alpha);
        }
       
    }

    signsSwapped(originalNumber: number, newNumber: number) {
        return originalNumber > 0 && newNumber < 0 || originalNumber < 0 && newNumber > 0
    }

    isOutOfBounds(){
        return GEOWarsScript.isOutOfBounds(this.transform.pos, this.radius);
    }

    updateMousePos(mousePos: [number, number]){
        // this is what happens when not focussed on. 
        // I can call a different function that targets the same spot
        // this.setFireAngle(mousePos);
    }
    
    updateFocussedMousePos(mousePos: [number, number]){
        this.setFireAngle(mousePos);
    }

    updateRightControlStickInput(vector: [number, number]) {
        // if (Math.abs(vector[0]) + Math.abs(vector[1]) > 0.10) {
        //     this.dontShoot = false;
        //     this.fireAngle = Math.atan2(vector[1], vector[0]);
        // } else {
        //     this.dontShoot = true;
        // }
    }

    // updateLeftControlStickInput for when you're listening but not focussed... 
    updateRightControlFocussedStickInput(direction: [number, number]) {
        if (Math.abs(direction[0]) + Math.abs(direction[1]) > 0.10) {
            this.dontShoot = false;
            this.fireAngle = Math.atan2(direction[1], direction[0]);
        } else {
            this.dontShoot = true;
        }
    }

    updateLeftControlFocussedStickInput(key: DirectionKey | [number, number], down = true) {
        if(key === 'w' || key === 'a' || key === 's' || key === 'd'){
            // accelerates to V = [0,0] when not pressed
            if (down) {
                if (!this.keysPressed.includes(key)) {
                    this.keysPressed.push(key);
                }

                // this.controlsDirection[0] += unitVector[0]
                // this.controlsDirection[1] += unitVector[1]
            } else {
                if (this.keysPressed.includes(key)) {
                    const index = this.keysPressed.indexOf(key);
                    if (index !== -1) this.keysPressed.splice(this.keysPressed.indexOf(key), 1);
                }

                // this.controlsDirection[0] -= unitVector[0]
                // this.controlsDirection[1] -= initVector[1]
            }
        } else {
            this.controllerInUse = true;
            if (Math.abs(key[0]) + Math.abs(key[1]) > 0.10) {
                this.controlsDirection = key;
            } else {
                this.controlsDirection = [0,0];
            }
        }
    } 
    // Refactor into game engine and game script
    updateStartButtonListener(pressed: boolean){
        if(pressed){
            if(this.pauseKeyedUp){
                this.pauseKeyedUp = false;
                if (this.gameEngine.paused && !this.gameEngine.muted) {
                    this.gameEngine.gameScript.theme.play();
                }
                this.gameEngine.togglePause();
            }
        } else {
            this.pauseKeyedUp = true;
        }
       
    }

    wallGraze() {
        GEOWarsScript.wallGraze(this.transform, this.radius * 2);
    }

    onCollision(collider: Collider, type: string) {
        if (type === "ShipDeath") {
  
            (this.gameEngine.gameScript as GEOWarsScript).death();
            this.deathflash();
        }
    }

    deathflash() {
        this.spawning = true;
        this.flashing = true;
    }

    setFireAngle(mousePos: [number, number]) {
    
        if (mousePos === undefined){
            mousePos = this.mousePos;
        } else {
            this.mousePos = mousePos;
        }
        const shipXPos = this.transform.pos[0];
        const shipYPos = this.transform.pos[1];
        const zoomScale = this.camera.zoomScale;
        const width = DIM_X;
        const height = DIM_Y;

        const mouseX = mousePos[0] / zoomScale + shipXPos  - width / (2 * zoomScale);
        const mouseY = mousePos[1] / zoomScale + shipYPos  - height / (2 * zoomScale);
        // SCALE NUMBER
        const dy =  mouseY - this.transform.pos[1];
        const dx =  mouseX - this.transform.pos[0];
        this.fireAngle =  Math.atan2(dy, dx);
    }

    fireBullet() {
    
        this.playSound(Ship.BULLET_SOUND_URL);
        const shipvx = this.transform.vel[0];
        const shipvy = this.transform.vel[1];

        const relBulletVelX1 = Bullet.SPEED * Math.cos(this.fireAngle);
        const relBulletVelY1 = Bullet.SPEED * Math.sin(this.fireAngle);

        const bulletVel1: [number, number] = [shipvx + relBulletVelX1, shipvy + relBulletVelY1];
        this.addChildGameObject(new Bullet(this.gameEngine, this.transform.pos, bulletVel1, this.bulletNumber, 'middle', this.powerLevel)); 

        if (this.powerLevel >= 2) {
            const relBulletVelX2 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle + Math.PI / 32);
            const relBulletVelY2 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle + Math.PI / 32);
            const relBulletVelX3 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle - Math.PI / 32);
            const relBulletVelY3 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle - Math.PI / 32);

            const bulletVel2: [number, number] = [shipvx + relBulletVelX2, shipvy + relBulletVelY2];
            const bulletVel3: [number, number] = [shipvx + relBulletVelX3, shipvy + relBulletVelY3];
            // doesn't support parent transformations... yet
            this.addChildGameObject(new Bullet(this.gameEngine, this.transform.pos, bulletVel2, this.bulletNumber, 'left', this.powerLevel));
            this.addChildGameObject(new Bullet(this.gameEngine, this.transform.pos, bulletVel3, this.bulletNumber,  'right', this.powerLevel));
        }
    }


    // implement threshold so it's not too sensitive

  

    relocate() {
    // this.GameScript.die();
    // this.transform.pos = this.game.randomPosition();
    // this.vel = [0, 0];
    // this.acc = [0, 0];
    }
}




export class ShipSprite extends LineSprite {
    flashHide: boolean;
    spawningScale: number;
    constructor(transform: Transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
        this.flashHide = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.flashHide) {
            const pos = this.transform.pos;
            const shipWidth = 10;
            // const vel = this.transform.absoluteVelocity();
            // let movementDirection = Math.atan2(vel[0], -vel[1])
            ctx.save();
            ctx.beginPath();
            ctx.translate(pos[0], pos[1]);
            ctx.rotate(this.transform.angle + Math.PI / 4);
            ctx.translate(-shipWidth / 2, shipWidth / 2);

            ctx.strokeStyle = "#ffffff";
            const r = 255;
            const g = 255;
            const b = 255;

            const blurFactor = 0.5;
            ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
            ctx.shadowBlur = 10 * blurFactor * blurFactor;
            ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
            ctx.lineWidth = 7.5 * blurFactor * blurFactor;
            ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
            this.drawShip(ctx, shipWidth);
            ctx.lineWidth = 6 * blurFactor;
            ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
            this.drawShip(ctx, shipWidth);
            ctx.lineWidth = 4.5;
            this.drawShip(ctx, shipWidth);
            ctx.lineWidth = 3;
            this.drawShip(ctx, shipWidth);
            ctx.strokeStyle = 'rgb(255, 255, 255)';
            ctx.lineWidth = 1.5;
            this.drawShip(ctx, shipWidth);

            ctx.restore();
        }
    
    }

    drawShip(ctx: CanvasRenderingContext2D, shipWidth: number) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -shipWidth);
        ctx.lineTo(2 / 3 * shipWidth, -(1 + 1 / 6) * shipWidth); //1
        ctx.lineTo(1 / 3 * shipWidth, -5 / 6 * shipWidth); // 2
        ctx.lineTo(1 / 3 * shipWidth, -1 / 3 * shipWidth); // 2.5
        ctx.lineTo(5 / 6 * shipWidth, -1 / 3 * shipWidth); // 3
        ctx.lineTo((1 + 1 / 6) * shipWidth, -2 / 3 * shipWidth); // 4
        ctx.lineTo(shipWidth, 0); // 5
        ctx.closePath();
        ctx.stroke();
    }
}

