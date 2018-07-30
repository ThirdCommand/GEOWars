
class GameView {
  constructor(engine, ctx, canvasEl) {
    this.ctx = ctx;
    this.engine = engine;
    // this.ship = this.game.addShip(); belongs in game script
    this.canvasEl = canvasEl;
  }

  bindKeyHandlers() {
    const engine = this.engine
    Object.keys(GameView.MOREMOVES).forEach((k) => {
      const move = GameView.MOREMOVES[k];
      key(k, () => { ship.controlsDirection(move); });
    });

    key("m", () => {
      engine.muted = !engine.muted;
      if (engine.muted) {
        this.theme.pause();
      } else {
        this.theme.play();
      }
    })

    window.addEventListener('mousemove', (e) => {
      const x = {x: e.layerX};
      const y = {y: e.layerY};
      const mousePos = [e.layerX, e.layerY];
      this.engine.updateMousePos(mousePos)
      // ship.setFireAngle(mousePos); add to game script event listener thing
    });
    
    // key("space", () => { ship.fireBullet(); });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    window.addEventListener('click', (e) => {
      this.theme = new Audio("GEOWars/sounds/Geometry_OST.mp3");
      this.theme.id = "OST";

      // this.game.ships[0].start();
      requestAnimationFrame(this.animate.bind(this));
    });
  }
  
  animate(time) {
    const timeDelta = time - this.lastTime;
    this.engine.step(timeDelta, this.ctx);
    this.lastTime = time;
    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

GameView.MOREMOVES = {
  c: [0.70710678118, 0.70710678118],
  x: [0,1],
  z: [-0.70710678118, 0.70710678118],
  a: [-1,0],
  s: [-1,0],
  w: [-0.70710678118, -0.70710678118],
  e: [0,-1],
  r: [0.70710678118, -0.70710678118],
  f: [1,0],
  d: [1,0]
}

module.exports = GameView;
