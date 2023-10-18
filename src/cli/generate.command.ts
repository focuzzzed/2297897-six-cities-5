import chalk from 'chalk';
import {got} from 'got';

import {getErrorMessage} from '../shared/helpers/index.js';
import {TSVFileWriter} from '../shared/libs/file-writer/index.js';
import {TSVOfferGenerator} from '../shared/libs/offer-generator/index.js';
import {MockServerData} from '../shared/types/index.js';
import {Command} from './command.interface.js';

export class GenerateCommand implements Command {
  private readonly name = '--generate';
  private initialData: MockServerData;

  public getName(): string {
    return this.name;
  }

  public async load(url: string): Promise<void> {
    try{
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  public async write(filepath: string, offersCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for(let i = 0; i < offersCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;

    if(!(count && filepath && url)){
      throw new Error('One or more variables were not passed: <count> <filepath> <url>');
    }

    const offersCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offersCount);
      console.info(`File ${filepath} was created`);
    } catch (error: unknown) {
      console.error(chalk.red('Can\'t generate data'));
      console.error(chalk.red(getErrorMessage(error)));
    }

  }
}

