var fb = require('./fsm-builder.js');

var fsm = fb.buildFsm();

console.log(fsm.state);

fsm["AMAZON.NoIntent"]();
// fsm.AMAZON_YesIntent();

console.log(fsm.state);