import _ from 'lodash';
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
 * Clean string
 * @param {String} str
 * @returns {String}
 */
const strip = (str) => str.split('\n').filter((el) => el !== '').join('\n');

/**
 * Convert value to string
 * @param {any} value
 * @param {Number} indentLength
 * @returns String
 */
const stringifyValue = (value, indentLength) => {
  if (_.isObject(value)) {
    let result = '';
    const indent = makeIndent(indentLength + indentStep);
    _.forIn(value, (v, k) => {
      result += `${indent}  ${k}: ${stringifyValue(v, indentLength + indentStep)}\n`;
    });
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
const stringifyData = (data, indentLength = 2) => {
  let result = '';
  const indent = makeIndent(indentLength);

  // eslint-disable-next-line
  for (const node of data) {
    switch (node.type) {
      case unchanged:
        result += `${indent}${unchagedMarker} ${node.key}: ${stringifyValue(node.oldValue, indentLength)}\n`;
        break;
      case removed:
        result += `${indent}${removedMarker} ${node.key}: ${stringifyValue(node.oldValue, indentLength)}\n`;
        break;
      case added:
        result += `${indent}${addedMarker} ${node.key}: ${stringifyValue(node.newValue, indentLength)}\n`;
        break;
      case changed:
        result += `${indent}${removedMarker} ${node.key}: ${stringifyValue(node.oldValue, indentLength)}\n`;
        result += `${indent}${addedMarker} ${node.key}: ${stringifyValue(node.newValue, indentLength)}\n`;
        break;
      case nested:
        result += `${indent}${unchagedMarker} ${node.key}: {\n${stringifyData(node.children, indentLength + indentStep)}\n${indent}  }\n`;
        break;
      default:
        throw Error(`type '${node.type}' is not specified`);
    }
  }

  return result;
};

/**
 * Return data rendered in stylish format
 * @param {Object} data
 * @returns {String}
 */
const renderStylish = (data) => strip(`{\n${stringifyData(data)}}`);

export default renderStylish;
