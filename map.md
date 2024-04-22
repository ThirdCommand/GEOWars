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

this was determined to be an ugly idea

## UI

- [ ] UI will need to handle screen resizing right
  - [ ] When screen longer, canvas becomes wider and more 
- [ ] need way to go from level designer to playing the game that was made
- [ ] Pieces
  - [ ] Scene
    - [ ] Deleting parent scene works
  - [ ] Event
    - [x] delete selected spawn
    - [ ] multi select
    - [ ] copy/paste
    - [ ] angle of... everything?
    - [ ] edit just angle so I don't have to put the same coordinates in
    - [ ] angle slider
    - [ ] make it so you don't have to reselect to see the new overlay data in the animation view
  - [ ] Time
    - [ ] editable
  - [ ] Loop
    - [ ] make sprite a little better
    - [ ] editable Loop
    - [ ] display repeat number
    - [ ] reassign sister when flipped around (user doesn't know which beginning is for which loop)
  - [ ] Operation
    - [ ] check a number and change any element value in reaction to it
    - [ ] position of ship
    - [ ] number of enemies on map
- [ ] animation in level editor space: scroll-ability, vertical, horizontal

- [ ] have following "animation" when actually playing the level so you know where in the sequence you are
- [ ] allow pause and playbacks (maybe a real game could come from that somehow lol)

## UI Completed

- [x] added placing feature with a pallet
- [x] double click event location
- [x] I need a unified way to handle clicking because it's getting wild
  - [x] I could have the engine handle everything between both canvases
    - [x] No need for colliders, just add a listener to the list (either levelDesigner list or game list), and check all for that list when a click happens
- [x] add time UI Element
- [x] performance has completely tanked at the moment... woof
  - [x] I think multiple canvas were being run multiple times a frame
- [x] When a scene is selected, the array of things that it contains can be displayed under it
  - [x] I'll have to either add vertical scrolling while selected nested elements, or have the canvas grow vertically
- [x] fix regression where placing enemies fails
- [x] fix regression where placing enemies works but animation window fails somehow lol
elements are seen

- [x] need way to open level designer

- [x] need way to select normal game or level designed game


- [x] need to store the placed enemies so they can be serialized

- [x] need UI for scene timeline (woof)
  - [x] scrolling behavior means I need update cycles
- [x] Get First Piece Done
- [x] Pieces:
  - [x] Delete UI Elements
  - [x] Scene
    - [x] name
    - [x] multiple of them
    - [x] selectable
    - [x] when selected show array of what is contained in it bellow
    - [x] unExpanding grandparent scene should work and not break things
      - [x] will need a stack of expanded scenes
    - [x] scenes that are expanded should be double clickable to expand as well without having to unExpand and reExpand the parent scene first
  - [x] Event
    - [x] fix boxbox sprite for placing and placed
    - [x] ship spawn symbols on square
    - [x] count of each
    - [x] add spawn
    - [x] continue placing same enemy after placing
    - [x] get click placed enemy working again
    - [x] random position button (no need to hide the spawn when that's chosen)
    - [x] location edit
    - [x] randomly choose from list of possible (number has to be chosen too... hmm)
    - [x] escape key for getting out of about to place element
    - [x] angle of the Arrows
    - [x] include ship position as a possible reference (spawn things around ship)
      - [x] handle case where ship is close to edge
  - [x] Time
    - [x] add UI for time
  - [x] Loop
    - [x] add UI elements for loop type
      - [x] beginning
      - [x] end
      - [x] delete sister loop when deleting
      - [x] add sister loop when loading
  - [x] Operation: not fully baked yet. repeat "until" etc
    - [x] something applied to selected elements
    - [x] decrease the timing between spawns
    - [x] increase a number
    - [x] add game flags, like bullet upgrades... that might be it haha

- [x] ship fire direction messed up??
- [x] Drag And Drop
  - [x] figure out way to capture drag event
  - [x] maybe add a placeholder to maintain the correct widths and prevent confusions?
  - [x] capture Left and Right events (mouse position while dragging relative to element that is left or right of the selected element)

- [x] Save
  - [x] serialize game
  - [x] each piece must be able to be serialized
- [x] Load
  - [x] load serialized game
  - [x] each piece must be able to be loaded from its serialized version
    - [x] scenes present that largest challenge
- [x] need way to move serialized levels to the game

- [x] need to not be zoomed in 


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

- [x] Camera will need a Z position

- [x] field will need a Z position

- [x] stars will need their own Z position

## Particles Parallax

- [x] add parallax

## Grid

- [x] I could use the parallax with the grid and make it 3D and move in a way that looks better

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
  - [x] add mutual collision detection to prevent clumping with each other
  - add 3D effect
- grunt
  - [x] add mutual collision detection to prevent clumping with each other
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