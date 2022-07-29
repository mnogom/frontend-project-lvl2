import renderJson from './json.js';
import renderPlain from './plain.js';
import renderStylish from './stylish.js';

/**
 * Return render
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
      throw new Error('Unknown type');
  }
};

export default getRender;
