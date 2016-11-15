module.exports = (function() {
    // TODO this whole file seems a bit expiremental and will 
    // probably need to be reworked
    
    var _ = require('lodash');

    var userData = {};
    
    return {
        makeRequestData: makeRequestData,
        loadUserData: loadUserData
    };

    function makeRequestData() {
        return {
            localData: makeLocalData(),
            response: makeResponse()
        }
    }

    function loadUserData(ud) {
        userData = ud;
    }

    function makeLocalData() {
        return userData.localData;
    }

    function makeResponse() {
        var messages = [];
        
        return {
            addMessage: addMessage,
            buildMessage: buildMessage
        };

        function addMessage(message) {
            messages.push(message);
        }

        function buildMessage() {
            var msg = _.join(messages, " "),
                template = _.template("<speak><%- msg %></speak>"),
                output = template({msg: msg});

            return output;
        }
    }
})();