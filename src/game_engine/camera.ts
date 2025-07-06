import { GameScript } from "../game_script";
import { type GameEngine } from "./game_engine";
import { GameObject } from "./game_object";
import { type Transform } from "./transform";

export class Camera {
    transform: Transform;
    zoomScale: number;
    isActive: boolean;
    gameEngine: GameEngine;
    defaultZoomScale: number;
    cameraWidth: number;
    cameraHeight: number;
    initialCameraZPos: number;
    name: string;
    gameObjectToFollow: GameObject | null;
    

    // it's like a game object, but it gets updated last
    constructor(gameEngine: GameEngine, transform: Transform, name: string | null, gameObjectToFollow: GameObject | null = null) {
        this.name = name;
        this.gameEngine = gameEngine;
        this.gameEngine.addCamera(this);
        this.gameObjectToFollow = gameObjectToFollow;
        this.initialCameraZPos = -1000;
        this.cameraHeight = 600;
        this.cameraWidth = 1000;
        this.defaultZoomScale = 1.3;
        this.transform = transform;
        this.transform.pos[2] = this.initialCameraZPos;
        this.zoomScale = 1.3;
    }

    makeActiveCamera() {
        this.gameEngine.setActiveCamera(this);
        this.isActive = true;
    }

    update(ctx: CanvasRenderingContext2D) {
        ctx.restore();
        ctx.save();
        const xPos = this.transform.pos[0];
        const yPos = this.transform.pos[1];
        const zoomScale = this.zoomScale;
        const width = this.cameraWidth; 
        const height = this.cameraHeight;

        ctx.translate(
            -xPos * zoomScale + width / 2,
            -yPos * zoomScale + height / 2
        );
    }

    clearView(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(
            -this.cameraHeight,
            -this.cameraWidth,
            this.cameraHeight * this.zoomScale * 4,
            this.cameraWidth * this.zoomScale * 4
        );
        ctx.fillStyle = GameScript.BG_COLOR;
        ctx.fillRect(
            -this.cameraHeight,
            -this.cameraWidth,
            this.cameraHeight * this.zoomScale * 4,
            this.cameraWidth * this.zoomScale * 4
        );
    }

    setZoomScale(ctx: CanvasRenderingContext2D) {
        ctx.scale(this.zoomScale, this.zoomScale);
    }



}
