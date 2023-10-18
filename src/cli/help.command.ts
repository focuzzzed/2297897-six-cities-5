import chalk from 'chalk';

import {Command} from './command.interface.js';

export class HelpCommand implements Command {
  private readonly name = '--help';

  public getName(): string {
    return this.name;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
    Программа для подготовки данных для REST API сервера.
        ${chalk.blue('Пример:')}
            cli.js --<command> [--arguments]
        ${chalk.blue('Команды:')}
            --version:                                                             ${chalk.green('# выводит версию проекта в семантическом версионировании')}
            --help:                                                                ${chalk.green('# выводит информацию по доступным командам')}
            --import <path> <login> <password> <host> <dbName> <salt>:             ${chalk.green('# импортирует данные из TSV файла по указанному пути')}
            --generate <n> <path> <url>:                                           ${chalk.green('# генерирует указанное количество тестовых данных по указанному пути с указанного url сервера')}
    `);
  }
}
