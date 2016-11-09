

// currently the session is being dropped everytime because the 
// responses are set to shouldEnd = true -- this deletes the session
// we'll need to save these values in a db to combat this





exports.handler = function(event, context) {
    // router.put('/:userId/:taskId/:activity', {
        
    // });

    var http = require('http');

    var appOwner = '5811737552281302f080dd4d';
    var taskId = '581a2ff198bd9c065846c13c';
    var activity = 'Clean the Dishes';
    var path = encodeURIComponent('/' + appOwner + '/' + taskId + '/' + activity);

    http.get({
        hostname: 'dev.elev8learning.co',
        port: 80,
        path: path,
        agent: false  // create a new agent just for this one request
    }, (res) => {
        console.log(res);
        var alexaResponse = buildAlexaResponse(attributes, {
            message: 'it worked!',
            shouldEnd: true
        });
        context.succeed(alexaResponse);
        return;
    });
    
    // var _ = require('lodash');

    // var template = _.template('applicationId: <%- appId %> || requestId: <%- reqId %> || sessionId: <%- sessId %>');
    // console.log(template({ 
    //     appId: event && event.session && event.session.application && event.session.application.applicationId,
    //     reqId: event && event.request && event.request.requestId,
    //     sessId: event && event.session && event.session.sessionId
    // }));

    // // probably a better way to handle this
    // console.log('start', event.session.attributes);
    // event.session.attributes = initialize(event.session.attributes);
    // console.log("init", event.session.attributes);

    // if (event.session.new) {
    // }

    // if(event.request.type === 'LaunchRequest') {
    //     handleLaunchRequest(event, context);
    // } else if(event.request.type === 'IntentRequest') {
    //     handleIntentRequest(event, context);
    // }

    // function handleIntentRequest(event, context) {
    //     console.log('intent request');
    //     console.log('attributes', event.session.attributes);
    //     var intent = event.request.intent,
    //         intentName = intent.name,
    //         attributes = event.session.attributes,
    //         responses = loadResponses(attributes.userData),
    //         activity = intent.slots.activity.value;

    //     var response;
    //     if(intentName == 'AMAZON.HelpIntent') {
    //         response = responses.handleHelp();   
    //     } else if(intentName == 'ActivityCompleteIntent') {
    //         response = responses.handleActivityComplete(activity);
    //     } else if(intentName == 'ActivityInquiryIntent') {
    //         response = responses.handleActivityInquiry(activity);
    //     } else {
    //         response = responses.handleUnknownIntent();
    //     }

    //     console.log(attributes);
    //     console.log('response', response);
    //     context.succeed(buildAlexaResponse(attributes, response));

    function handleLaunchRequest(event, context) {
        console.log('handle launch');

        var responses = loadResponses(attributes.userData),
            response = responses.handleHelp();

        context.succeed(buildAlexaResponse(event, response));
    }

    function buildAlexaResponse(attributes, response) {
        var template = _.template('<speak><%- msg %></speak>'),
            output = template({msg: response.message});

        return {
            version: '1.0',
            sessionAttributes: attributes,
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
        console.log('initiazlie', attributes);
        var attributes = attributes || {};

        var userData = loadUserData(attributes.userData);
        attributes.userData = userData;

        return attributes;
    }
};