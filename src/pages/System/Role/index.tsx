import {
  page,
  update,
  save,
  remove, rolePermissionIds, authorizeRolePermission, api
} from '@/services/system/role';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
  ActionType, ProColumns, ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import SaveForm from './components/SaveForm';
import Icon from "@/components/Quan/Icon";
import AuthForm from "@/pages/System/Role/components/AuthForm";
import { treePermissions } from "@/services/system/permission";
import { useParams } from 'react-router-dom';
import { useAccess, Access } from 'umi';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.SysRole) => {
  const hide = message.loading('正在添加');
  try {
    const { success } = await save({ ...fields });
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
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.SysRole) => {
  const hide = message.loading('正在更新');
  try {
    const { success } = await update({ ...fields });
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
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.SysRole[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const { success } = await remove(
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

/**
 * @en-US Update node
 * @zh-CN 角色授权
 *
 * @param fields
 */
const handleAuthorizeRolePermission = async (fields: API.AuthorizeRolePermissionEvent) => {
  const hide = message.loading('正在授权');
  try {
    const { success } = await authorizeRolePermission({ ...fields });
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

const Role: React.FC = () => {

  const { appType } = useParams();
  const getAppType = function () {
    return appType?.toUpperCase().concat('_BFF');
  }

  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  /**
   * @zh-CN 授权窗口的弹窗
   * */
  const [authModalOpen, handleAuthModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.SysRole>();
  const [selectedRowsState, setSelectedRows] = useState<API.SysRole[]>([]);

  const [permissions, setPermissions] = React.useState([]);
  const handleAuth = () => {
    treePermissions({
      parentId: 0,
      appType: getAppType(),
      pageSize: -1,
      loadMenu: false,
    }).then(res => {
      const { data } = res;
      setPermissions(data.records)
    })
  };
  React.useEffect(handleAuth, [])

  const [checkedKeys, setCheckedKeys] = useState<number[]>();
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const access = useAccess();

  const columns: ProColumns<API.SysRole>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.role.column.name"
        />
      ),
      dataIndex: 'name',
    },
    {
      title: <FormattedMessage id="pages.role.column.code"/>,
      dataIndex: 'code',
    },
    {
      title: <FormattedMessage id="pages.role.column.status"/>,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage
              id="pages.role.column.status.enabled"
            />
          ),
          status: 'Processing',
        },
        1: {
          text: (
            <FormattedMessage id="pages.role.column.status.disabled"/>
          ),
          color: 'red',
        },
      },
      // search: false
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating"/>,
      dataIndex: 'option',
      valueType: 'option',
      hideInTable: !access.canActions([api.authorizeRolePermission, api.update, api.remove]),
      render: (_, record) => [
        <Access accessible={access.canAction(api.authorizeRolePermission)}>
          <a
            key="auth"
            onClick={async () => {
              const { data } = await rolePermissionIds({
                id: record.id,
              })
              setCurrentRow(record);
              setCheckedKeys(data)
              handleAuthModalOpen(true);
            }}
          >
            <FormattedMessage id="pages.role.auth"/>
          </a>
        </Access>,
        <Access accessible={access.canAction(api.update)}>
          <a
            key="update"
            onClick={() => {
              setCurrentRow(record);
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
      <ProTable<API.SysRole, API.SysRoleQuery>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Access accessible={access.canAction(api.save)}>
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalOpen(true);
              }}
            >
              <Icon name="PlusOutlined"/> <FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
            </Button>
          </Access>,
        ]}
        params={{
          appType: getAppType(),
        }}
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
          const success = await handleAdd(value as API.SysRole);
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
        values={{
          status: 0,
          appType: getAppType(),
        }}
      />
      <SaveForm
        title={intl.formatMessage({
          id: 'pages.common.update',
        })}
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
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        open={updateModalOpen}
        values={currentRow || {}}
      />

      <AuthForm
        title={intl.formatMessage({
          id: 'pages.role.auth',
        })}
        treeData={permissions}
        checkedKeys={checkedKeys || []}
        onCheckedKeys={setCheckedKeys}
        onSubmit={async (value) => {
          const success = await handleAuthorizeRolePermission({
            roleId: currentRow?.id,
            permissionIdList: checkedKeys,
          });
          if (success) {
            handleAuthModalOpen(false);
            setCurrentRow(undefined);
          }
        }}
        onCancel={() => {
          handleAuthModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        open={authModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.SysRole>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.SysRole>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Role;
