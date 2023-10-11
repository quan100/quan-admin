import {
  DrawerForm, ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useRef } from "react";
import DictionaryProFormRadioGroup from "@/components/Quan/Dictionary/Radio/Group";
import DictionaryFormSelect from "@/components/Quan/Dictionary/Select";
import UserProTableSelect from "@/components/Quan/User/ProTable";

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.SysUserTripartiteAccount) => void;
  onSubmit: (values: API.SysUserTripartiteAccount) => Promise<void>;
  open: boolean;
  values: Partial<API.SysUserTripartiteAccount>;
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
        userId: props.values.userId,
        account: props.values.account,
        thirdType: props.values.thirdType,
        thirdId: props.values.thirdId,
        status: props.values.status,
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
      <UserProTableSelect
        name="userId"
        width="sm"
        label={
          intl.formatMessage({
            id: 'pages.user.info.userId',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.system.user.placeholder',
          })
        }
        disabled={disabled}
        modal={{
          title: "系统用户账号",
          width: '60%',
          buttonLabel: "选择用户",
        }}
        type="radio"
        handleOk={function (rows: API.SysUserAccount[]) {
          formRef.current?.setFieldValue("userId", rows[0].userId);
        }}
      />
      <ProFormText
        name="thirdId"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.user.third.thirdId',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.user.third.thirdId.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.user.third.thirdId.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <ProFormText
        name="account"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.user.third.account',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.user.third.account.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.user.third.account.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <DictionaryFormSelect
        name="thirdType"
        code="third_type"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.user.third.thirdType',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.user.third.thirdType.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.user.third.thirdType.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <DictionaryProFormRadioGroup
        name="status"
        width="md"
        code="account_status"
        label={
          intl.formatMessage({
            id: 'pages.user.account.status',
          })
        }
        fieldProps={{
          defaultValue: 0,
        }}
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.user.account.status.placeholder',
          })
        }]}
        disabled={disabled}
      />
    </DrawerForm>
  );
};

export default UpdateForm;
