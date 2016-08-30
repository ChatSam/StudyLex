exports.handler = function(event, context) {
    console.log("app handler");

    var _ = require("lodash");

    // probably a better way to handle this
    event.session.attributes = event.session.attributes || {};

    if (event.session.new) {
        console.log("new session");
    }

    if(event.request.type === "LaunchRequest") {
        //TODO refactor into promise
        handleLaunchRequest(event, context);
    } else if(event.request.type === "IntentRequest") {
        //TODO refactor into promise
        handleIntentRequest(event, context);
    }

    function handleIntentRequest(event, context) {
        console.log("intent request");

        var intent = event.request.intent,
            intentName = intent.name,
            attributes = event.session.attributes,
            responses = attributes.responses,
            response = responses.buildResponse();


        if(intentName === "AnswerIntent") {
            attributes.fsm.answer(response);
        } else if(intentName === "RepeatQuestionIntent") {
            attributes.fsm.repeatQuestion(response);
        } else if(intentName === "QuitIntent") {
            attributes.fsm.quit(response);
        } else {
            context.fail("Unknown intent");
        }

        var alexaResponse = buildAlexaResponse(event, response);
        context.succeed(alexaResponse);
    }

    function handleLaunchRequest(event, context) {
        console.log("launch request");
        var attributes = event.session.attributes;

        attributes.userData = loadUserData();
        attributes.responses = loadResponses(attributes.userData);
        attributes.fsm = buildFsm(attributes.responses);

        var response = attributes.responses.buildResponse();
        attributes.fsm.start(response);
        var alexaResponse = buildAlexaResponse(event, response);
        context.succeed(alexaResponse);
    }

    function buildAlexaResponse(event, response) {
        var msg = _.join(response.message, " "),
            template = _.template("<speak><%- msg %></speak>"),
            output = template({msg: msg});

        return {
            version: "1.0",
            sessionAttributes: event.session.attributes,
            response: {
                outputSpeech: {
                    type: "SSML",
                    ssml: output
                },
                // card?
                reprompt: {
                    outputSpeech: {
                        type: "SSML",
                        ssml: output
                    }
                }
            }
        };
    }

    function loadResponses(userData) {
        return require('./responses.js')(userData);
    }

    function loadUserData() {
        return {
            questions: [
                {
                    question: "what's my age again",
                    answer: 23
                },
                {
                    question: "who did I fall in love with",
                    answer: "the girl at the rock show"
                },
                {
                    question: "how many times did I blink",
                    answer: 182
                }
            ],
            appName: "The Factory"
        };
    }

    function buildFsm(responses) {
        try {
            var fsmGenerator = require('./fsm.js'),
                fsm = fsmGenerator();

            fsm.on("transition", function(data) {
                console.log("transition", "from:", data.fromState, "to:", data.toState);
            });

            fsm.on("welcome", function(response) {
                responses.handleWelcome(response);
            });

            fsm.on("question", function(response) {
                responses.handleQuestion(response);
            });

            fsm.on("repeatQuestion", function(response) {
                responses.handleRepeatQuestion(response);
            });

            fsm.on("answer", function(response) {
                responses.handleAnswer(response);
            });        

            fsm.on("done", function(response) {
                responses.handleDone(response);
            });

            return fsm;
        } catch(ex) {
            console.log(ex.stack);
        }
    }
};