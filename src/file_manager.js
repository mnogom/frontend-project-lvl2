import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

/**
 * Get file fomat
 * @param {String} filepath
 * @returns {String}
 */
const getFileFormat = (filepath) => path.extname(filepath).substring(1).toLowerCase();

/**
 * Read file
 * @param {String} filepath
 */
const readFile = (filepath) => fs.readFileSync(filepath);

/**
 * Get object from file
 * @param {String} filepath
 * @returns {Object}
 */
const parseFile = (filepath) => {
  const ext = getFileFormat(filepath);
  const rawData = readFile(filepath);

  switch (ext) {
    case 'json':
      return JSON.parse(rawData);
    case 'yml':
    case 'yaml':
      return yaml.load(rawData);
    default:
      throw Error(`'.${ext}' is unknown file format.`);
  }
};

export default parseFile;
