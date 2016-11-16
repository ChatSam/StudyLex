
import { UserData, State, Intent } from './interfaces'

let data = <UserData> {
    states: <State[]>[
        {
            name: "initialState",
            transitions: [
                { 
                    kind: "standard", 
                    intent: "AMAZON.NoIntent",
                    state: "no"
                },
                { 
                    kind: "standard", 
                    intent: "AMAZON.YesIntent",
                    state: "yes"
                },
            ],
            message: "this is the initial state"
        },
        {
            name: "yes",
            message: "you said yes",
            transitions: [
                {
                    kind: "standard",
                    intent: "GoodbyeIntent",
                    state: "goodbye"
                }
            ]
        },
        {
            name: "no",
            message: "you said no",
            transitions: [
                {
                    kind: "standard",
                    intent: "GoodbyeIntent",
                    state: "goodbye"
                }
            ]
        },
        {
            name: "goodbye",
            message: "goodbye <%- name %>",
            transitions: [
                {
                    kind: "standard",
                    intent: "GoodbyeIntent",
                    state: "goodbye"
                }
            ]
        },
    ],
    // does this need to be explicit? probably easier with utterances...
    intents: <Intent[]>[ 
        { name: "AMAZON.NoIntent" }, 
        { name: "AMAZON.YesIntent" },
        { name: "GoodbyeIntent" }
    ],
    localData: <any> {
        name: "sue"
    }
};

export { data }