import React from 'react';
import { ProFormSelect } from "@ant-design/pro-components";
import { Rule } from "rc-field-form/lib/interface";
import { page } from "@/services/article/category";
import { RequestOptionsType } from "@ant-design/pro-utils/es/typing";

export type FormProps<T = Record<string, any>, K = any> = {
  name: string;
  label?: React.ReactNode;
  placeholder?: string | string[];
  rules?: Rule[];
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  disabled?: boolean;
  mode?: 'multiple' | 'tags';
};

const CategoryProFormSelect: React.FC<FormProps> = ({ mode, ...props }) => (
  <ProFormSelect
    width={props.width}
    name={props.name}
    label={props.label}
    disabled={props.disabled}
    mode={mode}
    allowClear
    request={async () => {
      let options: RequestOptionsType[] = [];
      let reqStatus = false;

      let _pageNum = 1;
      let _pages;
      do {
        const { data, success } = await page({
          pageNum: _pageNum,
          pageSize: 50,
        });

        const { pageNum, pages, records } = data;
        const _options = records.map((item => {
          const option: RequestOptionsType = {
            label: item.name,
            value: item.categoryId,
            color: item.color,
          }
          return option;
        }));

        options = options.concat(_options);

        reqStatus = success;
        _pageNum = pageNum + 1;
        _pages = pages;

      } while (_pageNum <= _pages);
      return options;
    }}
    placeholder={props.placeholder}
    rules={props.rules}
  />
);

export default CategoryProFormSelect;
