type ParsedCommand = Record<string, string[]>;

export class CommandParser {
  static parse(cliArguments: string[]) {
    const parsedCommand: ParsedCommand = {};
    let currentCommand = '';

    for(const argument of cliArguments) {
      if(argument.startsWith('--')) {
        parsedCommand[argument] = [];
        currentCommand = argument;
      } else if (argument && currentCommand) {
        parsedCommand[currentCommand].push(argument);
      }
    }

    return parsedCommand;
  }
}
