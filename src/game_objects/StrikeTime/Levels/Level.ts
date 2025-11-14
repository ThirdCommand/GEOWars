import { type GameEngine } from "../../../game_engine/game_engine";
import { type StrikeTimeScript } from "../../../StrikeTimeScript";

export abstract class Level {
    gameScript: StrikeTimeScript;
    engine: GameEngine;
    constructor(gameEngine: GameEngine, gameScript: StrikeTimeScript) {
        this.gameScript = gameScript;
        this.engine = gameEngine;
    }
    abstract runWinCondition(): boolean;
    abstract createLevel(): void;
    abstract update(deltaTime: number): void;
}