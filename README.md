# GEOWars
Enjoy Now! https://thirdcommand.github.io/GEOWars/

GEOWars was inspired by games like Galaga, Asteroids, and Geometry Wars. The game can be played 
with a keyboard or a controller. The player controls a ship moving inside an arena where enemy
shapes appear. The goal is to shoot down as many of these enemies as possible without getting hit 
by an enemy shape. When enemies are shot, they explode with vibrant color particle effects making the 
game visually spicy.  


# Game Engine 
I created a framework for JavaScript programmers to create simulations and games for Canvas. Users can add game objects and give them properties such as physics, sprites, colliders and colors. Users can dynamically mutate these properties through life cycle methods and manage their game through the use of a built in game script. 

## Life Cycle
* Check Collisions
* Move physics components
* Update game objects
* Render sprites at their new locations
* Update game script
* Play Sounds

## Game Object
To make a GameObject, extend the class with GameObject. This will provide a ton of built in functionality. To create the GameObject, you must pass a reference to the game engine into into the super. Every frame, all of the GameObjects that were added will be updated by calling the method Update on them. This method can be overwritten by the user in the classes that inherit from GameObject, providing the user a place to write code that they want the GameObject to run every frame.

I utilize update to allow the Grunt enemies to chase after the player, and animate their sprite:

```javascript
class Grunt extends GameObject {
  constructor(engine, pos, shipTransform) {
    super(engine)
    this.transform.pos = pos
    this.exists = false;
    this.stretchDirection = -1;
    this.shipTransform = shipTransform
    this.radius = 5;
    this.points = 70
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
    this.playSound(this.spawnSound)
    this.addLineSprite(new GruntSprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
  }
```
...
```javascript
  update(timeDelta) {
    if (this.spawned) {
      this.chase(timeDelta)
      let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
      let cycleSpeed = 0.01;
      if (this.lineSprite.stretchScale_W < 0.7 || this.lineSprite.stretchScale_W > 1) {
        this.stretchDirection *= -1
      }

      this.lineSprite.stretchScale_W = this.lineSprite.stretchScale_W + -this.stretchDirection * cycleSpeed * cycleSpeedScale;
      this.lineSprite.stretchScale_L = this.lineSprite.stretchScale_L + this.stretchDirection * cycleSpeed * cycleSpeedScale;

      if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
        this.wallGraze()
      }
    }

    chase(timeDelta) {
    let speed = 1.5
    let shipPos = this.shipTransform.absolutePosition();
    let pos = this.transform.absolutePosition()
    let dy = shipPos[1] - pos[1];
    let dx = shipPos[0] - pos[0];

    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let direction = Math.atan2(dy, dx);

    pos[0] += speed * Math.cos(direction) * velocityScale
    pos[1] += speed * Math.sin(direction) * velocityScale
  }
}
```


The class methods that are available to the user when inheriting from GameObject include:

* `#addPhysicsComponent`
* `#addLineSprite`
* `#addCollider`
* `#addChildGameObject`
* `#playSound`
* `#addMousePosListener`
* `#addLeftControlStickListener`
* `#addRightControlStickListener`
* `#remove`

### addCollider
  Takes in the following parameters  
  String: collider name  
  Reference to GameObject: (usually "this")   
  Double: hitbox radius  
  Array: names of the GameObjects it can hit (subscriptions)  
  Array: names of the types of colliders it can hit

        
  With these parameters, a user can create a custom collider that can subscribe to specific game objects and their specific colliders. An example where this is necessary is with things that try to dodge, like the Weaver in my game. The Weaver tries to dodge bullets when they are within a certain distance, but explodes when in direct contact. The Weaver's "BulletDodge" collider handles dodging the bullets, and the Bullet's "bulletHit" collider handles the direct contact.    
        
  The "BulletDodge" collider is subscribed to the Bullet's "General" collider, and the "bulletHit" collider is subscribed to the Weaver and every other enemy type's "General" collider. I picked the name "General" because it is what a new collider type can use to add functionality to every GameObject while only writing the code in one place. 

  When a collision between the game object and an object that it is subscribed to occurs, onCollision will be called on the game object. Two parameters are passed into onCollision: The collider it contacted, and the type of collider that was triggered. The function exists in the parent class GameObject and is waiting to be overwriten. 

Bullet Collision Code:
```javascript 
class Bullet extends GameObject {
```
...   
```javascript 
  addBulletColliders(){
    let subscriptions = ["Grunt", "Pinwheel", "BoxBox", "Arrow", "Singularity", "Weaver"]
    this.addCollider("bulletHit", this, this.radius, subscriptions, ["General"]) 
    this.addCollider("General", this, this.radius)
  }
``` 
...    

