import * as setup from "./setup";
import * as functions from "./functions";
const ws = require('ws');
const express = require('express');

const app = express();
const server = new ws.Server({port: 3001});

functions.generateNewRegion();

server.on('connection', function(socket) {
  // console.log('hi');
  let hero = new setup.Hero(socket, ''+Math.random());
  setup.Heroes.push(hero);
  console.log(hero.name+' joined.');
  for (let i = 0; i < setup.Heroes.length; i++) {
    setup.Heroes[i].pingJoined(hero);
  }

  socket.on('message', function(msg) {
    let type = 'confirm';
    let emit = false;
    if (msg === "initworld") {
      functions.generateNewRegion();
      let l = setup.Heroes.length;
      for (let i = 0; i < l; i++) {
        setup.Heroes.pop();
      }
      setup.Heroes.push(hero);
    }
    if (msg === "right") {
      hero.moveX(0.25);
      emit = true;
    }
    if (msg === "left") {
      hero.moveX(-0.25);
      emit = true;
    }
    if (msg === 'getworld') {}
    if (emit) {
      for (let i = 0; i < setup.Heroes.length; i++) {
        setup.Heroes[i].socket.send(resp(setup.Heroes[i], type));
      }
    } else {
      socket.send(resp(hero, type));
    }
  });
  
  socket.on('close', function () {
    for (let i = 0; i < setup.Heroes.length; i++) {
      setup.Heroes[i].pingClosed(hero);
    }
  })
});

app.get('/', (req, res)=>{
  // console.log(res);
  res.sendFile('index.html', {root: './../public'});
});

app.listen(3000);

function resp(hero: setup.Hero, type: string): string {
  hero.pingPos();
  return JSON.stringify({'type': type, 'selected': [setup.SelectedBlock.index.x, setup.SelectedBlock.index.y], 'map': functions.logSelectedRegion()});
}