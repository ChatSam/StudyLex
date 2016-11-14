var director = require('./app-director'),
    userData = require('./user-data')
    _ = require('lodash');

director.loadUserStructure(userData);

var app = director.buildAlexaApp(),
    fsm = app.fsm;

console.log(fsm.state);

fsm["AMAZON.YesIntent"]();

console.log(fsm.state);