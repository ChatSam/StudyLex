// TODO this whole file seems a bit expiremental and will 
// probably need to be reworked

import * as _ from 'lodash';
import { UserData, RequestData, Response } from './interfaces';
    
export class RequestBuilder {
    private userData: UserData;

    constructor() {
    }    

    makeRequestData(): RequestData {
        return <RequestData> {
            localData: this.makeLocalData(),
            response: this.makeResponse()
        }
    }

    loadUserData(ud: UserData): void {
        this.userData = ud;
    }

    private makeLocalData(): any {
        return this.userData.localData;
    }

    private makeResponse(): Response {
        let messages: string[] = [];
        
        return <Response> {
            addMessage: addMessage,
            buildMessage: buildMessage
        };

        function addMessage(message: string): void {
            messages.push(message);
        }

        function buildMessage(): string {
            var msg = _.join(messages, " "),
                template = _.template("<speak><%- msg %></speak>"),
                output = template({msg: msg});

            return output;
        }
    }
}