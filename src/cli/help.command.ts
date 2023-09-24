import {Command} from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
    Программа для подготовки данных для REST API сервера.
        ${chalk.blue('Пример:')}
            cli.js --<command> [--arguments]
        ${chalk.blue('Команды:')}
            --version:                   ${chalk.green('# выводит номер версии')}
            --help:                      ${chalk.green('# печатает этот текст')}
            --import <path>:             ${chalk.green('# импортирует данные из TSV')}
            --generate <n> <path> <url>  ${chalk.green('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
