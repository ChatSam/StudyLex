module.exports = (function() {
    var builder = require('./alexa-builder'),
        requestBuilder = require('./request-builder'),
        _ = require('lodash');
    
    return {
        loadUserStructure: loadUserStructure,
        requestBuilder: requestBuilder,
        buildAlexaApp: buildAlexaApp
    }
    
    function loadUserStructure(userData) {
        _.each(userData.states, (state) => {
            builder.registerState(state);
        });

        _.each(userData.intents, (intent) => {
            builder.registerIntent(intent);
        });

        requestBuilder.loadUserData(userData);
    }

    function buildAlexaApp() {
        return builder.buildAlexaApp();
    }
})();