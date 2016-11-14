module.exports = (function() {
    var builder = require('./alexa-builder'),
        _ = require('lodash');
    
    return {
        loadUserStructure: loadUserStructure,
        buildAlexaApp: buildAlexaApp
    }
    
    function loadUserStructure(userData) {
        _.each(userData.states, (state) => {
            builder.registerState(state);
        });

        _.each(userData.intents, (intent) => {
            builder.registerIntent(intent);
        });
    }

    function buildAlexaApp() {
        return builder.buildAlexaApp();
    }
})();