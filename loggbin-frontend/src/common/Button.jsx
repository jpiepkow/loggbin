import React from 'react';
import Icon from './Icon';
import './common.css';
let Button = props => {
  let { Text, ...rest } = props;
  return <button {...rest} className="button">{Text}<Icon icon="add" color="white" style={{width:'20px'}}/></button>;
};

export default Button;
