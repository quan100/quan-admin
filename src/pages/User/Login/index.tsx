import { Footer } from '@/components';
import { login } from '@/services/auth/api';
import { getFakeCaptcha, getImgCaptcha, getEmailCaptcha } from '@/services/auth/login';
import {
  LockOutlined,
  MobileOutlined, SyncOutlined,
  UserOutlined,
  DingtalkOutlined,
  SafetyOutlined,
  MailOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, history, SelectLang, useIntl, useModel, Helmet } from '@umijs/max';
import { Alert, message, Tabs, Button, Space, Divider, QRCode, Spin, Modal } from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, { CSSProperties, useState } from 'react';
import { flushSync } from 'react-dom';
import Dingtalk from "@/components/Quan/Login/Dingtalk";
import { auth, dingtalkBound } from "@/services/auth/tripartiteLogin";

const { confirm } = Modal;

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const ActionIcons = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    };
  });

  return (
    <>
      <DingtalkOutlined key="DingtalkOutlined" className={langClassName}/>
    </>
  );
};

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang/>}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleLoginSuccess = async (defaultMessage: string | undefined, token: string) => {
    const defaultLoginSuccessMessage = intl.formatMessage({
      id: 'pages.login.success',
      defaultMessage: defaultMessage || '登录成功！',
    });
    message.success(defaultLoginSuccessMessage);
    localStorage.setItem("AUTHORIZATION_TOKEN", token);
    await fetchUserInfo();
    const urlParams = new URL(window.location.href).searchParams;
    history.push(urlParams.get('redirect') || '/');
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values, type });
      if (msg.code === 200) {
        await handleLoginSuccess(undefined, msg.data);
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      handleChangeImgCaptcha()
    }
  };
  const { code, type: loginType } = userLoginState;
  const [imgCaptchaVisible, setImgCaptchaVisible] = React.useState(false);
  const [imgCaptcha, setImgCaptcha] = React.useState('/checkcode.png');

  const [otherLoginType, setOtherLoginType] = React.useState<string>();

  const handleChangeImgCaptcha = () => {
    getImgCaptcha().then(res => {
      setImgCaptchaVisible(true)
      setImgCaptcha('data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), '')));
    });
  };

  // 钉钉API配置
  const [dingtalkApi] = React.useState<{
    authUri: string;
    redirectUri: string;
    clientId: string;
  }>({
    // 钉钉登录授权API
    authUri: "https://admin.quan.icu/api/dingtalk/login/auth",
    // 钉钉账号登录重定向页面
    redirectUri: "https://admin.quan.icu/user/login",
    clientId: "dingndijcvquhq1kpboy",
  });

  const [loginLoadingMsg, setLoginLoadingMsg] = React.useState<string>("登录中，请稍后...");
  const [loginLoading, setLoginLoading] = React.useState<boolean>(false);

  /**
   * 钉钉账号登录重定向页面检测登录状态
   */
  const handleDingtalkLoginChecked = () => {
    // 钉钉账号登录检测
    const urlParams = new URL(window.location.href).searchParams;
    const authCode = urlParams.get('authCode');
    const state = urlParams.get('state');

    if (authCode) {
      setLoginLoading(true);
      const requestUrl = dingtalkApi.authUri + '?authCode=' + authCode + '&state=' + state;
      tripartiteLogin(requestUrl, {})
        .then((res: API.Result<any>) => {
          if (res.code === 200) {
            setLoginLoadingMsg("登录成功，正在加载系统，请稍后...");
          } else {
            setLoginLoading(false);
            message.error("登录失败：");
          }
        })
        .finally(() => {
          setLoginLoading(false);
        });
    }
  }

  const handleInitialize = () => {
    handleDingtalkLoginChecked();
    handleChangeImgCaptcha();
  };

  React.useEffect(handleInitialize, [])

  const tripartiteLogin = async (redirectUrl: string, params: any) => {
    return new Promise((resolve, reject) => {
      auth(redirectUrl)
        .then(async (response) => {
          if (response.code === 200) {
            const { code, data } = response.data;
            if (code) {
              if (code === 100001007) {
                confirm({
                  title: '账号未注册',
                  content: '是否申请注册账号？',
                  okText: "是",
                  cancelText: "否",
                  onOk() {
                    dingtalkBound(data)
                      .then(res => message.success(res.message))
                    // .catch(err => message.error(err.message))
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              } else {
                message.error(response.data.message);
              }
            } else {
              await handleLoginSuccess("登录成功", response.data);
            }
          }
          resolve(response);
        });
    });
  };

  return (
    <Spin spinning={loginLoading} tip={loginLoadingMsg}>
      <div className={containerClassName}>
        <Helmet>
          <title>
            {intl.formatMessage({
              id: 'menu.login',
              defaultMessage: '登录页',
            })}
            - {Settings.title}
          </title>
        </Helmet>
        <Lang/>
        <div
          style={{
            backgroundColor: 'white',
            height: 'calc(100vh - 48px)',
          }}
        >

          <LoginFormPage
            backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
            // logo="https://quan.icu/logo.png"
            title={<img src="/title-logo.png"/>}
            subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
            initialValues={{
              autoLogin: true,
            }}
            activityConfig={{
              style: {
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                color: 'rgba(0, 0, 0, 0.65)',
                borderRadius: 8,
                backgroundColor: '#ffffff',
              },
              title: (
                <img src="/title-logo.png"/>
              ),
              subTitle: intl.formatMessage({ id: 'pages.login.activity.subTitle' }),
              action: (
                <Button
                  size="large"
                  style={{
                    borderRadius: 20,
                    background: '#fff',
                    color: '#1677FF',
                    width: 120,
                  }}
                  onClick={function () {
                    window.open("https://javaquan.cn", '_blank')
                  }}
                >
                  <FormattedMessage
                    key="actionText"
                    id="pages.login.activity.action.text"
                  />
                </Button>
              ),
            }}
            actions={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Divider plain>
                  <span
                    style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}
                  >
                    <FormattedMessage
                      key="loginWith"
                      id="pages.login.loginWith"
                      // defaultMessage="其他登录方式"
                    />,
                  </span>
                </Divider>
                <Space align="center" size={24}>
                  <a
                    onClick={function () {
                      setOtherLoginType("dingtalk");
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: 40,
                        width: 40,
                        border: '1px solid #D4D8DD',
                        borderRadius: '50%',
                      }}
                    >
                      <DingtalkOutlined style={{ ...iconStyles, color: '#1677FF' }}/>
                    </div>
                  </a>
                </Space>
              </div>
            }

            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}

            submitter={{
              render: ((props, dom: JSX.Element[]) => (
                otherLoginType === 'dingtalk' ?
                  <Dingtalk
                    onClose={function () {
                      setOtherLoginType(undefined);
                    }}
                    api={{
                      authUri: dingtalkApi.authUri,
                      redirectUri: dingtalkApi.redirectUri,
                      clientId: dingtalkApi.clientId,
                    }}
                    login={tripartiteLogin}
                  />
                  : dom[1]
              )),
            }}
          >
            {!otherLoginType && (
              <div>
                <Tabs
                  activeKey={type}
                  onChange={setType}
                  centered
                  items={[
                    {
                      key: 'account',
                      label: intl.formatMessage({
                        id: 'pages.login.accountLogin.tab',
                      }),
                    },
                    // {
                    //   key: 'mobile',
                    //   label: intl.formatMessage({
                    //     id: 'pages.login.phoneLogin.tab',
                    //   }),
                    // },
                    {
                      key: 'email',
                      label: intl.formatMessage({
                        id: 'pages.login.emailLogin.tab',
                      }),
                    },
                  ]}
                />

                {code !== 200 && loginType === 'account' && (
                  <LoginMessage
                    content={intl.formatMessage({
                      id: 'pages.login.accountLogin.errorMessage',
                    })}
                  />
                )}
                {type === 'account' && (
                  <>
                    <ProFormText
                      name="account"
                      fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined/>,
                      }}
                      placeholder={intl.formatMessage({
                        id: 'pages.login.username.placeholder',
                      })}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.login.username.required"
                            />
                          ),
                        },
                      ]}
                    />
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined/>,
                      }}
                      placeholder={intl.formatMessage({
                        id: 'pages.login.password.placeholder',
                      })}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.login.password.required"
                            />
                          ),
                        },
                      ]}
                    />
                    <Space align="start">
                      <ProFormText
                        placeholder={intl.formatMessage({
                          id: 'pages.login.captcha.placeholder',
                          defaultMessage: '请输入验证码',
                        })}
                        fieldProps={{
                          size: 'large',
                          prefix: <SafetyOutlined/>,
                        }}
                        name="captcha"
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage
                                id="pages.login.captcha.required"
                                defaultMessage="请输入验证码！"
                              />
                            ),
                          },
                        ]}
                      />
                      <Button
                        style={{
                          width: '100px',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '100% auto',
                          backgroundImage:
                            "url(" + imgCaptcha + ")",
                        }}
                        size="large"
                        onClick={() => {
                          handleChangeImgCaptcha()
                        }}>
                        {!imgCaptchaVisible && <SyncOutlined/>}
                      </Button>
                    </Space>
                  </>
                )}

                {code !== 200 && loginType === 'mobile' && <LoginMessage content="验证码错误"/>}
                {type === 'mobile' && (
                  <>
                    <ProFormText
                      fieldProps={{
                        size: 'large',
                        prefix: <MobileOutlined/>,
                      }}
                      name="mobile"
                      placeholder={intl.formatMessage({
                        id: 'pages.login.phoneNumber.placeholder',
                        defaultMessage: '手机号',
                      })}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.login.phoneNumber.required"
                              defaultMessage="请输入手机号！"
                            />
                          ),
                        },
                        {
                          pattern: /^1\d{10}$/,
                          message: (
                            <FormattedMessage
                              id="pages.login.phoneNumber.invalid"
                              defaultMessage="手机号格式错误！"
                            />
                          ),
                        },
                      ]}
                    />
                    <ProFormCaptcha
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined/>,
                      }}
                      captchaProps={{
                        size: 'large',
                      }}
                      placeholder={intl.formatMessage({
                        id: 'pages.login.captcha.placeholder',
                        defaultMessage: '请输入验证码',
                      })}
                      captchaTextRender={(timing, count) => {
                        if (timing) {
                          return `${count} ${intl.formatMessage({
                            id: 'pages.getCaptchaSecondText',
                            defaultMessage: '获取验证码',
                          })}`;
                        }
                        return intl.formatMessage({
                          id: 'pages.login.phoneLogin.getVerificationCode',
                          defaultMessage: '获取验证码',
                        });
                      }}
                      name="captcha"
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.login.captcha.required"
                              defaultMessage="请输入验证码！"
                            />
                          ),
                        },
                      ]}
                      onGetCaptcha={async (phone) => {
                        const result = await getFakeCaptcha({
                          phone,
                        });
                        if (!result) {
                          return;
                        }
                        message.success('获取验证码成功！验证码为：1234');
                      }}
                    />
                  </>
                )}

                {code !== 200 && loginType === 'email' && <LoginMessage content="验证码错误"/>}
                {type === 'email' && (
                  <>
                    <ProFormText
                      fieldProps={{
                        size: 'large',
                        prefix: <MailOutlined/>,
                      }}
                      name="email"
                      placeholder={intl.formatMessage({
                        id: 'pages.login.emailLogin.placeholder',
                      })}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.login.emailLogin.required"
                            />
                          ),
                        },
                        {
                          pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                          message: (
                            <FormattedMessage
                              id="pages.login.emailLogin.invalid"
                            />
                          ),
                        },
                      ]}
                    />
                    <ProFormCaptcha
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined/>,
                      }}
                      captchaProps={{
                        size: 'large',
                      }}
                      placeholder={intl.formatMessage({
                        id: 'pages.login.captcha.placeholder',
                      })}
                      captchaTextRender={(timing, count) => {
                        if (timing) {
                          return `${count} ${intl.formatMessage({
                            id: 'pages.getCaptchaSecondText',
                          })}`;
                        }
                        return intl.formatMessage({
                          id: 'pages.login.phoneLogin.getVerificationCode',
                        });
                      }}
                      phoneName="email"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.login.captcha.required"
                            />
                          ),
                        },
                      ]}
                      onGetCaptcha={async (email) => {
                        try {
                          const result = await getEmailCaptcha({
                            email,
                          });
                          const { success } = result;
                          if (success) {
                            message.success('获取验证码成功！请查收邮件');
                          }
                        } catch (error: any) {
                        }
                      }}
                    />
                  </>
                )}
                <div
                  style={{
                    marginBottom: 24,
                  }}
                >
                  <ProFormCheckbox noStyle name="autoLogin">
                    <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录"/>
                  </ProFormCheckbox>
                  {type === 'account' && (
                    <a
                      style={{
                        float: 'right',
                      }}
                      onClick={function () {
                        message.warning("请联系管理员！");
                      }}
                    >
                      <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码"/>
                    </a>
                  )}
                </div>
              </div>
            )}
          </LoginFormPage>
        </div>
        <Footer/>
      </div>
    </Spin>
  );
};

export default Login;
