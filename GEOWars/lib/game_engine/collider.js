// engine takes in collider with gameobject type as string
// this way subscriptions can be done via string names
// enemy is subscribed to bullets..
// each enemy will check every bullet
// convert gameobject type to string
// colliders can be added without subscriptions
// subscriptions are an array of strings stored with the collider

// collider: object absolute transform
// collider { gameObject gameObject, "subscriptions" ["name", "name"] }
// colliders {"BoxBox" [collider, collider]}

const Util = require("./util")

class Collider {
  constructor(type, gameObject, radius = 5, subscriptions) {
    this.type = type // this allows for singularity and shits to work
    this.gameObject = gameObject
    this.objectType = gameObject
    this.subscriptions = subscriptions
    this.radius = radius
  }
  // wondering if collision should cascade up the parent objects
  // nope not yet anyway

  collisionCheck(otherCollider) {
    const centerDist = Util.dist(this.gameObject.transform.pos, otherCollider.gameObject.transform.pos);
    if (centerDist < (this.radius + otherCollider.radius)){
      this.gameObject.onCollision(otherCollider)
    }
  }

  // on

  // When you add new things that effect other things
  // like a new type of bullet, singularity effect, etc
  // you just have to add that functionality to the bullet
  // add the things it effects as things 
  // the collider subscribes to
  // this way you don't have to edit every object type
  // that is effected

  // singularity has two colliders
  // outer one for gravity effects 
  // inner one for actual hits
  // it's subscribed to everything
  // on collision it changes that object properties either 
  // directly or with a object method... preferably


}