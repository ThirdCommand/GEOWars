# Game Sequence

the goal is to add a level developer tool with a drag and drop UI.

## Serializing

- spawning events
- operations
  - wait
  - loop (go to sequenceIdx n number of times)
- scenes: groups of operations and events and scenes
  - grouped in the UI
  - translated to "line number" positions in the JSON

## view layout

scene1 = [event, event, wait, event]

scene2 = [scene1, event, event, wait, event]

gameSequence = [scene1, scene2]

## translated Flattened

gameSequence = [scene1Start, event, event, wait, event, scene3End, scene2Start, scene1Start, event, event, wait, event, scene1End, event, event, wait, event, scene2End]

## check game script for types of scenes and find the best way to handle them

## UI

- [x] added placing feature with a pallet
- [x] double click event location
- [x] I need a unified way to handle clicking because it's getting wild
  - [x] I could have the engine handle everything between both canvases
    - [x] No need for colliders, just add a listener to the list (either levelDesigner list or game list), and check all for that list when a click happens
- [ ] fix regression where placing enemies fails
- [ ] UI will need to handle screen resizing right
  - [ ] When screen longer, canvas becomes wider and more elements are seen

- [ ] need way to open level designer

- [ ] need way to select normal game or level designed game

- [ ] need to store the placed enemies so they can be serialized

- [ ] need UI for scene timeline (woof)
  - [ ] scrolling behavior means I need update cycles
- [ ] Get First Piece Done
  - [ ] Spawn Event Static Square
    - [ ] ship spawn symbols
    - [ ] count
  - [ ] animation: scroll-ability

- [ ] need way to move serialized levels to the game

- [ ] need to not be zoomed in and not have ship

enemy selector

- hold click to move
- click once to select
  - selection puts them in the meta data box
- meta data box (location editable)
  - type "r" for random quick edit
  - random location button (during game random, or random but hard coded)
  - type location to change it maybe

horizontal level editor:
- boxes with symbols to indicate their function
- no text, or minimal text
- spawn events could have the ships that are spawned lined up in the box. If there's too many to fit, then the rest aren't shown
- 

need to lower the grav effect on the ship... it's a little extreme at the moment. maybe it should have less acceleration effect on it?

I'm using nodist for version management... no memory of setting this up

## Star Parallax

Camera will need a Z position

field will need a Z position

stars will need their own Z position

## Particles Parallax

add parallax

## Grid

I could use the parallax with the grid and make it 3D and move in a way that looks better

## Wants

- enemy death pieces
- modernize canvas transformations... scale and translate are outdated but supported for now
- ship: fix position stutter (no input stutters)
  - fix gravity effect on ship
- refactor to camera as an object
- BoxBox
  - fix rotation off of map
  - fix enemy placer for it (errors out)

- singularity
  - 3D singularity rotating particles
  - add small explosion effect from damaging hits
  - pulsate grid effect
  - gravity wave effect (somewhere, somehow lol)
  - try having orbiting singularities
  - tweak grid spring/dampener values
- weaver
  - add mutual collision detection to prevent clumping with each other
  - add 3D effect
- grunt
  - add mutual collision detection to prevent clumping with each other
  - 3D effect
- death animation
  - maybe add a portal effect with the grid
  - ship disapears, re-appears (spawn portal?)
- Polish bullet sprite more
- add GEOMs
- explosion also effects grid
- fix bullets
  - [x] bullet upgrade "bend" instead of spread
  - second upgrade?
  - change with trigger press?
