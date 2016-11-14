var builder = require('./alexa-builder'),
    states = require('./states'),
    intents = require('./intents')
    _ = require('lodash');

_.each(states, (state) => {
    builder.registerState(state);
});

_.each(intents, (intent) => {
    builder.registerIntent(intent);
});

var app = builder.buildAlexaApp(),
    fsm = app.fsm;

console.log(fsm.state);

fsm["AMAZON.NoIntent"]();

console.log(fsm.state);