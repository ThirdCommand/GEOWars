import { GameObject } from "../../game_engine/game_object";
import { Sound } from "../../game_engine/sound";
import { ShipSprite } from "./ship_sprite";
import { Bullet } from "../Bullet/bullet";
import { Transform } from "../../game_engine/transform";

export class Ship extends GameObject {
    constructor(engine, pos, initialCameraZPos) { 
        super(engine);
        this.transform.pos = pos;
        this.transform.pos[2] = [0];
        this.cameraTransform = new Transform();
        this.cameraTransform.pos = [pos[0], pos[1], initialCameraZPos];
        this.addPhysicsComponent();
        this.addMousePosListener();
        this.addLeftControlStickListener();
        this.addRightControlStickListener();
        this.addStartButtonListener();
        this.radius = 10;
        this.addCollider("General", this, this.radius);
        this.addCollider("ShipDeath", this, this.radius, ["BoxBox", "Singularity", "Weaver", "Grunt", "Arrow", "Pinwheel", "AlienShip"], ["General"]);
        this.addLineSprite(new ShipSprite(this.transform));
        this.maxSpeed = 2.5; // 2.5
        this.mousePos = [0,0];
        this.fireAngle = 0;
        this.bulletSound = new Sound("sounds/Fire_normal.wav", 0.2);
        this.upgradeBulletsSound = new Sound("sounds/Hi_Score_achieved.wav");
        this.bulletTimeCheck = 0;
        this.bulletInterval = 120;
        this.controlsDirection = [0,0];
        this.powerLevel = 1;
        this.bulletNumber = 0;
        this.controlsPointing = true;
        this.speed;
        this.shipEngineAcceleration = 0.5; // 0.125
        this.dontShoot = false;

        this.keysPressed = [];
        this.pauseKeyedUp = true;
        this.zooming = true;

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
        this.gameEditorHasBeenOpened = false;
    // 1/8 of a second flash every half second
    }

  
    update(deltaTime){
        if(this.gameEngine.gameEditorOpened) {
            if(!this.gameEditorHasBeenOpened) {
                const _width = this.gameEngine.gameScript.DIM_X;
                const _height = this.gameEngine.gameScript.DIM_Y;
                const _zoomScale = this.gameEngine.zoomScale;
                const _yPosition = this.transform.pos[1];
                const _xPosition = this.transform.pos[0];
                console.log({_width, _height, _zoomScale, _xPosition, _yPosition});
                this.gameEngine.ctx.translate(
                    ((_xPosition*_zoomScale - _width/(2))) ,
                    ((_yPosition*_zoomScale - _height/(2)))
                );
                this.gameEngine.zoomScale = 1;
            }
            this.gameEditorHasBeenOpened = true;
            return;
        } else {
            this.gameEditorHasBeenOpened = false;
        }
        this.bulletTimeCheck += deltaTime;

        // game state stuff that doesn't belong in the ship #gamestate
        if (this.bulletTimeCheck >= this.bulletInterval && !this.spawning && this.controlsPointing && !this.dontShoot) {
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
            this.movementMechanics(deltaTime);
      
        }
        // if ship is out of x bounds, maintain y speed, keep x at edge value

        this.updateZoomScale();

        // stuff that belongs in camera #camera
        this.gameEngine.ctx.restore();
        this.gameEngine.ctx.save();
        const shipXPos = this.transform.pos[0];
        const shipYPos = this.transform.pos[1];
        const zoomScale = this.gameEngine.zoomScale;
        const width = this.gameEngine.gameScript.DIM_X;
        const height = this.gameEngine.gameScript.DIM_Y;

        this.cameraTransform.pos[0] = shipXPos;
        this.cameraTransform.pos[1] = shipYPos;
        // this.cameraTransform.pos[2] = based on zoomScale

        this.gameEngine.ctx.translate(
            -shipXPos * zoomScale + width / 2,
            -shipYPos * zoomScale + height / 2
        );
    }

    upgradeBullets() {
        this.powerLevel += 1;
        this.playSound(this.upgradeBulletsSound);
    }
  
    findSmallestDistanceToAWall(){
        const pos = this.transform.pos;
        const leftDistance = pos[0] - 0;
        const rightDistance = this.gameEngine.gameScript.DIM_X - pos[0];
        const upDistance = pos[1] - 0;
        const downDistance = this.gameEngine.gameScript.DIM_Y - pos[1];
        const distances = [leftDistance, rightDistance, upDistance, downDistance];
        return Math.min.apply(null, distances); 
    }

