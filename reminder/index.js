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
    console.log("init", event.session.attributes);

    if (event.session.new) {
    }

    if(event.request.type === 'LaunchRequest') {
        handleLaunchRequest(event, context);
    } else if(event.request.type === 'IntentRequest') {
        handleIntentRequest(event, context);
    }

    function handleIntentRequest(event, context) {
        console.log('intent request');
        console.log('attributes', event.session.attributes);
        var intent = event.request.intent,
            intentName = intent.name,
            attributes = event.session.attributes,
            responses = loadResponses(attributes.userData, attributes.appState),
            activity = intent.slots.activity.value;

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
        console.log('response', response);
        context.succeed(buildAlexaResponse(event, response));
    }

    function handleLaunchRequest(event, context) {
        console.log('handle launch');

        var responses = loadResponses(attributes.userData, attributes.appState),
            response = responses.handleHelp();

        context.succeed(buildAlexaResponse(event, response));
    }

    function buildAlexaResponse(event, response) {
        var template = _.template('<speak><%- msg %></speak>'),
            output = template({msg: response.message});

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

    function loadResponses(userData, appState) {
        return obj = require('./responses.js')(userData, appState);
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

        var userData = loadUserData(attributes.userData);
        attributes.userData = userData;

        attributes.appState = attributes.appState || {};
        attributes.appState.activities = attributes.appState.activities || {};
        // _.forEach(userData.activities, x => {
        //     console.log('activity setup', x);
        //     attributes.appState.activities[x.activity] = undefined;
        // });

        return attributes;
    }
};