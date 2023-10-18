#!usr/bin/env node
import 'reflect-metadata';

import {CLIApplication, GenerateCommand,HelpCommand, ImportCommand, VersionCommand} from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();

  cliApplication.registerCommands([
    new VersionCommand(),
    new HelpCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
