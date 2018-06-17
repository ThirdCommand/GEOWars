# GEOWars
GEOWars was inspired by games like Galaga, Asteroids, and Geometry Wars. The game can be played 
with a keyboard or a controller. The player controls a ship moving inside an arena where enemy
shapes appear. The goal is to shoot down as many of these enemies as possible without getting hit 
by an enemy shape. When enemies are shot, they explode with vibrant color particle effects making the 
game visually spicy.  

## Functionality and MVP

### GEOWars production steps: 

#### Weekend/Monday
The first step is to make a functional base on which to build the rest of the game. This will include the ship movement mechanics, shooting mechanics, and the simplist enemy type. Visuals for the ship and explosions will also be included. 

#### Tuesday-Thursday
The next steps will include the addition of more challenging/smarter enemies. Each enemy will become more and more challenging to add to the game, scaling nicely with how much work I can finish this week since each step after the base game will be playable and relatively complete. 

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


# Functional MVPs
## Base MVPs
-[ ]  Game has a menu, pause/play feature. 
-[ ]  Player Ship Mechanics: Ship moves and sprite changes orientation depending on mouse/joystick position
-[ ]  Bullets: Ship shoots bullets in the direction its facing. 
-[ ]  BoxBox: Simplest enamy spawns repeatedly in random positions and doesn't move. When hit by a bullet, it explodes with a colorful particle effect

### Content MVPs
-[ ]  Pinwheel
-[ ]  Arrow
-[ ]  Grunt
-[ ]  Weaver

### Challenge MVPs
-[ ]  Snake
-[ ]  Singularity
-[ ]  Alien