import { program } from 'commander';

/**
 * Parse CLI arguments
 * @returns {String[]}
 */
const parseArgs = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format <format>', 'set formatters of output', 'stylish')
    .argument('<filepath1>')
    .argument('<filepath2>');

  program.parse();
  const [filepath1, filepath2] = program.args;
  const { format } = program.opts();
  return [filepath1, filepath2, format];
};

export default parseArgs;
