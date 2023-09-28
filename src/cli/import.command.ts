import {Command} from './command.interface.js';
import {TSVFileReader} from '../shared/libs/file-reader/index.js';
import chalk from 'chalk';
import {createOffer, getErrorMessage} from '../shared/helpers/index.js';

export class ImportCommand implements Command {
  private readonly name = '--import';

  public getName(): string {
    return this.name;
  }

  private onImportedLine(line: string){
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompletedImport(count: number) {
    console.info(`${count} rows imported`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompletedImport);

    try{
      await fileReader.read();
    } catch (error: unknown) {
      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }
}
