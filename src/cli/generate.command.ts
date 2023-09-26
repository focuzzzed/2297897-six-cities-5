import {Command} from './command.interface.js';
import {MockServerData} from '../shared/types/index.js';
import {got} from 'got';
import {TSVOfferGenerator} from '../shared/libs/offer-generator/index.js';
import {appendFile} from 'node:fs/promises';

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
    for(let i = 0; i < offersCount; i++) {
      await appendFile(
        filepath,
        `${tsvOfferGenerator.generate()}\n`,
        'utf-8'
      );
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    //TODO: Добавить проверку на существование этих трёх переменных
    const offersCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offersCount);
      console.info(`File ${filepath} was created`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');

      if(error instanceof Error) {
        console.error(error.message);
      }
    }

  }
}

