import React, { MouseEventHandler } from 'react';
import { ProCard } from "@ant-design/pro-components";
import { Divider, message, Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";

// ********************************************************************************
// window.DTFrameLogin方法定义
// ********************************************************************************
// window.DTFrameLogin: (
//   frameParams: IDTLoginFrameParams, // DOM包裹容器相关参数
//   loginParams: IDTLoginLoginParams, // 统一登录参数
//   successCbk: (result: IDTLoginSuccess) => void, // 登录成功后的回调函数
//   errorCbk?: (errorMsg: string) => void,         // 登录失败后的回调函数
// ) => void;

// ********************************************************************************
// DOM包裹容器相关参数
// ********************************************************************************
// 注意！width与height参数只用于设置二维码iframe元素的尺寸，并不会影响包裹容器尺寸。
// 包裹容器的尺寸与样式需要接入方自己使用css设置
interface IDTLoginFrameParams {
  id: string;      // 必传，包裹容器元素ID，不带'#'
  width?: number;  // 选传，二维码iframe元素宽度，最小280，默认300
  height?: number; // 选传，二维码iframe元素高度，最小280，默认300
}

// ********************************************************************************
// 统一登录参数
// ********************************************************************************
// 参数意义与“拼接链接发起登录授权”的接入方式完全相同（缺少部分参数）
// 增加了isPre参数来设定运行环境
interface IDTLoginLoginParams {
  redirect_uri: string;     // 必传，注意url需要encode
  response_type: string;    // 必传，值固定为code
  client_id: string;        // 必传
  scope: string;            // 必传，如果值为openid+corpid，则下面的org_type和corpId参数必传，否则无法成功登录
  prompt: string;           // 必传，值为consent。
  state?: string;           // 选传
  org_type?: string;        // 选传，当scope值为openid+corpid时必传
  corpId?: string;          // 选传，当scope值为openid+corpid时必传
  exclusiveLogin?: string;  // 选传，如需生成专属组织专用二维码时，可指定为true，可以限制非组织帐号的扫码
  exclusiveCorpId?: string; // 选传，当exclusiveLogin为true时必传，指定专属组织的corpId
}

// ********************************************************************************
// 登录成功后返回的登录结果
// ********************************************************************************
interface IDTLoginSuccess {
  redirectUrl: string;   // 登录成功后的重定向地址，接入方可以直接使用该地址进行重定向
  authCode: string;      // 登录成功后获取到的authCode，接入方可直接进行认证，无需跳转页面
  state?: string;        // 登录成功后获取到的state
}

export type LoginProps<T = Record<string, any>, K = any> = {
  onClose?: MouseEventHandler<T> | undefined;
  api: {
    clientId: string;
    /**
     * 钉钉账号登录重定向地址
     */
    redirectUri?: string | undefined;
    /**
     * 钉钉扫码登录服务端授权地址
     */
    authUri: string;
  },
  login: Function;
  id?: string;      // 选传，包裹容器元素ID，不带'#'，默认ding-login-auth-img
  width?: number;  // 选传，二维码iframe元素宽度，最小280，默认300
  height?: number; // 选传，二维码iframe元素高度，最小280，默认300
};

const jssdk = "https://g.alicdn.com/dingding/h5-dingtalk-login/0.21.0/ddlogin.js";

function loadingJssdk() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = jssdk;
    script.onload = () => resolve(true);
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
}

function dingAccountLogin(clientId: string, redirectPath: string | undefined) {
  const url = 'https://login.dingtalk.com/oauth2/auth?redirect_uri=' + redirectPath + '&response_type=code&client_id=' + clientId + '&scope=openid&state=REMEMBER&prompt=consent';
  location.href = url;
}

const DingtalkLogin: React.FC<LoginProps> = ({ id = 'ding-login-auth-img', width = 280, height = 280, ...props }) => {

  const [loading, setLoading] = React.useState<boolean>(true);
  const [loadingMsg, setLoadingMsg] = React.useState<string>();

  React.useEffect(() => {
    loadingJssdk().then((val) => {
      init();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }).catch(() => {
      setLoadingMsg("加载失败，请刷新页面重试！");
    });
  }, []);

  // https://open.dingtalk.com/document/isvapp/tutorial-enabling-login-to-third-party-websites
  const init = () => {
    // STEP3：在需要的时候，调用 window.DTFrameLogin 方法构造登录二维码，并处理登录成功或失败的回调。
    window.DTFrameLogin(
      {
        id: id,
        width: width,
        height: height
      },
      {
        redirect_uri: encodeURIComponent(props.api.authUri),
        client_id: props.api.clientId,
        scope: 'openid',
        response_type: 'code',
        state: 'REMEMBER',
        prompt: 'consent'
      },
      (loginResult: IDTLoginSuccess) => {
        const { redirectUrl, authCode, state } = loginResult;
        setLoadingMsg("登录中，请稍后...");
        setLoading(true);
        props.login(redirectUrl, {}).finally(() => {
          setLoading(false);
        });
      },
      (errorMsg: string) => {
        // 这里一般需要展示登录失败的具体原因
        console.error('Login Error: ', errorMsg);
        message.error('Login Error: ' + errorMsg);
      }
    )
  };

  return (
    <ProCard
      actions={
        props.api.redirectUri && (
          <div onClick={function () {
            dingAccountLogin(props.api.clientId, props.api.redirectUri);
          }}>
            <a>
              <span>使用钉钉账号登录</span>
            </a>
          </div>
        )
      }
      boxShadow
      title={
        <span>钉钉登录</span>
      }
      headerBordered={true}
      extra={
        <a onClick={props.onClose}>
          <CloseOutlined/>
        </a>
      }
    >
      <div>
        <Spin tip={loadingMsg} spinning={loading}>
          <div id={id}></div>
          <Divider plain><span>请使用钉钉扫描二维码登录</span></Divider>
        </Spin>
      </div>
    </ProCard>
  )
};

export default DingtalkLogin;
