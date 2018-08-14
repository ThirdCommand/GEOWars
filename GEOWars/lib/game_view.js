

class GameView {
  constructor(engine, ctx, canvasEl) {
    this.ctx = ctx;
    this.engine = engine;
    // this.ship = this.game.addShip(); belongs in game script
    this.canvasEl = canvasEl;
    this.initialUnmute = true;
  }

  bindKeyboardKeys(){
    window.addEventListener('keydown', this.doKeyEvent(true), true);
    window.addEventListener('keyup', this.doKeyEvent(false), true);
  }

  updateMovementDirection(move, down){
    this.engine.gameScript.ship.updateLeftControlStickInput(move, down);
  }

  /*
    if true, change movement direction to the direction
    if false, remove movement direction if it's the 
    same as the current movement direction
  */

  doKeyEvent(down) {
    return (e) => {
      if (e.key === "m" && this.initialUnmute) {
        this.initialUnmute = false
        this.engine.gameScript.theme.play()
      }

      if(e.key === "m" && down){
        this.engine.toggleMute()
        if (this.engine.muted){
          this.engine.gameScript.theme.mute()
        } else{
          this.engine.gameScript.theme.unmute()
        }
        
      }

      let unitVector = GameView.MOVES[e.key]
      if (unitVector) {
        this.updateMovementDirection(unitVector, down)
      }
    }
  }

  bindKeyHandlers() {
    const engine = this.engine
    // Object.keys(GameView.MOVES).forEach((k) => {
    //   const move = GameView.MOVES[k];
    //   // debugger
    //   key(k, () => {
    //     this.engine.gameScript.ship.updateLeftControlStickInput(move);
    //   });
    // });

    // key("m", () => {
    //   engine.muted = !engine.muted;
    //   if (engine.muted) {
    //     this.theme.pause();
    //   } else {
    //     this.theme.play();
    //   }
    // })

    window.addEventListener('mousemove', (e) => {
      const x = {x: e.layerX};
      const y = {y: e.layerY};
      const mousePos = [e.layerX, e.layerY];
      this.engine.updateMousePos(mousePos)
      // ship.setFireAngle(mousePos); add to game script event listener thing
    });

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
        e.preventDefault();
      e.returnValue = false;
    }

    // function preventDefaultForScrollKeys(e) {
    //   if (keys[e.keyCode]) {
    //     preventDefault(e);
    //     return false;
    //   }
    // }

    function disableScroll() {
      if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove = preventDefault; // mobile
      // document.onkeydown = preventDefaultForScrollKeys;
    }


    if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    // document.onkeydown = preventDefaultForScrollKeys;


    // window.onwheel = preventDefault
    // window.addEventListener('mousewheel', (e) => {
    //   e.preventDefault
    // });
    
    // key("space", () => { ship.fireBullet(); });
  }

  start() {
    this.lastTime = 0;
    this.bindKeyHandlers();
    window.addEventListener('click', (e) => {
      // this.theme = new Audio("GEOWars/sounds/Geometry_OST.mp3");
      // this.theme.id = "OST";
      // this.theme.volume = 1;
      this.bindKeyboardKeys()
      requestAnimationFrame(this.animate.bind(this));
    });
  }
  
  animate(time) {
    const timeDelta = time - this.lastTime;
    this.engine.tick(timeDelta, this.ctx);
    this.lastTime = time;
    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

const KEYMAP = {
  87: "W",
  82: "R",
  90: "Z",
  88: "X",
  67: "C",
  70: "F",
  83: "S",
  69: "E",
  65: "D",
  68: "A",
}

GameView.MOVES = {
  c: [0.70710678118, 0.70710678118],
  x: [0,1],
  z: [-0.70710678118, 0.70710678118],
  a: [-1,0],
  s: [-1,0],
  w: [-0.70710678118, -0.70710678118],
  e: [0,-1],
  r: [0.70710678118, -0.70710678118],
  f: [1,0],
  d: [1,0],
}

module.exports = GameView;
