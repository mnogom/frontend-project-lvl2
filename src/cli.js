import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program.option('-V', '--version', 'output ther version number')
program.option('-h', '--help', 'display help for command')


program.parse();
