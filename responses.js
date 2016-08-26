module.exports = function(userData) {

    var _ = require('lodash'),
        self = this;
    
    self.currentQuestion = 1;

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
        console.log("responses.js.handleWelcome")
        console.log(response);
        response.message.push("Welcome to the Factory");
    }

    function handleQuestion(response) {
        console.log("responses.js.handleQuestion");
        self.currentQuestion++;
        var q = userData.questions[self.currentQuestion];
        console.log(q);
        response.message.push(userData.questions[self.currentQuestion].question);
    }

    function handleRepeatQuestion(response) {
        self.currentQuestion--; // will immediately be incremented by handleQuestion
    }

    function handleAnswer(response) {
        var q = userData.questions[self.currentQuestion];
        console.log(q);
        response.message.push(userData.questions[self.currentQuestion].answer);
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

