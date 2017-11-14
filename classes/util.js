const fs = require('fs');
class Util {
    constructor () {
        this.getNameContent();
        this.nameInfo();
    }
    nameInfo() {
        const fM = this.names.first.male.length;
        const fF = this.names.first.female.length;
        const lG = this.names.last.length;

        console.log("[Name Information]".colour(30));
        console.log(`${"First Names (Male):".colour(39)} ${fM.toString().colour(fM>=100?46:196)}`);
        console.log(`${"First Names (Female):".colour(39)} ${fF.toString().colour(fF>=100?46:196)}`);
        console.log(`${"Last Names:".colour(39)} ${lG.toString().colour(lG>=100?46:196)}`);
    }
    generateName(f) {
        if (!f) f = "male";
        const fnS = this.names.first[f];
        const lnS = this.names.last;

        let s = {};

        s.first = fnS[Math.floor(Math.random()*fnS.length)];
        s.last = lnS[Math.floor(Math.random()*lnS.length)];

        s.full = `${s.first} ${s.last}`;

        return s;
    }

    getNameContent() {
        this.names = {
            first: {
                male: [],
                female: []
            },
            last:  []
        };

        // First Names: Male //

        const fM = fs.readFileSync(process.cwd()+"/names/firstnames0", "utf8").split("\n");
        for (const n of fM)
            this.names.first.male.push(n);

        // First Names: Female //

        const fF = fs.readFileSync(process.cwd()+"/names/firstnames1", "utf8").split("\n");
        for (const n of fF)
            this.names.first.female.push(n);
        
        // Last Names //

        const l = fs.readFileSync(process.cwd()+"/names/lastnames", "utf8").split("\n");
        for (const n of l)
            this.names.last.push(n);
    }
}
module.exports = new Util();