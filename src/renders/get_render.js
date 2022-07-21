import renderJson from './json.js';
import renderPlain from './plain.js';
import renderStylish from './stylish.js';

/**
 * Return render
 * @param {String} type
 * @returns {Function}
 */
const getRender = (type) => (
  {
    json: renderJson,
    plain: renderPlain,
    stylish: renderStylish
  }[type]
);

export default getRender;
