import { GameEngine } from "../game_engine";
import { DIM_X, DIM_Y } from "../../SpriteEditorScript";
import { GameObject } from "../game_object";
import { LineSprite } from "../line_sprite";
import { Transform } from "../transform";
import { BezierCurve, BezierCurveData, Circle, CircleData, PlacingPoint, Point, PointData } from "./Point";

// place points until loop completed or escape selected
// then complete the line 

// this should keep track of what's on the screen I guess?
export class SpriteEditor extends GameObject{
    points: Point[];
    pointGroupsForLines: (Point | BezierCurve | Circle)[][];
    currentLineGroup: (Point | BezierCurve | Circle)[];
    currentMousePos: [number, number];
    isPlacingPoint: boolean;
    isPlacingCircle: boolean;
    isPlacingBezierCurve: boolean;
    bezierCurveBeingPlaced?: BezierCurve;
    circleBeingPlaced?: Circle;
    placingPoint: PlacingPoint;
    
    constructor(engine: GameEngine) {
        super(engine)
        this.points = [];
        this.currentMousePos = [0,0];
        this.pointGroupsForLines = [];
        this.addLineSprite(new SpriteEditorSprite(new Transform(), this.pointGroupsForLines, this.currentMousePos, this))
        this.addLKeyListener();
        this.addKKeyListener();
        this.addJKeyListener();
        this.addSKeyListener();
        this.addBKeyListener();
        this.addMKeyListener();
        this.addOKeyListener();
        this.addClickListener();
    }

    // L to start placing new line, will end current line and start new one
    // K to remove last added point. If last point in line, the line is removed and point placing is ended
    // J to end point placing
    // M to choose the mirrored version of control point1 for control point2
    // O to start adding a circle. Ends the line currently being entered

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

    updateOKeyListener(pressed: boolean): void {
        if(pressed) {
            if(this.isPlacingPoint) this.endPointPlacement();
            this.isPlacingPoint = true;
            this.isPlacingCircle = true;

            this.placingPoint = new PlacingPoint(this.gameEngine as GameEngine)
            this.currentLineGroup = [];
            this.pointGroupsForLines.push(this.currentLineGroup);
            this.circleBeingPlaced = new Circle();
            this.currentLineGroup.push(this.circleBeingPlaced);
        }
    }

    updateKKeyListener(pressed: boolean): void {
        if(pressed) {
            this.isPlacingPoint = true;
            const lastPlacedPoint = this.currentLineGroup.pop();
            if(lastPlacedPoint instanceof BezierCurve) {
                this.isPlacingBezierCurve = false;
                this.bezierCurveBeingPlaced = null;
            }
            if(this.currentLineGroup.length === 0) {
                this.endPointPlacement();
            }
        }
    }

    updateMKeyListener(pressed: boolean): void {
        if(pressed && this.isPlacingBezierCurve && this.bezierCurveBeingPlaced.placingWhichPoint === 'controlPoint2' && this.bezierCurveBeingPlaced.mirroredValue)  {
            this.bezierCurveBeingPlaced.controlPoint2 = [this.bezierCurveBeingPlaced.mirroredValue[0], this.bezierCurveBeingPlaced.mirroredValue[1]]
            this.updateBKeyListener(pressed);
        }
    }

