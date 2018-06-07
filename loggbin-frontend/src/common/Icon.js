import React from 'react';
import './common.css';
import edit from '../Assets/svg/edit.svg';
import repeat from '../Assets/svg/repeat.svg';
import garbage from '../Assets/svg/garbage-2.svg';
import settings from '../Assets/svg/settings-5.svg';
import users from '../Assets/svg/users-1.svg';
import clock from '../Assets/svg/clock-1.svg';
import search from '../Assets/svg/search.svg';
import x from '../Assets/svg/multiply.svg';
import Isvg from 'react-inlinesvg';
import cloud from '../Assets/svg/cloud-computing.svg';
import plus from '../Assets/svg/add-2.svg'
var classNames = require('classnames');
let iconMap = {
  pencil: edit,
  search,
  add:plus,
  x,
  resend: repeat,
  garbage,
  settings,
  users,
  clock,
  cloud
};

let Icon = props => {
  let { color, icon, ...rest } = props;
  return (
    <div {...rest} className="icon">
      <Isvg
        className={classNames({
          orgFill: color === 'orange',
          whiteFill: color === 'white',
          blueFill: color === 'blue',
          yellowFill: color === 'yellow',
          greenFill: color === 'green',
          redFill: color === 'red'
        })}
        src={iconMap[icon]}
      >
        {' '}
        <img
          {...rest}
          className={classNames({
            orgFill: color === 'orange',
            white: color === 'white',
            blue: color === 'blue',
            yellowFill: color === 'yellow',
            greenFill: color === 'green',
            redFill: color === 'red'
          })}
          src={iconMap[icon]}
          alt=""
        />
      </Isvg>
    </div>
  );
};

export default Icon;
