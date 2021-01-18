"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setup = require("./setup");
var functions = require("./functions");
var Server = require('ws').Server;
var express = require('express');
var PORT = process.env.PORT || 3000;
var server = express()
    .use(function (req, res) { return res.sendFile('index.html', { root: __dirname.replace('/scripts', '/public') }); })
    .listen(PORT, function () { return console.log("Listening on " + PORT); });
var wss = new Server({ server: server });
functions.generateNewRegion();
wss.on('connection', function (socket) {
    // console.log('hi');
    var hero = new setup.Hero(socket, '' + Math.random());
    setup.Heroes.push(hero);
    console.log(hero.name + ' joined.');
    for (var i = 0; i < setup.Heroes.length; i++) {
        setup.Heroes[i].pingJoined(hero);
    }
    socket.on('message', function (msg) {
        var type = 'confirm';
        var emit = false;
        if (msg === "initworld") {
            functions.generateNewRegion();
            var l = setup.Heroes.length;
            for (var i = 0; i < l; i++) {
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
        if (msg === 'getworld') { }
        if (msg === 'use') {
            hero.selectedblock.use(hero);
        }
        if (emit) {
            for (var i = 0; i < setup.Heroes.length; i++) {
                setup.Heroes[i].socket.send(resp(setup.Heroes[i], type));
            }
        }
        else {
            socket.send(resp(hero, type));
        }
    });
    socket.on('close', function () {
        setup.Heroes.splice(setup.Heroes.indexOf(hero));
        for (var i = 0; i < setup.Heroes.length; i++) {
            setup.Heroes[i].pingClosed(hero);
        }
    });
});
function resp(hero, type) {
    hero.pingPos();
    return JSON.stringify({ 'type': type, 'selected': [hero.selectedblock.index.x, hero.selectedblock.index.y], 'map': functions.logSelectedRegion() });
}
