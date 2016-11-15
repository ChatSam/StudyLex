'use strict';

import { FsmBuilder } from './fsm-builder';
import { ResponseBuilder } from './response-builder';
import * as _ from 'lodash';


    // return {
    //     registerState: registerState,
    //     registerIntent: registerIntent,
    //     buildAlexaApp: buildAlexaApp
    // };

export class AlexaBuilder {
    private fsmBuilder: FsmBuilder
    private responseBuilder: ResponseBuilder

    constructor() {
        this.fsmBuilder = new FsmBuilder();
        this.responseBuilder = new ResponseBuilder();
    }
    
    registerState(state: any): void {
        this.fsmBuilder.registerState(state);
        this.responseBuilder.registerState(state);
    }

    registerIntent(intent: any): void {
        this.fsmBuilder.registerIntent(intent);
        this.responseBuilder.registerIntent(intent);
    };

    buildAlexaApp(): any {
        //TODO there's probably more...
        let fsm = this.fsmBuilder.buildFsm(),
            responses = this.responseBuilder.buildResponses();

        this.responseBuilder.registerStatesOnFsm(responses.states, fsm);

        return {
            fsm: fsm,
            responses: responses
        }
    }
}