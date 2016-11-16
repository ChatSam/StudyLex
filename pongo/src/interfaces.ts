//TODO break this up into reasonable pieces

export interface UserData {
    states: State[]
    intents: Intent[]
    localData: any
}

export interface State {
    name: string
    transitions: Transition[]
    message: string
    // loadData: () => void // ???
    // onEnter: (requestData: RequestData) => void
    // onExit: () => void // ???
}

export interface Intent {
    name: string
}

// interface RequestData {
//     localData: any,
//     response: Response  
// }

// interface Response {
//     addMessage: (s: string) => void
//     buildMessage: () => string
// }

export type Transition = StandardTransition | LoopBackTransition;

export interface StandardTransition {
    kind: 'standard'
    intent: string
    state: string
}

export interface LoopBackTransition {
    kind: 'loopback'
}

// other? error handling transitions?