```javascript 
  onCollision(collider, type){  
    if (type === "bulletHit") {  
      let hitObjectTransform = collider.gameObject.transform    
      let pos = hitObjectTransform.absolutePosition()     
      let vel = hitObjectTransform.absoluteVelocity()    
      let explosion = new ParticleExplosion(this.gameEngine, pos, vel)    
      collider.gameObject.remove()    
    }    
  }
```   
...    
```javascript 
}
```

And the Weaver collision code:

```javascript
class Weaver extends GameObject {
```
...   
```javascript 
  addColliders(){
    this.addCollider("General", this, this.radius)
    this.addCollider("BulletDodge", this, this.weaverCloseHitBox, ["Bullet"], ["General"])
  }
``` 
...    

```javascript 
  onCollision(collider, type){
    if (type === "BulletDodge") {
      this.acceptBulletDirection(collider.gameObject.transform.pos)
    }
  }
```   
...    
```javascript 
}
```

### addLineSprite
A LineSprite contains a transform and a `#draw` function for the user to overwrite. It is where the user puts the commands for the canvas context to draw a GameObject. `#addLineSprite` adds the sprite to the list of sprites to be rendered by the game engine during its rendering stage of the frame cycle. The following is an example of adding a LineSprite to a game object:

```javascript
import {LineSprite} from "../../../game_engine/line_sprite";

class SingularitySprite extends LineSprite {
  constructor(transform, spawningScale = 1) {
    super(transform)
    this.spawningScale = spawningScale
    this.throbbingScale = 1
    this.radius = 15;
    this.spawned = false;
  }

  draw(ctx) {
    let spawningScale = this.spawningScale
    if (this.spawned) {
      spawningScale = this.throbbingScale
    }

    ctx.strokeStyle = "#F173BA"

    let r = 95;
    let g = 45;
    let b = 73;

    ctx.save();
    let blurFactor = 0.5

    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5;
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.lineWidth = 6
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.lineWidth = 4.5
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.lineWidth = 3
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1.5
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.restore();
    // ctx.lineWidth = 2;
    // drawSingularity(ctx, this.radius * spawningScale);
  }

  drawSingularity(ctx, radius) {
    ctx.beginPath();
    let pos = this.transform.absolutePosition()
    ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, true);
    ctx.stroke();
  }
}
```

```javascript 

class Singularity extends GameObject {
  constructor(engine, pos) {
    super(engine)
    this.transform.pos = pos;
```
...
```javascript
    this.addLineSprite(new SingularitySprite(this.transform))
    this.lineSprite.throbbingScale = 1
  }
```

### playSound
A Sound is another object built into the game engine that allows users to give it a url and a volume. Sound has methods `#play`, `#mute`, `#unmute`, `#pause`, and `#toggleMute`. playSound allows the user to add a sound to the game engine sound queue to be played. Duplicate sounds added during the same frame will not change in volume, as the game engine will only play one of them. Sound's constructor takes in the URL and volume (a bool, zero to one) as parameters.

```javascript 

class Arrow extends GameObject {
  constructor(engine, pos, angle = Math.PI / 3) {
    super(engine)
    this.transform.pos = pos
```
...
```javascript
   this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_purple.wav", 0.5)
    this.playSound(this.spawnSound)
  }
```
...
```javascript
}
```

### addPhysicsComponent
this function creates a new physics component for the game engine to update every frame. The position, velocity, and acceleration are stored in a GameObject's transform. Physics components take in the change in time between frames to update the position and velocity of the GameObject. 

### Controls Event Listeners

* `#addMousePosListener`
* `#addLeftControlStickListener`
* `#addRightControlStickListener`

these methods add event listeners for their respective names. These are the only ones I needed for my game so they were the first to be added. the rest of the controller buttons and keyboard input will be added in later versions. 

addMousePosListener will add this GameObject to the list of objects that updateMousePos(pos) will be called on. Add that method to your GameObject and the game engine will provide it with a new positions every frame. The position is relative to the top left corner of the canvas. 

*the mouse position listener is currently hard coded and will not work for users at the moment. 

addLeftControlStickListener => updateLeftControlStickInput
addRightControlStickListener => updateRightControlStickInput

the joystick positions are described by [x,y] where x and y range from -1 to 1 

### addChildGameObject
addChildGameObject takes in a new game object and adds it to the game engine. It also adds it to the list of children for the game object it is called inside. 
currently the only feature supported for addChildGameObject is the remove functionality listed next. 


### remove
remove destroys all properties that were added to the game engine for the object such as its LineSprites, Colliders, all child game objects, and PhysicsComponents.

## Color
Color is a wrapper for adding colors for canvas context drawing. It supports rgb, rgba, hsl, and hsla. The constructor takes in a key value pair, one being a string telling it what color type it is, and the other an array of values for each color property. 

