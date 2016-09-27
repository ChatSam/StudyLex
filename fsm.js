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
                    this.transition("repeatWelcome", response);
                },
                yes: function(response) {
                    this.transition("step", response);
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

            question: {
                _onEnter: function(response) {
                    console.log("question _onenter");
                    this.emit("question", response);
                },
                repeat: function(response) {
                    this.transition("repeatQuestion", response);
                },
                next: function(response) {
                    this.transition("nextQuestion", response);
                },
                stop: function(response) {
                    this.transition("stop", response);
                }
            },
            nextQuestion: {
                _onEnter: function(response) {
                    console.log("nextQuestion");
                    this.emit("nextQuestion", response);
                    this.transition("question", response);
                }
            },
            repeatQuestion: {
                _onEnter: function(response) {
                    this.emit("repeatQuestion", response);
                    this.transition("question", response);
                }
            },


            stop: {
                _onEnter: function(response) {
                    response.shouldEnd = true;
                    this.emit("stop", response);
                }
            }
        },

        // actions
        start: function(response) {
            this.handle("start", response);
        },

        yes: function(response) {
            console.log('fsm yes')
            this.handle("yes", response);
        },

        repeat: function(response) {
            this.handle("repeat", response);
        },

        hint: function(response) {
            this.handle("hint", response);
        },

        no: function(response) {
            this.handle("no", response)
        },

        next: function(response) {
            this.handle("next", response)
        },

        stop: function(response) {
            this.handle("stop", response);
        }
    });

    return fsm;
}