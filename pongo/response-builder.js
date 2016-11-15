'use strict';

module.exports = (function() {
    var _ = require('lodash');

    var states = [];

    return {
        registerState: registerState,
        registerIntent: registerIntent,
        buildResponses: buildResponses,
        registerStatesOnFsm: registerStatesOnFsm
    };

    function registerState(state) {
        // TODO just grab the needed pieces?
        states.push(state);
    }

    function registerIntent(intent) {
        //TODO is there anything here? 
        // do we need this method at all?
    }

    function buildResponses() {
        return {
            states: states, // is this needed?
        };
    }

    function registerStatesOnFsm(states, fsm) {
        _.each(states, (state) => {
            fsm.on(state.name, (data) => {
                var template = _.template(state.message),
                    output = template(data.localData);
                data.response.addMessage(output);
            });
        });
    }
})();