Color will have instance variables for each color property that can be read and changed. To provide the canvas context with color string, use `#evaluateColor`. Examples shown bellow:
```javascript
this.shadowColor = new Color({
  "hsla": [202, 100, 70, 1]
});

this.shadowColor.s = 50
ctx.shadowColor = this.shadowColor.evaluateColor()
```
## Transform
A transform contains the position velocity and acceleration information about a GameObject. Position, translational velocity and acceleration are stored as [x,y] pairs, whereas angular values are doubles. Instance variables include: pos, vel, acc, angle, aVel, aAcc. Angular acceleration and acc are both set to 0 after the phsyics calculations are complete in order to keep accelerations from persisting when the forces that provide them no longer exist. Forces are currently not implemented but will be added soon. They will be stored as an instance variable of the transform and will be an array in which a force vector can be added. 
## Sound
A Sound is another object built into the game engine that allows users to give it a url and a volume. Sound has methods `#play`, `#mute`, `#unmute`, `#pause`, and `#toggleMute`. `GameObject#playSound` allows the user to add a sound to the game engine sound queue to be played. Duplicate sounds added during the same frame will not double in volume, as the game engine will only play one of them. Sound's constructor takes in the URL and volume (a bool, zero to one) as parameters:

```javascript 

class Arrow extends GameObject {
  constructor(engine, pos, angle = Math.PI / 3) {
    super(engine)
    this.transform.pos = pos
```
...
```javascript
   this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_purple.wav", 0.5)
    this.playSound(this.spawnSound)
  }
```
...
```javascript
}
```




coming soon: details for Camera, HUD overlay, and other game engine features
 

# First Week Goals
This project was originaly a one week challenge. The planning that went into the first week of work is listed here
## Functionality and MVP


#### Basic game: 
* Ship movement, shooting, sprite
* enemy hit-box/death particle effect animation
* score displayed
* BoxBox: first enamy type
 
#### Intermediate goals; Enemy types:    
* Pinwheel: moves in a random direction while spinning
* Arrow: moves in one known direction
* Grunt: moves towards player's ship, sprite geometry is animated
* Weaver: moves towards player ship, and away from ship bullets
 
#### Challenge Goals; Tougher enemy types:    
* Snake: moves like a snake, can only be killed when hit in the head
* Singularity: When activated by a bullet, it pulls in pieces nearby including the player's ship. 
* Alien ships: When the Singularity has pulled in enough enemy ships, it explodes and a bunch of alien ships arrive from the portal that move like Grunts, but faster.

![Enemy Types](https://github.com/SecondCommand/GEOWars/blob/master/Proposal_Content/Enemy%20Types.png)


### GEOWars production steps: 

#### Weekend/Monday
The first step is to make a functional base on which to build the rest of the game. This will include the ship movement mechanics, shooting mechanics, and the simplist enemy type. Visuals for the ship and explosions will also be included. 

#### Tuesday
Enemy spawning mechanics will be added. Arrow and Pinwheel will be added with their sprites, movement logic, and hit boxes. Grunt's movement logic will be completed. 

#### Wednesday
Grunt and Weaver will be completed, and Singularity effects started.

#### Thursday
Thursday will be devoted to gameplay. This includes how, how many, and at what moment enemies will spawn as a game round progresses over time. The particle effects and controlls will become more polished, and a game menu will be added. 

#### Tuesday-Thursday
The next steps will include the addition of more challenging/smarter enemies. Each enemy will become more and more challenging to add to the game, scaling nicely with how much work I can finish this week since each step after the base game will be playable and relatively complete. 


# Functional MVPs
## Base MVPs
- [ ] Game has a menu, pause/play feature. 
- [ ] Player Ship Mechanics: Ship moves and sprite changes orientation depending on mouse/joystick position
- [ ] Bullets: Ship shoots bullets in direction the mouse is pointing relative to the ship/ direction the stick is pointing. 
- [ ] BoxBox: Simplest enemy spawns repeatedly in random positions and doesn't move. When hit by a bullet, it explodes with a colorful particle effect

### Content MVPs
- [ ] Pinwheel
- [ ] Arrow
- [ ] Grunt
- [ ] Weaver

### Challenge Goals
- [ ] Snake
- [ ] Singularity
- [ ] Alien
- [ ] Grid Warping Effect

# Architecture
This is the original archetecture that was proposed before I ported the game over to my game engine
## Game managment
game_view.js: listens for user input and commands game.js to reposition and render things. 
game.js: stores every visible element, commands them to render when asked, detects collisions. 
/particles: stores all of the files needed for the game's particle effects. game.js determines when particles are added.

## Nonparticle elements
moving_object.js: All non particle elements inherit from moving_object for rendering and movement logic.
/Enemies: stores the files for each enemy type. Any modifications that are needed for their movement logic and rendering will be included here. 

# Technologies

* JavaScript for overall structure and game logic
* HTML5 Canvas for DOM manipulation and rendering
* Web Audio API for sound generation, processing and control
* Gamepad API to allow for controller use



# Weekend Progress:
![explosions](https://media.giphy.com/media/pjBKucj5PGGW7PtBFm/giphy.gif)
