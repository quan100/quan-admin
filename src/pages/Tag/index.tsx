import {
  page,
  details,
  update,
  save,
  remove,
  api,
} from '@/services/article/tag';
import {
  FooterToolbar,
  PageContainer,
  ProTable,
  ActionType, ProColumns,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message, Popconfirm, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import SaveForm from './components/SaveForm';
import Icon from "@/components/Quan/Icon";
import { valueEnum } from "@/components/Quan/Dictionary/Value";
import { useAccess, Access } from 'umi';

/**
 * @en-US Add
 * @zh-CN 添加
 * @param fields
 */
const handleAdd = async (fields: API.ArticleTag) => {
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
 * @en-US Update
 * @zh-CN 更新
 *
 * @param fields
 */
const handleUpdate = async (fields: API.ArticleTag) => {
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
 *  Delete
 * @zh-CN 删除
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.ArticleTag[]) => {
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

const Role: React.FC = () => {

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
  const [currentRow, setCurrentRow] = useState<API.ArticleTag>();
  const [selectedRowsState, setSelectedRows] = useState<API.ArticleTag[]>([]);
  const [readOnly, setReadOnly] = useState<boolean>(false);

  const [tagType, setTagType] = useState<any>({});
  React.useEffect(() => {
    valueEnum("article_tag_type").then(res => {
      setTagType(res);
    });
  }, []);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const access = useAccess();

  const columns: ProColumns<API.ArticleTag>[] = [
    {
      title: <FormattedMessage id="pages.common.id"/>,
      dataIndex: 'id',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.tag.tagId"/>,
      dataIndex: 'tagId',
    },
    {
      title: <FormattedMessage id="pages.tag.name"/>,
      dataIndex: 'name',
      renderText: (val: string, record) => (
        <Tag color={record.color} bordered={false}>{val}</Tag>
      ),
    },
    {
      title: <FormattedMessage id="pages.tag.type"/>,
      dataIndex: 'type',
      valueEnum: tagType,
    },
    {
      title: <FormattedMessage id="pages.tag.color"/>,
      dataIndex: 'color',
      renderText: (val: string) => (
        val ? <Tag color={val} bordered={false}>{val}</Tag> : val
      ),
      search: false,
    },
    {
      title: <FormattedMessage id="pages.common.sort"/>,
      dataIndex: 'sort',
      tooltip: <FormattedMessage id="pages.common.sort.tooltip"/>,
      search: false
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
              const { data } = await details({
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
              const { data } = await details({
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
      <ProTable<API.ArticleTag, API.ArticleTag>
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
          const success = await handleAdd(value as API.ArticleTag);
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
          type: 1,
        }}
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

export default Role;
