const fs = require('fs');
class Command {
    constructor ({name, payload, options}={}) {
        this.name = name;
        this.payload = payload.bind(this);
        this.options = options || {
            acceptSingle: false,
        };
    }
}
class CommandManager {
    constructor () {
        this.commands = new Map();
    }
    registerCommand (command) {
        if (Array.isArray(command)) {
            command.forEach((val)=>{
                if (!val instanceof Command) val = new Command(val);
                this.commands.set(val.name, val);
            })
        }
        else {
            if (!command instanceof Command) command = new Command(command);
            else {
                this.commands.set(command.name, command);
            }
        }
    }
    parse (str) {
        if (!this.commands.has(str.split(' ')[0])) {console.log('That is not a command.'.colour(88)); return;};
        const cmd = this.commands.get(str.split(' ')[0]);
        if (cmd.options && cmd.options.acceptSingle) {
            cmd.payload(str.split(' ').slice(1).join(' '));
        }
        else {
            const args = str.split(' ');
            cmd.payload(args);
        }
    }
    registerCommandsIn (file) {
        const dir = fs.readdirSync(file);
        dir.forEach((val)=>{
            const cmd = require(val);
            if (!cmd instanceof Command) cmd = new Command(cmd);
            this.registerCommand(cmd);
        })
    }
}
module.exports = CommandManager;