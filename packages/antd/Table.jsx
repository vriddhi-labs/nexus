import React from 'react';
import { Table as AntTable, ConfigProvider, theme as antdTheme } from 'antd';
import { useNexusTheme } from '@nexus-ui/primitives';

export const Table = ({ data = [], columns = [] }) => {
  const { theme } = useNexusTheme();

  // Normalize column configurations for AntD
  const antdColumns = columns.map(col => ({
    ...col,
    dataIndex: col.dataIndex || col.key,
    key: col.key,
  }));

  // Ensure data records have keys
  const antdData = data.map((item, idx) => ({
    ...item,
    key: item.id || item.key || idx.toString(),
  }));

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
        }
      }}
    >
      <AntTable 
        dataSource={antdData} 
        columns={antdColumns} 
        pagination={false}
        bordered={false}
        className="w-full"
      />
    </ConfigProvider>
  );
};
