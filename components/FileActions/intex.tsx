import React from 'react';
import styles from './FileActions.module.scss';
import { Button, Popconfirm } from 'antd';

interface FileActionsProps {
  onClickRemove: VoidFunction;
  isActive?: boolean;
}

export const FileActions: React.FC<FileActionsProps> = ({
  onClickRemove,
  isActive,
}) => {
  return (
    <div className={styles.root}>
      <Popconfirm
        title="Удалить файл(ы)?"
        description="Все файлы будут перемещены в корзину"
        okText="Да"
        cancelText="Нет"
        disabled={!isActive}
        onConfirm={onClickRemove}
      >
        <Button disabled={!isActive} type="primary" danger>
          Удалить
        </Button>
      </Popconfirm>
    </div>
  );
};
