/**
 * Return data rendered in json format
 * @param {Object} data 
 * @param {any} defaultValue 
 * @param {String | Number | undefined} space 
 * @returns {String}
 */
const renderJson = (data, defaultValue = null, space = undefined) => (
  JSON.stringify(data, defaultValue, space)
);

export default renderJson;
