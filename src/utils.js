/**
 * Clean string
 * @param {String} str
 * @returns {String}
 */
const strip = (str) => str.split('\n').filter((el) => el !== '').join('\n');

export default strip;
