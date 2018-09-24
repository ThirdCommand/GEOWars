const Util = require("../../../game_engine/util")
const GameObject = require("../../../game_engine/game_object")

const GridSprite = require("./grid_sprite")
const GridPoint = require("./grid_point")

class Grid extends GameObject {
    constructor(engine, gameScript) {
        super(engine)

        this.transform.pos = [0,0]

        this.arenaDimensions = [gameScript.DIM_X, gameScript.DIM_Y]
        this.elasticity = 0.1; // force provided to pull particle back into place
        this.dampening = 0.1; // force produced from velocity (allows things to eventuall fall to rest)

        this.gridPoints = this.createGridPoints()

        this.addLineSprite(new GridSprite(this.transform, this.gridPoints))
        // this.addPhysicsComponent()
        // this.addCollider("General", this, this.radius)
    }

    Playerdies(location) {
        this.gridPoints.forEach((row) => {
            row.forEach((gridPoint) => {
                this.deathPerterb(gridPoint, location)
            })
        })
    }

    deathPerterb(gridPoint, location){
        // pulls inward upon death. 1/r^2
        const pullConstant = 1250;

        let pos = location
        let objectPos = gridPoint.transform.absolutePosition()
        let dy = pos[1] - objectPos[1];
        let dx = pos[0] - objectPos[0];
        let unitVector = Util.dir([dx, dy]);
        let r = Math.sqrt(dy * dy + dx * dx);
        if ( r < 20 ) {
        } else {
            let velContribution = [
                unitVector[0] * pullConstant / (r ),
                unitVector[1] * pullConstant / (r )
            ]
            gridPoint.transform.vel[0] = velContribution[0];
            gridPoint.transform.vel[1] = velContribution[1];
        }
    }

    createGridPoints(){
        let columnCount = 20
        let rowCount = 12
        let gridPoints = []
        let gridRow = []
        for (let yPosition = 0; yPosition <= this.arenaDimensions[1]; yPosition += this.arenaDimensions[1] / rowCount) {
            for (let xPosition = 0; xPosition <= this.arenaDimensions[0]; xPosition += this.arenaDimensions[0] / columnCount) {
                if(
                   (xPosition === 0 && (yPosition === 0 || yPosition === this.arenaDimensions[1])) || 
                   (xPosition == this.arenaDimensions[0] && (yPosition === 0 || yPosition === this.arenaDimensions[1])) 
                   ){
                    continue
                }
                let position = [xPosition, yPosition]
                gridRow.push(new GridPoint(this.gameEngine, position))
            }
            
            gridPoints.push(gridRow.slice())
            gridRow = []
        }
        return gridPoints
    }

    update(deltaTime) {

    }

}

module.exports = Grid;