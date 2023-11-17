const GameScript = require("./game_script");
const GameView = require("./game_view");
const GameEngine = require("./game_engine/game_engine");
const LevelDesigner = require("./game_engine/Levels/levelDesigner");
const AnimationView = require("./AnimationView");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = GameScript.DIM_X;
  canvasEl.height = GameScript.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const gameEngine = new GameEngine(ctx);
  const animationWindow = document.getElementsByTagName("canvas")[1];
  const animationView = new AnimationView(animationWindow.getContext("2d"))
  new LevelDesigner(gameEngine, animationView);

  animationView.start();
  new GameView(gameEngine, ctx, canvasEl).start();
});



