import React from 'react';
import './common.css';

let Select = props => {
  const { Items, ...rest } = props;
  return (
    <div className="dropdown">
      <select className="select" {...rest}>
        {Items.map((x, index) => {
          return <option key={index} value={x.value}>{x.name}</option>;
        })}
      </select>
    </div>
  );
};

export default Select;
