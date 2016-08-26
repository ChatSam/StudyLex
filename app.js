exports.handler = function(event, context) {
    console.log("app handler");

    var userData = {
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

    if (event.session.new) {
        console.log("new session");
    }

    if(event.request.type === "LaunchRequest") {
        console.log("launch request");
        context.fsm = buildFsm();
        var responses = buildResponses();
        var response = responses.buildResponse();
        context.fsm.start(response);
        console.log(response);
        context.succeed(response);
    } else if(event.request.type === "LaunchRequest")

    function buildResponses() {
        return require('./responses.js')(userData);
    }

    function buildFsm() {
        try {
            var fsmGenerator = require('./fsm.js'),
                fsm = fsmGenerator();

            fsm.on("transition", function(data) {
                console.log("transition", "from:", data.fromState, "to:", data.toState);
            });

            fsm.on("welcome", function(response) {
                console.log("app.js.welcomehandler")
                responses.handleWelcome(response);
            });

            fsm.on("question", function(response) {
                responses.handleQuestion(response);
            });

            fsm.on("repeatQuestion", function(response) {
                responses.handleQuestion(response);
            });

            fsm.on("answer", function(response) {
                responses.handleQuestion(response);
            });        

            fsm.on("done", function(response) {
                responses.handleQuestion(response);
            });

            return fsm;
        } catch(ex) {
            console.log(ex.stack);
        }
    }
};