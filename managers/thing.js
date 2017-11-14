const WorldObject = require('worldObject.js')
class ThingManager {
    constructor () {
        this.things = new Map();
    }
    init () {
        this.populate();
    }
    populate () {}
    createThing (thing) {
        if (!thing instanceof WorldObject) {
            console.err("[ThingManager] Can't create a object if it is not a WorldObject");
            return;
        }
        if (this.things.has(thing.name)) {
            console.err("[ThingManager] Thing passed to CreateThing is already registered!");
            return;
        }
        this.things.set(thing.name, thing);
        return;
    }
}