import {
  addPermission,
  permissionDetails,
  removePermission,
  treePermissions,
  updatePermission,
  api,
} from '@/services/system/permission';
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
import { useParams } from 'react-router-dom';
import { refreshGatewayCache, refreshSitemap, api as refreshApi } from "@/services/command/api";
import { useAccess, Access } from 'umi';
import { valueEnum } from "@/components/Quan/Dictionary/Value";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.SysPermission) => {
  const hide = message.loading('正在添加');
  try {
    const { success } = await addPermission({ ...fields });
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
const handleUpdate = async (fields: API.SysPermission) => {
  const hide = message.loading('正在更新');
  try {
    const { success } = await updatePermission({ ...fields });
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
const handleRemove = async (selectedRows: API.SysPermission[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const { success } = await removePermission(
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

const Permission: React.FC = () => {

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

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.SysPermission>();
  const [selectedRowsState, setSelectedRows] = useState<API.SysPermission[]>([]);

  const [permissionType, setPermissionType] = useState<any>({});
  React.useEffect(() => {
    valueEnum("permissionType").then(res => {
      setPermissionType(res);
    });
  }, []);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const access = useAccess();

  const columns: ProColumns<API.SysPermission>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.permission.updateForm.name.nameLabel"
        />
      ),
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
      search: {
        tooltip: <FormattedMessage id="pages.permission.search.name.tip"/>
      },
    },
    {
      title: <FormattedMessage id="pages.permission.title"/>,
      dataIndex: 'title',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.permission.type"/>,
      dataIndex: 'type',
      hideInForm: true,
      valueEnum: permissionType,
      search: false
    },
    {
      title: <FormattedMessage id="pages.permission.icon"/>,
      dataIndex: 'icon',
      search: false,
      render: (val, record) => {
        const { icon } = record
        if (icon) {
          return <Icon name={icon}/>;
        }
      },
    },
    {
      title: <FormattedMessage id="pages.permission.sort"/>,
      dataIndex: 'sort',
      tooltip: <FormattedMessage id="pages.permission.sort.tip"/>,
      search: false
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating"/>,
      dataIndex: 'option',
      valueType: 'option',
      hideInTable: !access.canActions([api.update, api.remove]),
      render: (_, record) => [
        <Access accessible={access.canAction(api.update)}>
          <a
            key="update"
            onClick={async () => {
              const { data } = await permissionDetails({
                id: record.id,
              })
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
      <ProTable<API.SysPermission, API.TreePermissionParams>
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
          <Access accessible={access.canAction(refreshApi.refreshGatewayCache)}>
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                refreshGatewayCache().then(r => message.success("刷新成功"));
              }}
            >
              <FormattedMessage id="pages.system.command.refresh.gatewayCache" defaultMessage="Refresh"/>
            </Button>
          </Access>,
          <Access accessible={access.canAction(refreshApi.refreshSitemap)}>
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                refreshSitemap().then(r => message.success("刷新成功"));
              }}
            >
              <FormattedMessage id="pages.system.command.refresh.sitemap" defaultMessage="Refresh"/>
            </Button>
          </Access>,
        ]}
        params={{
          parentId: 0,
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
          const msg = await treePermissions(params);
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
          id: 'pages.permission.createForm.add',
        })}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.SysPermission);
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
          type: 0,
          sort: 0,
          appType: getAppType()
        }}
      />
      <SaveForm
        title={intl.formatMessage({
          id: 'pages.permission.createForm.update',
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
          <ProDescriptions<API.SysPermission>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.SysPermission>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Permission;
