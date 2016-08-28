exports.handler = function(event, context) {
    console.log("app handler");

    var _ = require("lodash");

    if (event.session.new) {
        console.log("new session");
    }

    if(event.request.type === "LaunchRequest") {
        //TODO refactor into promise
        handleLaunchRequest(context);
    } else if(event.request.type === "IntentRequest") {
        //TODO refactor into promise
        handleIntentRequest(context.responses, event, context);
    }

    function handleIntentRequest(responses, event, context) {
        console.log("intent request");

        var intent = event.request.intent,
            intentName = intent.name,
            response = responses.buildResponse();

        if(intentName === "AnswerIntent") {
            context.fsm.answer(response);
        } else if(intentName === "RepeatIntent") {
            context.fsm.repeat(response);
        } else if(intentName === "QuitIntent") {
            context.fsm.done(response);
        }

        var alexaResponse = buildAlexaResponse(response);
        context.succeed(alexaResponse);
    }

    function handleLaunchRequest(context) {
        console.log("launch request");
        
        context.userData = loadUserData();
        context.responses = loadResponses(context.userData);
        context.fsm = buildFsm(context.responses);

        var response = context.responses.buildResponse();
        context.fsm.start(response);
        var alexaResponse = buildAlexaResponse(response);
        context.succeed(alexaResponse);
    }

    function buildAlexaResponse(response) {
        var msg = _.join(response.message, " "),
            template = _.template("<speak><%- msg %></speak>"),
            output = template({msg: msg});

        return {
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