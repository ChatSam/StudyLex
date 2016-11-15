//TODO actually use this file

namespace app {
    interface State {
        name: string
        transitions: Transition[],
        message: string,
        // loadData: () => void // ???
        // onEnter: (requestData: RequestData) => void
        // onExit: () => void // ???
    }

    interface RequestData {
        localData: any,
        response: Response  
    }

    interface Response {
        addMessage: (s: string) => void
        buildMessage: () => string
    }

    type Transition = StandardTransition | LoopBackTransition;

    interface StandardTransition {
        kind: 'standard'
        intent: string
        state: string
    }

    interface LoopBackTransition {
        kind: 'loopback'
    }

    // other? error handling transitions?
}