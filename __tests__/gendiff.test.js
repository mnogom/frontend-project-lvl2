import readFile from './src/file_manager.js';
import buildTree from './src/diff_tree.js';


const data1 = readFile('./fixtures/file1.json')
const data2 = readFile('./fixtures/file2.json')

test('abc', () => {
  expect(data1).toMatchObject(data2)
});
