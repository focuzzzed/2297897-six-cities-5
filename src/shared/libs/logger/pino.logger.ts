import {Logger as PinoInstance, pino} from 'pino';
import {Logger} from './logger.interface.js';

export class PinoLogger implements Logger {
  private logger: PinoInstance;

  constructor() {
    this.logger = pino();
  }

  public debug(message: string, ...args: unknown[]){
    this.logger.debug(message, args);
  }

  public error(message: string, error: Error, ...args: unknown[]) {
    this.logger.error(message, error, ...args);
  }

  public warn(message: string, ...args: unknown[]) {
    this.logger.warn(message, args);
  }

  public info(message: string, ...args: unknown[]) {
    this.logger.info(message, ...args);
  }
}
