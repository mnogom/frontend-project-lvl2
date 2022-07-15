import _ from 'lodash';

const added = 'added';
const removed = 'removed';
const changed = 'changed';
const unchanged = 'unchanged';
const nested = 'nested';


const buildTree = (data1, data2) => {
  const inner = (key, node1, node2, parentNode1, parentNode2) => {
    if (_.isObject(node1) && _.isObject(node2)) {
      let keyBag = _.union(_.keys(node1), _.keys(node2))
      return {
        name: key,
        status: nested,
        children: keyBag.map(
          (_key) => inner(_key, node1[_key], node2[_key], node1, node2)
        )
      };
    }
    if (!_.keys(parentNode1).includes(key)) {
      return {
        name: key,
        status: added,
        oldValue: node1,
        newValue: node2
      };
    }
    if (!_.keys(parentNode2).includes(key)) {
      return {
        name: key,
        status: removed,
        oldValue: node1,
        newValue: node2
      }
    }
    if (parentNode1[key] === parentNode2[key]) {
      return {
        name: key,
        status: unchanged,
        oldValue: node1,
        newValue: node2
      };
    }
    if (parentNode1[key] !== parentNode2[key]) {
      return {
        name: key,
        status: changed,
        oldValue: node1,
        newValue: node2
      };
    }
  }

  return inner('root', data1, data2);
};

import readFile from './file_manager.js';
import renderJson from './renders/json.js';
import renderPlain from './renders/plain.js';


const f1 = readFile('fixtures/plain/file1.json');
const f2 = readFile('fixtures/plain/file2.json');
const diff = buildTree(f1, f2)

console.log(renderPlain(diff))
