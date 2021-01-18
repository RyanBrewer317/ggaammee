import * as setup from "./setup";
import * as functions from "./functions";
const { Server } = require('ws');
const express = require('express');

const PORT = process.env.PORT || 3000;

const server = express()
  .use((req, res) => res.sendFile('index.html', { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);

functions.generateNewRegion();

wss.on('connection', (socket) => {
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

function resp(hero: setup.Hero, type: string): string {
  hero.pingPos();
  return JSON.stringify({'type': type, 'selected': [setup.SelectedBlock.index.x, setup.SelectedBlock.index.y], 'map': functions.logSelectedRegion()});
}