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


            step: {
                _onEnter: function(response) {
                    console.log("step _onenter");
                    this.emit("step", response);
                },
                repeat: function(response) {
                    this.transition("repeatStep", response);
                },
                next: function(response) {
                    this.transition("nextStep", response);
                },
                stop: function(response) {
                    this.transition("stop", response);
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