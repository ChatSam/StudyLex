module.exports = function(userData) {

    var _ = require('lodash'),
        self = this;
    
    self.currentQuestion = -1;

    return {
        handleWelcome: handleWelcome,
        handleQuestion: handleQuestion,
        handleRepeatQuestion: handleRepeatQuestion,
        handleAnswer: handleAnswer,
        handleDone: handleDone,
        buildResponse: buildResponse
    };

    function handleWelcome(response) {
        //TODO build off of userData
        response.message.push("Welcome to the Factory.");
    }

    function handleQuestion(response) {
        self.currentQuestion++;
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
        // console.log(q);
        // response.message.push(userData.questions[self.currentQuestion].answer);
    }

    function handleDone(response) {
        response.message.push("Goodbye");
    }

    function buildResponse() {
        return {
            message: []
        };
    }
}

