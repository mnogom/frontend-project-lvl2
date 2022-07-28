import buildDiffTree from './diff_tree.js';
import readFile from './file_manager.js';
import getRender from './renders/index.js';

/**
 * Generate differences between two structures from file
 * @param {String} filepath1
 * @param {String} filepath2
 * @param {String} style
 * @returns {String}
 */
const genDiff = (filepath1, filepath2, style = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const render = getRender(style);

  return render(buildDiffTree(file1, file2));
};

export default genDiff;
