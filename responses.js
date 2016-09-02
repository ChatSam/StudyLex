module.exports = function(userData, currentQuestion) {
    var _ = require('lodash'),
        self = this;
    
    self.currentQuestion = currentQuestion;

    return {
        handleWelcome: handleWelcome,
        handleQuestion: handleQuestion,
        handleRepeatQuestion: handleRepeatQuestion,
        handleAnswer: handleAnswer,
        handleDone: handleDone,
        buildResponse: buildResponse,
        getCurrentQuestion: getCurrentQuestion
    };

    function handleWelcome(response) {
        //TODO build off of userData
        var template = _.template("Welcome to <%- appName %>.");
        var text = template({appName: userData.appName});
        console.log(text);
        response.message.push(text);
    }

    function handleQuestion(response) {
        console.log(self.currentQuestion);
        self.currentQuestion++;
        console.log(self.currentQuestion);
        var q = userData.questions[self.currentQuestion],
            template = _.template("Question <%= num %>. <%= question %>."),
            text = template({ num: self.currentQuestion + 1, question: q.question });

        response.message.push(text);
    }

    function handleRepeatQuestion(response) {
        self.currentQuestion--; // will immediately be incremented by handleQuestion
    }

    function handleAnswer(response) {
        var q = userData.questions[self.currentQuestion],
            template = _.template("The answer is <%= answer %>."),
            text = template({ answer: q.answer });

        response.message.push(text);


        // var q = userData.questions[self.currentQuestion];
        // response.message.push(userData.questions[self.currentQuestion].answer);
    }

    function handleDone(response) {
        response.message.push("Goodbye");
    }

    function buildResponse() {
        return {
            message: [],
            shouldEnd: false
        };
    }

    function getCurrentQuestion() {
        return self.currentQuestion;
    }
}

