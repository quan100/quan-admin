import {
  page,
  api,
} from '@/services/user/info';
import {
  FooterToolbar,
  PageContainer,
  ProTable,
  ActionType, ProColumns,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Alert, Button, message, Popconfirm, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import SaveForm from './components/SaveForm';
import { valueEnum } from "@/components/Quan/Dictionary/Value";
import { getUser, removeUser, saveUser, updateUser } from "@/services/user/api";
import md5 from 'md5';
import { useAccess, Access } from 'umi';

/**
 * @en-US Add
 * @zh-CN 添加
 * @param fields
 */
const handleAdd = async (fields: any) => {
  const hide = message.loading('正在添加');
  try {
    const { success } = await saveUser({
      info: {
        nickName: fields.nickName,
        sex: fields.sex,
        address: fields.address,
        email: fields.email,
        realName: fields.realName,
        birthday: fields.birthday,
        description: fields.description,
        phone: fields.phone,
        avatar: fields.avatar,
      },
      account: fields.account ? {
        account: fields.account,
        password: md5(fields.password),
        type: fields.accountType,
        status: fields.accountStatus,
        appType: 'MANAGER_BFF',
      } : undefined,
      tripartiteAccount: fields.thirdId ? {
        account: fields.thirdAccount,
        thirdType: fields.thirdType,
        thirdId: fields.thirdId,
        bindStatus: fields.thirdBindStatus,
      } : undefined,
    });
    hide();
    if (success) {
      message.success('Added successfully');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * @en-US Update
 * @zh-CN 更新
 *
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在更新');
  try {
    const { success } = await updateUser({
      info: {
        id: fields.id,
        nickName: fields.nickName,
        sex: fields.sex,
        address: fields.address,
        email: fields.email,
        realName: fields.realName,
        birthday: fields.birthday,
        description: fields.description,
        phone: fields.phone,
        avatar: fields.avatar,
      },
      account: fields.account ? {
        id: fields.accountId,
        account: fields.account,
        password: fields.password ? md5(fields.password) : undefined,
        type: fields.accountType,
        status: fields.accountStatus,
      } : undefined,
      tripartiteAccount: fields.thirdId ? {
        id: fields.thirdAccountId,
        account: fields.thirdAccount,
        thirdType: fields.thirdType,
        thirdId: fields.thirdId,
        bindStatus: fields.thirdBindStatus,
      } : undefined,
    });
    hide();
    if (success) {
      message.success('Configuration is successful');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  Delete
 * @zh-CN 删除
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.SysUserInfo[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const { success } = await removeUser(
      selectedRows.map((row) => row.id),
    );
    hide();
    if (success) {
      message.success('Deleted successfully and will refresh soon');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    hide();
    return false;
  }
};

const SysUser: React.FC = () => {

  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.SysUser>();
  const [selectedRowsState, setSelectedRows] = useState<API.SysUserInfo[]>([]);
  const [readOnly, setReadOnly] = useState<boolean>(false);

  const [sexType, setSexType] = useState<any>({});
  React.useEffect(() => {
    valueEnum("sex_type").then(res => {
      setSexType(res);
    });
  }, []);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const access = useAccess();

  const columns: ProColumns<API.SysUserInfo>[] = [
    {
      title: <FormattedMessage id="pages.common.id"/>,
      dataIndex: 'id',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.user.info.userId"/>,
      dataIndex: 'userId',
    },
    {
      title: <FormattedMessage id="pages.user.info.nickName"/>,
      dataIndex: 'nickName',
    },
    {
      title: <FormattedMessage id="pages.common.sex"/>,
      dataIndex: 'sex',
      valueEnum: sexType,
    },
    {
      title: <FormattedMessage id="pages.user.info.description"/>,
      dataIndex: 'description',
      search: false,
    },
    {
      title: (<FormattedMessage id="pages.common.updateTime"/>),
      dataIndex: 'updateTime',
      search: false
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating"/>,
      dataIndex: 'option',
      valueType: 'option',
      hideInTable: !access.canActions([api.details, api.update, api.remove]),
      render: (_, record) => [
        <Access accessible={access.canAction(api.details)}>
          <a
            key="details"
            onClick={async () => {
              const { data } = await getUser({
                id: record.id,
              })
              setReadOnly(true);
              setCurrentRow(data);
              handleUpdateModalOpen(true);
            }}
          >
            <FormattedMessage id="pages.common.details" defaultMessage="Details"/>
          </a>
        </Access>,
        <Access accessible={access.canAction(api.update)}>
          <a
            key="update"
            onClick={async () => {
              const { data } = await getUser({
                id: record.id,
              })
              setReadOnly(false);
              setCurrentRow(data);
              handleUpdateModalOpen(true);
            }}
          >
            <FormattedMessage id="pages.common.update" defaultMessage="Update"/>
          </a>
        </Access>,
        <Access accessible={access.canAction(api.remove)}>
          <Popconfirm
            key="remove"
            placement="bottomRight"
            title={intl.formatMessage({
              id: 'pages.common.remove.confirm.title',
            })}
            description={intl.formatMessage({
              id: 'pages.common.remove.confirm.description',
            })}
            onConfirm={async () => {
              var removeData = new Array(record);
              await handleRemove(removeData);
              actionRef.current?.reloadAndRest?.();
            }}
            okText={intl.formatMessage({
              id: 'pages.common.remove.confirm.ok',
            })}
            cancelText={intl.formatMessage({
              id: 'pages.common.remove.confirm.cancel',
            })}
          >
            <a key="remove">
              <FormattedMessage
                id="pages.common.remove"
              />
            </a>
          </Popconfirm>
        </Access>,
      ],
    },
  ];

  return (
    <PageContainer>
      <Alert
        message={intl.formatMessage({
          id: 'pages.system.user.alert',
        })}
        type="warning"
        closable
        style={{
          marginBottom: "10px",
        }}
      />
      <ProTable<API.SysUserInfo, API.SysUserInfo>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        // toolBarRender={() => [
        // <Access accessible={access.canAction(api.save)}>
        //   <Button
        //     type="primary"
        //     key="primary"
        //     onClick={() => {
        //       handleModalOpen(true);
        //     }}
        //   >
        //     <Icon name="PlusOutlined"/> <FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
        //   </Button>
        //   </Access>,
        // ]}
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
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {(selectedRowsState?.length > 0 && access.canAction(api.remove)) && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen"/>{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项"/>
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.permission.removeCalls.tip"
                />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}
      <SaveForm
        title={intl.formatMessage({
          id: 'pages.common.add',
        })}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.SysUser);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalOpen(false);
        }}
        open={createModalOpen}
        values={{}}
      />
      <SaveForm
        title={intl.formatMessage({
          id: readOnly ? 'pages.common.details' : 'pages.common.update',
        })}
        disabled={readOnly}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          setCurrentRow(undefined);
        }}
        open={updateModalOpen}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default SysUser;
