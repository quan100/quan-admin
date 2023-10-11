import React, { useState } from 'react';
import { Rule } from "rc-field-form/lib/interface";
import { MdEditor, config } from "md-editor-rt";
import { LabelTooltipType } from "antd/es/form/FormItemLabel";
import {
  ProForm, ProFormInstance
} from "@ant-design/pro-components";
import { upload } from "@/services/file/api";

export type FormProps = {
  name: string;
  initialValues?: any;
  language?: string;
  label?: React.ReactNode;
  placeholder?: string | string[];
  rules?: Rule[];
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  max?: number;
  disabled?: boolean;
  tooltip?: LabelTooltipType;
  required?: boolean;
  message?: string;
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
};

const ProFormMdEditor: React.FC<FormProps> = ({
                                                initialValues = {
                                                  content: '',
                                                  contentCode: '',
                                                }, formRef, ...props
                                              }) => {

  const [value, setValue] = useState<string>(initialValues.content);

  const handleValue = function () {
    initialValues.content = value;
    formRef.current?.setFieldValue(props.name, initialValues);
  };

  const onUploadImg = async (files: Array<File>, callback: any) => {
    const res: API.FileVO[] = await Promise.all<API.FileVO>(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('file', file);

          upload(form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((res) => rev(res.data))
            .catch((error) => rej(error));
        });
      })
    );
    callback(res.map((item) => item.url));
  };


  config({
    editorConfig: {
      // 输入渲染延迟（ms）
      renderDelay: 0
    }
  });

  return (
    <>
      <ProForm.Item
        {...props}
        style={{
          width: '100%'
        }}
        name={props.name}
        tooltip={props.tooltip}
        rules={[{
          required: props.required,
          message: props.message,
        }]}
        label={props.label}
        wrapperCol={{ span: 24 }}
      >
        <MdEditor
          modelValue={value}
          readOnly={props.disabled}
          onChange={function (v) {
            setValue(v);
            handleValue();
          }}
          onHtmlChanged={function (h) {
            initialValues.contentCode = h;
            handleValue();
          }}
          onUploadImg={onUploadImg}
          language={props.language}
          showCodeRowNumber={true}
          toolbarsExclude={[
            'github',
            'save',
          ]}
        />
      </ProForm.Item>
    </>
  );
}

export default ProFormMdEditor;
