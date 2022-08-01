import yaml from 'js-yaml';

/**
 * Prase data by input type
 * @param {*} data
 * @param {String} type
 * @returns {Object}
 */
const parse = (rawData, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(rawData);
    case 'yml':
    case 'yaml':
      return yaml.load(rawData);
    default:
      throw Error(`'${type}' is unknown type.`);
  }
};

export default parse;
