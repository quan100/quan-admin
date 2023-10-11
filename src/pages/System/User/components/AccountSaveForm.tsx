import {
  DrawerForm, ProForm, ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useRef, useState } from "react";
import DictionaryProFormRadioGroup from "@/components/Quan/Dictionary/Radio/Group";
import RoleProFormSelect from "@/components/Quan/Role/Select";

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.SysUserAccount) => void;
  onSubmit: (values: API.SysUserAccount) => Promise<void>;
  open: boolean;
  values: Partial<API.SysUserAccount>;
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

  const [password, setPassword] = useState<boolean>();
  // 窗口开启或关闭时，初始化信息
  React.useEffect(() => {
    return () => {
      setPassword(false);
    }
  }, [props.open]);

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
        type: props.values.type,
        status: props.values.status,
        roleIdList: props.values.roleIdList,
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
          <ProFormText
            name="userId"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.user.info.userId',
              })
            }
            placeholder={
              intl.formatMessage({
                id: 'pages.user.info.userId.placeholder',
              })
            }
            tooltip={
              intl.formatMessage({
                id: 'pages.user.info.userId.tooltip',
              })
            }
            disabled
          />
        </>
      )}
      <ProFormText
        name="account"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.user.account.account',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.user.account.account.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.user.account.account.placeholder',
          })
        }]}
        disabled={disabled}
      />
      {(props.values.id ? password : true) && (
        <>
          <ProFormText.Password
            name="password"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.user.account.password',
              })
            }
            placeholder={
              intl.formatMessage({
                id: 'pages.user.account.password.placeholder',
              })
            }
            rules={[{
              required: true, message: intl.formatMessage({
                id: 'pages.user.account.password.placeholder',
              })
            }]}
            disabled={disabled}
          />
          <ProFormText.Password
            name="passwordConfirm"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.user.account.password.confirm',
              })
            }
            placeholder={
              intl.formatMessage({
                id: 'pages.user.account.password.confirm.placeholder',
              })
            }
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'pages.user.account.password.confirm.placeholder',
                })
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(
                    intl.formatMessage({
                      id: 'pages.user.account.password.confirm.error',
                    })
                  ));
                },
              }),
            ]}
            disabled={disabled}
          />
        </>
      )}
      {(props.values.id && !disabled) && (
        <ProForm.Item
          label="密码操作"
        >
          <a onClick={function () {
            setPassword(!password);
          }}>
            <span>{password ? '收起' : '修改密码'}</span>
          </a>
        </ProForm.Item>
      )}
      <DictionaryProFormRadioGroup
        name="type"
        width="md"
        code="account_type"
        label={
          intl.formatMessage({
            id: 'pages.user.account.type',
          })
        }
        fieldProps={{
          defaultValue: 1,
        }}
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.user.account.type.placeholder',
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
      <RoleProFormSelect
        name="roleIdList"

        width="md"
        mode={"multiple"}
        label={
          intl.formatMessage({ id: 'pages.user.role', })
        }
        placeholder={
          intl.formatMessage({ id: 'pages.user.role.placeholder', })
        }
        rules={[{
          required: false,
          message: intl.formatMessage({ id: 'pages.user.role.placeholder', })
        }]}
        disabled={disabled}
      />
    </DrawerForm>
  );
};

export default UpdateForm;
