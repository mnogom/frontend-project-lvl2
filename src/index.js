import buildDiffTree from './diff_tree.js';
import readFile from './file_manager.js';
import getRender from './renders/get_render.js';

/**
 * Generate differences between two structures from file
 * @param {String} filepath1
 * @param {String} filepath2
 * @param {String} style
 * @returns {String}
 */
const genDiff = (filepath1, filepath2, style = 'stylish') => (
  getRender(style)(
    buildDiffTree(
      readFile(filepath1),
      readFile(filepath2),
    ),
  )
);

export default genDiff;
