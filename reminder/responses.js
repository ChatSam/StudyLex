module.exports = function(userData, appState) {
    console.log('responses file');
    console.log(userData, appState);
    var _ = require('lodash'),
        self = this;
    
    self.appState = appState;
    self.userData = userData;

    return {
        handleActivityComplete: handleActivityComplete,
        handleActivityInquiry: handleActivityInquiry,
        handleHelp: handleHelp,
        handleUnknownActivity: handleUnknownActivity
    };

    function handleActivityComplete(activity) {
        if(!isActivityValid(activity)) {
            console.log('uknown activity:', activity);
            return handleUnknownActivity();
        }

        markActivityComplete(activity);

        var text = 'Great. I recorded it.';
        return buildResponse(text);
    }

    function handleActivityInquiry(activity) {
        if(!isActivityValid(activity)) {
            console.log('uknown activity:', activity);
            return handleUnknownActivity();
        }
        
        if(isActivityCompleteToday(activity)) {
            console.log('activity complete', activity);
            var text = 'Yes';
            return buildResponse(text);
        } else {
            console.log('activity incomplete', activity);
            var text = 'Not yet!';
            return buildResponse(text);
        }
    }

    function handleHelp() {
        var text = 'help me';
        return buildResponse(text);
    }

    function handleHelp() {
        var text = 'I did not understand you';
        return buildResponse(text);
    }

    function buildResponse(message) {
        return {
            message: message,
            shouldEnd: true
        };
    }

    function isActivityValid(activity) {
        _.some(self.userData.activities, (x) => {
            console.log(x);
            x.activity == activity
        });
    }

    function handleUnknownActivity() {
        var text = 'I did not recognize that activity';
        return buildResponse(text);
    }

    function markActivityComplete(activity) {
        var now = new Date();
        console.log('activity finished:', activity, now);
        self.appState.activities[activity] = now;
    }

    function isActivityCompleteToday(activity) {
        var last = self.appState.activities[activity];
        var today = new Date();
        console.log('date compare:', last, last.getDay(), today, today.getDay());
        return last && (last.getDay() == today.getDay());
    }
}