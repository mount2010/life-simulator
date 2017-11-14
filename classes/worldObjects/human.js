const WorldObject = require("./worldObject.js");
const util = require(`${process.cwd()}/classes/util.js`);
class HumanBodyPart extends WorldObject {
    constructor (name, size) {
        super();
        this.name = name;
        this.size = size; 
    }
    attachParts (parts) {
        for (let ln= 0; ln < parts.length; ln++) {
            this.addPart(new HumanBodyPart(parts[ln].name, parts[ln].size));
        }
    }
}
class Human extends WorldObject {
    constructor (id) {
        super();
        this.id = id;
        this.male = Random.bool()(engine);
        this.name = util.generateName(this.male?'male':'female');
        this.worth = Random.integer(0,100)(engine);
        this.attachParts();
    }
    get description () {
        //iterate though parts
        let str = '';
        this.parts.forEach((val)=>{
            str+=val.name.colour(46)+' ';
            if (val.parts) {
                str+=" (";
                val.parts.forEach((a)=>{
                    str+=a.name+'|';
                });
                str+=") ";
            }
        })

        const text = `
        ${this.name.full} is a ${this.worth>50?'rich':'poor'} ${this.male?'man':'woman'}.

        Part status: ${str}
        `.colour(220);
        return text;
    }
    addPart (part) {
        if (!this.parts) this.parts = new Map();
        this.parts.set(part.name, part);
    }
    attachParts () {
        //assume proportion 1 head: 3.5 heads: 3.5 heads
        this.addPart(new HumanBodyPart("head", 10));
        this.addPart(new HumanBodyPart("torso", 35));
        this.addPart(new HumanBodyPart("legs", 35));
        this.parts.get('head').attachParts([{name: "brain", size: 5}, {name: "eyes", size: 2}, {name: "nose", size: 2}]);
        this.parts.get('torso').attachParts([{name: "heart", size: 3}, {name: "liver", size: 3}, {name: "kidneys", size: 2}, {name: "breasts", size: 5}, {name: "digestive system", size: 25}])
        this.parts.get('legs').attachParts([{name: "feet", size: 10}, {name: "ankles", size: 5}]);
        if (this.male) {
            this.parts.get('torso').attachParts([{name: "junk", size: 3}, {name: "balls", size: 5}])
        }
        else if (!this.male) {
            this.parts.get('torso').attachParts([{name: "womany parts", size: 3}])
        }
    }
    damage () {

    }
}

module.exports = {Human}