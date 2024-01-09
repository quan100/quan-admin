import {
  DrawerForm, ProFormDigit, ProFormInstance,
  ProFormRadio,
  ProFormText, ProFormTextArea,
  ProCard,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useRef, useState } from "react";
import {
  LinkOutlined,
} from '@ant-design/icons';
import ProFormImageUpload from "@/components/Quan/Upload/ProFormImageUpload";
import 'md-editor-rt/lib/style.css';
import ProFormMdEditor from "@/components/Quan/ProFormMdEditor";
import CategoryProFormSelect from "@/components/Quan/Category/Select";
import TagProFormSelect from "@/components/Quan/Tag/Select";
import {
  api
} from '@/services/file/api';

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.Article) => void;
  onSubmit: (values: API.Article) => Promise<void>;
  open: boolean;
  values: Partial<API.Article>;
  title: string;
  disabled?: boolean;
};

const UpdateForm: React.FC<UpdateFormProps> = ({ disabled = false, ...props }) => {
  const intl = useIntl();
  const [type, setType] = useState<any>(undefined);
  const formRef = useRef<ProFormInstance>();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  return (
    <DrawerForm
      title={props.title}
      key={props.values.id}
      formRef={formRef}
      width={1200}
      layout="horizontal"
      {...formItemLayout}
      open={props.open}
      onFinish={props.onSubmit}
      submitter={!disabled}
      initialValues={{
        id: props.values.id,
        title: props.values.title,
        author: props.values.author,
        authorUrl: props.values.authorUrl,
        type: props.values.type,
        publishType: props.values.publishType,
        source: props.values.source,
        sourceUrl: props.values.sourceUrl,
        avatar: props.values.avatar,
        cover: props.values.cover,
        authorAccounts: props.values.authorAccounts,
        authorAccountsPublic: props.values.authorAccountsPublic,
        remarks: props.values.remarks,
        jumpUrl: props.values.jumpUrl,
        jumpType: props.values.jumpType,
        sort: props.values.sort,
        status: props.values.status,
        briefContent: props.values.briefContent,
        content: props.values.content,
        categoryId: props.values.categoryId,
        tagIdList: props.values.tagIdList,
        topping: props.values.topping,
      }}
      drawerProps={{
        destroyOnClose: true,
        onClose: () => {
          props.onCancel();
        },
      }}
    >
      <ProCard
        style={{ marginBlockStart: 8 }}
        gutter={8}
        title={
          intl.formatMessage({ id: 'pages.article.card.content.title', })
        }
        headerBordered
      >
        <ProCard>
          <ProFormMdEditor
            name="content"
            language={intl.locale}
            initialValues={props.values.content}
            required={true}
            message={intl.formatMessage({
              id: 'pages.article.content.placeholder',
            })}
            formRef={formRef}
            disabled={disabled}
          />
        </ProCard>
      </ProCard>
      <ProCard
        style={{ marginBlockStart: 8 }}
        gutter={8}
        title={
          intl.formatMessage({ id: 'pages.article.card.params.title', })
        }
        headerBordered
      >
        <ProCard>
          {props.values.id && (
            <>
              <ProFormText
                name="id"
                width="md"
                label={
                  intl.formatMessage({ id: 'pages.common.id', })
                }
                rules={[{
                  required: true,
                  message: intl.formatMessage({ id: 'pages.common.id.placeholder', })
                }]}
                disabled
              />
            </>
          )}
          <ProFormText
            name="title"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.title', })
            }
            placeholder={
              intl.formatMessage({ id: 'pages.article.title.placeholder', })
            }
            rules={[{
              required: true,
              message: intl.formatMessage({ id: 'pages.article.title.placeholder', })
            }]}
            disabled={disabled}
          />
          <CategoryProFormSelect
            name="categoryId"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.common.category', })
            }
            placeholder={
              intl.formatMessage({ id: 'pages.common.category.placeholder', })
            }
            rules={[{
              required: true,
              message: intl.formatMessage({ id: 'pages.common.category.placeholder', })
            }]}
            disabled={disabled}
          />
          <TagProFormSelect
            name="tagIdList"
            width="md"
            mode={"multiple"}
            label={
              intl.formatMessage({ id: 'pages.common.tag', })
            }
            placeholder={
              intl.formatMessage({ id: 'pages.common.tag.placeholder', })
            }
            rules={[{
              required: true,
              message: intl.formatMessage({ id: 'pages.common.tag.placeholder', })
            }]}
            disabled={disabled}
          />
          <ProFormImageUpload
            name="cover"
            label={
              intl.formatMessage({ id: 'pages.article.cover', })
            }
            disabled={disabled}
            action={api.upload}
          />
          <ProFormTextArea
            name="briefContent"
            label={
              intl.formatMessage({ id: 'pages.article.briefContent', })
            }
            placeholder={
              intl.formatMessage({ id: 'pages.article.briefContent.placeholder', })
            }
            rules={[{
              required: true,
              message: intl.formatMessage({ id: 'pages.article.briefContent.placeholder', })
            }]}
            disabled={disabled}
            fieldProps={{
              showCount: true,
              maxLength: 256,
            }}
          />
          <ProFormRadio.Group
            name="publishType"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.publishType', })
            }
            fieldProps={{
              defaultValue: 1,
              optionType: "button",
              buttonStyle: "solid",
              onChange: ({ target: { value } }) => {
                setType(value)
              }
            }}
            options={[
              {
                label: intl.formatMessage({ id: 'pages.article.publishType.1', }),
                value: 1,
              },
              {
                label: intl.formatMessage({ id: 'pages.article.publishType.2', }),
                value: 2,
              },
              {
                label: intl.formatMessage({ id: 'pages.article.publishType.3', }),
                value: 3,
              },
            ]}
            rules={[{
              required: true,
              message: intl.formatMessage({ id: 'pages.article.publishType.placeholder', })
            }]}
            disabled={disabled}
          />
          <ProFormText
            name="jumpType"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.jumpType', })
            }
            disabled={disabled}
          />
          <ProFormText
            name="jumpUrl"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.jumpUrl', })
            }
            disabled={disabled}
            fieldProps={{
              prefix: <LinkOutlined/>,
            }}
          />
          <ProFormDigit
            name="sort"
            width="xs"
            min={-9999999}
            max={9999999}
            fieldProps={{
              precision: 0,
              defaultValue: 0,
            }}
            label={
              intl.formatMessage({ id: 'pages.common.sort', })
            }
            tooltip={
              intl.formatMessage({ id: 'pages.common.sort.tooltip', })
            }
            placeholder={
              intl.formatMessage({ id: 'pages.common.sort.placeholder', })
            }
            disabled={disabled}
          />
          <ProFormRadio.Group
            name="topping"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.topping.label', })
            }
            tooltip={
              intl.formatMessage({ id: 'pages.article.topping.tooltip', })
            }
            fieldProps={{
              defaultValue: 0,
              optionType: "button",
              buttonStyle: "solid",
              // onChange: ({ target: { value } }) => {
              // }
            }}
            options={[
              {
                label: intl.formatMessage({
                  id: 'pages.common.boolean.false',
                }),
                value: false,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.common.boolean.true',
                }),
                value: true,
              },
            ]}
            disabled={disabled}
          />
          <ProFormRadio.Group
            name="status"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.status', })
            }
            fieldProps={{
              defaultValue: 0,
              optionType: "button",
              buttonStyle: "solid",
              onChange: ({ target: { value } }) => {
                setType(value)
              }
            }}
            options={[
              {
                label: intl.formatMessage({ id: 'pages.article.status.0', }),
                value: 0,
              },
              {
                label: intl.formatMessage({ id: 'pages.article.status.1', }),
                value: 1,
              },
              {
                label: intl.formatMessage({ id: 'pages.article.status.2', }),
                value: 2,
              },
            ]}
            rules={[{
              required: true,
              message: intl.formatMessage({ id: 'pages.article.status.placeholder', })
            }]}
            disabled={disabled}
          />
          <ProFormTextArea
            name="remarks"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.remarks', })
            }
            placeholder={
              intl.formatMessage({ id: 'pages.article.remarks.placeholder', })
            }
            disabled={disabled}
            fieldProps={{
              showCount: true,
              maxLength: 200,
            }}
          />
        </ProCard>
        <ProCard>
          <ProFormText
            name="author"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.author', })
            }
            placeholder={
              intl.formatMessage({ id: 'pages.article.author.placeholder', })
            }
            rules={[{
              required: true,
              message: intl.formatMessage({ id: 'pages.article.author.placeholder', })
            }]}
            disabled={disabled}
          />
          <ProFormText
            name="avatar"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.avatar', })
            }
            disabled={disabled}
            fieldProps={{
              prefix: <LinkOutlined/>,
            }}
          />
          <ProFormText
            name="authorUrl"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.authorUrl', })
            }
            disabled={disabled}
            fieldProps={{
              prefix: <LinkOutlined/>,
            }}
          />
          <ProFormText
            name="authorAccounts"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.authorAccounts', })
            }
            disabled={disabled}
          />
          <ProFormRadio.Group
            name="authorAccountsPublic"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.authorAccountsPublic', })
            }
            tooltip={
              intl.formatMessage({ id: 'pages.article.authorAccountsPublic.tooltip', })
            }
            fieldProps={{
              defaultValue: 0,
              optionType: "button",
              buttonStyle: "solid",
              // onChange: ({ target: { value } }) => {
              // }
            }}
            options={[
              {
                label: intl.formatMessage({
                  id: 'pages.common.boolean.false',
                }),
                value: false,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.common.boolean.true',
                }),
                value: true,
              },
            ]}
            rules={[{
              required: true,
              message: intl.formatMessage({ id: 'pages.article.authorAccountsPublic.placeholder', })
            }]}
            disabled={disabled}
          />
          <ProFormRadio.Group
            name="type"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.type', })
            }
            fieldProps={{
              defaultValue: 1,
              optionType: "button",
              buttonStyle: "solid",
              onChange: ({ target: { value } }) => {
                setType(value)
              }
            }}
            options={[
              {
                label: intl.formatMessage({ id: 'pages.article.type.1', }),
                value: 1,
              },
              {
                label: intl.formatMessage({ id: 'pages.article.type.2', }),
                value: 2,
              },
              {
                label: intl.formatMessage({ id: 'pages.article.type.3', }),
                value: 3,
              },
            ]}
            rules={[{
              required: true,
              message: intl.formatMessage({ id: 'pages.article.type.placeholder', })
            }]}
            disabled={disabled}
          />
          <ProFormText
            name="source"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.source', })
            }
            placeholder={
              intl.formatMessage({ id: 'pages.article.source.placeholder', })
            }
            rules={[{
              required: type && type !== 1,
              message: intl.formatMessage({ id: 'pages.article.source.placeholder', })
            }]}
            disabled={disabled}
          />
          <ProFormText
            name="sourceUrl"
            width="md"
            label={
              intl.formatMessage({ id: 'pages.article.sourceUrl', })
            }
            placeholder={
              intl.formatMessage({ id: 'pages.article.sourceUrl.placeholder', })
            }
            rules={[{
              required: type && type !== 1,
              message: intl.formatMessage({ id: 'pages.article.sourceUrl.placeholder', })
            }]}
            disabled={disabled}
            fieldProps={{
              prefix: <LinkOutlined/>,
            }}
          />
        </ProCard>
      </ProCard>
    </DrawerForm>
  );
};

export default UpdateForm;
