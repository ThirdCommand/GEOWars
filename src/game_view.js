export class GameView {
    constructor(engine, ctx, canvasEl, levelDesigner, animationView) {
        this.ctx = ctx;
        this.engine = engine;
        // this.ship = this.game.addShip(); belongs in game script
        this.canvasEl = canvasEl;
        this.initialUnmute = true;
        this.gameStarted = false;
        this.modelClosed = false;
        this.levelDesigner = levelDesigner;
        this.animationView = animationView;
        this.bindKeyboardKeys = this.bindKeyboardKeys.bind(this);
        this.gameEditorOpened = false;
        this.lastTime = 0;
        this.animate = this.animate.bind(this);
    }

    bindKeyboardKeys() {
        window.addEventListener("keydown", this.doKeyEvent(true), true);
        window.addEventListener("keyup", this.doKeyEvent(false), true);
    }

    updateMovementDirection(move, down) {
        if (!this.gameEditorOpened) {
            this.engine.gameScript.ship.updateLeftControlStickInput(move, down);
        }
    }

    /*
    if true, change movement direction to the direction
    if false, remove movement direction if it's the 
    same as the current movement direction
  */

    doKeyEvent(down) {
        return (e) => {
            // if (e.key === "p"){
            //   this.engine.togglePause()
            // }
            if (e.key === "m" && this.initialUnmute) {
                this.initialUnmute = false;
                this.engine.gameScript.theme.play();
            }

            if (e.key === "m" && down) {
                this.engine.toggleMute();
                if (this.engine.muted) {
                    this.engine.gameScript.theme.mute();
                } else {
                    this.engine.gameScript.theme.unmute();
                }
            }

            const unitVector = GameView.MOVES[e.key];
            if (unitVector) {
                this.updateMovementDirection(e.key, down);
            }
            if (e.key === "p") {
                this.engine.updateStartButtonListeners(e.key, down);
            }
        };
    }

    bindKeyHandlers() {
        const engine = this.engine;
        // Object.keys(GameView.MOVES).forEach((k) => {
        //   const move = GameView.MOVES[k];
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

        window.addEventListener("mousemove", (e) => {
            const x = { x: e.layerX };
            const y = { y: e.layerY };
            const mousePos = [e.layerX, e.layerY];
            this.engine.updateMousePos(mousePos);
            this.levelDesigner.mouseMoveEvent(e);
            // ship.setFireAngle(mousePos); add to game script event listener thing
        });

        window.addEventListener("click", (e) => {
            this.engine.mouseClicked(e);
        });

        window.addEventListener("mousedown", (e) => {
            this.engine.mouseDown(e);
        });

        window.addEventListener("mouseup", (e) => {
            this.engine.mouseUnClicked(e);
        });

        window.addEventListener("dblclick", (e) => {
            this.engine.mouseDoubleClicked(e);
        });

        // function preventDefault(e) {
        //   e = e || window.event;
        //   if (e.preventDefault)
        //     e.preventDefault();
        //   e.returnValue = false;
        // }

        // function disableScroll() {
        //   if (window.addEventListener) // older FF
        //     window.addEventListener('DOMMouseScroll', preventDefault, false);
        //   // window.onwheel = preventDefault; // modern standard
        //   // window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        //   // window.ontouchmove = preventDefault; // mobile
        //   // document.onkeydown = preventDefaultForScrollKeys;
        // }

    // if (window.addEventListener) // older FF
    //   window.addEventListener('DOMMouseScroll', preventDefault, false);
    // window.onwheel = preventDefault; // modern standard
    // window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    // window.ontouchmove = preventDefault; // mobile
    }

    end() {
        var endModal = document.getElementById("endModal");
    }

    start() {
        this.lastTime = 0;
        this.bindKeyHandlers();

        // Get the modal
        const modal = document.getElementById("myModal");

        // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        const xclose = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        xclose.onclick = (e) => {
            e.stopPropagation();
            modal.style.display = "none";
            this.modelClosed = true;
        };

        // When the user clicks anywhere outside of the modal, close it
        //  window.addEventListener('click', (e) => {
        window.onclick = (event) => {
            if (this.modelClosed && !this.gameStarted) {
                this.gameStarted = true;
                this.bindKeyboardKeys();
                requestAnimationFrame(this.animate);
            }
            if (event.target == modal) {
                this.modelClosed = true;
                modal.style.display = "none";
            }
        };
    }

    animate(time) {
        const timeDelta = time - this.lastTime;
        this.engine.tick(timeDelta);
        this.levelDesigner.animate(timeDelta);
        this.animationView.animate(timeDelta);
        this.lastTime = time;
        // every call to animate requests causes another call to animate
        requestAnimationFrame(this.animate);
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
};

GameView.MOVES = {
    s: [0, 1],
    a: [-1, 0],
    w: [0, -1],
    d: [1, 0],
};
