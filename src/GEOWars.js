import { GameScript } from "./game_script";
import { GameView } from "./game_view";
import { GameEngine } from "./game_engine/game_engine";
import { LevelDesigner } from "./game_engine/Levels/levelDesigner";
import { AnimationView } from "./AnimationView";

document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = GameScript.DIM_X;
    canvasEl.height = GameScript.DIM_Y;

    const ctx = canvasEl.getContext("2d");
    const gameEngine = new GameEngine(ctx);
    const animationWindow = document.getElementsByTagName("canvas")[1];
    const animationView = new AnimationView(animationWindow.getContext("2d"));
    const levelDesigner = new LevelDesigner(gameEngine, animationView);

    animationView.start();
    new GameView(gameEngine, ctx, canvasEl, levelDesigner).start();
});
