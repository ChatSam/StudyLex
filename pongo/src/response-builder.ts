'use strict';

import * as _ from 'lodash';

export class ResponseBuilder {
    
    private states: any[];

    constructor() {
        this.states = [];
    }
    
    registerState(state: any): void {
        // TODO just grab the needed pieces?
        this.states.push(state);
    }

    registerIntent(intent: any): void {
        //TODO is there anything here? 
        // do we need this method at all?
    }

    buildResponses(): any {
        return {
            states: this.states, // is this needed?
        };
    }

    registerStatesOnFsm(states: any, fsm: any): void {
        _.each(states, (state) => {
            fsm.on(state.name, (data) => {
                let template = _.template(state.message),
                    output = template(data.localData);
                data.response.addMessage(output);
            });
        });
    }
}