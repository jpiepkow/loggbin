import React, { Component } from 'react';
import './main.css';
import MainContent from '../MainContent/MainContent'

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
    return <MainContent bin={this.props.router.match.params.bin} store={this.props.Store}/>
  }
}

export default Main;
