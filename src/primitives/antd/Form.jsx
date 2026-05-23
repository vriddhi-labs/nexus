import React from 'react';
import { Form as AntForm } from 'antd';

export const Form = (props) => {
  return <AntForm {...props} />;
};

export const FormItem = (props) => {
  return <AntForm.Item {...props} />;
};
