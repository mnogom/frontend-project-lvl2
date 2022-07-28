import fs from 'fs';
import path from 'path';

import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const getFixturePath = (fixtureName, format) => path.join(`./__fixtures__/${fixtureName}.${format}`)
const readFixture = (path) => fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' });

const outputJsonFormat = readFixture('./__fixtures__/json-diff.json');
const outputPlainFormat = readFixture('./__fixtures__/plain-diff.txt');
const outputStylishFormat = readFixture('./__fixtures__/stylish-diff.txt');

test.each([
  ['json', 'json', outputJsonFormat],
  ['yml', 'json', outputJsonFormat],
  ['json', 'plain', outputPlainFormat],
  ['yml', 'plain', outputPlainFormat],
  ['json', 'stylish', outputStylishFormat],
  ['yml', 'stylish', outputStylishFormat],
])('.gendiff(%s, %s, %s)', (fileFormat, style, expected) => {
  const filepath1 = getFixturePath('file1', fileFormat);
  const filepath2 = getFixturePath('file2', fileFormat);
  expect(genDiff(filepath1, filepath2, style)).toBe(expected);
});
