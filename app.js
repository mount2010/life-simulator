const readline = require('readline');
const worldObjects = require('./classes/worldObjects/index.js');
const CommandManager = require('./managers/command.js');
global.engine = Random.engines.mt19937().autoSeed();
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	
})
class Game {
    constructor () {
		this.things = new Map();
		this.events = [];
		this.init();
		this.commandManager = new CommandManager();
	}
	init () {
		rl.pause();
		rl.setPrompt("Sim > ");
		console.log("Welcome to ___________________".colour(220));
		rl.on('line', (line)=>{
			this.commandManager.parse(line);
			rl.prompt();
		});
		rl.resume();
		rl.prompt();
	}
	doTurn () {
		const spawnedHuman = new worldObjects.human.Human(this.things.size+1);
		this.pushEvent(`${spawnedHuman.name.full} has been created.`.colour(225));
		this.things.set(this.things.size+1, spawnedHuman);
		console.log(this.events.join("\n"));
		this.events = [];
		rl.prompt();
	}
	pushEvent (what) {
		this.events.push(what);
	}
}
global.gameInstance = new Game();

gameInstance.commandManager.registerCommand({
	name: 'go',
	payload: function (args) {
		gameInstance.doTurn();
	}
});
gameInstance.commandManager.registerCommand({
	name: 'describe',
	payload: function (args) {
		console.log(`Searching for ${args}...`);
		const search = Array.from(gameInstance.things.values()).find((val)=>{return val.name.full.toLowerCase()===args.toLowerCase()});
		if (!search) {console.log("Can't find any object that satifies that...")}
		else {console.log(search.description)};
	},
	options: {
		acceptSingle: true
	}
})
gameInstance.commandManager.registerCommand({
	name: 'list',
	payload: function (args) {
		const arr = Array.from(gameInstance.things.values());
		let str = "";
		for (let ln=0; ln< arr.length; ln++) {
			if (arr[ln] instanceof worldObjects.human.Human){
				str+='* '+arr[ln].name.full+'\n';
			}
		}
	}
})
