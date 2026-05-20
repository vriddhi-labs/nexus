import React from 'react';
import { Button as AntButton } from 'antd';

const variantMap = {
  primary: 'primary',
  secondary: 'default',
  danger: 'primary', // AntD uses danger as a sub-property status flag
};

export const Button = ({ children, onClick, variant = 'primary', size = 'medium' }) => {
  const antdSize = size === 'medium' ? 'middle' : size; // 'small' -> 'small', 'large' -> 'large'
  const isDanger = variant === 'danger';

  return (
    <AntButton 
      onClick={onClick} 
      type={variantMap[variant] || 'default'} 
      size={antdSize}
      danger={isDanger}
    >
      {children}
    </AntButton>
  );
};
