import fs from 'fs';

import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const jsonFirstCaseInputFilepath1 = './__tests__/__fixtures__/case-1/file1.json';
const jsonFirstCaseInputFilepath2 = './__tests__/__fixtures__/case-1/file2.json';
const ymlFirstCaseInputFilepath1 = './__tests__/__fixtures__/case-1/file1.json';
const ymlFirstCaseInputFilepath2 = './__tests__/__fixtures__/case-1/file2.json';

const jsonSecondCaseInputFilepath1 = './__tests__/__fixtures__/case-2/file1.json';
const jsonSecondCaseInputFilepath2 = './__tests__/__fixtures__/case-2/file2.json';
const ymlSecondCaseInputFilepath1 = './__tests__/__fixtures__/case-2/file1.json';
const ymlSecondCaseInputFilepath2 = './__tests__/__fixtures__/case-2/file2.json';

const outputFirstCaseJsonFormat = fs.readFileSync(
  './__tests__/__fixtures__/case-1/json-diff.json',
  { encoding: 'utf8', flag: 'r' },
);
const outputFirstCasePlainFormat = fs.readFileSync(
  './__tests__/__fixtures__/case-1/plain-diff.txt',
  { encoding: 'utf8', flag: 'r' },
);
const outputFirstCaseStylishFormat = fs.readFileSync(
  './__tests__/__fixtures__/case-1/stylish-diff.txt',
  { encoding: 'utf8', flag: 'r' },
);

const outputSecondCaseJsonFormat = fs.readFileSync(
  './__tests__/__fixtures__/case-2/json-diff.json',
  { encoding: 'utf8', flag: 'r' },
);
const outputSecondCasePlainFormat = fs.readFileSync(
  './__tests__/__fixtures__/case-2/plain-diff.txt',
  { encoding: 'utf8', flag: 'r' },
);
const outputSecondCaseStylishFormat = fs.readFileSync(
  './__tests__/__fixtures__/case-2/stylish-diff.txt',
  { encoding: 'utf8', flag: 'r' },
);

test.each([
  [jsonFirstCaseInputFilepath1, jsonFirstCaseInputFilepath2, 'json', outputFirstCaseJsonFormat],
  [ymlFirstCaseInputFilepath1, ymlFirstCaseInputFilepath2, 'json', outputFirstCaseJsonFormat],
  [jsonFirstCaseInputFilepath1, jsonFirstCaseInputFilepath2, 'plain', outputFirstCasePlainFormat],
  [ymlFirstCaseInputFilepath1, ymlFirstCaseInputFilepath2, 'plain', outputFirstCasePlainFormat],
  [jsonFirstCaseInputFilepath1, jsonFirstCaseInputFilepath2, 'stylish', outputFirstCaseStylishFormat],
  [ymlFirstCaseInputFilepath1, ymlFirstCaseInputFilepath2, 'stylish', outputFirstCaseStylishFormat],
  [jsonSecondCaseInputFilepath1, jsonSecondCaseInputFilepath2, 'json', outputSecondCaseJsonFormat],
  [ymlSecondCaseInputFilepath1, ymlSecondCaseInputFilepath2, 'json', outputSecondCaseJsonFormat],
  [jsonSecondCaseInputFilepath1, jsonSecondCaseInputFilepath2, 'plain', outputSecondCasePlainFormat],
  [ymlSecondCaseInputFilepath1, ymlSecondCaseInputFilepath2, 'plain', outputSecondCasePlainFormat],
  [jsonSecondCaseInputFilepath1, jsonSecondCaseInputFilepath2, 'stylish', outputSecondCaseStylishFormat],
  [ymlSecondCaseInputFilepath1, ymlSecondCaseInputFilepath2, 'stylish', outputSecondCaseStylishFormat],
])('.gendiff(%s, %s, %s)', (filepath1, filepath2, style, expected) => {
  expect(genDiff(filepath1, filepath2, style)).toBe(expected);
});
