// TODO this whole file seems a bit expiremental and will 
// probably need to be reworked

import * as _ from 'lodash';
    
export class RequestBuilder {
    private userData: any;

    constructor() {
    }    

    makeRequestData(): any {
        return {
            localData: this.makeLocalData(),
            response: this.makeResponse()
        }
    }

    loadUserData(ud: any) {
        this.userData = ud;
    }

    private makeLocalData(): any {
        return this.userData.localData;
    }

    private makeResponse(): any {
        let messages: any[] = [];
        
        return {
            addMessage: addMessage,
            buildMessage: buildMessage
        };

        function addMessage(message: any) {
            messages.push(message);
        }

        function buildMessage(): any {
            var msg = _.join(messages, " "),
                template = _.template("<speak><%- msg %></speak>"),
                output = template({msg: msg});

            return output;
        }
    }
}