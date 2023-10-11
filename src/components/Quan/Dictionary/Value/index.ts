import { value } from "@/services/dictionary/api";

export async function mapValue(code: string, optionKey = 'value', optionValue = 'label') {
  const { data } = await value(code);
  if (data) {
    // 根据自定义标识解析数据，并转换为默认格式
    const _option = {};
    data.map((item, i) => {
      _option[item[optionKey]] = item[optionValue];
    });
    return _option;
  }
  return {};
}

export async function originValue(code: string) {
  const { data } = await value(code);
  return data;
}

export async function valueEnum(code: string, optionKey = 'value', optionValue = 'label') {
  const { data } = await value(code);
  if (data) {
    // 根据自定义标识解析数据，并转换为默认格式
    const _option = {};
    data.map((item, i) => {
      _option[item[optionKey]] = {
        text: item[optionValue],
        color: item['color'],
      };
    });
    return _option;
  }
  return {};
}
