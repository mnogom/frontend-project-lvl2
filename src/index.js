import buildDiffTree from "./diff_tree.js";
import readFile from './file_manager.js'
import getRender from "./renders/get_render.js";

const genDiff = (filepath1, filepath2, style='stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const render = getRender(style)
  const diff = buildDiffTree(data1, data2)
  return render(diff);
};

export default genDiff;
