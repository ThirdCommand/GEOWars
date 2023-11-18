import { LineSprite } from "../../../game_engine/line_sprite";
import { Color } from "../../../game_engine/color";

export class GridSprite extends LineSprite {
    constructor(transform, gridPoints) {
        super(transform);
        this.gridPoints = gridPoints;

        this.color = new Color({
            "hsla": [202, 100, 70, 0.2]
        });
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = 3;
        this.drawRows(ctx);
        this.drawColumns(ctx);
        ctx.restore();
    }

    drawRows(ctx) {
        const gridPoints = this.gridPoints;

        for (let i = 1; i < gridPoints.length - 1; i++) {
            ctx.beginPath();
            const firstPosition = gridPoints[i][0].transform.pos;
            ctx.moveTo(firstPosition[0], firstPosition[1]);
            for (let j = 1; j < gridPoints[i].length; j++) {
                const nextPosition = gridPoints[i][j].transform.pos;
                ctx.lineTo(nextPosition[0], nextPosition[1]);
            }

            ctx.stroke();
        }
    }

    drawColumns(ctx) {
        const gridPoints = this.gridPoints;
        ctx.beginPath();

        for (let j = 1; j < gridPoints[1].length - 1; j++) {
            ctx.beginPath();
            for (let i = 0; i < gridPoints.length; i++) {
                let nextPosition = [];
                if( i === 0 || i === 0) {
                    nextPosition = gridPoints[i][j - 1].transform.pos;
                    ctx.moveTo(nextPosition[0], nextPosition[1]);
                } else {
                    if ( i === gridPoints.length - 1) {
                        nextPosition = gridPoints[i][j - 1].transform.pos;
                    } else {
                        nextPosition = gridPoints[i][j].transform.pos;
                    }
                    ctx.lineTo(nextPosition[0], nextPosition[1]);
                }

            }
            ctx.stroke();
        }
    }
}