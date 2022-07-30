import fs from 'fs';
import path from 'path';

import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const getFixturePath = (fixtureName, format) => path.join('.', '__fixtures__', `${fixtureName}.${format}`);
const readFixture = (filepath) => fs.readFileSync(filepath, { encoding: 'utf-8', flag: 'r' });

const expectedJsonFormat = readFixture('./__fixtures__/json-diff.json');
const expectedPlainFormat = readFixture('./__fixtures__/plain-diff.txt');
const expectedStylishFormat = readFixture('./__fixtures__/stylish-diff.txt');

test.each([
  'json',
  'yml',
])('.gendiff with %s fileformat', (fileFormat) => {
  const filepath1 = getFixturePath('file1', fileFormat);
  const filepath2 = getFixturePath('file2', fileFormat);

  const resultJson = genDiff(filepath1, filepath2, 'json');
  expect(resultJson).toBe(expectedJsonFormat);

  const resultPlain = genDiff(filepath1, filepath2, 'plain');
  expect(resultPlain).toBe(expectedPlainFormat);

  const resultStylish = genDiff(filepath1, filepath2, 'stylish');
  expect(resultStylish).toBe(expectedStylishFormat);
});
