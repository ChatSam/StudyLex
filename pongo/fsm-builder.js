'use strict';

module.exports = (function() {
    var machina = require('machina');

    var states = [];

    return {
        registerState: registerState,
        registerIntent: registerIntent,
        buildFsm: buildFsm
    };

    /**
     * a state has: 
     * - name
     * - onEnter( ?? )
     * - onExit( ?? )
     * - loadData( ?? )
     * - transitions: obj[] { type, state }
     */
    function registerState(state) {
        states.add(state);
    }

    function registerIntent(intent) {
        //TODO does this also do utterances?
    }

    // where do we build message, is it in state, or in transition?
    // how does this intersect with global transitions and loop transitions?

    function buildFsm() {
        // build action list (as intent)
        // where to host the messages?
        // separate file? -- yes, only build fsm here

        //TODO build from states
        var actions = ["AMAZON.NoIntent", "AMAZON.YesIntent"];
        var states = [
            {
                name: "initialState",
                transitions: [
                    { 
                        type: "standard", 
                        intent: "AMAZON.NoIntent",
                        state: "no"
                    },
                    { 
                        type: "standard", 
                        intent: "AMAZON.YesIntent",
                        state: "yes"
                    },
                ]
            },
            {
                name: "yes",
            },
            {
                name: "no"
            }
        ];

        var fsmData = {
            initialize: function() {
                //TODO anything here?
            },

            namespace: "myFsm", //TODO does this matter?
            initialState: "initialState", //TODO ??
        };

        //TODO switch to lodash, handles closures too
        for(var i = 0; i < actions.length; i++) {
            let action = actions[i];
            // use function(data) vs (data) => 
            // because we don't want `this` to be bound
            fsmData[action] = function(data) {
                this.handle(action, data);
            };
        }

        //TODO switch to lodash, handles closures too
        var fsmStates = {};
        for(var i = 0; i < states.length; i++) {
            let state = states[i];
            let fsmState = {
                // use function(data) vs (data) => 
                // because we don't want `this` to be bound
                _onEnter: function(data) {
                    this.emit(state.name, data);
                }
            };

            if(state.transitions) {
                for(var j = 0; j < state.transitions.length; j++) {
                    let transition = state.transitions[j];
                    if(transition.type === "standard") {
                        // use function(data) vs (data) => 
                        // because we don't want `this` to be bound
                        fsmState[transition.intent] = function(data) {
                            console.log(transition.intent, transition.state);
                            this.transition(transition.state, data);
                        };
                    } else {
                        throw "uknown transition type";
                    }
                }
            }
            fsmStates[state.name] = fsmState;
        }
        fsmData.states = fsmStates;
        console.log(fsmData);
        return new machina.Fsm(fsmData);
    }
})();