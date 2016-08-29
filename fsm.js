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
                repeatQuestion: function(response) {
                    this.transition("repeatQuestion", response);
                },
                answer: function(response) {
                    this.transition("answer", response);
                },
                quit: function(response) {
                    this.transition("done", response);
                }
            },
            repeatQuestion: {
                _onEnter: function(response) {
                    this.emit("repeatQuestion", response);
                    this.transition("question", response);
                }
            },
            answer: {
                _onEnter: function(response) {
                    this.emit("answer", response);
                    this.transition("question", response);
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
            this.handle("start", response);
        },

        answer: function(response) {
            this.handle("answer", response);
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