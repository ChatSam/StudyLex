// var director = require('./app-director'),
//     userData = require('./user-data'),
//     _ = require('lodash');

import { AppDirector } from './app-director';
import { data as userData } from './user-data';
import * as _ from 'lodash';

let director = new AppDirector();

director.loadUserStructure(userData);

var app = director.buildAlexaApp(),
    fsm = app.fsm,
    requestBuilder = director.requestBuilder;

console.log(fsm.state);

var data = requestBuilder.makeRequestData();
fsm["AMAZON.NoIntent"](data);

console.log(fsm.state, data.response.buildMessage());

data = requestBuilder.makeRequestData();
fsm.GoodbyeIntent(data);

console.log(fsm.state, data.response.buildMessage());