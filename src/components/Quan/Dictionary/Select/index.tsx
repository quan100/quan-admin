import React from 'react';
import { ProFormSelect } from "@ant-design/pro-components";
import { Rule } from "rc-field-form/lib/interface";
import { value } from "@/services/dictionary/api";

export type FormProps = {
  name: string;
  label?: React.ReactNode;
  code: string;
  placeholder?: string | string[];
  rules?: Rule[];
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  disabled?: boolean;
};

const DictionaryFormSelect: React.FC<FormProps> = (props) => (
  <ProFormSelect
    width={props.width}
    name={props.name}
    label={props.label}
    request={async () => {
      const { data } = await value(props.code);
      return data;
    }}
    placeholder={props.placeholder}
    rules={props.rules}
    disabled={props.disabled}
  />
);

export default DictionaryFormSelect;
