"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setup = require("./setup");
var functions = require("./functions");
var ws = require('ws');
var express = require('express');
var app = express();
var server = new ws.Server({ port: 3001 });
functions.generateNewRegion();
server.on('connection', function (socket) {
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
        for (var i = 0; i < setup.Heroes.length; i++) {
            setup.Heroes[i].pingClosed(hero);
        }
    });
});
app.get('/', function (req, res) {
    // console.log(res);
    res.sendFile('index.html', { root: './../public' });
});
app.listen(3000);
function resp(hero, type) {
    hero.pingPos();
    return JSON.stringify({ 'type': type, 'selected': [setup.SelectedBlock.index.x, setup.SelectedBlock.index.y], 'map': functions.logSelectedRegion() });
}
