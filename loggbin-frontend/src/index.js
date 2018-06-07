import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main/Main';
import Landing from './Main/Landing';
import Header from './Header/Header';
import { Provider } from "mobx-react";
import Store from './Store';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import Notifications from 'react-notify-toast-fix';

const PrimaryLayout = (props) => (
  <div className="primary-layout">
  <Notifications/>
    <Header/>
    <main>
      <Route Store={props.Store} path="/:bin" exact render={(p) => (<Main router={p} Store={props.Store}/>)} />
      <Route Store={props.Store}  path="/" exact render={(p) => (<Landing router={p} Store={props.Store}/>)}/>
    </main>
  </div>
)

const App = () => (
  <BrowserRouter>
    <PrimaryLayout Store={Store} />
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
