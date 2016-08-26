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

// e = {

//     session: {}
// };
// thing.handler(e, c);
// console.log("message:", e);


function buildContext() {
    var c = {message: ""};
    c.succeed = function(msg) {
        c.message = msg;
    };
    return c;
}