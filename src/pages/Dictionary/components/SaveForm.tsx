import {
  DrawerForm, ProFormInstance,
  ProFormRadio,
  ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import JsonEditor from "@/components/Quan/JsonEditor";
import { useRef } from "react";

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.Dictionary) => void;
  onSubmit: (values: API.Dictionary) => Promise<void>;
  open: boolean;
  values: Partial<API.Dictionary>;
  title: string;
  disabled?: boolean;
};

const UpdateForm: React.FC<UpdateFormProps> = ({ disabled = false, ...props }) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  return (
    <DrawerForm
      title={props.title}
      key={props.values.id}
      formRef={formRef}
      width={'50%'}
      layout="horizontal"
      {...formItemLayout}
      open={props.open}
      onFinish={props.onSubmit}
      submitter={!disabled}
      initialValues={{
        id: props.values.id,
        value: props.values.value,
        name: props.values.name,
        code: props.values.code,
        open: props.values.open,
        remark: props.values.remark,
      }}
      drawerProps={{
        destroyOnClose: true,
        onClose: () => {
          props.onCancel();
        },
      }}
    >
      {props.values.id && (
        <>
          <ProFormText
            name="id"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.common.id',
              })
            }
            rules={[{
              required: true, message: intl.formatMessage({
                id: 'pages.common.id.placeholder',
              })
            }]}
            disabled
          />
        </>
      )}
      <ProFormText
        name="name"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.dictionary.name',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.dictionary.name.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.dictionary.name.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <ProFormText
        name="code"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.dictionary.code',
          })
        }
        tooltip={
          intl.formatMessage({
            id: 'pages.dictionary.code.tooltip',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.dictionary.code.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.dictionary.code.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <ProFormRadio.Group
        name="open"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.dictionary.open',
          })
        }
        tooltip={
          intl.formatMessage({
            id: 'pages.dictionary.open.tooltip',
          })
        }
        fieldProps={{
          defaultValue: 0,
          optionType: "button",
          buttonStyle: "solid",
          // onChange: ({ target: { value } }) => {
          // }
        }}
        options={[
          {
            label: intl.formatMessage({
              id: 'pages.dictionary.open.off',
            }),
            value: 0,
          },
          {
            label: intl.formatMessage({
              id: 'pages.dictionary.open.on',
            }),
            value: 1,
          },
        ]}
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.dictionary.open.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <ProFormTextArea
        name="remark"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.dictionary.remark',
          })
        }
        disabled={disabled}
      />
      <JsonEditor name="value"
                  language={intl.locale}
                  value={props.values.value}
                  tooltip={intl.formatMessage({
                    id: 'pages.dictionary.value.tooltip',
                  })}
                  label={
                    intl.formatMessage({
                      id: 'pages.dictionary.value',
                    })
                  }
                  required={true}
                  message={intl.formatMessage({
                    id: 'pages.dictionary.value.placeholder',
                  })}
                  formRef={formRef}
      />
    </DrawerForm>
  );
};

export default UpdateForm;
