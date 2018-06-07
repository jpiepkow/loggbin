import React, { Component } from 'react';
import './mainContent.css';
import { observer } from 'mobx-react';
var Info = (props) => {
  var jsText = `
  const request = require('request');
  let reqObj = {
    url:'https://api.loggb.in/r/${props.url}'
    method:'POST',
    json: {
      s:'your stringified log data here',
      type:'log',
      groupId:'id to group logs by'
    }
    //type log/warn/error/info default:log
    //groupId id to group logs by. default: null 
    request(reqObj,(error,body,response) => {
      console.log(error,body,response)})
  }`
  var clientText = `
  const loggbin = require('loggbin')
  console = loggbin(${props.url},'groupId'/*optional*/)
  `
  var curl = `
  curl -X POST 
  https://api.loggb.in/r/${props.url} 
  -H 'content-type: application/json' 
  -d '{
  "s":"this is a log",
  "type":"info",
  "groupId":"002f2f"
  }'
  `
return (
  <div className="flex-wrap-center">
  <div className="info-flex">
  <p>Bin URL</p>
  <p className="big">{`https://loggb.in/${props.url}`}</p>
  <p className="pad">Direct a log to api.loggb.in/r/:binId like one of the examples below and this page will automatically change</p>
  <p className="pad bold left">Nodejs(client lib)</p>
  <pre className="prettyprint">npm install loggbin</pre>
  <p className="left">Nodejs lib replaces console object with an extended version(console still logs as normal) that sends requests to LoggBin. Supports log/info/warn/error and allows for grouping all logs by a groupId.</p>
  <pre className="prettyprint">
  {clientText}
  </pre>
  <p className="pad bold left">Nodejs(requestjs)</p>
  <br/>
  <p className="left">Under the hood of the above client lib it is just a http post request that streams the logs. Example below.</p>
  <pre className="prettyprint">
  {jsText}
  </pre>
  <p className="pad bold left">curl</p>
  <pre className="prettyprint">
  {curl}
  </pre>
  </div>
  </div>
  ) 
  }
export default observer(Info);
