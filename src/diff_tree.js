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
  const keyBag = _.sortBy(_.union(_.keys(node1), _.keys(node2)));

  return keyBag.map((key) => {
    const oldValue = node1[key];
    const newValue = node2[key];

    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return { key, type: nested, children: buildDiffTree(oldValue, newValue) };
    }
    if (!_.keys(node1).includes(key)) {
      return {
        key, type: added, oldValue: null, newValue,
      };
    }
    if (!_.keys(node2).includes(key)) {
      return {
        key, type: removed, oldValue, newValue: null,
      };
    }
    if (oldValue !== newValue) {
      return {
        key, type: changed, oldValue, newValue,
      };
    }
    return {
      key, type: unchanged, oldValue, newValue,
    };
  });
};

export default buildDiffTree;
