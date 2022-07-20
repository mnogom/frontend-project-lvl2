import _ from 'lodash';

export const added = 'added';
export const removed = 'removed';
export const changed = 'changed';
export const unchanged = 'unchanged';
export const nested = 'nested';


const buildDiffTree = (node1, node2) => {
  const keyBag = _.union(_.keys(node1), _.keys(node2)).sort()
  const diff = []
  
  for (let key of keyBag) {
    const oldValue = node1[key];
    const newValue = node2[key];

    if (_.isObject(oldValue) && _.isObject(newValue)) {
      diff.push({
        name: key,
        type: nested,
        children: buildDiffTree(oldValue, newValue)
      });
    } else if (!_.keys(node1).includes(key)) {
      diff.push({
        name: key,
        type: added,
        oldValue: null,
        newValue: newValue,
      });
    } else if (!_.keys(node2).includes(key)) {
      diff.push({
        name: key,
        type: removed,
        oldValue: oldValue,
        newValue: null,
      });
    } else if (oldValue !== newValue) {
      diff.push({
        name: key,
        type: changed,
        oldValue: oldValue,
        newValue: newValue,
      });
    } else {
      diff.push({
        name: key,
        type: unchanged,
        oldValue: oldValue,
        newValue: newValue,
      });
    }
  }

  return diff
};

export default buildDiffTree;