    updateBKeyListener(pressed: boolean): void {
        if(pressed && !this.isPlacingPoint) {

        }
        else if(pressed && !this.isPlacingBezierCurve) {
            if(!this.isPlacingPoint) {
                this.placingPoint = new PlacingPoint(this.gameEngine as GameEngine)
                this.currentLineGroup = [];
                this.pointGroupsForLines.push(this.currentLineGroup);
            }
            this.isPlacingPoint = true;
            this.isPlacingBezierCurve = true;
            const lastEnteredPoint = this.currentLineGroup[this.currentLineGroup.length - 1];
            let startPosition: [number, number];

            if (lastEnteredPoint instanceof Point) {
                startPosition = [lastEnteredPoint.pos[0], lastEnteredPoint.pos[1]];
            } else if(lastEnteredPoint instanceof BezierCurve) {
                startPosition = [lastEnteredPoint.endPos[0], lastEnteredPoint.endPos[1]];
            }
            this.bezierCurveBeingPlaced = new BezierCurve(startPosition)
            this.currentLineGroup.push(this.bezierCurveBeingPlaced);
        } else if (pressed && this.isPlacingBezierCurve && this.bezierCurveBeingPlaced.isDrawable()) {
            this.isPlacingBezierCurve = false;
            this.bezierCurveBeingPlaced.isBeingPlaced = false;
            if(
                this.currentLineGroup.slice(0,this.currentLineGroup.length - 1).find((point) => (
                    (
                        point instanceof Point && 
                        point.pos[0] === this.bezierCurveBeingPlaced.endPos[0] && 
                        point.pos[1] === this.bezierCurveBeingPlaced.endPos[1]
                    ) || point instanceof BezierCurve && (
                        (
                            point.startPos[0] === this.bezierCurveBeingPlaced.endPos[0] && 
                            point.startPos[1] === this.bezierCurveBeingPlaced.endPos[1]
                        ) || ( 
                            // on second thought, it should never be the end position.. but maybe that's fine
                            point.endPos[0] === this.bezierCurveBeingPlaced.endPos[0] && 
                            point.endPos[1] === this.bezierCurveBeingPlaced.endPos[1]
                        )
                    )
                ))
            ) {
                this.endPointPlacement();
            } 
            this.bezierCurveBeingPlaced = null;
            
        }
    }

    updateJKeyListener(pressed: boolean): void {
        if(pressed) {
            this.endPointPlacement();
        }
    }

    pointTransformation(pos: [number, number]): [number, number] {
        return [
            Math.round((pos[0] - DIM_X/2) / (DIM_X / 120)),
            Math.round((pos[1] - DIM_Y/2) / (DIM_Y / 72)) *-1
        ];
    }

    // left and right arrow to move between the line groups
    // backspace to delete them
    // when saved, each line group gets a placeholder for a name
    updateSKeyListener(pressed: boolean): void {
        // maybe I don't need to parameterize by width and height
        // like... what exactly has that done for me so far
        // if it was just to make it easier to enter... this will be easier anyway
        // okay on third thought, I think I do need a scaling parameter, 
        // but only one for the entire thing to make it easier to size later
        const mappedPoints: (PointData | BezierCurveData | CircleData)[][] = this.pointGroupsForLines.map((pointGroup) => pointGroup.map((point) => {
            if(point instanceof Point) {
                return new PointData(this.pointTransformation(point.pos));
            } else if (point instanceof BezierCurve) {
                const dataToPutIn = {
                    startPos: this.pointTransformation(point.startPos),
                    endPos: this.pointTransformation(point.endPos),
                    controlPoint1: this.pointTransformation(point.controlPoint1),
                    controlPoint2: this.pointTransformation(point.controlPoint2),
                }
                return new BezierCurveData(
                    dataToPutIn.startPos,
                    dataToPutIn.endPos,
                    dataToPutIn.controlPoint1,
                    dataToPutIn.controlPoint2
                )
            } else if (point instanceof Circle) {
                const centerPoint = this.pointTransformation(point.centerPoint);
                const radius = Math.round((point.radius - DIM_X/2) / (DIM_X / 120));
                return new CircleData(centerPoint, radius);
            }
        }))
        
        if(pressed && this.pointGroupsForLines.length > 0){
            // put save logic here
            let stringToSave = '(ctx: CanvasRenderingContext2D) { \nctx.strokeStyle = "";\nctx.lineWidth = 2;\nconst s = 1;\nconst pos = this.transform.absolutePosition();\nctx.translate(pos[0], pos[1]);\n\n';
            // find biggest X value
            // find smallest X value
            // find difference to get width
            // same with height for Y
           
            mappedPoints.forEach((pointGroup, idx) => {
                 let stringStart = ``
                const firstPoint = pointGroup[0];
                if(firstPoint instanceof PointData) {
                    stringStart = 
                    `// Piece ${idx + 1}: \nctx.beginPath();\nctx.moveTo(${firstPoint.point[0]} * s, ${firstPoint.point[1]} * s);\n`;
                } else if (firstPoint instanceof CircleData) {
                    stringStart = 
                    `// Piece ${idx + 1}: \nctx.beginPath();\nctx.arc(${firstPoint.centerPoint[0]} * s, ${firstPoint.centerPoint[1]} * s, ${firstPoint.radius} * s, 0,2*Math.PI);\n`;
                } else if (firstPoint instanceof BezierCurveData) {
                    stringStart=
                    `// Piece ${idx + 1}: \nctx.beginPath();\nctx.moveTo(${firstPoint.startPos[0]} * s, ${firstPoint.startPos[1]} * s);\nctx.bezierCurveto(\n\t${firstPoint.controlPoint1[0]} * s, ${firstPoint.controlPoint1[1]} * s,\n\t${firstPoint.controlPoint2[0]} * s, ${firstPoint.controlPoint2[1]} * s,\n\t${firstPoint.endPos[0]} * s, ${firstPoint.endPos[1]} * s\n);\n`; 
                }
                const restOfPoints = pointGroup.slice(1);
                const lines = restOfPoints.reduce<string>((acc, point) => {
                    let newLine = '';
                    if(point instanceof PointData) {
                        newLine = 
                        `ctx.lineTo(${point.point[0]} * s, ${point.point[1]} * s);\n`;
                    } else if (point instanceof CircleData) {
                        console.error('there shouldnt be a circle here, since circles are their own part');
                    } else if (point instanceof BezierCurveData) {
                        // start of the curve should be the last point
                        newLine=
                        `ctx.bezierCurveto(\n\t${point.controlPoint1[0]} * s, ${point.controlPoint1[1]} * s,\n\t${point.controlPoint2[0]} * s, ${point.controlPoint2[1]} * s,\n\t${point.endPos[0]} * s, ${point.endPos[1]} * s\n);\n`; 
                    }
                    return acc.concat(newLine)
                },'')
                const stringEnd = 
                    `ctx.stroke();\n\n`
                stringToSave += stringStart + lines + stringEnd;
            })
            console.log(stringToSave);

            // will have to transform all the points to the correct coordinates
            // add all the instructions
        }
    }

