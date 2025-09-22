import { GameScript } from "../../game_script";
import { GameEngine } from "../game_engine";
import { GameObject } from "../game_object";
import { LineSprite } from "../line_sprite";
import { Transform } from "../transform";
import { PlacingPoint, Point } from "./Point";

// place points until loop completed or escape selected
// then complete the line 

// this should keep track of what's on the screen I guess?
export class SpriteEditor extends GameObject{
    points: Point[];
    pointGroupsForLines: Point[][];
    currentLineGroup: Point[];
    currentMousePos: [number, number];
    isPlacingPoint: boolean;
    placingPoint: PlacingPoint;
    
    constructor(engine: GameEngine) {
        super(engine)
        this.points = [];
        this.currentMousePos = [0,0];
        this.pointGroupsForLines = [];
        this.addLineSprite(new SpriteEditorSprite(new Transform(), this.pointGroupsForLines, this.currentMousePos))
        this.addLKeyListener();
        this.addKKeyListener();
        this.addJKeyListener();
        this.addSKeyListener();
        this.addClickListener();
    }

    // L to start placing new line, will end current line and start new one
    // K to remove last added point. If last point in line, the line is removed and point placing is ended
    // J to end point placing

    updateLKeyListener(pressed: boolean): void {
        if(pressed) {
            if(this.isPlacingPoint) {
                // in case there is any more cleanup work needed
                // in the future I guess
                this.endPointPlacement()
            }
            this.isPlacingPoint = true;
            this.placingPoint = new PlacingPoint(this.gameEngine as GameEngine)
            this.currentLineGroup = [];
            this.pointGroupsForLines.push(this.currentLineGroup);
        }
    }

    updateKKeyListener(pressed: boolean): void {
        if(pressed) {
            this.isPlacingPoint = true;
            const lastPlacedPoint = this.currentLineGroup.pop();
            if(this.currentLineGroup.length === 0) {
                this.endPointPlacement();
            }
        }
    }
    updateJKeyListener(pressed: boolean): void {
        if(pressed) {
            this.endPointPlacement();
        }
    }
    // left and right arrow to move between the line groups
    // backspace to delete them

    updateSKeyListener(pressed: boolean): void {
        let largestX = 0;
        let smallestX = GameScript.DIM_X;
        let largestY = 0;
        let smallestY = GameScript.DIM_Y;

        this.pointGroupsForLines.forEach(
            (pointGroup) => pointGroup.forEach(
                (point) => {
                    const currentX = point.pos[0];
                    const currentY = point.pos[1];
                    if (largestX < currentX) largestX = currentX
                    if (smallestX > currentX) smallestX = currentX
                    if (largestY < currentY) largestY = currentY
                    if (smallestY > currentY) smallestY = currentY
                }
            ))
        const width = largestX - smallestX;
        const height = largestY - smallestY;
        // maybe I don't need to parameterize by width and height
        // like... what exactly has that done for me so far
        // if it was just to make it easier to enter... this will be easier anyway

        const mappedPoints: [number, number][][] = this.pointGroupsForLines.map((pointGroup) => pointGroup.map((point) => {
            return [
                Math.round((point.pos[0] - GameScript.DIM_X/2) / (GameScript.DIM_X / 120)),
                Math.round((point.pos[1] - GameScript.DIM_Y/2) / (GameScript.DIM_Y / 72)) *-1
            ]
        }))

        
        if(pressed && this.pointGroupsForLines.length > 0){
            // put save logic here
            let stringToSave = '';
            // find biggest X value
            // find smallest X value
            // find difference to get width
            // same with height for Y
            mappedPoints.forEach((pointGroup) => {
                const firstPoint = pointGroup[0];
                const stringStart = 
                `\nctx.beginPath();\nctx.moveTo(${firstPoint[0]},${firstPoint[1]});\n`;
                const restOfPoints = pointGroup.slice(1);
                const lines = restOfPoints.reduce<string>((acc, point) => {
                    const newLine = 
                    `ctx.lineTo(${point[0]},${point[1]});\n`
                    return acc.concat(newLine)
                },'')
                const stringEnd = 
                    `ctx.closePath();\nctx.stroke();\n`
                stringToSave += stringStart + lines + stringEnd;
            })
            console.log(stringToSave);

            // will have to transform all the points to the correct coordinates
            // add all the instructions
        }
    }



    mouseClicked(mousePos: [number, number]) {
        if(this.isPlacingPoint) {
            const distancePerIncrement = GameScript.DIM_Y / 72
            const xPosIncremented = Math.round(mousePos[0]/distancePerIncrement) * distancePerIncrement;
            const yPosIncremented = Math.round(mousePos[1] / distancePerIncrement) * distancePerIncrement;
            this.placePoint([xPosIncremented, yPosIncremented]);
        }
    }

    endPointPlacement() {
        this.placingPoint.remove();
        this.placingPoint = null;
        this.isPlacingPoint = false;
    }

    placePoint(pointPosition: [number, number], previousPoint?: Point) {
        if(this.currentLineGroup.find((point) => point.pos[0] === pointPosition[0] && point.pos[1] === pointPosition[1])) {
            this.currentLineGroup.push(new Point(
                pointPosition, 
            ))
            this.endPointPlacement()
        } else {
            this.currentLineGroup.push(new Point(
                pointPosition, 
            ))
        }
    }

    updateMousePos(mousePos: [number, number]): void {
        this.currentMousePos[0] = mousePos[0];
        this.currentMousePos[1] = mousePos[1];
    }
    update() {

    }
    animate() {

    }
}
class SpriteEditorSprite extends LineSprite {
    pointGroupsForLines: Point[][];
    mousePosition: [number, number];
    constructor(transform: Transform, pointGroupsForLines: Point[][], currentMousePos: [number, number]) {
        super(transform)
        this.pointGroupsForLines = pointGroupsForLines;
        this.mousePosition = currentMousePos;
    }
    draw(ctx: CanvasRenderingContext2D) {
         ctx.save();
         
         this.drawLines(ctx);
         ctx.restore();
    }

    drawLines(ctx: CanvasRenderingContext2D) {
        this.pointGroupsForLines.forEach((points) => {
            if(points.length <= 1) {

            } else {
                ctx.strokeStyle = '#00FFFF';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(points[0].pos[0], points[0].pos[1])
                points.forEach((point) => {
                    ctx.lineTo(point.pos[0], point.pos[1]);
                })
                ctx.stroke();
            }
        })
    }
}

