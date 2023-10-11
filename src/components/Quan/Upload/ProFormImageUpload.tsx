import React, { useState } from 'react';
import { ProFormUploadButton } from "@ant-design/pro-components";
import { Rule } from "rc-field-form/lib/interface";
import { PlusOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { RcFile, UploadProps } from "antd/es/upload";
import { UploadFile } from "antd/es/upload/interface";
import { LabelTooltipType } from "antd/es/form/FormItemLabel";


export type FormProps = {
  name: string;
  label?: React.ReactNode;
  placeholder?: string | string[];
  rules?: Rule[];
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  disabled?: boolean;
  tooltip?: LabelTooltipType;
  action: string;
};

const ProFormImageUpload: React.FC<FormProps> = (props) => {

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  // 请求头设置
  const token = localStorage.getItem("AUTHORIZATION_TOKEN");
  const headers = {
    Authorization: token ?? '',
  };

  return (
    <>
      <ProFormUploadButton
        width={props.width}
        name={props.name}
        label={props.label}
        action={props.action}
        max={1}
        icon={<PlusOutlined/>}
        disabled={props.disabled}
        value={fileList}
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        accept="image/*"
        fieldProps={{
          onPreview: handlePreview,
          headers: headers,
        }}
        transform={(value) => {
          if (fileList.length === 0) {
            if (value !== '' && value.length > 0) {
              const uploadFile: UploadFile = {
                uid: value,
                name: value,
                url: value,
              };
              setFileList([uploadFile]);
            }
          } else {
            return value[0].response?.data?.url;
          }
        }}
      />
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img style={{ width: '100%' }} src={previewImage}/>
      </Modal>
    </>
  );
}

export default ProFormImageUpload;
