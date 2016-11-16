'use strict';

import { FsmBuilder } from './fsm-builder';
import { ResponseBuilder } from './response-builder';
import * as _ from 'lodash';
import { State, Intent } from './interfaces';

export class AlexaBuilder {
    private fsmBuilder: FsmBuilder
    private responseBuilder: ResponseBuilder

    constructor() {
        this.fsmBuilder = new FsmBuilder();
        this.responseBuilder = new ResponseBuilder();
    }
    
    registerState(state: State): void {
        this.fsmBuilder.registerState(state);
        this.responseBuilder.registerState(state);
    }

    registerIntent(intent: Intent): void {
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