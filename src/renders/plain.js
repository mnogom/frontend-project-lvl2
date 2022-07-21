import _ from 'lodash';
import strip from './utils.js';
import {
  added, removed, changed, nested, unchanged,
} from '../diff_tree.js';

/**
 * Convert value to string
 * @param {any} value
 * @returns {String}
 */
const stringifyValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return `${value}`;
};

/**
 * Return data rendered in plain format
 * @param {Object} data
 * @param {String} path
 * @returns {String}
 */
const renderPlain = (data, path) => (
  strip(
    data.map((node) => {
      const fullpath = path ? `${path}.${node.key}` : node.key;

      if (node.type === nested) {
        return renderPlain(node.children, fullpath);
      }
      if (node.type === added) {
        return `Property '${fullpath}' was added with value: ${stringifyValue(node.newValue)}`;
      }
      if (node.type === removed) {
        return `Property '${fullpath}' was removed`;
      }
      if (node.type === changed) {
        return `Property '${fullpath}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`;
      }
      if (node.type === unchanged) {
        return '';
      }
      throw Error(`Unknown type '${node.type}'`);
    }).join('\n'),
  )
);

export default renderPlain;
