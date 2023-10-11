import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { Spin } from 'antd';
import type { SelectProps } from 'antd/es/select';
import { ProFormSelect } from "@ant-design/pro-components";
import { Rule } from "rc-field-form/lib/interface";
import { page } from "@/services/user/account";

export type FormProps<T = Record<string, any>, K = any> = {
  name: string;
  label?: React.ReactNode;
  placeholder?: string | string[];
  rules?: Rule[];
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  disabled?: boolean;
  mode?: 'multiple' | 'tags';
} & DebounceSelectProps;

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions?: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends { key?: string; label: React.ReactNode | any; value: string | number } = any,
>({ fetchOptions, debounceTimeout = 800, ...props }: FormProps) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      if (fetchOptions) {
        fetchOptions(value).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }

          setOptions(newOptions);
          setFetching(false);
        });
      }
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <ProFormSelect
      width={props.width}
      name={props.name}
      label={props.label}
      disabled={props.disabled}
      mode={props.mode}
      allowClear
      placeholder={props.placeholder}
      rules={props.rules}

      showSearch={true}

      fieldProps={{
        // labelInValue: true,
        filterOption: false,
        onSearch: debounceFetcher,
        notFoundContent: fetching ? <Spin size="small"/> : null,
        options: options,
      }}
    />
  );
}

// Usage of DebounceSelect
interface UserValue {
  label?: string;
  value?: string;
}


async function fetchUserList(account: string): Promise<UserValue[]> {
  console.log('fetching user', account);
  return page(account ? {
    account: account
  } : {}).then((res) =>
    res.data.records
  ).then((records) => {
    return records.map((value) => ({
        label: value.account,
        value: value.userId,
      }),
    )
  });
}


const UserProFormSelect: React.FC<FormProps> = ({ ...props }) => {

  const [value, setValue] = useState<UserValue[]>([]);

  return (
    <DebounceSelect
      {...props}
      value={value}

      fetchOptions={fetchUserList}
      onChange={(newValue) => {
        setValue(newValue as UserValue[]);
      }}
    />
  );
}

export default UserProFormSelect;
