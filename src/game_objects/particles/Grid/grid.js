
import { GameObject } from "../../../game_engine/game_object";
import { GridPoint } from "./grid_point";
import { GridSprite } from "./grid_sprite";
import { Util } from "../../../game_engine/util";
export class Grid extends GameObject {
    constructor(engine, gameScript, cameraTransform) {
        super(engine);

        this.transform.pos = [0,0];

        this.arenaDimensions = [gameScript.DIM_X, gameScript.DIM_Y];
        this.elasticity = 0.1; // force provided to pull particle back into place
        this.dampening = 0.1; // force produced from velocity (allows things to eventuall fall to rest)

        this.gridPoints = this.createGridPoints(cameraTransform);

        this.addLineSprite(new GridSprite(this.transform, this.gridPoints, cameraTransform));
        // this.addPhysicsComponent()
        // this.addCollider("General", this, this.radius)
    }

    Playerdies(location) {
        this.gridPoints.forEach((row) => {
            row.forEach((gridPoint) => {
                this.deathPerterb(gridPoint, location);
            });
        });
    }

    deathPerterb(gridPoint, location){
        // pulls inward upon death. 1/r^2
        const pullConstant = 1250 * 5;

        const pos = location;
        const objectPos = gridPoint.transform.absolutePosition();
        const dy = pos[1] - objectPos[1];
        const dx = pos[0] - objectPos[0];
        const unitVector = Util.dir([dx, dy]);
        let r = Math.sqrt(dy * dy + dx * dx);
        if ( r < 20 ) r = 20; // I think I need a bit more dampening for this to work
        const velContribution = [
            unitVector[0] * pullConstant / (r),
            unitVector[1] * pullConstant / (r)
        ];
        gridPoint.transform.vel[0] = velContribution[0];
        gridPoint.transform.vel[1] = velContribution[1];
    }

    createGridPoints(cameraTransform){
        const columnCount = 90; // 40
        const rowCount = 45; // 24
        const gridPoints = [];
        let gridRow = [];
        for (let yPosition = 0; yPosition <= this.arenaDimensions[1]; yPosition += this.arenaDimensions[1] / rowCount) {
            for (let xPosition = 0; xPosition <= this.arenaDimensions[0]; xPosition += this.arenaDimensions[0] / columnCount) {
                if(
                    (xPosition === 0 && (yPosition === 0 || yPosition === this.arenaDimensions[1])) || 
                   (xPosition == this.arenaDimensions[0] && (yPosition === 0 || yPosition === this.arenaDimensions[1])) 
                ){
                    continue;
                }
                const position = [xPosition, yPosition, 0];
                gridRow.push(new GridPoint(this.gameEngine, position, cameraTransform));
            }
            
            gridPoints.push(gridRow.slice());
            gridRow = [];
        }
        return gridPoints;
    }

    update(deltaTime) {

    }

}