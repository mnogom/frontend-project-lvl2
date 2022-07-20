import { test, expect } from '@jest/globals';

import readFile from '../src/file_manager.js';
import buildTree from '../src/diff_tree.js';

const data1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
const data2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}

const result = [
  {"name": "follow", "status": "removed", "oldValue": false, "newValue": undefined},
  {"name": "host", "status": "unchanged", "oldValue": "hexlet.io", "newValue": "hexlet.io"},
  {"name": "proxy", "status": "removed", "oldValue": "123.234.53.22", "newValue": undefined},
  {"name": "timeout", "status": "changed", "oldValue": 50, "newValue": 20},
  {"name": "verbose", "status": "added", "oldValue": undefined, "newValue": true}
]

test('abc', () => {
  const output = buildTree(data1, data2)
  expect(output.children).toMatchObject(result)
});
