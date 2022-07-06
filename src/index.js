import fs, { read } from 'fs';

const readFile = (filepath) => {
  const rawData = fs.readFileSync(filepath);
  return JSON.parse(rawData);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  console.log(data1);
};

export default genDiff
