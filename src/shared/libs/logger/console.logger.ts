import {getErrorMessage} from '../../helpers/index.js';
import {Logger} from './logger.interface.js';

export class ConsoleLogger implements Logger {
  public debug(message: string, ...args:unknown[]): void{
    console.debug(message, ...args);
  }

  public info(message: string, ...args:unknown[]): void{
    console.info(message, ...args);
  }

  public warn(message: string, ...args:unknown[]): void{
    console.warn(message, ...args);
  }

  public error(error: Error, message: string, ...args:unknown[]): void{
    console.error(message, ...args);
    console.error(`Error message: ${getErrorMessage(error)}`);
  }
}
