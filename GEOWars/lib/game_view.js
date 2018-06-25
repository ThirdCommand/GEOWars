class GameView {
  constructor(game, ctx, canvasEl) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.canvasEl = canvasEl;

  }

  bindKeyHandlers() {
    const ship = this.ship;

    Object.keys(GameView.MOREMOVES).forEach((k) => {
      const move = GameView.MOREMOVES[k];
      key(k, () => { ship.power(move); });
    });

    key("m", () => {
      this.game.muted = !this.game.muted;
      if (this.game.muted) {
        this.theme.pause();
      } else {
        this.theme.play();
      }
    })



    window.addEventListener('mousemove', (e) => {
      const x = {x: e.layerX};
      const y = {y: e.layerY};
      // console.log(x);
      // console.log(y);
      // debugger
      const mousePos = [e.layerX, e.layerY];
      
      ship.setFireAngle(mousePos);
      
    });
    
    // key("space", () => { ship.fireBullet(); });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    
    window.addEventListener('click', (e) => {
      this.theme = new Audio("GEOWars/sounds/Geometry_OST.mp3");
      this.theme.id = "OST";

      this.game.ships[0].start();
      requestAnimationFrame(this.animate.bind(this));
    });
  }
  

  // resizeGame() {
  //   var gameArea = document.getElementById('gameArea');
  //   var widthToHeight = 4 / 3;
  //   var newWidth = window.innerWidth;
  //   var newHeight = window.innerHeight;
  //   var newWidthToHeight = newWidth / newHeight;

  //   if (newWidthToHeight > widthToHeight) {
  //     newWidth = newHeight * widthToHeight;
  //     gameArea.style.height = newHeight + 'px';
  //     gameArea.style.width = newWidth + 'px';
  //   } else {
  //     newHeight = newWidth / widthToHeight;
  //     gameArea.style.width = newWidth + 'px';
  //     gameArea.style.height = newHeight + 'px';
  //   }

  //   gameArea.style.marginTop = (-newHeight / 2) + 'px';
  //   gameArea.style.marginLeft = (-newWidth / 2) + 'px';

  //   var gameCanvas = document.getElementById('gameCanvas');
  //   gameCanvas.width = newWidth;
  //   gameCanvas.height = newHeight;
  //   // this.game.gameWidth = newWidth;
  //   // this.game.gameHeight = newHeight;
  // }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta, this.ctx);
    this.game.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

// function sound(src) {
//   this.sound = document.createElement("audio");
//   this.sound.src = src;
//   this.sound.setAttribute("preload", "auto");
//   this.sound.setAttribute("controls", "none");
//   this.sound.style.display = "none";
//   document.body.appendChild(this.sound);
//   this.play = function () {
//     this.sound.play();
//   }
//   this.stop = function () {
//     this.sound.pause();
//   }
// }

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
