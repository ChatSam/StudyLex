var fsmBuilder = require('./fsm-builder'),
    states = require('./states'),
    intents = require('./intents')
    _ = require('lodash');

_.each(states, (state) => {
    fsmBuilder.registerState(state);
});

_.each(intents, (intent) => {
    fsmBuilder.registerIntent(intent);
});

var fsm = fsmBuilder.buildFsm();

console.log(fsm.state);

fsm["AMAZON.YesIntent"]();

console.log(fsm.state);