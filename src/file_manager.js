import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

/**
 * Get object from file
 * @param {String} filepath
 * @returns {Object}
 */
const readFile = (filepath) => {
  const ext = path.extname(filepath).substring(1).toLowerCase();
  const rawData = fs.readFileSync(filepath);
  return {
    json: JSON.parse,
    yml: yaml.load,
    yaml: yaml.load,
  }[ext](rawData);
};

export default readFile;
