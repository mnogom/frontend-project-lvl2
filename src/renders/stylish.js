import _ from 'lodash';
import strip from '../utils.js';
import {
  added, removed, changed, unchanged, nested,
} from '../diff_tree.js';

const addedMarker = '+';
const removedMarker = '-';
const unchagedMarker = ' ';
const indentStep = 4;

/**
 * Get indnet length from depth
 * @param {Number} depth
 * @returns {Number}
 */
const getIndentLength = (depth) => 2 + (depth - 1) * indentStep;

/**
 * Make indent
 * @param {Number} indentLength
 * @returns {String}
 */
const makeIndent = (indentLength) => Array(indentLength).fill(' ').join('');

/**
 * Convert value to string
 * @param {any} value
 * @param {Number} indentLength
 * @returns String
 */
const stringifyValue = (value, depth) => {
  if (_.isObject(value)) {
    const indentLength = getIndentLength(depth);
    const indent = makeIndent(indentLength + indentStep);
    const result = _.map(value, (v, k) => (
      `${indent}  ${k}: ${stringifyValue(v, depth + 1)}\n`
    )).join('\n');
    return `{\n${result}\n${makeIndent(indentLength + indentStep / 2)}}`;
  }
  return String(value);
};

/**
 * Prepare data in stylish format
 * @param {Object} data
 * @param {Number} indentLength
 * @returns {String}
 */
const stringifyData = (data, depth = 1) => (
  strip(
    data.map((node) => {
      const indentLength = getIndentLength(depth);
      const indent = makeIndent(indentLength);
      switch (node.type) {
        case removed:
          return `${indent}${removedMarker} ${node.key}: ${stringifyValue(node.oldValue, depth)}\n`;
        case added:
          return `${indent}${addedMarker} ${node.key}: ${stringifyValue(node.newValue, depth)}\n`;
        case changed:
          return `${indent}${removedMarker} ${node.key}: ${stringifyValue(node.oldValue, depth)}\n${indent}${addedMarker} ${node.key}: ${stringifyValue(node.newValue, depth)}\n`;
        case nested:
          return `${indent}${unchagedMarker} ${node.key}: {\n${stringifyData(node.children, depth + 1)}\n${indent}  }\n`;
        case unchanged:
          return `${indent}${unchagedMarker} ${node.key}: ${stringifyValue(node.oldValue, depth)}\n`;
        default:
          throw Error(`Unknown type '${node.type}'`);
      }
    }).join('\n'),
  )
);

/**
 * Return data rendered in stylish format
 * @param {Object} data
 * @returns {String}
 */
const renderStylish = (data) => `{\n${stringifyData(data)}\n}`;

export default renderStylish;
