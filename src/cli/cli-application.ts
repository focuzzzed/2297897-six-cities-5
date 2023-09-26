import {Command} from './command.interface.js';
import {CommandParser} from './command-parser.js';

type CommandsCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandsCollection = {};
  private readonly defaultCommand = '--help';

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if(this.commands[command.getName()]){
        throw new Error(`Command ${command.getName()} is already registered`);
      }

      this.commands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string) {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand() {
    if(!this.commands[this.defaultCommand]){
      throw new Error(`Default command ${this.defaultCommand} is not registered`);
    }

    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]) {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
