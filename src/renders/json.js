const renderJson = (data, defaultValue=null, space=undefined) => (
  JSON.stringify(data, defaultValue, space)
);

export default renderJson;