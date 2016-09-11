module.exports = function(initialState) { 
    var machina = require('machina');

    var fsm = new machina.Fsm({
        initialize: () => {

        },

        namespace: "questions",
        initialState: initialState || "initialize",

        states: {
            initialize: {
                start: function(response) {
                    this.transition("welcome", response);
                }
            },
            welcome: {
                _onEnter: function(response) {
                    this.emit("welcome", response);
                },
                repeat: function(response) {
                    this.transition("repeatWelcome");
                },
                yes: function(response) {
                    this.transition("step");
                },
                no: function(response) {
                    this.transition("stop", response);
                },
                stop: function(response) {
                    this.transition("stop", response);
                }
            },
            repeatWelcome: {
                _onEnter: function(response) {
                    this.emit("repeatWelcome", response);
                    this.transition("welcome");
                }
            },


            step: {
                _onEnter: function(response) {
                    this.emit("step", response);
                },
                repeat: function(response) {
                    this.transition("repeatStep", response);
                },
                next: function(response) {
                    this.transition("nextStep", response);
                },
                quit: function(response) {
                    this.transition("done", response);
                }
            },
            nextStep: {
                _onEnter: function(response) {
                    this.emit("nextStep", response);
                    this.transition("step", response);
                }
            },
            repeatStep: {
                _onEnter: function(response) {
                    this.emit("repeatStep", response);
                    this.transition("step", response);
                }
            },


            stop: {
                _onEnter: function(response) {
                    response.shouldEnd = true;
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