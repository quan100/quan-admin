import {
  DrawerForm, ProCard, ProForm, ProFormDatePicker, ProFormInstance,
  ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useRef, useState } from "react";
import DictionaryFormSelect from "@/components/Quan/Dictionary/Select";
import { Alert, Button, Space, Steps } from "antd";
import { originValue } from "@/components/Quan/Dictionary/Value";
import DictionaryProFormRadioGroup from "@/components/Quan/Dictionary/Radio/Group";

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.SysUser) => void;
  onSubmit: (values: API.SysUser) => Promise<void>;
  open: boolean;
  values: Partial<API.SysUser>;
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

  const [stepCurrent, setStepCurrent] = useState<number>(0);
  const [steps, setSteps] = useState<any>({});
  React.useEffect(() => {
    originValue("user_info_steps").then(res => {
      const items = res?.map((item: {
        title?: string;
        content?: string;
        description?: string;
      }) => ({ key: item.title, title: item.title, description: item.description }));
      setSteps(items);
    });
  }, []);

  const [password, setPassword] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<API.SysUser>({})

  // 窗口开启或关闭时，初始化信息
  React.useEffect(() => {
    return () => {
      setStepCurrent(0);
      setPassword(false);
      setFormFields({});
    }
  }, [props.open]);

  return (
    <DrawerForm
      title={props.title}
      key={props.values.info?.id}
      formRef={formRef}
      width={'50%'}
      layout="horizontal"
      {...formItemLayout}
      open={props.open}
      onFinish={(formData) => {
        return props.onSubmit({ ...formFields, ...formData });
      }}
      submitter={!disabled}
      initialValues={{
        // info
        id: props.values.info?.id,
        userId: props.values.info?.userId,
        nickName: props.values.info?.nickName,
        sex: props.values.info?.sex,
        address: props.values.info?.address,
        email: props.values.info?.email,
        realName: props.values.info?.realName,
        birthday: props.values.info?.birthday,
        description: props.values.info?.description,
        phone: props.values.info?.phone,
        avatar: props.values.info?.avatar,

        // account
        accountId: props.values.account?.id,
        account: props.values.account?.account,
        accountType: props.values.account?.type ? props.values.account?.type : 1,
        accountStatus: props.values.account?.status ? props.values.account?.status : 0,

        // tripartiteAccount
        thirdAccountId: props.values.tripartiteAccount?.id,
        thirdAccount: props.values.tripartiteAccount?.account,
        thirdType: props.values.tripartiteAccount?.thirdType,
        thirdId: props.values.tripartiteAccount?.thirdId,
        thirdBindStatus: props.values.tripartiteAccount?.bindStatus ? props.values.tripartiteAccount?.bindStatus : 0,
      }}
      drawerProps={{
        destroyOnClose: true,
        onClose: () => {
          props.onCancel();
        },
      }}
    >
      <Alert
        message={intl.formatMessage({
          id: 'pages.system.user.save.alert',
        })}
        type="success"
        closable
        style={{
          marginBottom: "10px",
        }}
      />
      <ProCard
        split={'vertical'}
        actions={steps.length > 1 && (
          <Space>
            <Button
              key="primary"
              type="primary"
              onClick={() => {
                formRef.current?.validateFields().then((res) => {
                  setFormFields({ ...formFields, ...res });
                  setStepCurrent(stepCurrent + 1);
                });
              }}
              disabled={stepCurrent === steps.length - 1}
            >
              下一步
            </Button>
            <Button
              key="pre"
              onClick={() => setStepCurrent(stepCurrent - 1)}
              disabled={stepCurrent === 0}
            >
              上一步
            </Button>
          </Space>
        )}
      >
        <ProCard colSpan={6}>
          <Steps
            current={stepCurrent}
            items={steps}
            size="small"
            direction="vertical"
          />
        </ProCard>
        {stepCurrent === 0 && (
          <ProCard title="填写基本信息" headerBordered colSpan={18}>
            {props.values.info?.id && (
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
              name="nickName"
              width="md"
              label={
                intl.formatMessage({
                  id: 'pages.user.info.nickName',
                })
              }
              placeholder={
                intl.formatMessage({
                  id: 'pages.user.info.nickName.placeholder',
                })
              }
              rules={[{
                required: true, message: intl.formatMessage({
                  id: 'pages.user.info.nickName.placeholder',
                })
              }]}
              disabled={disabled}
            />
            <DictionaryFormSelect
              name="sex"
              width="sm"
              code="sex_type"
              label={
                intl.formatMessage({
                  id: 'pages.common.sex',
                })
              }
              placeholder={
                intl.formatMessage({
                  id: 'pages.common.sex.placeholder',
                })
              }
              rules={[{
                required: false, message: intl.formatMessage({
                  id: 'pages.common.sex.placeholder',
                })
              }]}
              disabled={disabled}
            />
            <ProFormText
              name="avatar"
              width="md"
              label={
                intl.formatMessage({
                  id: 'pages.user.info.avatar',
                })
              }
              placeholder={
                intl.formatMessage({
                  id: 'pages.user.info.avatar.placeholder',
                })
              }
              disabled={disabled}
            />
            <ProFormText
              name="address"
              width="md"
              label={
                intl.formatMessage({
                  id: 'pages.user.info.address',
                })
              }
              placeholder={
                intl.formatMessage({
                  id: 'pages.user.info.address.placeholder',
                })
              }
              disabled={disabled}
            />
            <ProFormText
              name="email"
              width="md"
              label={
                intl.formatMessage({
                  id: 'pages.user.info.email',
                })
              }
              placeholder={
                intl.formatMessage({
                  id: 'pages.user.info.email.placeholder',
                })
              }
              rules={[{
                required: false, message: intl.formatMessage({
                  id: 'pages.user.info.email.placeholder',
                })
              }]}
              disabled={disabled}
            />
            <ProFormText
              name="realName"
              width="md"
              label={
                intl.formatMessage({
                  id: 'pages.user.info.realName',
                })
              }
              placeholder={
                intl.formatMessage({
                  id: 'pages.user.info.realName.placeholder',
                })
              }
              disabled={disabled}
            />
            <ProFormDatePicker
              name="birthday"
              width="sm"
              label={
                intl.formatMessage({
                  id: 'pages.user.info.birthday',
                })
              }
              placeholder={
                intl.formatMessage({
                  id: 'pages.user.info.birthday.placeholder',
                })
              }
              disabled={disabled}
            />
            <ProFormText
              name="phone"
              width="md"
              label={
                intl.formatMessage({
                  id: 'pages.user.info.phone',
                })
              }
              placeholder={
                intl.formatMessage({
                  id: 'pages.user.info.phone.placeholder',
                })
              }
              disabled={disabled}
            />
            <ProFormTextArea
              name="description"
              width="md"
              label={
                intl.formatMessage({ id: 'pages.user.info.description', })
              }
              placeholder={
                intl.formatMessage({ id: 'pages.user.info.description.placeholder', })
              }
              disabled={disabled}
              fieldProps={{
                showCount: true,
                maxLength: 200,
              }}
            />
          </ProCard>
        )}
        {stepCurrent === 1 && (
          <ProCard title="设置登录账号" headerBordered colSpan={18}>
            {props.values.account?.id && (
              <>
                <ProFormText
                  name="accountId"
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
            {(props.values.account?.id ? password : true) && (
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
            {(props.values.account?.id && !disabled) && (
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
              name="accountType"
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
              name="accountStatus"
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
          </ProCard>
        )}
        {stepCurrent === 2 && (
          <ProCard title="绑定钉钉账号" headerBordered colSpan={18}>
            {props.values.tripartiteAccount?.id && (
              <>
                <ProFormText
                  name="thirdAccountId"
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
              name="thirdAccount"
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
              name="thirdBindStatus"
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
          </ProCard>
        )}
      </ProCard>
    </DrawerForm>
  );
};

export default UpdateForm;
