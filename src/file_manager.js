import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

/**
 * Get object from file
 * @param {String} filepath
 * @returns {Object}
 */
const readFile = (filepath) => {
  const rawData = fs.readFileSync(filepath);
  if (path.extname(filepath).toLowerCase() === '.json') {
    return JSON.parse(rawData);
  }
  return yaml.load(rawData);
};

export default readFile;
