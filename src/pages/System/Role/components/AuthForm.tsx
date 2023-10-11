import {
  DrawerForm
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Tree } from "antd";


export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.AuthorizeRolePermissionEvent) => void;
  onSubmit: (values: number[]) => Promise<void>;
  open: boolean;
  values: Partial<API.SysRole>;
  title: string;
  treeData: API.SysPermission[];
  checkedKeys: number[];
  onCheckedKeys: any;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();

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
      title={props.values.name + ' - ' + props.title}
      key={props.values.id}
      width={400}
      layout="horizontal"
      {...formItemLayout}
      open={props.open}
      onFinish={props.onSubmit}
      drawerProps={{
        destroyOnClose: true,
        onClose: () => {
          props.onCancel();
        },
      }}
    >
      <Tree
        checkable
        checkStrictly
        defaultExpandAll
        treeData={props.treeData}
        defaultCheckedKeys={props.checkedKeys}
        onCheck={(checkedKeysValue: any) => {
          props.onCheckedKeys(checkedKeysValue.checked);
        }}
        fieldNames={{
          title: "name",
          key: "id",
          children: "children",
        }}
      />
    </DrawerForm>
  );
};

export default UpdateForm;
