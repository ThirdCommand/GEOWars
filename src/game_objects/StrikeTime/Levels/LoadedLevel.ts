import { GameEngine } from "../../../game_engine/game_engine";
import { StrikeTimeScript } from "../../../StrikeTimeScript";
import { Airport } from "../Airport/Airport";
import { EndingLine } from "../Airport/EndingLine";
import { Aurora } from "../Aurora/Aurora";
import { Building1 } from "../Buildings/Building1";
import { TargetBuilding } from "../Buildings/TargetBuilding";
import { Level } from "./Level";

export class LoadedLevel extends Level {
    startPosition: [number, number, number];
    targetBuilding: TargetBuilding | null;
    controlledShip: Aurora | null;
    serializedGame: string;
    endXPosition: number;
    endingLine: EndingLine;
    constructor(gameEngine: GameEngine, gameScript: StrikeTimeScript, serializedGame: string) {
        super(gameEngine, gameScript);
        this.serializedGame = serializedGame;

        this.startPosition = [500, 300, 0];
        this.endXPosition = 650;

    }
    
    createLevel() {
        this.gameScript.loadLevelContents(this.serializedGame)

        new Airport(this.engine, [this.startPosition[0], this.startPosition[1]]);
        this.endingLine = new EndingLine(this.engine, this.endXPosition);
        this.controlledShip = new Aurora(this.engine, [this.startPosition[0], this.startPosition[1]]);
        // in a wide circle around the buildings
        // buildings coordinate center: [24 * 2.5 + 2000, 300 + 2.5 * 20]
        // const center_x = 24 * 2.5 + 2000;
        // const center_y = 300 + 2.5 * 20;
        // const radiusOfDefenses = 500;
        // for(let i = 0; i < 10; i++) {
        //     const positionAngle = i * (2 * Math.PI)/10;
        //     const position: [number, number] = [
        //         center_x + radiusOfDefenses * Math.cos(positionAngle),
        //         center_y + radiusOfDefenses * Math.sin(positionAngle)
        //     ]
        //     new PatriotMissileSite(this.engine, [position[0], position[1]]);
        // }


        // buildings
        for (let yPosition = 0; yPosition < 5; yPosition++) {
            for(let xPosition = 0; xPosition < 5; xPosition++) {
                if(xPosition === 3 && yPosition ===3) {
                    this.targetBuilding = new TargetBuilding(this.engine, [2000 + xPosition * 24, 300 + yPosition * 20]);
                } else {
                    new Building1(this.engine, [2000 + xPosition * 24, 300 + yPosition * 20]);
                }
            }  
        }
    }

    update(deltaTime: number) {
        
    }
    runWinCondition() {
        if(!this.targetBuilding.isAlive && this.controlledShip.transform.pos[0] <= this.endingLine.endLineXPosition - this.controlledShip.lineSprite.length) {
            console.log('YOU WIN')
            return true;
        }
        return false;
    }
    
    loseLevel() {
        
    }
}