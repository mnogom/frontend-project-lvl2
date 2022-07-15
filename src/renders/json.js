const renderJson = (data, defaultValue=null, indent=' ') => (
  JSON.stringify(data.children, defaultValue, indent)
);

export default renderJson;