const util = require(`${process.cwd()}/classes/util.js`);

class WorldObject {
    constructor () {
        this.exists = true;
    }
    addPart (part) {
        if (!this.parts) this.parts = new Map();
        this.parts.set(this.parts.size+1, part);
    }
    attachParts () {

    }
}

module.exports= WorldObject;