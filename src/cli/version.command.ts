import {Command} from './command.interface.js';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

type PackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object'
    && value !== null
    && !Array.isArray(value)
    && Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ) {}

  public readVersion(): string {
    const jsonFile: string = readFileSync(resolve(this.filePath), 'utf-8');
    const parsedContent = JSON.parse(jsonFile);
    if (!isPackageJSONConfig(parsedContent)){
      throw new Error('Failed to read version...');
    }
    return parsedContent.version;
  }

  public getName() {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read file at path: ${this.filePath}`);

      if(error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
