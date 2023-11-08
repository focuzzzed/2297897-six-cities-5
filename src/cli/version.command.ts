import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

import chalk from 'chalk';

import {getErrorMessage} from '../shared/helpers/index.js';
import {Command} from './command.interface.js';

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
  private readonly name = '--version';

  constructor(
    private readonly filePath: string = './package.json'
  ) {}

  public readVersion(): string {
    const jsonFile: string = readFileSync(resolve(this.filePath), 'utf-8');
    const parsedContent = JSON.parse(jsonFile);
    if (!isPackageJSONConfig(parsedContent)){
      throw new Error('Failed to parse JSON content...');
    }
    return parsedContent.version;
  }

  public getName() {
    return this.name;
  }

  public execute(): void {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(chalk.red(`Failed to read file at path: ${this.filePath}`));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }
}
