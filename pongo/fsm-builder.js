'use strict';

//////////////
// we use use `function(data)` vs `(data) =>` in the methods set on
// the fsm below because we want `this` to be bound at call time 
// to the new fsm. 
//
// Why? Machina takes the object you create, then places all of the
// functions you declare onto a new fsm (using `_.extend()`). We want
// references to `this` to bind to the new fsm that machina creates. 
// However, if we use `() =>` structure, `this` is bound at 
// declaration, which points to the object we created, even after
// these functions are extended onto the machina fsm. Therefore, we
// use the `function()` format, which causes `this` to be bound at
// the time the function is called, which will bind `this` to the 
// newly created machina fsm. 
//
// for more info: 
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
//////////////

module.exports = (function() {
    var machina = require('machina'),
        _ = require('lodash');

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

        _.each(actions, (action) => {
            fsmData[action] = function(data) {
                this.handle(action, data);
            };
        });

        fsmData.states = _.reduce(states, (fsmStates, state) => {
            let fsmState = {
                _onEnter: function(data) {
                    this.emit(state.name, data);
                }
            };

            if(state.transitions) {
                // sets properties onto fsmState
                _.reduce(state.transitions, (fsmState, transition) => {
                    if(transition.type === "standard") {
                        fsmState[transition.intent] = function(data) {
                            this.transition(transition.state, data);
                        };
                    } else {
                        throw "uknown transition type";
                    }
                    return fsmState;
                }, fsmState);
            }
            
            fsmStates[state.name] = fsmState;
            return fsmStates;
        }, {});

        return new machina.Fsm(fsmData);
    }
})();