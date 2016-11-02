exports.handler = function(event, context) {
    var _ = require('lodash');

    var template = _.template('applicationId: <%- appId %> || requestId: <%- reqId %> || sessionId: <%- sessId %>');
    console.log(template({ 
        appId: event && event.session && event.session.application && event.session.application.applicationId,
        reqId: event && event.request && event.request.requestId,
        sessId: event && event.session && event.session.sessionId
    }));

    // probably a better way to handle this
    event.session.attributes = initialize(event.session.attributes);

    if (event.session.new) {
    }

    if(event.request.type === 'LaunchRequest') {
        handleLaunchRequest(event, context);
    } else if(event.request.type === 'IntentRequest') {
        handleIntentRequest(event, context);
    }

    function handleIntentRequest(event, context) {
        console.log('intent request');
        console.log(event);
        var intent = event.request.intent,
            intentName = intent.name,
            attributes = event.session.attributes,
            responses = loadResponses(attributes.userData, attributes.appState);

        var response;
        if(intentName == 'AMAZON.HelpIntent') {
            response = responses.handleHelp();   
        } else if(intentName == 'ActivityCompleteIntent') {
            response = responses.handleActivityComplete(activity);
        } else if(intentName == 'ActivityInquiryIntent') {
            response = responses.handleActivityInquiry(activity);
        } else {
            response = responses.handleUnknownIntent();
        }

        console.log(attributes);
        context.succeed(buildAlexaResponse(response));
    }

    function handleLaunchRequest(event, context) {
        console.log('handle launch');

        var responses = loadResponses(attributes.userData, attributes.appState),
            response = responses.handleHelp();

        context.succeed(buildAlexaResponse(response));
    }

    function buildAlexaResponse(event, response) {
        var msg = _.join(response.message, ' '),
            template = _.template('<speak><%- msg %></speak>'),
            output = template({msg: msg});

        return {
            version: '1.0',
            sessionAttributes: event.session.attributes,
            response: {
                outputSpeech: {
                    type: 'SSML',
                    ssml: output
                },
                // card?
                reprompt: {
                    outputSpeech: {
                        type: 'SSML',
                        ssml: output
                    }
                },
                shouldEndSession: response.shouldEnd
            },
        };
    }

    function loadResponses(userData) {
        return obj = require('./responses.js')(userData);
    }

    function loadUserData(userData) {
        if(userData) {
            return userData;
        } else {
            var fs = require('fs');
            return JSON.parse(fs.readFileSync('user-input.json'));
        }        
    }

    function initialize(attributes) {
        var attributes = event.session.attributes || {};
        event.session.attributes = attributes;

        var userData = loadUserData(attributes.userData);
        attributes.userData = userData;

        attributes.appState = attributes.appState || {};
        _.forEach(userData.activities, x => {
            console.log('activity setup', x);
            attributes.appState[x.activity] = undefined;
        });
    }
};