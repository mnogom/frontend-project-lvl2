import _ from 'lodash';

export const added = 'added';
export const removed = 'removed';
export const changed = 'changed';
export const unchanged = 'unchanged';
export const nested = 'nested';

/**
 * Build tree with differences between two input data
 * @param {Object} node1 
 * @param {Object} node2 
 * @returns {Object}
 */
const buildDiffTree = (node1, node2) => {
  const keyBag = _.union(_.keys(node1), _.keys(node2)).sort();
  const diff = [];

  // eslint-disable-next-line
  for (const key of keyBag) {
    const oldValue = node1[key];
    const newValue = node2[key];

    if (_.isObject(oldValue) && _.isObject(newValue)) {
      diff.push({
        name: key,
        type: nested,
        children: buildDiffTree(oldValue, newValue),
      });
    } else if (!_.keys(node1).includes(key)) {
      diff.push({
        name: key,
        type: added,
        oldValue: null,
        newValue,
      });
    } else if (!_.keys(node2).includes(key)) {
      diff.push({
        name: key,
        type: removed,
        oldValue,
        newValue: null,
      });
    } else if (oldValue !== newValue) {
      diff.push({
        name: key,
        type: changed,
        oldValue,
        newValue,
      });
    } else {
      diff.push({
        name: key,
        type: unchanged,
        oldValue,
        newValue,
      });
    }
  }

  return diff;
};

export default buildDiffTree;
