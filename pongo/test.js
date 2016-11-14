var director = require('./app-director'),
    userData = require('./user-data'),
    requestDataBuilder = require('./request-builder'),
    _ = require('lodash');

director.loadUserStructure(userData);

var app = director.buildAlexaApp(),
    fsm = app.fsm;

console.log(fsm.state);

var data = requestDataBuilder.makeRequestData();
fsm["AMAZON.NoIntent"](data);

console.log(fsm.state, data.response.buildMessage());