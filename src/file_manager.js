import path from 'path';
import fs from 'fs';

/**
 * Read file
 * @param {String} filepath
 */
const readFile = (filepath) => ({
  rawData: fs.readFileSync(filepath),
  type: path.extname(filepath).substring(1).toLowerCase(),
});

export default readFile;
