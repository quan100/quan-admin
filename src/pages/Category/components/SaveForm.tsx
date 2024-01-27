import {
  DrawerForm, ProFormDigit, ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useRef } from "react";
import DictionaryFormSelect from "@/components/Quan/Dictionary/Select";

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.ArticleCategory) => void;
  onSubmit: (values: API.ArticleCategory) => Promise<void>;
  open: boolean;
  values: Partial<API.ArticleCategory>;
  title: string;
  disabled?: boolean;
};

const UpdateForm: React.FC<UpdateFormProps> = ({ disabled = false, ...props }) => {
  const intl = useIntl();
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
      width={'40%'}
      layout="horizontal"
      {...formItemLayout}
      open={props.open}
      onFinish={props.onSubmit}
      submitter={!disabled}
      initialValues={{
        id: props.values.id,
        categoryId: props.values.categoryId,
        type: props.values.type,
        name: props.values.name,
        color: props.values.color,
        sort: props.values.sort,
      }}
      drawerProps={{
        destroyOnClose: true,
        onClose: () => {
          props.onCancel();
        },
      }}
    >
      {props.values.id && (
        <>
          <ProFormText
            name="id"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.common.id',
              })
            }
            rules={[{
              required: true, message: intl.formatMessage({
                id: 'pages.common.id.placeholder',
              })
            }]}
            disabled
          />
          <ProFormText
            name="categoryId"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.category.categoryId',
              })
            }
            placeholder={
              intl.formatMessage({
                id: 'pages.category.categoryId.placeholder',
              })
            }
            tooltip={
              intl.formatMessage({
                id: 'pages.category.categoryId.tooltip',
              })
            }
            disabled
          />
        </>
      )}
      <ProFormText
        name="name"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.category.name',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.category.name.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.category.name.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <DictionaryFormSelect
        name="type"
        width="md"
        code="article_category_type"
        label={
          intl.formatMessage({
            id: 'pages.category.type',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.category.type.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.category.type.placeholder',
          })
        }]}
        disabled={disabled}
      />
      <ProFormText
        name="color"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.category.color',
          })
        }
        tooltip={
          intl.formatMessage({
            id: 'pages.category.color.tooltip',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.category.color.placeholder',
          })
        }
        disabled={disabled}
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
    </DrawerForm>
  );
};

export default UpdateForm;
