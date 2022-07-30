import buildDiffTree from './diff_tree.js';
import parseFile from './file_manager.js';
import getRender from './renders/index.js';

/**
 * Generate differences between two structures from file
 * @param {String} filepath1
 * @param {String} filepath2
 * @param {String} style
 * @returns {String}
 */
const genDiff = (filepath1, filepath2, style = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const render = getRender(style);
  const diff = buildDiffTree(data1, data2);
  return render(diff);
};

export default genDiff;
