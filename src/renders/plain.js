import _ from "lodash";
import { added, removed, changed, nested } from "../diff_tree.js";

const rowTemplate = "Property '{fullpath}' was {action}\n"

const stringifyValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value)
};

const stringifyData = (data, path) => {
  let result = ''

  for (let node of data) {
    const fullpath = path ? `${path}.${node.name}` : node.name;

    switch (node.type) {
      case nested:
        result += stringifyData(node.children, fullpath);
        break;
      case added:
        result += `Property '${fullpath}' was added with value: ${stringifyValue(node.newValue)}\n`
        break;
      case removed:
        result += `Property '${fullpath}' was removed\n`
        break;
      case changed:
        result += `Property '${fullpath}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}\n`;
        break;
      default:
        break;
    }
  }

  return result;
};

const renderPlain = (data) => stringifyData(data).slice(0, -1);

export default renderPlain;
