import React from 'react';
import { FileItem } from '@/api/dto/files.dto';
import { FileList, FileSelectType } from '@/components/FileList';
import { Empty } from 'antd';

import * as Api from '@/api';
import { FileActions } from '@/components/FileActions/intex';

interface FilesProps {
  items: FileItem[];
  withActions?: boolean;
}

export const Files: React.FC<FilesProps> = ({ items, withActions }) => {
  const [files, setFiles] = React.useState(items || []);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === 'select') {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== id));
    }
  };

  const onClickRemove = () => {
    setSelectedIds([]);
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
    Api.files.remove(selectedIds);
  };

  return (
    <div>
      {files.length ? (
        <>
          {withActions && (
            <FileActions
              onClickRemove={onClickRemove}
              isActive={selectedIds.length > 0}
            />
          )}
          <FileList items={files} onFileSelect={onFileSelect} />
        </>
      ) : (
        <Empty className="empty-block" description="Список файлов пуст" />
      )}
    </div>
  );
};
