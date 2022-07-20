import _ from "lodash";
import { added, removed, changed, unchanged, nested } from "../diff_tree.js";

const addedMarker = '+';
const removedMarker = '-';
const unchagedMarker = ' '

const parentTemp = '{indent}{marker} {name}: {\n{children}\n{indent}  }';
const childTemp = '{indent}{status} {name}: {value}'

const stringifyValue = (value) => _.isObject(value) ? JSON.stringify(value, undefined, indentLength + 2) : value;


const stringifyData = (data, indentLength=2) => {
  let result = ''
  const indent = Array(indentLength).fill(' ').join('')

  for (let node of data) {
    switch (node.type) {
      case unchanged:
        result += `${indent}${unchagedMarker} ${node.name}: ${stringifyValue(node.oldValue, indentLength)}\n`;
        break;
      case removed:
        result += `${indent}${removedMarker} ${node.name}: ${stringifyValue(node.oldValue, indentLength)}\n`;
        break;
      case added:
        result += `${indent}${addedMarker} ${node.name}: ${stringifyValue(node.newValue, indentLength)}\n`;
        break
      case changed:
        result += `${indent}${removedMarker} ${node.name}: ${stringifyValue(node.oldValue, indentLength)}\n`;
        result += `${indent}${addedMarker} ${node.name}: ${stringifyValue(node.oldValue, indentLength)}\n`;
        break
      case nested:
        result += `${indent}${unchagedMarker} ${node.name}: {\n${stringifyData(node.children, indentLength + 4)}\n${indent}  }\n`;
        break;
      default:
        throw Error(`type '${node.type}' is not specified`);
    }
  }

  return result;
};

const renderStylish = (data) => `{\n${stringifyData(data)}}`

export default renderStylish;
