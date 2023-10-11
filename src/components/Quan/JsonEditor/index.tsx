import {useMemoizedFn} from 'ahooks';
import JSONEditor from 'jsoneditor';
import React, {useEffect, useState} from 'react';
import {
  ProForm, ProFormInstance,
} from '@ant-design/pro-components';
import 'jsoneditor/dist/jsoneditor.min.css';
import './index.less'
import {LabelTooltipType} from "antd/es/form/FormItemLabel";

interface Props {
  name?: any;
  value?: any;
  onChange?: (value: any) => void;
  language?: string;
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  label?: React.ReactNode;
  placeholder?: string | string[];
  tooltip?: LabelTooltipType;
  required?: boolean;
  message?: string;
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
  options?: any;
}

const JsonEditor: React.FC<Props> = ({ value, onChange, formRef, ...props }) => {
  const [container, setContainer] = useState<any>(null);
  let editor: JSONEditor;
  const options = {
    mode: 'code',
    language: props.language,
    onChangeText: (json: any) => {
      try {
        const fieldValue = JSON.parse(json);
        formRef.current?.setFieldValue(props.name, fieldValue);
      } catch (e) {
      }
    },
    ...props.options,
  };

  const renderJsonEditor = useMemoizedFn(() => {
    if (container) {
      editor = new JSONEditor(container, options);
      editor.set(value);
    }
  });

  useEffect(() => {
    renderJsonEditor();
    return () => {
      editor?.destroy();
    };
  }, [container, renderJsonEditor, value, editor]);

  return (
      <>
        <ProForm.Item
            {...props}
            name={props.name}
            tooltip={props.tooltip}
            rules={[{
              required: props.required,
              validator: async (_: any, value: any) => {
                if (!value) {
                  return Promise.reject(new Error(props.message));
                }
                const validate = await editor?.validate();
                if (validate && validate.length > 0) {
                  const { message } = validate[0];
                  return Promise.reject(new Error(message));
                } else {
                  return Promise.resolve();
                }
              }
            }]}
            label={props.label}
        >
          <div className="jsoneditor-react-container" ref={elem => setContainer(elem)}/>
        </ProForm.Item>
      </>
  );
};

export default JsonEditor;
