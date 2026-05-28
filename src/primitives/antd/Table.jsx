import React from 'react';
import { Table as AntTable } from 'antd';

export const Table = ({ data = [], columns = [], variant = 'antd' }) => {
  return (
    <AntTable 
      dataSource={data} 
      columns={columns} 
      rowKey={(record) => record.id || record.key || Math.random().toString()} 
    />
  );
};
