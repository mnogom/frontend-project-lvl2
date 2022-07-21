import _ from 'lodash';
import {
  added, removed, changed, nested,
} from '../diff_tree.js';

/**
 * Convert value to string
 * @param {any} value
 * @returns {String}
 */
const stringifyValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

/**
 * Prepare data in plain format
 * @param {Object} data
 * @param {String} path
 * @returns {String}
 */
const stringifyData = (data, path) => {
  let result = '';
  // eslint-disable-next-line
  for (const node of data) {
    const fullpath = path ? `${path}.${node.key}` : node.key;

    switch (node.type) {
      case nested:
        result += stringifyData(node.children, fullpath);
        break;
      case added:
        result += `Property '${fullpath}' was added with value: ${stringifyValue(node.newValue)}\n`;
        break;
      case removed:
        result += `Property '${fullpath}' was removed\n`;
        break;
      case changed:
        result += `Property '${fullpath}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}\n`;
        break;
      default:
        break;
    }
  }

  return result;
};

/**
 * Return data rendered in plain format
 * @param {Object} data
 * @returns {String}
 */
const renderPlain = (data) => stringifyData(data).slice(0, -1);

export default renderPlain;
