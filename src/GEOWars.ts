import { GameView } from "./game_view";
import { GameEngine } from "./game_engine/game_engine";
import { GEOLevelDesigner } from "./game_engine/Levels/GEOLevelDesigner"; 
import { AnimationView } from "./AnimationView";
import { StrikeTimeLevelDesigner } from "./game_engine/Levels/StrikeTimeLevelDesigner";

document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = 1000; // this is the start canvas, can be changed later by a specific game
    canvasEl.height = 600; // though I'm not sure what happens when you resize a rendered canvas

    const ctx = canvasEl.getContext("2d");
    const gameEngine = new GameEngine(ctx);
    const animationWindowGEO = document.getElementsByTagName("canvas")[1].getContext("2d");
    const animationWindowStrikeTime = document.getElementById("animationTestBoxStrikeTime").querySelector("canvas").getContext("2d");
    const levelEditorCanvas = document.getElementById("LevelEditorCanvas").querySelector("canvas");
    const levelEditorCtx = levelEditorCanvas.getContext("2d");
    const animationView = new AnimationView(animationWindowGEO);
    const animationViewStrikeTime = new AnimationView(animationWindowStrikeTime);
    const levelDesigner = new GEOLevelDesigner(gameEngine, animationView, levelEditorCtx);
    const strikeTimeLevelDesigner = new StrikeTimeLevelDesigner(gameEngine, animationViewStrikeTime, levelEditorCtx);
    gameEngine.levelDesigner = levelDesigner;

    window.addEventListener('focus', () => {
        gameEngine.focusUnPause();
        animationView.focusUnPause();
    });
    
    window.addEventListener('blur', () => {
        gameEngine.focusPause();
        animationView.focusPause();
    });

    new GameView(gameEngine, ctx, canvasEl, levelDesigner, strikeTimeLevelDesigner, animationView, animationViewStrikeTime).start();
});