    mouseClicked(mousePos: [number, number]) {
        if(this.isPlacingPoint) {
            const distancePerIncrement = DIM_Y / 72
            const xPosIncremented = Math.round(mousePos[0]/distancePerIncrement) * distancePerIncrement;
            const yPosIncremented = Math.round(mousePos[1] / distancePerIncrement) * distancePerIncrement;
            this.placePoint([xPosIncremented, yPosIncremented]);
        }
    }

    endPointPlacement() {
        this.placingPoint.remove();
        if(this.isPlacingBezierCurve) this.currentLineGroup.pop();
        if(this.isPlacingCircle) this.currentLineGroup.pop();

        this.bezierCurveBeingPlaced = null;
        this.circleBeingPlaced = null;
        this.placingPoint = null;

        this.isPlacingPoint = false;
        this.isPlacingCircle = false;
        this.isPlacingBezierCurve = false;
        
        this.currentLineGroup = [];
    }

    placePoint(pointPosition: [number, number]) {
        if(this.isPlacingCircle) {
            this.circleBeingPlaced.placingPoint(pointPosition);
            if(this.circleBeingPlaced.pointBeingPlaced === 'done') {
                this.isPlacingCircle = false;
                this.endPointPlacement();
            }
        } else if(this.isPlacingBezierCurve) {
            this.bezierCurveBeingPlaced.placePoint(pointPosition);
        } else if(
            this.currentLineGroup.find(
                (point) => (
                    (
                        point instanceof Point && 
                        point.pos[0] === pointPosition[0] && 
                        point.pos[1] === pointPosition[1]
                    ) || point instanceof BezierCurve && (
                        (
                            point.startPos[0] === pointPosition[0] && 
                            point.startPos[1] === pointPosition[1]
                        ) || ( 
                            // on second thought, it should never be the end position.. but maybe that's fine
                            point.endPos[0] === pointPosition[0] && 
                            point.endPos[1] === pointPosition[1]
                        )
                    )
                )
            )
        ) {
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
    pointGroupsForLines: (Point | BezierCurve | Circle)[][];
    mousePosition: [number, number];
    spriteEditor: SpriteEditor
    constructor(transform: Transform, pointGroupsForLines: (Point | BezierCurve | Circle)[][], currentMousePos: [number, number], spriteEditor: SpriteEditor) {
        super(transform)
        this.pointGroupsForLines = pointGroupsForLines;
        this.mousePosition = currentMousePos;
        this.spriteEditor = spriteEditor;
    }
    draw(ctx: CanvasRenderingContext2D) {
         ctx.save();
         
         this.drawLines(ctx);
         ctx.restore();
    }

    drawLines(ctx: CanvasRenderingContext2D) {
        const {currentLineGroup} = this.spriteEditor;
         const phantomPointPosition = this.spriteEditor?.placingPoint?.transform?.pos;
        this.pointGroupsForLines.forEach((points) => {
            if(points.length <= 1 && points[0] instanceof Point) {

            } else {
                ctx.strokeStyle = '#00FFFF';
                ctx.lineWidth = 2;
                ctx.beginPath();
                if(points[0] instanceof Point) {
                    ctx.moveTo(points[0].pos[0], points[0].pos[1])
                }
                if(points[0] instanceof BezierCurve) {
                    if(!points[0].isBeingPlaced) {
                        ctx.moveTo(points[0].startPos[0], points[0].startPos[1]);
                        ctx.bezierCurveTo(
                            points[0].controlPoint1[0], points[0].controlPoint1[1], 
                            points[0].controlPoint2[0], points[0].controlPoint2[1], 
                            points[0].endPos[0], points[0].endPos[1]
                        );
                    }
                }
                if(points[0] instanceof Circle) {
                    const circle = points[0];
                    if(circle.centerPoint) {
                        if(!circle.isBeingPlaced) {
                            ctx.arc(circle.centerPoint[0], circle.centerPoint[1],circle.radius,0, 2 * Math.PI)
                            ctx.stroke();
                            ctx.beginPath();
                        } else {
                            ctx.moveTo(circle.centerPoint[0], circle.centerPoint[1]);
                            ctx.strokeStyle = '#a4fcfcff';
                            ctx.setLineDash([3, 8]);
                            ctx.arc(
                                circle.centerPoint[0], circle.centerPoint[1],
                                circle.getRadius([phantomPointPosition[0],phantomPointPosition[1]]),
                                0, 2 * Math.PI
                            );
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.setLineDash([]);
                            ctx.strokeStyle = '#00FFFF';
                            
                        }
                    }
                }
                points.slice(1).forEach((point) => {
                    if(point instanceof Point) {
                        ctx.lineTo(point.pos[0], point.pos[1]);
                    }
                    if(point instanceof BezierCurve) {
                        if(!point.isBeingPlaced) {
                            ctx.moveTo(point.startPos[0], point.startPos[1]);
                            ctx.bezierCurveTo(
                                point.controlPoint1[0], point.controlPoint1[1], 
                                point.controlPoint2[0], point.controlPoint2[1], 
                                point.endPos[0], point.endPos[1]
                            );
                        }
                    }
                    
                })
                ctx.stroke();
            }
        })
        if(
            this.spriteEditor.isPlacingPoint && 
            !this.spriteEditor.isPlacingBezierCurve &&
            this.pointGroupsForLines.length >= 1 && 
            this.pointGroupsForLines[this.pointGroupsForLines.length - 1].length > 0
        ) {
            const lastPlacedPointPosition =  this.pointGroupsForLines[this.pointGroupsForLines.length - 1][this.pointGroupsForLines[this.pointGroupsForLines.length - 1].length - 1];
           
            ctx.strokeStyle = '#a4fcfcff';
            ctx.setLineDash([3, 8]);
            ctx.lineWidth = 2;
            ctx.beginPath();
            if(lastPlacedPointPosition instanceof Point) {
                ctx.moveTo(lastPlacedPointPosition.pos[0], lastPlacedPointPosition.pos[1])
            } else if (lastPlacedPointPosition instanceof BezierCurve) {
                ctx.moveTo(lastPlacedPointPosition.endPos[0], lastPlacedPointPosition.endPos[1])
            }
            ctx.lineTo(phantomPointPosition[0], phantomPointPosition[1]);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        if(
            this.spriteEditor.isPlacingBezierCurve && 
            this.pointGroupsForLines.length >= 1 && 
            currentLineGroup.length > 0
        ) {
            // there's a state where the curve is displayed and user
            // can move the control points around
            // solidifying it requires another B click
            
            
            // should be BezierCurve because isPlacingBezierCurve is true (as long as I'm managing that right)
            const lastPlacedPointPosition =  currentLineGroup[currentLineGroup.length - 1];
            ctx.strokeStyle = '#a4fcfcff';
            ctx.setLineDash([3, 8]);
            ctx.lineWidth = 2;
            ctx.beginPath();
            // this should never be true:
            if(lastPlacedPointPosition instanceof Point) {
                ctx.moveTo(lastPlacedPointPosition.pos[0], lastPlacedPointPosition.pos[1])
                ctx.lineTo(phantomPointPosition[0], phantomPointPosition[1]);
                ctx.stroke();
                ctx.setLineDash([]);
            } else if (lastPlacedPointPosition instanceof BezierCurve && lastPlacedPointPosition.isBeingPlaced) {
                if(lastPlacedPointPosition.placingWhichPoint === 'start') {
                    // I think we don't draw anything since this must be the first point being added
                }
                else if(lastPlacedPointPosition.placingWhichPoint === 'end') {
                    if(lastPlacedPointPosition.controlPoint1 && lastPlacedPointPosition.controlPoint2) {
                        // everything is placed but we're adjusting the end point
                        const {controlPoint1: cp1, controlPoint2: cp2 } = lastPlacedPointPosition;
                        ctx.moveTo(lastPlacedPointPosition.startPos[0], lastPlacedPointPosition.startPos[1]);
                        ctx.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1],phantomPointPosition[0], phantomPointPosition[1]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    } else {
                        // control points aren't chosen yet and placing end point so make a line from start to phantom
                        ctx.moveTo(lastPlacedPointPosition.startPos[0], lastPlacedPointPosition.startPos[1]);
                        ctx.lineTo(phantomPointPosition[0], phantomPointPosition[1]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                } else if(lastPlacedPointPosition.placingWhichPoint === 'controlPoint1') {
                    // end point must exist

                    // if controlPoint2 exists that means we're adjusting controlPoint1 again
                    if(lastPlacedPointPosition.controlPoint2) {
                        const {controlPoint2: cp2, endPos} = lastPlacedPointPosition;
                        ctx.moveTo(lastPlacedPointPosition.startPos[0], lastPlacedPointPosition.startPos[1]);
                        ctx.bezierCurveTo(
                            phantomPointPosition[0], phantomPointPosition[1],
                            cp2[0], cp2[1],
                            endPos[0], endPos[1]
                        )
                        ctx.stroke();
                        ctx.setLineDash([]);
                    } else {
                        // mirror controlPoint2 over it over
                        // get negative inverse slope of the start and end points
                        const [x_start, y_start] = lastPlacedPointPosition.startPos;
                        const [x_end, y_end] = lastPlacedPointPosition.endPos;

                        // I need to account for the case where slope is infinite
                        const m = (x_end - x_start) * -1 / (y_end - y_start);
                        const x_mid = (x_start + x_end) / 2;
                        const y_mid = (y_start + y_end) / 2;
                        const [x_p, y_p] = phantomPointPosition;
                        const b = -1;
                        const a = m;
                        const c = (y_mid - x_mid) * m
                        const q = x_mid * m + y_mid

                        const theta = Math.atan2(-1*(x_end - x_start), (y_end - y_start)) - Math.PI/2;

                        const p_x_prime = (x_p - x_mid) * Math.cos(theta) + (y_p - y_mid) * Math.sin(theta);
                        const p_y_prime = (-1 * (x_p - x_mid) * Math.sin(theta) + (y_p - y_mid) * Math.cos(theta));

                        const p_x_prime_mirrored = -p_x_prime;

                        const x_mir = p_x_prime_mirrored * Math.cos(theta) - p_y_prime * Math.sin(theta) + x_mid;
                        const y_mir = p_x_prime_mirrored * Math.sin(theta) + p_y_prime * Math.cos(theta) + y_mid;

                        // oh! I should draw the mirrored point after this is picked so it can be chosen.
                        // then I can hit "m" to mirror it and boom I'm done
                        ctx.setLineDash([]);
                        ctx.beginPath();
                        ctx.moveTo(x_mir, y_mir);
                        ctx.arc(x_mir, y_mir, 4, 0, 2 * Math.PI);
                        ctx.stroke();




                        ctx.setLineDash([3, 8]);
                        ctx.moveTo(x_start, y_start);
                        ctx.lineTo(x_end, y_end);
                        ctx.stroke();
                        ctx.setLineDash([]);
                        ctx.beginPath();
                        ctx.moveTo(x_mid, y_mid);
                        ctx.arc(x_mid, y_mid, 4, 0, 2 * Math.PI);
                        ctx.stroke();
                        ctx.setLineDash([3, 8]);
                        ctx.strokeStyle = '#12cf5aff';
                        ctx.beginPath();

                        ctx.moveTo(0,m * (0 - x_mid) + y_mid);
                        ctx.lineTo(1400, m * (1400 - x_mid) + y_mid);

                        ctx.stroke();
                        ctx.strokeStyle = '#a4fcfcff';
                        ctx.beginPath();
                        // const y_mirrored = y_p + (x_mid * m + y_mid) * -2 * (m * x_p + x_mid * m + y_mid + -1) / (m ** 2 + (x_mid * m + y_mid)**2)
                        // const x_mirrored = x_p + m * -2 * (m * x_p + x_mid * m + y_mid + -1) / (m ** 2 + (x_mid * m + y_mid)**2)
                        // numbers arent right here

                        // const y_mir = (y_p * (m ** 2 - 1) + 2 * m * (x_p + y_mid - x_mid)) / (m ** 2 + 1)
                        // const x_mir = (x_p * (1 - m ** 2) - 2 * m * (-1 * y_p + m * (y_mid - x_mid))) / (1 + m **2)

                        // const y_mir = y_p + ((b**2 - a**2) - 2 * a * (b * x_p + c)) / (a **2 + b ** 2);
                        // const x_mir = x_p + ((a**2 - b**2) - 2 * b * (a * y_p + c)) / (a **2 + b ** 2);
                        // const y_mir = -2 * b * (a * x_p + b * y_p + c) / (a **2 + b ** 2) + y_p
                        // const x_mir = -2 * a * (a * x_p + b * y_p + c) / (a **2 + b ** 2) + x_p

                        // const y_mir = (2*m*x_p - (1 - m**2)*y_p + 2*q) / (1 + m**2);
                        // const x_mir = ((1 - m**2) * x_p + 2 * m * y_p - 2 * m * q) / (1 + m**2);

                        // const A = m;
                        // const B = 1;
                        // const C = m * (y_mid - x_mid);
                        // const M = Math.sqrt(A * A + B * B);

                        // const A_prime = A / M;
                        // const B_prime = B / M;
                        // const C_prime = C / M;

                        // const D = A_prime * x_p + B_prime * y_p + C_prime;
                        
                        // const x_mir = x_p - 2 * A_prime * D;
                        // const y_mir = y_p - 2 * B_prime * D;

                        ctx.strokeStyle = '#a4fcfcff';
                        ctx.moveTo(x_start, y_start);
                        ctx.bezierCurveTo(
                            x_p, y_p,
                            x_mir, y_mir,
                            x_end, y_end
                        )
                        ctx.stroke();
                        ctx.setLineDash([]);
                        this.spriteEditor.bezierCurveBeingPlaced.mirroredValue = [x_mir, y_mir];
                    }
                    
                } else if (lastPlacedPointPosition.placingWhichPoint === 'controlPoint2') {
                    const {controlPoint1: cp1, endPos} = lastPlacedPointPosition;
                        ctx.moveTo(lastPlacedPointPosition.startPos[0], lastPlacedPointPosition.startPos[1]);
                        ctx.bezierCurveTo(
                            cp1[0], cp1[1], 
                            phantomPointPosition[0], phantomPointPosition[1],
                            endPos[0], endPos[1]
                        );
                        ctx.stroke();
                        ctx.setLineDash([]);
                }
            } else {
                // if last placed point is completed and a bezier curve, then it should already have been drawn
            }
        }
    }
}

