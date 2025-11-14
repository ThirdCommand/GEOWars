import { AnimationView } from "../../../AnimationView";
import { Color } from "../../../game_engine/color";
import { type GameEngine } from "../../../game_engine/game_engine";
import { GameObject } from "../../../game_engine/game_object";
import { type Transform } from "../../../game_engine/transform";
import { getNumberFromRange } from "../../../game_engine/util";
import { Particle } from "../../particles/particle";


/*

        ^
     /     \
    /       \
   / _    _  \
    iii   iii
    iii   iii   

*/

export class EngineExhaust extends GameObject {
    colorRange: number;
    noAccelerationHue: number;

    baseOpacity: number;
    opacityRange: number;

    maxParticleCount: number;
    currentParticleCount: number;
    positionOnPlane: [number, number];
    width: number;
    currentTime: number;
    exhaustRate: number;
    isAccelerating: boolean;
    isDecelerating: boolean;
    acceleratingHue: number;

    // the position of the exhaust is the middle of the exhaust
    constructor(engine: GameEngine | AnimationView, transform: Transform, position: [number, number], width: number) {
        super(engine);
        this.transform = transform;

        this.noAccelerationHue = 50;
        this.isAccelerating = false;
        this.acceleratingHue = 300;
        this.colorRange = 40;
        
        this.baseOpacity = 0.6
        this.opacityRange = 0.35

        this.maxParticleCount = 20;
        this.currentParticleCount = 0;
        this.positionOnPlane = position;
        this.width = width;
        this.currentTime = 0;
        this.exhaustRate = 100;
        this.isDecelerating = false;
    }   
    // every so often, make more particles
    animate() {}
    update(deltaTime: number) {
        this.currentTime += deltaTime;
        if(this.currentTime > this.exhaustRate) {
            this.currentTime = 0;
            const numberToCreate = 10
            if(!this.isDecelerating) {
                for (let i = 0; i < numberToCreate; i++) {
                    this.addEngineExhaustParticle()
                }
            }
        }
    }
    addEngineExhaustParticle() {
        const linePosition = Math.random() * this.width - this.width / 2;
        const angle = this.transform.angle;
        // const position: [number, number] = [
        //     this.transform.pos[0] + (this.positionOnPlane[0] + linePosition) * Math.cos(angle - Math.PI),
        //     this.transform.pos[1] + -(this.positionOnPlane[1]) * Math.sin(angle)
        // ]
        // TODO: why am I doing this calculation each time: because it requires a random input along the length of the exhaust?
        const exhaustPositionAngle = Math.atan2(this.positionOnPlane[1], this.positionOnPlane[0] + linePosition) - Math.PI / 2;
        const exhaustPositionLength = Math.sqrt(this.positionOnPlane[0]**2 +  (this.positionOnPlane[1] + linePosition)**2);
        const position: [number, number] = [
            this.transform.pos[0] - exhaustPositionLength * Math.cos(angle + exhaustPositionAngle),
            this.transform.pos[1] - exhaustPositionLength * Math.sin(angle + exhaustPositionAngle)
        ]
        const initialSpeed = this.isAccelerating ? Math.random() * 1.5 + 6 : Math.random() * 0.5 + 1;
        const initialVelocity: [number, number] = [initialSpeed * Math.cos(angle + Math.PI), initialSpeed * Math.sin(angle + Math.PI)]
        const hue = this.isAccelerating ? getNumberFromRange(this.acceleratingHue, this.colorRange) : getNumberFromRange(this.noAccelerationHue, this.colorRange);
        const opacity = getNumberFromRange(this.baseOpacity, this.opacityRange);
        const color = new Color(
            "hsla", [hue, 100, 50, opacity]
        );
        new Particle(this.gameEngine, position, initialVelocity, color, null, 2, 0.005);

    }
}


