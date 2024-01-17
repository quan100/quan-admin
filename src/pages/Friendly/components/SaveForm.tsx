import {
  DrawerForm, ProFormDigit, ProFormInstance, ProFormRadio,
  ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useRef } from "react";
import DictionaryFormSelect from "@/components/Quan/Dictionary/Select";
import DictionaryProFormRadioGroup from "@/components/Quan/Dictionary/Radio/Group";

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.Friendly) => void;
  onSubmit: (values: API.Friendly) => Promise<void>;
  open: boolean;
  values: Partial<API.Friendly>;
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
      width={'40%'}
      layout="horizontal"
      {...formItemLayout}
      open={props.open}
      onFinish={props.onSubmit}
      submitter={!disabled}
      initialValues={{
        id: props.values.id,
        name: props.values.name,
        linkUrl: props.values.linkUrl,
        avatar: props.values.avatar,
        email: props.values.email,
        emailPublic: props.values.emailPublic,
        remarks: props.values.remarks,
        status: props.values.status,
        sort: props.values.sort,
        style: props.values.style,
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
            id: 'pages.friendly.name',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.friendly.name.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.friendly.name.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <ProFormText
        name="linkUrl"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.friendly.linkUrl',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.friendly.linkUrl.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.friendly.linkUrl.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <ProFormText
        name="avatar"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.friendly.avatar',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.friendly.avatar.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.friendly.avatar.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <ProFormText
        name="email"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.friendly.email',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.friendly.email.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.friendly.email.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <DictionaryProFormRadioGroup
        name="emailPublic"
        code="third_bind_status"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.user.third.thirdBindStatus',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.user.third.thirdBindStatus.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.user.third.thirdBindStatus.placeholder',
          })
        }]}
        fieldProps={{
          defaultValue: 1,
        }}
        disabled={disabled}
      />
      <ProFormRadio.Group
        name="status"
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
        options={[
          {
            label: intl.formatMessage({ id: 'pages.common.status.0', }),
            value: 0,
          },
          {
            label: intl.formatMessage({ id: 'pages.common.status.1', }),
            value: 1,
          },
          {
            label: intl.formatMessage({ id: 'pages.common.status.2', }),
            value: 2,
          },
        ]}
        rules={[{
          required: true,
          message: intl.formatMessage({ id: 'pages.common.status.placeholder', })
        }]}
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
      <ProFormTextArea
        name="remarks"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.friendly.remarks',
          })
        }
        placeholder={
          intl.formatMessage({ id: 'pages.friendly.remarks.placeholder', })
        }
        disabled={disabled}
      />
      <ProFormTextArea
        name="style"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.friendly.style',
          })
        }
        tooltip={
          intl.formatMessage({ id: 'pages.common.style.tooltip', })
        }
        placeholder={
          intl.formatMessage({ id: 'pages.friendly.style.placeholder', })
        }
        disabled={disabled}
      />
    </DrawerForm>
  );
};

export default UpdateForm;
