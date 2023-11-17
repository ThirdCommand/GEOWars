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

I commented out the game script update so that it wasn't in the way. that should be replaced by the level design vs play game selection

- [x] added placing feature with a pallet

- [ ] need to add a level designer button so that we can choose the level designer or the game

- [ ] need way to select normal game or level designed game

- [ ] need to store the placed enemies so they can be serialized

- [ ] need UI for scene timeline (woof)

- [ ] need way to move serialized levels to the game

- [ ] need to not be zoomed in and not have ship

enemy selector

- hold click to move
- meta data box (location editable)
  - type "r" for random quick edit
  - random location button
  - type location to change it maybe

need to lower the grav effect on the ship... it's a little extreme at the moment. maybe it should have less acceleration effect on it?
