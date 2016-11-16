'use strict';

import * as _ from 'lodash';
import { State, Intent, RequestData } from './interfaces';

export class ResponseBuilder {
    private states: State[];

    constructor() {
        this.states = [];
    }
    
    registerState(state: State): void {
        // TODO just grab the needed pieces?
        this.states.push(state);
    }

    registerIntent(intent: Intent): void {
        //TODO is there anything here? 
        // do we need this method at all?
    }

    buildResponses(): any {
        return {
            states: this.states, // is this needed?
        };
    }

    registerStatesOnFsm(states: State[], fsm: any): void {
        _.each(states, (state: State) => {
            fsm.on(state.name, (data: RequestData) => {
                let template = _.template(state.message),
                    output = template(data.localData);
                data.response.addMessage(output);
            });
        });
    }
}