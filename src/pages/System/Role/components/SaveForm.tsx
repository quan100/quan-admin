import {
  ModalForm, ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from "react";

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.SysRole) => void;
  onSubmit: (values: API.SysRole) => Promise<void>;
  open: boolean;
  values: Partial<API.SysRole>;
  title: string;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  return (
    <ModalForm
      title={props.title}
      key={props.values.id}
      width={600}
      layout="horizontal"
      {...formItemLayout}
      open={props.open}
      onFinish={props.onSubmit}
      initialValues={{
        id: props.values.id,
        appType: props.values.appType,
        name: props.values.name,
        code: props.values.code,
        status: props.values.status,
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
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
      <ProFormSelect
        name="appType"
        width="md"
        disabled
        label={
          intl.formatMessage({
            id: 'pages.common.appType',
          })
        }
        valueEnum={{
          CLIENT_BFF: intl.formatMessage({
            id: 'pages.common.appType.clientBff',
          }),
          MANAGER_BFF: intl.formatMessage({
            id: 'pages.common.appType.managerBff',
          }),
        }}
        placeholder={
          intl.formatMessage({
            id: 'pages.common.appType.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.common.appType.placeholder',
          })
        }]}
      />
      <ProFormText
        name="name"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.role.column.name',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.role.column.name.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.role.column.name.placeholder',
          })
        }]}
      />
      <ProFormText
        name="code"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.role.column.code',
          })
        }
        tooltip={
          intl.formatMessage({
            id: 'pages.role.column.code.tooltip',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.role.column.code.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.role.column.code.placeholder',
          })
        }]}
      />
      <ProFormRadio.Group
        name="status"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.role.column.status',
          })
        }
        tooltip={
          intl.formatMessage({
            id: 'pages.role.column.status.tooltip',
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
              id: 'pages.role.column.status.enabled',
            }),
            value: 0,
          },
          {
            label: intl.formatMessage({
              id: 'pages.role.column.status.disabled',
            }),
            value: 1,
          },
        ]}
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.role.column.status.placeholder',
          })
        }]}
      />
    </ModalForm>
  );
};

export default UpdateForm;
