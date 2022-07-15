import _ from "lodash";

const added = 'added';
const removed = 'removed';
const changed = 'changed';
const unchanged = 'unchanged';
const nested = 'nested';

const rowTemplate = "Property '{path}' was {action}\n"

const stringify = (value) => _.isObject(value) ? '[complex value]' : String(value);

const formatString = (template, data) => {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    result = result.replace(`{${key}}`, value);
  }
  return result;
};

const renderPlain = (data) => {
  const inner = (node, parentName) => {
    if (node.status === nested) {
      return node.children.map((child) => inner(child, `${parentName}.${child.name}`)).join('');
    }

    if (node.status === unchanged) {
      return ''
    }

    let actionString
    if (node.status === added) {
      actionString = `added with value: ${stringify(node.newValue)}`;
    }
    if (node.status === removed) {
      actionString = 'removed';
    }
    if (node.status === changed) {
      actionString = `updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
    }
    return formatString(rowTemplate, {path: parentName, action: actionString});
  };

  let result = inner(data, data.name);
  result = result.replaceAll('root.', '');
  return result.substring(0, result.length - 1)
};

export default renderPlain;
