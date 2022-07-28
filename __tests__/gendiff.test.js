import fs from 'fs';

import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const readFixture = (path) => fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' });

const jsonSecondCaseInputFilepath1 = './__fixtures__/file1.json';
const jsonSecondCaseInputFilepath2 = './__fixtures__/file2.json';
const ymlSecondCaseInputFilepath1 = './__fixtures__/file1.json';
const ymlSecondCaseInputFilepath2 = './__fixtures__/file2.json';
const outputSecondCaseJsonFormat = readFixture('./__fixtures__/json-diff.json');
const outputSecondCasePlainFormat = readFixture('./__fixtures__/plain-diff.txt');
const outputSecondCaseStylishFormat = readFixture('./__fixtures__/stylish-diff.txt');

test.each([
  [jsonSecondCaseInputFilepath1, jsonSecondCaseInputFilepath2, 'json', outputSecondCaseJsonFormat],
  [ymlSecondCaseInputFilepath1, ymlSecondCaseInputFilepath2, 'json', outputSecondCaseJsonFormat],
  [jsonSecondCaseInputFilepath1, jsonSecondCaseInputFilepath2, 'plain', outputSecondCasePlainFormat],
  [ymlSecondCaseInputFilepath1, ymlSecondCaseInputFilepath2, 'plain', outputSecondCasePlainFormat],
  [jsonSecondCaseInputFilepath1, jsonSecondCaseInputFilepath2, 'stylish', outputSecondCaseStylishFormat],
  [ymlSecondCaseInputFilepath1, ymlSecondCaseInputFilepath2, 'stylish', outputSecondCaseStylishFormat],
])('.gendiff(%s, %s, %s)', (filepath1, filepath2, style, expected) => {
  expect(genDiff(filepath1, filepath2, style)).toBe(expected);
});
