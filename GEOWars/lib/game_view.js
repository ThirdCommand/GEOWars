class GameView {
  constructor(game, ctx, canvasEl) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.canvasEl = canvasEl;
    // this.canvasEl.onclick = function (e) {
    //   // debugger
    //   this.ship.fireBullet();
    // };
  }

  bindKeyHandlers() {
    const ship = this.ship;

    Object.keys(GameView.MOVES).forEach((k) => {
      const move = GameView.MOVES[k];
      key(k, () => { ship.power(move); });
    });

    key("m", () => {
      createjs.Sound.stop()
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

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  }
  this.stop = function () {
    this.sound.pause();
  }
}

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

module.exports = GameView;
