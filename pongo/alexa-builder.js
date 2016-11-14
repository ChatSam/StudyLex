'use strict';

module.exports = (function() {
    var fsmBuilder = require('./fsm-builder'),
        responseBuilder = require('./response-builder'),
        _ = require('lodash');

    return {
        registerState: registerState,
        registerIntent: registerIntent,
        buildAlexaApp: buildAlexaApp
    };

    function registerState(state) {
        fsmBuilder.registerState(state);
        responseBuilder.registerState(state);
    }

    function registerIntent(intent) {
        fsmBuilder.registerIntent(intent);
        responseBuilder.registerIntent(intent);
    };

    function buildAlexaApp() {
        //TODO there's probably more...
        var fsm = fsmBuilder.buildFsm(),
            responses = responseBuilder.buildResponses();

        responseBuilder.registerStatesOnFsm(responses.states, fsm);

        return {
            fsm: fsm,
            responses: responses
        }
    }
})();