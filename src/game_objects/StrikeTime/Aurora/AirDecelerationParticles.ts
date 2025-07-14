import { type AnimationView } from "../../../AnimationView";
import { Color } from "../../../game_engine/color";
import { type GameEngine } from "../../../game_engine/game_engine";
import { GameObject } from "../../../game_engine/game_object";
import { type Transform } from "../../../game_engine/transform";
import { getNumberFromRange } from "../../../game_engine/util";
import { Particle } from "../../particles/particle";


/*
    |           |
   |    ^   |
  |  /     \
    /  |    \ |
  |/ _    _  \
         

*/

// random greys between 75 - 100 lightness


export class AirDecelerationParticles extends GameObject {
    lightnessRange: number;
    baseLightness: number;

    baseOpacity: number;
    opacityRange: number;

    currentTime: number;
    baseSpawnRate: number;
    isDecelerating: boolean;
    planeWidth: number;
    planeLength: number;
    randomSpawnRateFactor: number;
    randomSpawnRateRange: number;

    // the position of the exhaust is the middle of the exhaust
    constructor(engine: GameEngine | AnimationView, transform: Transform, planeWidth: number, planeLength: number) {
        super(engine);
        this.transform = transform;

        this.lightnessRange = 25;
        this.baseLightness = 87.5;
        this.baseOpacity = 0.6
        this.opacityRange = 0.35

        this.isDecelerating = false;

        this.planeWidth = planeWidth;
        this.planeLength = planeLength;
        this.currentTime = 0;
        this.baseSpawnRate = 50;
        this.randomSpawnRateFactor = 0;
        this.randomSpawnRateRange = 20;
        
    }   

    animate() {}

    update(deltaTime: number) {
        this.currentTime += deltaTime;
        if(this.currentTime > this.baseSpawnRate + this.randomSpawnRateFactor) {
            this.randomSpawnRateFactor = Math.random() * this.randomSpawnRateRange;
            this.currentTime = 0;
            const numberToCreate = 3;
            if(this.isDecelerating) {
                for (let i = 0; i < numberToCreate; i++) {
                    this.addAirDecelerationParticles()
                }
            }
        }
    }

    addAirDecelerationParticles() {
        const angle = this.transform.angle;
        const planePosition = this.transform.pos;
        const w = this.planeWidth;
        const l = this.planeLength;

        const xPosition = getNumberFromRange(0, w * 2);
        const yPosition = getNumberFromRange(l * 4/5, l);

        const positionOnPlane = [
            xPosition,
            yPosition
        ];

        const airParticlePositionAngle = Math.atan2(positionOnPlane[1], positionOnPlane[0]) - Math.PI / 2;
        const airParticlePositionLength = Math.sqrt(positionOnPlane[0]**2 +  (positionOnPlane[1])**2);
        const position: [number, number] = [
            planePosition[0] - airParticlePositionLength * Math.cos(angle + airParticlePositionAngle),
            planePosition[1] - airParticlePositionLength * Math.sin(angle + airParticlePositionAngle)
        ]
        
        // I wonder if they'd look better as red
        const opacity = getNumberFromRange(this.baseOpacity, this.opacityRange);
        const lightness = getNumberFromRange(this.baseLightness, this.lightnessRange)
        const color = new Color(
            "hsla", [0, 50, lightness, opacity]
        );
        new AirDecelerationParticle(this.gameEngine, position, color, angle + Math.PI/2);

    }
}

export class AirDecelerationParticle extends Particle {
    constructor(engine: GameEngine | AnimationView, position: [number, number], color: Color, angle: number) {
        super(engine, position, null ,color, null, -0.045 * 2, 0.01, angle);
    }
    update(deltaTime: number) {
        // this.lineSprite.rectLength -= 0.01 * deltaTime;
        this.lineSprite.color.a -= this.opacityDropSpeed * deltaTime;
        // this.lineSprite.hue < 0.06 ||
        if (this.lineSprite.color.a <= 0) {
            this.remove();
        }
    }
}


