import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        // {
        //   key: 'javaquan',
        //   title: 'JavaQuan',
        //   href: 'https://javaquan.cn',
        //   blankTarget: true,
        // },
        {
          key: 'beian',
          title: '鄂ICP备18028512号',
          href: 'https://beian.miit.gov.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
