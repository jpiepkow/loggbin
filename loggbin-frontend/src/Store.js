import { observable, extendObservable, action } from 'mobx';
import {Socket} from 'phoenix-socket'
import 'whatwg-fetch';
import { browserHistory } from 'react-router';
import { notify } from 'react-notify-toast-fix';
import base32 from 'thirty-two'
var urlPart = `api.loggb.in`
var url = `https://${urlPart}`
var Store = observable({
  log: [],
  show:notify.createShowQueue(),
  filteredLog: [],
  filtered:false,
  createBin: action(function(history) {
      fetch(`${url}/createbin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
      })
      .then(response => {
        if(response.status === 200) {
          return response.json();
        } else {
          return Promise.reject('something went wrong... please try back later')
        }
      })
      .then(body => {
        history.push(`/${body.created}`)
      })
      .catch(e => {
          Store.show('Error creating bin... please try back later', 'error');
      });
  }),
  connectSocket: action(function(id,history) {
    var socket = new Socket(`ws://${urlPart}/socket`)
    socket.connect()
    socket.onError( () => {
      Store.show('There was an error making connection to server... try back later', 'error');
        history.push(`/`);
      })
      var chan = socket.channel(`bins:${id}`)
    chan.join()
      .receive("ok", res => {
        chan.on("log", res => {
          if(res.groupId) {
            res.hex = intToRGB(hashCode(res.groupId))
          }
          Store.log = Store.log.concat([res])
        })
      })
      .receive("error", e => {
        Store.show(e.err, 'error');
        history.push(`/`);
      })
  }),
  toggleFilter: action(function(groupId) {
    if(Store.filtered === true) {
      console.log('filter toggled to false')
      Store.filteredLog = [];
      Store.filtered = false;
    } else {
      console.log('filter toggled to true')
      Store.filteredLog = Store.log.filter(x => x.groupId === groupId)
      Store.filtered = true;
    }
  })
});
function hashCode(str) { 
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}
export default Store;
