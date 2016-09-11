module.exports = function(userData, currentStep) {
    var _ = require('lodash'),
        self = this;
    
    self.currentStep = currentStep;

    return {
        handleWelcome: handleWelcome,
        handleStep: handleStep,
        handleNextStep: handleNextStep,
        handleRepeatStep: handleRepeatStep,
        handleStop: handleStop,
        buildResponse: buildResponse,
        getCurrentStep: getCurrentStep
    };

    function handleWelcome(response) {
        //TODO build off of userData
        var template = _.template(
            "Welcome to <%- appName %>, instructions to <%- appDescription ->. Would you like to start?");
        var text = template({appName: userData.appName, appDescription: userData.appDescription});
        response.message.push(text);
    }

    function handleStep(response) {
        var step = userData.steps[self.currentStep],
            template = _.template("Step <%= num %>. <%= step %>."),
            text = template({ num: step.num + 1, step: step.step });

        response.message.push(text);
    }

    function handleNextStep(response) {
        self.currentQuestion++;
    }

    function handleRepeatStep(response) {
    }

    function handleStop(response) {
        var template = _.template(
            "Thank you for using  <%- appName %>.";
        var text = template({appName: userData.appName});
    }

    function buildResponse() {
        return {
            message: [],
            shouldEnd: false
        };
    }

    function getCurrentStep() {
        return self.currentStepn;
    }
}

