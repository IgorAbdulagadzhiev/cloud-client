import React from 'react';
import styles from '@/styles/Home.module.scss';
import { Button, Upload, UploadFile, notification } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

import * as Api from '@/api';

export const UploadButton: React.FC = () => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const onUploadSuccess = async (options) => {
    try {
      const file = await Api.files.uploadFile(options);

      setFileList([]);
    } catch (err) {
      notification.error({
        message: 'Ошибка!',
        description: 'Не удалось загрузить файл',
        duration: 2,
      });
    }
  };

  return (
    <Upload
      className={styles.upload}
      customRequest={onUploadSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
    >
      <Button type="primary" icon={<CloudUploadOutlined />} size="large">
        Загрузить файл
      </Button>
    </Upload>
  );
};
