import {
  DrawerForm, ProFormDigit, ProFormInstance,
  ProFormRadio,
  ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useRef } from "react";
import DictionaryFormSelect from "@/components/Quan/Dictionary/Select";
import DictionaryProFormRadioGroup from "@/components/Quan/Dictionary/Radio/Group";

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.Tools) => void;
  onSubmit: (values: API.Tools) => Promise<void>;
  open: boolean;
  values: Partial<API.Tools>;
  title: string;
  disabled?: boolean;
};

const UpdateForm: React.FC<UpdateFormProps> = ({ disabled = false, ...props }) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
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
    <DrawerForm
      title={props.title}
      key={props.values.id}
      formRef={formRef}
      width={800}
      layout="horizontal"
      {...formItemLayout}
      open={props.open}
      onFinish={props.onSubmit}
      submitter={!disabled}
      initialValues={{
        id: props.values.id,
        avatar: props.values.avatar,
        cover: props.values.cover,
        remarks: props.values.remarks,
        title: props.values.title,
        dataType: props.values.dataType,
        listType: props.values.listType,
        status: props.values.status,
        content: props.values.content,
        jumpUrl: props.values.jumpUrl,
        jumpType: props.values.jumpType,
        sort: props.values.sort,
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
        name="title"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.tools.title',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.tools.title.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.tools.title.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <ProFormTextArea
        name="content"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.tools.content',
          })
        }
        disabled={disabled}
      />
      <DictionaryFormSelect
        name="dataType"
        width="md"
        code="dataType"
        label={
          intl.formatMessage({
            id: 'pages.tools.dataType',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.tools.dataType.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.tools.dataType.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <DictionaryFormSelect
        name="listType"
        width="md"
        code="listType"
        label={
          intl.formatMessage({
            id: 'pages.tools.listType',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.tools.listType.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.tools.listType.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <DictionaryFormSelect
        name="jumpType"
        width="md"
        code="jumpType"
        label={
          intl.formatMessage({
            id: 'pages.tools.jumpType',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.tools.jumpType.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.tools.jumpType.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <ProFormText
        name="jumpUrl"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.tools.jumpUrl',
          })
        }
        tooltip={
          intl.formatMessage({
            id: 'pages.tools.jumpUrl.tooltip',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.tools.jumpUrl.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.tools.jumpUrl.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <ProFormText
        name="avatar"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.tools.avatar',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.tools.avatar.placeholder',
          })
        }
        disabled={disabled}
      />
      <ProFormText
        name="cover"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.tools.cover',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.tools.cover.placeholder',
          })
        }
        disabled={disabled}
      />
      <ProFormDigit
        name="sort"
        width="xs"
        min={-9999999}
        max={9999999}
        fieldProps={{
          precision: 0,
          defaultValue: 0,
        }}
        label={
          intl.formatMessage({ id: 'pages.common.sort', })
        }
        tooltip={
          intl.formatMessage({ id: 'pages.common.sort.tooltip', })
        }
        placeholder={
          intl.formatMessage({ id: 'pages.common.sort.placeholder', })
        }
        disabled={disabled}
      />
      <DictionaryProFormRadioGroup
        name="status"
        code="examineStatus"
        width="md"
        label={
          intl.formatMessage({ id: 'pages.common.status', })
        }
        fieldProps={{
          defaultValue: 0,
          optionType: "button",
          buttonStyle: "solid",
          onChange: ({ target: { value } }) => {
            // setType(value)
          }
        }}
        rules={[{
          required: true,
          message: intl.formatMessage({ id: 'pages.common.status.placeholder', })
        }]}
        disabled={disabled}
      />
      <ProFormTextArea
        name="remark"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.common.remark',
          })
        }
        disabled={disabled}
      />
    </DrawerForm>
  );
};

export default UpdateForm;
