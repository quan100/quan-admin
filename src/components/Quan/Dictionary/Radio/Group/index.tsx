import React from 'react';
import { ProFormRadio } from "@ant-design/pro-components";
import { Rule } from "rc-field-form/lib/interface";
import { value } from "@/services/dictionary/api";
import { RadioGroupButtonStyle, RadioGroupOptionType } from "antd/lib/radio";
import { RadioGroupProps } from "antd/lib/radio/interface";

export type FormProps = {
  name: string;
  label?: React.ReactNode;
  code: string;
  placeholder?: string | string[];
  rules?: Rule[];
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  disabled?: boolean;
  fieldProps?: Partial<RadioGroupProps>;
  optionType?: RadioGroupOptionType;
  buttonStyle?: RadioGroupButtonStyle;
};

const DictionaryProFormRadioGroup: React.FC<FormProps> = ({ optionType = "button", buttonStyle = "solid", ...props }) => (
  <ProFormRadio.Group
    width={props.width}
    name={props.name}
    label={props.label}

    request={async () => {
      const { data } = await value(props.code);
      return data;
    }}

    fieldProps={{
      optionType: optionType,
      buttonStyle: buttonStyle,
      ...props.fieldProps
    }}
    placeholder={props.placeholder}
    rules={props.rules}
    disabled={props.disabled}
  />
);

export default DictionaryProFormRadioGroup;
