import _ from 'lodash';
import strip from '../utils.js';
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

      switch (node.type) {
        case nested:
          return renderPlain(node.children, fullpath);
        case added:
          return `Property '${fullpath}' was added with value: ${stringifyValue(node.newValue)}`;
        case removed:
          return `Property '${fullpath}' was removed`;
        case changed:
          return `Property '${fullpath}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`;
        case unchanged:
          return '';
        default:
          throw Error(`Unknown type '${node.type}'`);
      }
    }).join('\n'),
  )
);

export default renderPlain;
