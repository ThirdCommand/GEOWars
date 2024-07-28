
const activitiesPrototypeExample = [
    {
        name: 'sleep',
        type: 'Goal',
        subActivities: [
            {
                type: 'moveTo',
                location: [500,500] // bed interaction location
            },
            {
                type: 'interact',
                object: {}, // Bed
                interaction: 'goToSleep',
                animate: {} // points to an existing animation
            }, 
            {
                type: "animate",
                animation: {}, // points to an existing animation
                name: "sleep"
            },
            {
                type: "interaction",
                interaction: "wakeUp",
                animate: {} // points to an existing animation
            },
            {
                type: "moveTo", 
                location: [] // bed unload location (move next to it, like where you stand when you get out of bed)
            }
        ]
    }
];