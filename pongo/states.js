module.exports = [
    {
        name: "initialState",
        transitions: [
            { 
                type: "standard", 
                intent: "AMAZON.NoIntent",
                state: "no"
            },
            { 
                type: "standard", 
                intent: "AMAZON.YesIntent",
                state: "yes"
            },
        ]
    },
    {
        name: "yes",
    },
    {
        name: "no"
    }
];