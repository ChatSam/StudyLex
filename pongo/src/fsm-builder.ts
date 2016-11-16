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

import * as _ from 'lodash';
import * as machina from 'machina';
import { State, Intent } from './interfaces'

export class FsmBuilder {
    private states: State[];
    private intents: Intent[];

    constructor() {
        this.states = [];
        this.intents = [];
    }

    registerState(state: State): void {
        this.states.push(state);
    }

    registerIntent(intent: Intent): void {
        //TODO does this also do utterances?
        this.intents.push(intent);
    }

    // how does this intersect with global transitions and loop transitions?

    buildFsm(): any {
        let fsmData = {
            initialize: function() {
                //TODO anything here?
            },

            namespace: "myFsm", //TODO does this matter?
            initialState: "initialState", //TODO ??
            states: undefined,
        };

        _.each(this.intents, (intent: Intent) => {
            fsmData[intent.name] = function(data) {
                this.handle(intent.name, data);
            };
        });

        fsmData.states = _.reduce(this.states, 
            (fsmStates: any, state: State) => {

            let fsmState = {
                _onEnter: function(data: any) {
                    this.emit(state.name, data);
                }
            };

            if(state.transitions) {
                // sets properties onto fsmState
                _.reduce(state.transitions, 
                    (fsmState: any, transition: any) => {

                    if(transition.kind === "standard") {
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
}