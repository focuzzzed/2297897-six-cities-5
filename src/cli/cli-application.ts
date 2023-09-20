import {Command} from './command.interface.js';

type CommandsCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandsCollection = {};

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if(Object.hasOwn(this.commands, command.getName())){
        throw new Error(`Command ${command.getName()} is already registered`);
      }

      this.commands[command.getName()] = command;
    });
  }
}
