import {
  DrawerForm, ProFormDigit,
  ProFormRadio, ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea, ProFormTreeSelect,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useState } from 'react';
import { treePermissions } from "@/services/system/permission";
import DictionaryFormSelect from "@/components/Quan/Dictionary/Select";
import DictionaryProFormRadioGroup from "@/components/Quan/Dictionary/Radio/Group";


export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.SysPermission) => void;
  onSubmit: (values: API.SysPermission) => Promise<void>;
  open: boolean;
  values: Partial<API.SysPermission>;
  title: string;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const [type, setType] = useState<any>(undefined);
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
      width={600}
      layout="horizontal"
      {...formItemLayout}
      open={props.open}
      onFinish={props.onSubmit}
      initialValues={{
        id: props.values.id,
        appType: props.values.appType,
        type: props.values.type,
        parentId: props.values.parentId !== 0 ? props.values.parentId : undefined,
        name: props.values.name,
        title: props.values.title,
        path: props.values.path,
        redirect: props.values.redirect,
        component: props.values.component,
        icon: props.values.icon,
        sort: props.values.sort,
        target: props.values.target,
        flatMenu: props.values.flatMenu,
        hideInMenu: props.values.hideInMenu,
        hideChildrenInMenu: props.values.hideChildrenInMenu,
        description: props.values.description,
        permission: props.values.permission,
      }}
      drawerProps={{
        destroyOnClose: true,
        onClose: () => {
          props.onCancel();
          setType(undefined)
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
                id: 'pages.permission.createForm.id',
              })
            }
            rules={[{
              required: true, message: intl.formatMessage({
                id: 'pages.permission.createForm.name.placeholder',
              })
            }]}
            disabled
          />
        </>
      )}
      <DictionaryFormSelect
        name="appType"
        code="appType"
        width="md"
        disabled
        label={
          intl.formatMessage({
            id: 'pages.permission.createForm.appType',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.permission.createForm.appType.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.permission.createForm.appType.placeholder',
          })
        }]}
      />
      <DictionaryProFormRadioGroup
        name="type"
        code="permissionType"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.permission.createForm.type',
          })
        }
        fieldProps={{
          defaultValue: 0,
          optionType: "button",
          buttonStyle: "solid",
          onChange: ({ target: { value } }) => {
            setType(value)
          }
        }}
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.permission.createForm.type.placeholder',
          })
        }]}
      />
      {(type === undefined ? props.values.type !== 0 : type !== 0) && (
        <>
          <ProFormTreeSelect
            label="上级菜单"
            name="parentId"
            width="md"
            request={async () => {
              const { data } = await treePermissions({
                parentId: 0,
                appType: 'MANAGER_BFF',
                pageSize: -1,
                loadMenu: true,
              })
              return data.records;
            }}
            placeholder="请选择上级菜单"
            rules={[{ required: true, message: '请选择上级菜单' }]}
            fieldProps={{
              showSearch: true,
              allowClear: true,
              treeNodeFilterProp: 'title',
              fieldNames: {
                label: "name",
                value: "id",
                children: "children",
              },
            }}
          />
        </>
      )}
      <ProFormText
        name="name"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.permission.createForm.name',
          })
        }
        tooltip={
          intl.formatMessage({
            id: 'pages.permission.createForm.name.tooltip',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.permission.createForm.name.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.permission.createForm.name.placeholder',
          })
        }]}
      />
      <ProFormText
        name="title"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.permission.createForm.title',
          })
        }
        tooltip={
          intl.formatMessage({
            id: 'pages.permission.createForm.title.tooltip',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.permission.createForm.title.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.permission.createForm.title.placeholder',
          })
        }]}
      />
      <ProFormText
        name="path"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.permission.createForm.path',
          })
        }
        tooltip={
          intl.formatMessage({
            id: 'pages.permission.createForm.path.tooltip',
          })
        }
        placeholder={
          intl.formatMessage({
            id: 'pages.permission.createForm.path.placeholder',
          })
        }
        rules={[{
          required: true, message: intl.formatMessage({
            id: 'pages.permission.createForm.path.placeholder',
          })
        }]}
      />
      {(type === undefined ? props.values.type !== 2 : type !== 2) && (
        <>
          <ProFormText
            name="redirect"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.permission.createForm.redirect',
              })
            }
            tooltip={
              intl.formatMessage({
                id: 'pages.permission.createForm.redirect.tooltip',
              })
            }
            placeholder={
              intl.formatMessage({
                id: 'pages.permission.createForm.redirect.placeholder',
              })
            }
          />
          <ProFormText
            name="component"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.permission.createForm.component',
              })
            }
            tooltip={
              intl.formatMessage({
                id: 'pages.permission.createForm.component.tooltip',
              })
            }
            placeholder={
              intl.formatMessage({
                id: 'pages.permission.createForm.component.placeholder',
              })
            }
          />
          <ProFormText
            name="icon"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.permission.createForm.icon',
              })
            }
            placeholder={
              intl.formatMessage({
                id: 'pages.permission.createForm.icon.placeholder',
              })
            }
          />
          <ProFormDigit
            name="sort"
            width="md"
            min={-9999999}
            max={9999999}
            fieldProps={{
              precision: 0,
              defaultValue: 0,
            }}
            label={
              intl.formatMessage({
                id: 'pages.permission.createForm.sort',
              })
            }
            tooltip={
              intl.formatMessage({
                id: 'pages.permission.createForm.sort.tooltip',
              })
            }
            placeholder={
              intl.formatMessage({
                id: 'pages.permission.createForm.sort.placeholder',
              })
            }
          />
          <DictionaryProFormRadioGroup
            name="target"
            code="target"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.permission.createForm.target',
              })
            }
            fieldProps={{
              defaultValue: "",
              optionType: "button",
            }}
          />
          <ProFormSwitch
            name="flatMenu"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.permission.createForm.flatMenu',
              })
            }
            tooltip={
              intl.formatMessage({
                id: 'pages.permission.createForm.flatMenu.tooltip',
              })
            }
          />
          <ProFormSwitch
            name="hideInMenu"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.permission.createForm.hideInMenu',
              })
            }
            tooltip={
              intl.formatMessage({
                id: 'pages.permission.createForm.hideInMenu.tooltip',
              })
            }
          />
          <ProFormSwitch
            name="hideChildrenInMenu"
            width="md"
            label={
              intl.formatMessage({
                id: 'pages.permission.createForm.hideChildrenInMenu',
              })
            }
            tooltip={
              intl.formatMessage({
                id: 'pages.permission.createForm.hideChildrenInMenu.tooltip',
              })
            }
          />
        </>
      )}
      {(type === undefined ? props.values.type === 2 : type === 2) && (
        <>
          <DictionaryFormSelect
            name="permission"
            width="md"
            code="permission_action_type"
            label={
              intl.formatMessage({
                id: 'pages.permission.createForm.permission',
              })
            }
            placeholder={
              intl.formatMessage({
                id: 'pages.permission.createForm.permission.placeholder',
              })
            }
            rules={[{
              required: true, message: intl.formatMessage({
                id: 'pages.permission.createForm.permission.placeholder',
              })
            }]}
          />
        </>
      )}
      <ProFormTextArea
        name="description"
        width="md"
        label={
          intl.formatMessage({
            id: 'pages.permission.createForm.description',
          })
        }
      />
    </DrawerForm>
  );
};

export default UpdateForm;
