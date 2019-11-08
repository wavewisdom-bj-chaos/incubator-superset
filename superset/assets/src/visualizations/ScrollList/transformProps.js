export default function transformProps(chartProps) {
  const { width, height, payload, formData } = chartProps;
  //console.log(chartProps); //可以用来验证数据是否正确
  return {
    data: payload.data,
    formatter: formData.formatter,
    scrollType: formData.scrollType,
    width,
    height,
  };
}

