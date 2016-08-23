var fsm = require('./fsm.js')();

fsm.on("transition", (data) => {
    if(data.toState === "red") {
        red();
    }

    if(data.toState === "green") {
        green();
    }

    console.log("to", data.toState, "from", data.fromState);
});

console.log(fsm.compositeState());

fsm.doMe();

console.log(fsm.compositeState());

fsm.doMe();

console.log(fsm.compositeState());

fsm.doMe();

console.log(fsm.compositeState());

fsm.doYou();

console.log(fsm.compositeState());

fsm.doYou();

console.log(fsm.compositeState());

function red() {
    console.log("i see red");
}

function green() {
    console.log("i see green");
}