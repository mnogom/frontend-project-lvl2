import buildDiffTree from './diff_tree.js';
import readFile from './file_manager.js';
import parse from './parser.js';
import getRender from './renders/index.js';

/**
 * Generate differences between two structures from file
 * @param {String} filepath1
 * @param {String} filepath2
 * @param {String} style
 * @returns {String}
 */
const genDiff = (filepath1, filepath2, style = 'stylish') => {
  const { rawData: rawData1, type: type1 } = readFile(filepath1);
  const { rawData: rawData2, type: type2 } = readFile(filepath2);
  const data1 = parse(rawData1, type1);
  const data2 = parse(rawData2, type2);
  const render = getRender(style);
  const diff = buildDiffTree(data1, data2);
  return render(diff);
};

export default genDiff;