    updateZoomScale(){
        const distanceToZoomChange = 100;
        const smallestZoomScale = 0.75; // of the origional zoomscale
        const smallest = this.findSmallestDistanceToAWall();
        if (smallest < distanceToZoomChange) {
            this.gameEngine.zoomScale = this.gameEngine.defaultZoomScale * (smallest / distanceToZoomChange * (1 - smallestZoomScale) + smallestZoomScale);
        } else {
            this.gameEngine.zoomScale = this.gameEngine.defaultZoomScale;
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

    movementMechanics(deltaTime) {
    // get dV
    //    mV => max speed in the direction of the controller
    //    Vo => current velocity
    //    dV~ =  mV - Vo
    // if dv~ > 0.2 (or something)
    //    a = ma~ 
        if (!this.controllerInUse) {
            this.calcControlsDirection();
        }

        const movementAngle = Math.atan2(this.controlsDirection[1], this.controlsDirection[0]);
        const Vo = this.transform.absoluteVelocity();
        let mV = [];

        if(this.controlsDirection[0] == 0 && this.controlsDirection[1] == 0){
            mV = [0, 0];
        } else {
            mV = [this.maxSpeed * Math.cos(movementAngle), this.maxSpeed * Math.sin(movementAngle)];
            this.transform.angle = movementAngle;
        }

        const dV = [mV[0] - Vo[0], mV[1] - Vo[1]];
        const alpha = Math.atan2(dV[1], dV[0]);

        this.transform.acc[0] += this.shipEngineAcceleration * Math.cos(alpha);
        this.transform.acc[1] += this.shipEngineAcceleration * Math.sin(alpha);
    }

    isOutOfBounds(){
        return this.gameEngine.gameScript.isOutOfBounds(this.transform.pos, this.radius);
    }

    updateMousePos(mousePos){
        this.setFireAngle(mousePos);
    }

    updateRightControlStickInput(vector) {
        if (Math.abs(vector[0]) + Math.abs(vector[1]) > 0.10) {
            this.dontShoot = false;
            this.fireAngle = Math.atan2(vector[1], vector[0]);
        } else {
            this.dontShoot = true;
        }
    }

    updateLeftControlStickInput(key, down = true) {
        if(typeof key === "string"){
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
    updateStartButtonListener(key, down){
        if (typeof key === "string"){
            if(down){
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
        } else if(key[0]) {
            if (this.pauseKeyedUp){
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
        this.gameEngine.gameScript.wallGraze(this.transform, this.radius * 2);
    }

    onCollision(collider, type) {
        if (type === "ShipDeath") {
  
            this.gameEngine.gameScript.death();
            this.deathflash();
        }
    }

    deathflash() {
        this.spawning = true;
        this.flashing = true;
    }

    setFireAngle(mousePos) {
    
        if (mousePos === undefined){
            mousePos = this.mousePos;
        } else {
            this.mousePos = mousePos;
        }
        const shipXPos = this.transform.pos[0];
        const shipYPos = this.transform.pos[1];
        const zoomScale = this.gameEngine.zoomScale;
        const width = this.gameEngine.gameScript.DIM_X;
        const height = this.gameEngine.gameScript.DIM_Y;

        const mouseX = mousePos[0] / zoomScale + shipXPos  - width / (2 * zoomScale);
        const mouseY = mousePos[1] / zoomScale + shipYPos  - height / (2 * zoomScale);
        // SCALE NUMBER
        const dy =  mouseY - this.transform.pos[1];
        const dx =  mouseX - this.transform.pos[0];
        this.fireAngle =  Math.atan2(dy, dx);
    }

    fireBullet() {
    
        this.gameEngine.queueSound(this.bulletSound);
        const shipvx = this.transform.vel[0];
        const shipvy = this.transform.vel[1];

        const relBulletVelX1 = Bullet.SPEED * Math.cos(this.fireAngle);
        const relBulletVelY1 = Bullet.SPEED * Math.sin(this.fireAngle);

        const bulletVel1 = [shipvx + relBulletVelX1, shipvy + relBulletVelY1];
        this.addChildGameObject(new Bullet(this.gameEngine, this.transform.pos, bulletVel1, this.bulletNumber));

        if (this.powerLevel >= 2) {
            const relBulletVelX2 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle + Math.PI / 32);
            const relBulletVelY2 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle + Math.PI / 32);
            const relBulletVelX3 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle - Math.PI / 32);
            const relBulletVelY3 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle - Math.PI / 32);

            const bulletVel2 = [shipvx + relBulletVelX2, shipvy + relBulletVelY2];
            const bulletVel3 = [shipvx + relBulletVelX3, shipvy + relBulletVelY3];
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

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

Ship.MOVES = {
    s: [0, 1],
    a: [-1, 0],
    w: [0, -1],
    d: [1, 0],
};

