#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <format>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>');

program.parse();
const [filepath1, filepath2] = program.args;
const { format } = program.opts();

console.log(genDiff(filepath1, filepath2, format));
