import { GameEngine } from "../game_engine";
import { DIM_X, DIM_Y } from "../../SpriteEditorScript";
import { GameObject } from "../game_object";
import { LineSprite } from "../line_sprite";
import { Transform } from "../transform";
import { Arc, ArcData, BezierCurve, BezierCurveData, Circle, CircleData, PlacingPoint, Point, PointData } from "./Point";

// place points until loop completed or escape selected
// then complete the line 

// this should keep track of what's on the screen I guess?
export class SpriteEditor extends GameObject{
    points: Point[];
    pointGroupsForLines: (Point | BezierCurve | Circle | Arc)[][];
    currentLineGroup: (Point | BezierCurve | Circle | Arc)[];
    currentMousePos: [number, number];
    isPlacingPoint: boolean;
    isPlacingCircle: boolean;
    isPlacingBezierCurve: boolean;
    isPlacingArc: boolean;
    bezierCurveBeingPlaced?: BezierCurve;
    arcBeingPlaced?: Arc;
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
        this.addFKeyListener();
        this.addSKeyListener();
        this.addBKeyListener();
        this.addMKeyListener();
        this.addCKeyListener();
        this.addOKeyListener();
        this.addClickListener();
    }

    // L to start placing new line, will end current line and start new one
    // K to remove last added point. If last point in line, the line is removed and point placing is ended
    // J to end point placing
    // M to choose the mirrored version of control point1 for control point2
    // O to start adding a circle. Ends the line currently being entered
    // C to start placing or end placing an Arc.
    // B to start placing or end placing Bezier curve. 

    // L to start placing new line, will end current line and start new one
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

    // O to start adding a circle. Ends the line currently being entered
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

    updateFKeyListener(pressed: boolean): void {
        if(pressed) {
            if(this.isPlacingArc) {
                this.arcBeingPlaced.counterClockwise = !this.arcBeingPlaced.counterClockwise;
            }
        }
    }

    // K to remove last added point. If last point in line, the line is removed and point placing is ended
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

    // M to choose the mirrored version of control point1 for control point2
    updateMKeyListener(pressed: boolean): void {
        if(pressed && this.isPlacingBezierCurve && this.bezierCurveBeingPlaced.placingWhichPoint === 'controlPoint2' && this.bezierCurveBeingPlaced.mirroredValue)  {
            this.bezierCurveBeingPlaced.controlPoint2 = [this.bezierCurveBeingPlaced.mirroredValue[0], this.bezierCurveBeingPlaced.mirroredValue[1]]
            this.updateBKeyListener(pressed);
        }
    }

    // B to start placing or end placing Bezier curve. 
    updateBKeyListener(pressed: boolean): void {
        if(pressed && !this.isPlacingPoint) {

        }
        else if(pressed && !this.isPlacingBezierCurve) {
            if(!this.isPlacingPoint) {
                // this should never happen... must be old code
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
            } else if(lastEnteredPoint instanceof BezierCurve || lastEnteredPoint instanceof Arc) {
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
                    ) || (point instanceof BezierCurve || point instanceof Arc) && (
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

    // C to start placing or end placing an Arc.
    updateCKeyListener(pressed: boolean): void {
        if(pressed && !this.isPlacingPoint) {
            
        }
        else if(pressed && !this.isPlacingArc) {
            if(!this.isPlacingPoint) {
                // this should never happen... must be old code
                this.placingPoint = new PlacingPoint(this.gameEngine as GameEngine);
                this.currentLineGroup = [];
                this.pointGroupsForLines.push(this.currentLineGroup);
            }
            this.isPlacingPoint = true;
            this.isPlacingArc = true;
            const lastEnteredPoint = this.currentLineGroup[this.currentLineGroup.length - 1];
            let startPosition: [number, number];

            if (lastEnteredPoint instanceof Point) {
                startPosition = [lastEnteredPoint.pos[0], lastEnteredPoint.pos[1]];
            } else if(lastEnteredPoint instanceof BezierCurve || lastEnteredPoint instanceof Arc) {
                startPosition = [lastEnteredPoint.endPos[0], lastEnteredPoint.endPos[1]];
            }
            this.arcBeingPlaced = new Arc(startPosition);
            this.currentLineGroup.push(this.arcBeingPlaced);
        } else if (pressed && this.isPlacingArc && this.arcBeingPlaced.isDrawable()) {
            this.isPlacingArc = false;
            this.arcBeingPlaced.isBeingPlaced = false;
            if(
                this.currentLineGroup.slice(0,this.currentLineGroup.length - 1).find((point) => (
                    (
                        point instanceof Point && 
                        point.pos[0] === this.arcBeingPlaced.endPos[0] && 
                        point.pos[1] === this.arcBeingPlaced.endPos[1]
                    ) || (point instanceof BezierCurve || point instanceof Arc) && (
                        (
                            point.startPos[0] === this.arcBeingPlaced.endPos[0] && 
                            point.startPos[1] === this.arcBeingPlaced.endPos[1]
                        ) || ( 
                            // on second thought, it should never be the end position.. but maybe that's fine
                            point.endPos[0] === this.arcBeingPlaced.endPos[0] && 
                            point.endPos[1] === this.arcBeingPlaced.endPos[1]
                        )
                    )
                ))
            ) {
                this.endPointPlacement();
            } 
            this.arcBeingPlaced = null;
            
        }
    }

    // J to end point placing
    updateJKeyListener(pressed: boolean): void {
        if(pressed) {
            this.endPointPlacement();
        }
    }

    pointTransformation(pos: [number, number]): [number, number] {
        return [
            Math.round((pos[0] - DIM_X/2) / (DIM_X / 120)),
            Math.round((pos[1] - DIM_Y/2) / (DIM_Y / 72))
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
        const mappedPoints: (PointData | BezierCurveData | CircleData | ArcData)[][] = this.pointGroupsForLines.map((pointGroup) => pointGroup.map((point) => {
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
                const radius = Math.round((point.radius) / (DIM_X / 120));
                return new CircleData(centerPoint, radius);
            } else if (point instanceof Arc) {
                const {
                    startAngle,
                    endAngle,
                    centerPoint,
                    counterClockwise,
                    radius,
                } = point.arcDrawData;
                const {startPos, endPos} = point;
                return new ArcData({
                    startPos: this.pointTransformation(startPos),
                    endPos: this.pointTransformation(endPos),
                    startAngle: -startAngle,
                    endAngle: -endAngle,
                    centerPoint: this.pointTransformation(centerPoint),
                    counterClockwise,
                    radius: Math.round((radius) / (DIM_X / 120)),
                })
            }
        }))
        
        if(pressed && this.pointGroupsForLines.length > 0){
            // put save logic here
            let stringToSave = '(ctx: CanvasRenderingContext2D) { \n\tctx.strokeStyle = "";\n\tctx.lineWidth = 2;\n\tconst s = 1;\n\tconst pos = this.transform.absolutePosition();\n\tctx.translate(pos[0], pos[1]);\n\n';
            // find biggest X value
            // find smallest X value
            // find difference to get width
            // same with height for Y
            
            let pointPairsForLines: Array<PointPair> = [];
            mappedPoints.forEach((pointGroup, idx) => {
                let stringStart = ``
                let firstPointInFirstLine: [number, number];
                
                const firstPoint = pointGroup[0];
                if(firstPoint instanceof PointData) {
                    stringStart = 
                    `\t// Piece ${idx + 1}: \n\tctx.beginPath();\n\tctx.moveTo(${firstPoint.point[0]} * s, ${firstPoint.point[1]} * s);\n`;
                    firstPointInFirstLine = [firstPoint.point[0], firstPoint.point[1]];
                } else if (firstPoint instanceof CircleData) {
                    stringStart = 
                    `\t// Piece ${idx + 1}: \n\tctx.beginPath();\n\tctx.arc(${firstPoint.centerPoint[0]} * s, ${firstPoint.centerPoint[1]} * s, ${firstPoint.radius} * s, 0,2*Math.PI);\n`;
                } else if (firstPoint instanceof BezierCurveData) {
                    stringStart=
                    `\t// Piece ${idx + 1}: \n\tctx.beginPath();\n\tctx.moveTo(${firstPoint.startPos[0]} * s, ${firstPoint.startPos[1]} * s);\n\tctx.bezierCurveto(\n\t\t${firstPoint.controlPoint1[0]} * s, ${firstPoint.controlPoint1[1]} * s,\n\t\t${firstPoint.controlPoint2[0]} * s, ${firstPoint.controlPoint2[1]} * s,\n\t\t${firstPoint.endPos[0]} * s, ${firstPoint.endPos[1]} * s\n\t);\n`; 
                    firstPointInFirstLine = [firstPoint.endPos[0], firstPoint.endPos[1]];
                } else if (firstPoint instanceof ArcData) {
                    stringStart=
                    `\t// Piece ${idx + 1}: \n\tctx.beginPath();\n\tctx.arc(${firstPoint.centerPoint[0]} * s, ${firstPoint.centerPoint[1]} * s, ${firstPoint.radius} * s, ${firstPoint.startAngle}, ${firstPoint.endAngle}, ${firstPoint.counterClockwise});\n`;
                }

                // I should create the point pairs here... assuming they are lines
                // I should grab the start point of bezier curve and have that be the end
                // point of a line if it is
                // and I should grab the end point of a bezier curve if it is the start point
                // of a new line 
               
                const restOfPoints = pointGroup.slice(1);
                let destructedLinesSection: string;
                // this will be true when the first point is a point or a bezier curve
                // i need to account for the case where there's two bezier curves... okay
                // I think I should just handle bezier curves at this point lol
                // it shouldn't be too ridiculous
                if (firstPointInFirstLine) {
                    destructedLinesSection = 'createDeathAnimationObjects() {\n\tconst color = "rgb(255, 255, 255)"\n\tconst lineWidth = 1.5;\n'
                    destructedLinesSection += `\tnew DeathAnimationLineObject(\n\t\tthis.gameEngine,\n\t\t[this.transform.pos[0], this.transform.pos[1]],\n\t\tthis.transform.angle,\n\t\t[line1Point1,\n`;
                    `line1Point2], color, lineWidth);`
                }

                const lines = restOfPoints.reduce<string>((acc, point) => {
                    let newLine = '';
                    if(point instanceof PointData) {
                        newLine = 
                        `\tctx.lineTo(${point.point[0]} * s, ${point.point[1]} * s);\n`;
                        if(firstPointInFirstLine) {
                            pointPairsForLines.push(
                                [
                                    [firstPointInFirstLine[0], firstPointInFirstLine[1]], 
                                    [point.point[0], point.point[1]]
                                ]
                            )
                            firstPointInFirstLine = null;
                        } else if (true) {

                        }
                    } else if (point instanceof CircleData) {
                        console.error('there shouldnt be a circle here, since circles are their own part');
                    } else if (point instanceof BezierCurveData) {
                        // start of the curve should be the last point
                        newLine=
                        `\tctx.bezierCurveto(\n\t\t${point.controlPoint1[0]} * s, ${point.controlPoint1[1]} * s,\n\t\t${point.controlPoint2[0]} * s, ${point.controlPoint2[1]} * s,\n\t\t${point.endPos[0]} * s, ${point.endPos[1]} * s\n\t);\n`; 
                    } else if (point instanceof ArcData) {
                        newLine=
                        `\tctx.arc(${point.centerPoint[0]} * s, ${point.centerPoint[1]} * s, ${point.radius} * s, ${point.startAngle}, ${point.endAngle}, ${point.counterClockwise});\n`;
                    }
                    return acc.concat(newLine)
                },'')
                const stringEnd = 
                    `\tctx.stroke();\n`;
                stringToSave += stringStart + lines + stringEnd;
            })
            stringToSave +='}'

            pointPairsForLines.forEach(() => {

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
        if(this.isPlacingArc) this.currentLineGroup.pop();
        if(this.isPlacingCircle) this.currentLineGroup.pop();

        this.bezierCurveBeingPlaced = null;
        this.circleBeingPlaced = null;
        this.arcBeingPlaced = null;
        this.placingPoint = null;

        this.isPlacingPoint = false;
        this.isPlacingCircle = false;
        this.isPlacingBezierCurve = false;
        this.isPlacingArc = false;
        
        this.currentLineGroup = [];
    }

    placePoint(pointPosition: [number, number]) {
        if(this.isPlacingCircle) {
            this.circleBeingPlaced.placingPoint(pointPosition);
            if(this.circleBeingPlaced.pointBeingPlaced === 'done') {
                // this should move to where the bezier curve does the same thing?
                this.isPlacingCircle = false;
                this.endPointPlacement();
            }
        } else if(this.isPlacingBezierCurve) {
            this.bezierCurveBeingPlaced.placePoint(pointPosition);
        } else if(this.isPlacingArc) {
            this.arcBeingPlaced.placePoint(pointPosition);
            if(this.arcBeingPlaced.placingWhichPoint === 'start') {
                this.isPlacingArc = false;
                this.arcBeingPlaced.isBeingPlaced = false;
                if(
                    this.currentLineGroup.slice(0,this.currentLineGroup.length - 1).find((point) => (
                        (
                            point instanceof Point && 
                            point.pos[0] === this.arcBeingPlaced.endPos[0] && 
                            point.pos[1] === this.arcBeingPlaced.endPos[1]
                        ) || (point instanceof BezierCurve || point instanceof Arc) && (
                            (
                                point.startPos[0] === this.arcBeingPlaced.endPos[0] && 
                                point.startPos[1] === this.arcBeingPlaced.endPos[1]
                            ) || ( 
                                // on second thought, it should never be the end position.. but maybe that's fine
                                point.endPos[0] === this.arcBeingPlaced.endPos[0] && 
                                point.endPos[1] === this.arcBeingPlaced.endPos[1]
                            )
                        )
                    ))
                ) {
                    this.endPointPlacement();
                } 
                this.arcBeingPlaced = null;
            }
        } else if(
            this.currentLineGroup.find(
                (point) => (
                    (
                        point instanceof Point && 
                        point.pos[0] === pointPosition[0] && 
                        point.pos[1] === pointPosition[1]
                    ) || (point instanceof BezierCurve || point instanceof Arc) && (
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
            ));
            this.endPointPlacement();
        } else {
            this.currentLineGroup.push(new Point(
                pointPosition, 
            ));
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
    pointGroupsForLines: (Point | BezierCurve | Circle | Arc)[][];
    mousePosition: [number, number];
    spriteEditor: SpriteEditor
    constructor(transform: Transform, pointGroupsForLines: (Point | BezierCurve | Circle | Arc)[][], currentMousePos: [number, number], spriteEditor: SpriteEditor) {
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
                if(points[0] instanceof Arc) {
                    if(!points[0].isBeingPlaced) {
                        const {
                            centerPoint, radius, startAngle, endAngle, counterClockwise
                        } = points[0].arcDrawData;
                        const counterClockwiseGaurenteed = counterClockwise ||  points[0].counterClockwise
                        ctx.arc(
                            centerPoint[0], centerPoint[1], radius, startAngle, endAngle, counterClockwiseGaurenteed
                        )
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
                    } else if (point instanceof Arc) {
                        if(!point.isBeingPlaced) {
                            const {centerPoint, radius, startAngle, endAngle, counterClockwise} = point.arcDrawData;
                            ctx.arc(
                                centerPoint[0], centerPoint[1], radius, startAngle, endAngle, counterClockwise
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
            !this.spriteEditor.isPlacingArc &&
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
            } else if (lastPlacedPointPosition instanceof BezierCurve || lastPlacedPointPosition instanceof Arc) {
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
                console.error('Last placed point should be BezierCurve if isPlacingBezierCurve is true. something went wrong')
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
                        );
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
        if(
            this.spriteEditor.isPlacingArc && 
            this.pointGroupsForLines.length >= 1 && 
            currentLineGroup.length > 0
        ) {
            // should be arc because isPlacingArc is true (as long as I'm managing that right)
            const lastPlacedPointPosition = currentLineGroup[currentLineGroup.length - 1];
            ctx.strokeStyle = '#a4fcfcff';
            ctx.setLineDash([3, 8]);
            ctx.lineWidth = 2;
            ctx.beginPath();

            // this should never be true:
            if(lastPlacedPointPosition instanceof Point) {
                console.error('Last placed point should be Arc if isPlacingArc is true. something went wrong')
                ctx.moveTo(lastPlacedPointPosition.pos[0], lastPlacedPointPosition.pos[1])
                ctx.lineTo(phantomPointPosition[0], phantomPointPosition[1]);
                ctx.stroke();
                ctx.setLineDash([]);
            // this should always be true:
            } else if (lastPlacedPointPosition instanceof Arc && lastPlacedPointPosition.isBeingPlaced) {
                if(lastPlacedPointPosition.placingWhichPoint === 'start') {
                    console.log('placingStartPoint')
                    // I think we don't draw anything since this must be the first point being added
                } else if(lastPlacedPointPosition.placingWhichPoint === 'end') {
                    console.log('placingEndPoint')
                    // only start has been placed.
                    // display phantom position of end position
                    // maybe display the arc assuming the center point is the midpoint of start and end
                    const {startPos} = lastPlacedPointPosition;

                    const midPoint = [
                        (startPos[0] + phantomPointPosition[0]) / 2, (startPos[1] + phantomPointPosition[1]) / 2
                    ];
                    const radius = Math.sqrt((startPos[0] - midPoint[0]) ** 2 + (startPos[1] - midPoint[1]) ** 2)

                    const startAngle = Math.atan2(
                        (startPos[1] - midPoint[1]), 
                        startPos[0] - midPoint[0]
                    );
                    const endAngle = Math.atan2(
                        (phantomPointPosition[1] - midPoint[1]),
                        phantomPointPosition[0] - midPoint[0] 
                    );

                    console.log({
                        startPos, phantomPointPosition, midPoint, radius, startAngle, endAngle
                    });

                    // I might need another key listener to flip the rotation direction over for the arc
                    // press F for respect

                    // ctx.arc(midPoint[0], midPoint[1], 2, 0, 2*Math.PI);

                    ctx.arc(midPoint[0], midPoint[1], radius, startAngle, endAngle, !!lastPlacedPointPosition?.counterClockwise);
                    ctx.stroke();
                    ctx.setLineDash([]);
                } else { // placing center point
                    console.log('placing Center Point')
                    const {startPos, endPos} = lastPlacedPointPosition;

                    // center point is the phantom point. this determines the start and end angle

                    // the point can only exist on the line perpendicular to the start end line and intersecting the midpoint
                    // when the slope is infinite, just use the y value of the phantom point
                    const midPoint = [
                        (startPos[0] + endPos[0]) / 2, (startPos[1] + endPos[1]) / 2
                    ];

                    const inverseSlope = -(endPos[0] - startPos[0]) / (endPos[1] - startPos[1]);

                    let y_position: number;
                    let centerPoint: [number, number];

                    if (inverseSlope === Number.NEGATIVE_INFINITY || inverseSlope === Number.POSITIVE_INFINITY) {
                        centerPoint = [midPoint[0], phantomPointPosition[1]]
                    } else {
                        y_position = inverseSlope * (phantomPointPosition[0] - midPoint[0]) + midPoint[1]
                        centerPoint= [phantomPointPosition[0], y_position];
                    }

                    // y = slope * (x - x1) + y1

                    // distance from start point to center point
                    // Ah right, I need the point along the line that goes through the center point
                    const radius = Math.sqrt((startPos[0] - centerPoint[0])**2 + (startPos[1] - centerPoint[1])**2);
                    const startAngle = Math.atan2(
                        (startPos[1] - centerPoint[1]), startPos[0] - centerPoint[0] 
                    );
                    const endAngle = Math.atan2(
                        (endPos[1] - centerPoint[1]), endPos[0] - centerPoint[0] 
                    );

                    // ctx.arc(endPos[0], endPos[1], 2, 0, 2* Math.PI);
                    // ctx.stroke();
                    // I need to make the point snap at the midpoint even though it's off grid
                    ctx.arc(midPoint[0], midPoint[1], 2, 0, 2 * Math.PI);
                    ctx.arc(centerPoint[0], centerPoint[1], radius, startAngle, endAngle, !!lastPlacedPointPosition?.counterClockwise);

                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            }
        }
    }
}

type PointPair = [[number, number], [number, number]]
