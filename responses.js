module.exports = function(userData, currentStep) {
    console.log('responses file');
    console.log(userData, currentStep);
    var _ = require('lodash'),
        self = this;
    
    self.currentStep = currentStep;
    self.userData = userData;

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
            "Welcome to <%- appName %>, instructions to <%- appDescription %>. Would you like to start.");
        var text = template({appName: userData.appName, appDescription: userData.appDescription});
        console.log(text);
        response.message.push(text);
    }

    function handleStep(response) {
       console.log('handle step');
       
       console.log(self.userData);
       console.log(self.currentStep);
       var step = self.userData.steps[self.currentStep],
            template = _.template("Step <%= num %>. <%= step %>."),
            text = template({ num: step.num, step: step.step });

        // var step = userData.steps[self.currentStep],
        //     template = _.template("Step <%= num %>. <%= step %>."),
        //     text = template({ num: step.num + 1, step: step.step });

        response.message.push(text);
    }

    function handleNextStep(response) {
        self.currentStep++;
    }

    function handleRepeatStep(response) {
    }

    function handleStop(response) {
        var template = _.template(
            "Thank you for using  <%- appName %>.");
        var text = template({appName: userData.appName});
    }

    function buildResponse() {
        return {
            message: [],
            shouldEnd: false
        };
    }

    function getCurrentStep() {
        return self.currentStep;
    }
}

