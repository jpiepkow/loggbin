import React, { Component } from 'react';
import './header.css';
import LoggbinLogo from '../common/LogglitLogo';
import Icon from '../common/Icon';
class Header extends Component {
  render() {
    return (
      <div className="headerCont">
        <div className="headerRight">
          <LoggbinLogo style={{width:'175px',marginTop:'10px'}} full={true}/>
        </div>

      </div>
    );
  }
}

export default Header;
