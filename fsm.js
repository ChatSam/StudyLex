module.exports = function() { 
    var machina = require('machina');

    var fsm = new machina.Fsm({
        initialize: () => {

        },

        namespace: "fsm",
        initialState: "red",

        states: {
            red: {
                _onEnter: () => console.log("we made it to red"),
                doMe: "green",
                _onExit: () => console.log("we're leaving red")
            },
            green: {
                _onEnter: () => console.log("we made it to green"),
                doYou: "red",
                "*": "red",
                _onExit: () => console.log("we're leaving green")
            }
        }, 

        doMe: function() {
            this.handle("doMe");
        },
        doYou: function() {
            this.handle("doYou");
        }
    });

    return fsm;
}