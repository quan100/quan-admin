import React, { useState } from 'react';
import {
  ProFormText,
  ProForm,
  ProTable, ProColumns,
} from "@ant-design/pro-components";
import { Rule } from "rc-field-form/lib/interface";
import { page } from "@/services/user/account";
import { Button, Modal, Space } from "antd";
import { FormattedMessage, useIntl } from "@@/exports";
import { valueEnum } from "@/components/Quan/Dictionary/Value";
import { RowSelectionType } from "antd/lib/table/interface";

export type FormProps = {
  name: string;
  label?: React.ReactNode;
  placeholder?: string | string[];
  rules?: Rule[];
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  disabled?: boolean;
  modal?: {
    title?: string;
    width?: string | number;
    buttonLabel?: string;
  };
  type?: RowSelectionType;
  handleOk?: Function;
};

const UserProTableSelect: React.FC<FormProps> = ({ ...props }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (props.handleOk) {
      props.handleOk(selectedRowsState);
    }
    setIsModalOpen(false);
    setSelectedRows([]);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [selectedRowsState, setSelectedRows] = useState<API.SysUserAccount[]>([]);

  const [accountStatus, setAccountStatus] = useState<any>({});
  const [accountType, setAccountType] = useState<any>({});
  React.useEffect(() => {
    valueEnum("account_status").then(res => {
      setAccountStatus(res);
    });
    valueEnum("account_type").then(res => {
      setAccountType(res);
    });
  }, []);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.SysUserAccount>[] = [
    {
      title: <FormattedMessage id="pages.common.id"/>,
      dataIndex: 'id',
    },
    {
      title: <FormattedMessage id="pages.user.info.userId"/>,
      dataIndex: 'userId',
    },
    {
      title: <FormattedMessage id="pages.user.account.account"/>,
      dataIndex: 'account',
    },
    {
      title: <FormattedMessage id="pages.user.account.type"/>,
      dataIndex: 'type',
      valueEnum: accountType,
    },
    {
      title: <FormattedMessage id="pages.user.account.status"/>,
      dataIndex: 'status',
      valueEnum: accountStatus,
    },
    {
      title: (<FormattedMessage id="pages.common.updateTime"/>),
      dataIndex: 'updateTime',
      search: false
    },
  ];

  return (
    <>
      <ProForm.Item
        label={props.label}
      >
        <Space>
          <ProFormText
            name={props.name}
            placeholder={props.placeholder}
            // fieldProps={inputProps}
            rules={props.rules}
            width={props.width}
            disabled={props.disabled}
            noStyle
          />
          <Button type="primary" onClick={showModal} disabled={props.disabled}>
            {props.modal?.buttonLabel}
          </Button>
        </Space>
      </ProForm.Item>
      <Modal
        title={props.modal?.title}
        width={props.modal?.width}
        destroyOnClose
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ProTable<API.SysUserAccount, API.SysUserAccount>
          headerTitle={intl.formatMessage({
            id: 'pages.searchTable.title',
            defaultMessage: 'Enquiry form',
          })}
          // actionRef={actionRef}
          rowKey="id"
          search={{
            labelWidth: 80,
          }}
          toolBarRender={false}
          params={{}}
          request={async (
            // 第一个参数 params 查询表单和 params 参数的结合
            // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
            params: any,
            sort,
            filter,
          ) => {
            // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
            // 如果需要转化参数可以在这里进行修改
            params.pageNum = params.current
            const msg = await page(params);
            return {
              data: msg.data.records,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: msg.success,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: msg.data.total,
            };
          }}
          pagination={{
            defaultPageSize: 10
          }}
          columns={columns}
          rowSelection={{
            type: props.type,
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
      </Modal>
    </>
  );
};

export default UserProTableSelect;
