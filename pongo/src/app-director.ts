// module.exports = (function() {
//     var builder = require('./alexa-builder'),
//         requestBuilder = require('./request-builder'),
//         _ = require('lodash');

import { AlexaBuilder } from './alexa-builder';
import { RequestBuilder } from './request-builder';
import * as _ from 'lodash';

export class AppDirector {
    requestBuilder: RequestBuilder
    private alexaBuilder: AlexaBuilder

    constructor() {
        this.requestBuilder = new RequestBuilder();
        this.alexaBuilder = new AlexaBuilder();
    }
    
    loadUserStructure(userData) {
        _.each(userData.states, (state) => {
            this.alexaBuilder.registerState(state);
        });

        _.each(userData.intents, (intent) => {
            this.alexaBuilder.registerIntent(intent);
        });

        this.requestBuilder.loadUserData(userData);
    }

    buildAlexaApp() {
        return this.alexaBuilder.buildAlexaApp();
    }
}