import React, { Component } from 'react';
import './main.css';
import {withRouter} from "react-router-dom";
import Button from '../common/Button'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {isExpand:false};
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({isExpand:!this.state.isExpand})
  }
  render() {
    console.log(this.props)
    return (<div className="landing">
      <div className="head">
        <h1>Stream Application Logs</h1>
      </div>
      
      <div className="head">
        <p>LoggBin gives you a URL that you can use to stream log data to and inspect in real time.
        LoggBin was created to help view log data during development in places where the current solution is not acceptable or does not exist.
        </p>
      </div>
      <div className="head-virt">
        <p>Bins only last for 48 hours.</p>
        <p>(I make no guarantee that bins won't be removed before 48 hours.)</p>
        <p>No log data is stored and is only streamed.</p>
        <p>Anyone can view your bin by visiting the url so use accordingly.</p>
        <p><b>Only use for development!</b></p>
      </div>
      <div className="head">
      <Button Text="Create Bin" onClick={() => {this.props.Store.createBin(this.props.history)}} style={{height:'40px',width:'150px'}}/>
      </div>
    </div>)
  }
}

export default withRouter(Main);
