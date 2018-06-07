import React, { Component } from 'react';
import './mainContent.css';
import { observer } from 'mobx-react';
import Icon from '../common/Icon';
import Info from './Info';
import {withRouter} from "react-router-dom";
class MainContent extends Component {
  componentDidMount() {
    this.props.store.connectSocket(this.props.bin,this.props.history)
  }
  render() {
    var arr = this.props.store.filtered === true ? this.props.store.filteredLog : this.props.store.log
    var data = arr.map(x => {
      return(
        <div className="wrap">
        <div className="colorBall">
          <div className="circleGroup" onClick={() => {this.props.store.toggleFilter(x.groupId)}}  style={{backgroundColor:`#${x.hex || 'FFF'}`}}></div>
        </div>
        <div className={`row ${x.type}`}>
        <p className={`${x.type}-text`}>{x.data}</p>
        </div>
        </div>
        )
    })
    return (
      <div className="mainC">
        
          {data.length === 0 ?
            <Info url={this.props.bin}/>
            :
            <div className="flex-full">
            {data}
            </div>
          }
      </div>
    );
  }
}

export default withRouter(observer(MainContent));
