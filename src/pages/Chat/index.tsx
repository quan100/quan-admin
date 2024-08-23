import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';

const ChatDemo: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');

  return (
    <PageContainer
      content={
        <Card
          style={{
            borderRadius: 8,
          }}
          styles={{
            body: {
              backgroundImage:
                initialState?.settings?.navTheme === 'realDark'
                  ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                  : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
            },
          }}
        >
          用于演示的用户id：10000、
          10001、
          10002、
          10004、
          10005
        </Card>
      }
    >
      <Card
        style={{
          borderRadius: 8,
        }}
        styles={{
          body: {
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          },
        }}
      >
        <iframe
          src={"https://chat.javaquan.cn"}
          style={{
            height: '100%',
            minHeight: '620px',
            width: '100%',
            border: 'none',
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default ChatDemo;
