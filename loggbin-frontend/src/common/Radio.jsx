import React from 'react';
import './common.css';

let Radio = props => {
  const { Items, ...rest } = props;
  return (
    <div className="radio-flex" {...rest}>
      {props.Items.map((x, index) => {
        return (
          <p key={index}>
            <input
              type="radio"
              id={`${x.name}-radio`}
              value={x.value}
              name="radio-group"
            />
            <label className="font" htmlFor={`${x.name}-radio`}>{x.name}</label>
          </p>
        );
      })}
    </div>
  );
};

export default Radio;
