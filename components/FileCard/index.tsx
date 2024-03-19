import React from 'react';
import styles from './FileCard.module.scss';
import { getExtensionFile } from '@/utils/getExtensionFile';
import { isImage } from '@/utils/isImage';
import { getColorByExtension } from '@/utils/getColorByExtension';
import { FileTextOutlined } from '@ant-design/icons';

const UPLOADS_URL = 'http://localhost:7777/uploads/';

interface FileCardProps {
  filename: string;
  originalName: string;
}

export const FileCard: React.FC<FileCardProps> = ({
  originalName,
  filename,
}) => {
  const ext = getExtensionFile(filename);
  const imageUrl = ext && isImage(ext) ? `${UPLOADS_URL}${filename}` : '';

  const color = getColorByExtension(ext);
  const classColor = styles[color];

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className={classColor}>{ext}</i>
        {imageUrl ? (
          <img className={styles.image} src={imageUrl} alt="File" />
        ) : (
          <FileTextOutlined rev={undefined} />
        )}
      </div>
      <span>{originalName}</span>
    </div>
  );
};
