module.exports = function() { 
    var machina = require('machina');

    var fsm = new machina.Fsm({
        initialize: () => {

        },

        namespace: "questions",
        initialState: "initialize",

        states: {
            initialize: {
                start: function(response) {
                    this.transition("welcome", response);
                }
            },
            welcome: {
                _onEnter: function(response) {
                    this.emit("welcome", response);
                    this.transition("question", response);
                },
                quit: function(response) {
                    this.transition("done", response);
                }
            },
            question: {
                _onEnter: function(response) {
                    this.emit("question", response);
                },
                repeatQuestion: function(reponse) {
                    this.transition("repeatQuestion", response);
                    this.emit("repeatQuestion", response);
                },
                quit: function(response) {
                    this.transition("done", response);
                    this.emit("question", response);
                }
            },
            repeatQuestion: {
                _onEnter: function(response) {
                    this.transition("question", response);
                    this.emit("repeatQuestion", response);
                }
            },
            answer: {
                _onEnter: function(response) {
                    this.transition("question", response);
                    this.emit("answer", response);
                },
                quit: function(response) {
                    this.transition("done", response);
                }
            },
            done: {
                _onEnter: function(response) {
                    this.emit("done", response);
                }
            }
        },

        // actions
        start: function(response) {
            console.log("fsm.js.start")
            this.handle("start", response);
        },

        repeatQuestion: function(response) {
            this.handle("repeatQuestion", response)
        },

        quit: function(response) {
            this.handle("quit", response);
        }
    });

    return fsm;
}