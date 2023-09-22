import {Command} from './command.interface.js';
import {TSVFilerReader} from '../shared/libs/file-reader/tsv-file-reader.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]) {
    const [filename] = parameters;
    const fileReader = new TSVFilerReader(filename.trim());

    try{
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err: unknown) {

      if(!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
