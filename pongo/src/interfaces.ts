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

export interface RequestData {
    localData: any
    response: Response  
}

export interface Response {
    addMessage(s: string): void
    buildMessage(): string
}

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