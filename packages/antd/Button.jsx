import React from 'react';
import { Button as AntButton, ConfigProvider, theme as antdTheme } from 'antd';
import { useNexusTheme } from '@nexus-ui/primitives';

const variantMap = {
  primary: 'primary',
  secondary: 'default',
  danger: 'primary',
};

export const Button = ({ children, onClick, variant = 'primary', size = 'medium' }) => {
  const { theme } = useNexusTheme();
  const antdSize = size === 'medium' ? 'middle' : size;
  const isDanger = variant === 'danger';

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff', // Official AntD Blue
          borderRadius: 6,
        }
      }}
    >
      <AntButton 
        onClick={onClick} 
        type={variantMap[variant] || 'default'} 
        size={antdSize}
        danger={isDanger}
      >
        {children}
      </AntButton>
    </ConfigProvider>
  );
};
