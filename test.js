var thing = require('./app.js');

var e = {
    session: {
        new: true
    },
    request: {
        type: "LaunchRequest",
        requestId: 13
    }
};
var c = buildContext();
thing.handler(e, c);
console.log("message:", c.message);
e = {
    session: {},
    request: {
        type: "IntentRequest",
        intent: {
            name: "AnswerIntent"
        },
        requestId: 13
    }
};
thing.handler(e, c);
console.log("message:", c.message);


function buildContext() {
    var c = {message: ""};
    c.succeed = function(msg) {
        c.message = msg;
    };
    return c;
}