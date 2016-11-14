exports.handler = function(event, context) {
    var _ = require('lodash'),
        director = require('./director');

    // var template = _.template("applicationId: <%- appId %> || requestId: <%- reqId %> || sessionId: <%- sessId %>");
    // console.log(template({ 
    //     appId: event && event.session && event.session.application && event.session.application.applicationId,
    //     reqId: event && event.request && event.request.requestId,
    //     sessId: event && event.session && event.session.sessionId
    // }));

    var app = event.session.new 
        ? director.build('user-data')
        : event.session.attributes.app;
};