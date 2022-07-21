import renderJson from './json.js';
import renderPlain from './plain.js';
import renderStylish from './stylish.js';

/**
 * Return render by selected type
 * @param {String} type 
 * @returns {Function}
 */
const getRender = (type) => {
  switch (type) {
    case 'json':
      return renderJson;
    case 'plain':
      return renderPlain;
    case 'stylish':
      return renderStylish;
    default:
      throw Error(`Render type "${type}" is undefind`);
  }
};

export default getRender;
