module.exports = (function() {
    // TODO this whole file seems a bit expiremental and will 
    // probably need to be reworked
    
    var _ = require('lodash');
    
    return {
        makeRequestData: makeRequestData
    };

    function makeRequestData() {
        return {
            localData: makeLocalData(),
            response: makeResponse()
        }
    }

    function makeLocalData() {
        // TODO
        return {};
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