import _ from "lodash"

const makeNode = (key, value) => ({ key, value });

const getKey = (node) => node.key;

const getValue = (node) => node.value;

const nodeToString = (node) => `{${getKey(node)}: ${_.isObject(getValue(node)) ? nodeToString(getValue(node)) : getValue(node)}}`;


let node1 = makeNode('root', makeNode('host', 'hexlet.io'))
console.log(nodeToString(node1))
