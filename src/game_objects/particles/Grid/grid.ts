
import { GameObject } from "../../../game_engine/game_object";
import { GridPoint } from "./grid_point";
import { VectorMath } from "../../../game_engine/util";
import { GameEngine } from "../../../game_engine/game_engine";
import { GameScript } from "../../../game_script";
import { Transform } from "../../../game_engine/transform";
import { LineSprite } from "../../../game_engine/line_sprite";
import { Color } from "../../../game_engine/color";

export class Grid extends GameObject {
    arenaDimensions: [number, number];
    elasticity: number;
    dampening: number;
    gridPoints: GridPoint[][];
    constructor(engine: GameEngine, gameScript: GameScript, cameraTransform: Transform) {
        super(engine);

        this.transform.pos = [0,0];

        this.arenaDimensions = [GameScript.DIM_X, GameScript.DIM_Y];
        this.elasticity = 0.1; // force provided to pull particle back into place
        this.dampening = 0.1; // force produced from velocity (allows things to eventuall fall to rest)

        this.gridPoints = this.createGridPoints(cameraTransform);

        this.addLineSprite(new GridSprite(this.transform, this.gridPoints, cameraTransform));
        // this.addPhysicsComponent()
        // this.addCollider("General", this, this.radius)
    }

    Playerdies(location: [number, number, number?]) {
        this.gridPoints.forEach((row) => {
            row.forEach((gridPoint) => {
                this.deathPerterb(gridPoint, location);
            });
        });
    }

    Explosion(location: [number, number, number?]) {
        this.gridPoints.forEach((row) => {
            row.forEach((gridPoint) => {
                this.explosionPerterb(gridPoint, location);
            });
        });
    }

    explosionPerterb(gridPoint: GridPoint, location: [number, number, number?]){
        // pushes outward upon explosion. 1/r^2
        const pushConstant = 1250 / 2;

        const pos = location;
        const objectPos = gridPoint.transform.absolutePosition();
        const dy = pos[1] - objectPos[1];
        const dx = pos[0] - objectPos[0];
        const unitVector = VectorMath.dir([dx, dy]);
        let r = Math.sqrt(dy * dy + dx * dx);
        if ( r < 15 ) r = 15; // I think I need a bit more dampening for this to work
        gridPoint.transform.vel[0] += -unitVector[0] * pushConstant / (r * r * 2);
        gridPoint.transform.vel[1] += -unitVector[1] * pushConstant / (r * r * 2);
        gridPoint.transform.vel[2] += +pushConstant * 5 / (r * r);
    }


    deathPerterb(gridPoint: GridPoint, location: [number, number, number?]){
        // pulls inward upon death. 1/r^2
        const pullConstant = 1250 * 5;

        const pos = location;
        const objectPos = gridPoint.transform.absolutePosition();
        const dy = pos[1] - objectPos[1];
        const dx = pos[0] - objectPos[0];
        const unitVector = VectorMath.dir([dx, dy]);
        let r = Math.sqrt(dy * dy + dx * dx);
        if ( r < 20 ) r = 20; // I think I need a bit more dampening for this to work
        const velContribution = [
            unitVector[0] * pullConstant / (r),
            unitVector[1] * pullConstant / (r)
        ];
        // const velContribution = [
        //     0,0, pullConstant * 50 / (r ** 2)
        // ];
        gridPoint.transform.vel[0] = velContribution[0];
        gridPoint.transform.vel[1] = velContribution[1];
        // gridPoint.transform.vel[2] = velContribution[2];
    }

    createGridPoints(cameraTransform: Transform){
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
                const position: [number,number,number] = [xPosition, yPosition, 0];
                gridRow.push(new GridPoint(this.gameEngine, position, cameraTransform));
            }
            
            gridPoints.push(gridRow.slice());
            gridRow = [];
        }
        return gridPoints;
    }

    update() {

    }

}



export class GridSprite extends LineSprite {
    color: Color;
    cameraTransform: Transform;
    // I think gridpoints are an array of an array of grid points
    gridPoints: GridPoint[][];
    constructor(transform: Transform, gridPoints: GridPoint[][], cameraTransform: Transform) {
        super(transform);
        this.gridPoints = gridPoints;
        this.cameraTransform = cameraTransform;

        this.color = new Color(
            "hsla", [202, 100, 70, 0.2]
        );
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = 2;
        this.drawRows(ctx);
        this.drawColumns(ctx);
        ctx.restore();
    }

    drawRows(ctx: CanvasRenderingContext2D) {
        const gridPoints = this.gridPoints;

        for (let i = 1; i < gridPoints.length - 1; i++) {
            ctx.beginPath();
            const firstPosition = gridPoints[i][0].transform.absolutePosition();
            ctx.moveTo(firstPosition[0], firstPosition[1]);
            for (let j = 1; j < gridPoints[i].length; j++) {
                const nextPosition = gridPoints[i][j].transform.absolutePosition();
                ctx.lineTo(nextPosition[0], nextPosition[1]);
            }

            ctx.stroke();
        }
    }

    drawColumns(ctx: CanvasRenderingContext2D) {
        const gridPoints = this.gridPoints;
        ctx.beginPath();

        for (let j = 1; j < gridPoints[1].length - 1; j++) {
            ctx.beginPath();
            for (let i = 0; i < gridPoints.length; i++) {
                let nextPosition = [];
                if( i === 0 || i === 0) {
                    nextPosition = gridPoints[i][j - 1].transform.absolutePosition();
                    ctx.moveTo(nextPosition[0], nextPosition[1]);
                } else {
                    if ( i === gridPoints.length - 1) {
                        nextPosition = gridPoints[i][j - 1].transform.absolutePosition();
                    } else {
                        nextPosition = gridPoints[i][j].transform.absolutePosition();
                    }
                    ctx.lineTo(nextPosition[0], nextPosition[1]);
                }

            }
            ctx.stroke();
        }
    }
}