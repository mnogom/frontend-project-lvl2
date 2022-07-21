import _ from 'lodash';
import strip from './utils.js';
import {
  added, removed, changed, unchanged, nested,
} from '../diff_tree.js';

const addedMarker = '+';
const removedMarker = '-';
const unchagedMarker = ' ';
const indentStep = 4;

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
const stringifyValue = (value, indentLength) => {
  if (_.isObject(value)) {
    const indent = makeIndent(indentLength + indentStep);
    const result = _.map(value, (v, k) => (
      `${indent}  ${k}: ${stringifyValue(v, indentLength + indentStep)}\n`
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
const stringifyData = (data, indentLength = 2) => (
  strip(
    data.map((node) => {
      const indent = makeIndent(indentLength);
      if (node.type === removed) {
        return `${indent}${removedMarker} ${node.key}: ${stringifyValue(node.oldValue, indentLength)}\n`;
      }
      if (node.type === added) {
        return `${indent}${addedMarker} ${node.key}: ${stringifyValue(node.newValue, indentLength)}\n`;
      }
      if (node.type === changed) {
        const result = `${indent}${removedMarker} ${node.key}: ${stringifyValue(node.oldValue, indentLength)}\n`;
        return `${result}\n${indent}${addedMarker} ${node.key}: ${stringifyValue(node.newValue, indentLength)}\n`;
      }
      if (node.type === nested) {
        return `${indent}${unchagedMarker} ${node.key}: {\n${stringifyData(node.children, indentLength + indentStep)}\n${indent}  }\n`;
      }
      if (node.type === unchanged) {
        return `${indent}${unchagedMarker} ${node.key}: ${stringifyValue(node.oldValue, indentLength)}\n`;
      }
      throw Error(`Unknown type '${node.type}'`);
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
