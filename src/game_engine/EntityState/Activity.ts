export class Activity<ActivityState> {
    name: string;
    activityState: ActivityState;
    onActivityStart: (activityState: ActivityState) => void; // for setting animation state and stuff
    onActivityEnd: (time: number, activityState: ActivityState) => void; // for unsetting animation state and stuff
    activityStarted: boolean;
    // returns true if completed
    runActivity: (time: number, activityState: ActivityState) => boolean;
    constructor(
        name: string, 
        activityState: ActivityState,
        activator: (time: number, activityState: ActivityState) => boolean,
        onActivityStart: (activityState: ActivityState) => void,
        onActivityEnd: (dt: number, activityState: ActivityState) => void
    ) {
        this.onActivityStart = onActivityStart;
        this.onActivityEnd = onActivityEnd;
        this.name = name;
        this.activityState = activityState;
        this.runActivity = activator;
        this.activityStarted = false;
    }
    // return true if completed
    doActivity(dT: number): boolean {
        if(!this.activityStarted) {
            this.activityStarted = true;
            this.onActivityStart(this.activityState);
        }
        if(this.runActivity(dT, this.activityState)) {
            this.onActivityEnd(dT, this.activityState);
            return true;
        }
        return false;
    }
}

// might need to store the activity data at the parent level to allow introspection
// or I can have references to the data that's in the activity queue so I don't have 
// to loop through an array
export class ParentActivity {
    name: string;
    parentActivity: ParentActivity;
    subActivities?: Array<ParentActivity | Activity<object>>;
    currentActivityIndex: number;
    activityStarted: boolean;

    constructor(name: string, subActivities?: Array<ParentActivity | Activity<object>>, parentActivity?: ParentActivity, currentActivityIndex?: number) {
        this.name = name;
        this.parentActivity = parentActivity;
        this.currentActivityIndex = currentActivityIndex || 0;
        this.subActivities = subActivities || [];
    }

    // returns true if this parent activity is done
    doActivity(dT: number): boolean {
        if(!this.activityStarted) {
            this.activityStarted = true;
        }
        const currentActivity = this.subActivities[this.currentActivityIndex];
        const currentActivityCompleted = currentActivity.doActivity(dT);
        if(currentActivityCompleted) {
            currentActivity.activityStarted = false;
            if(this.currentActivityIndex < this.subActivities.length - 1) {
                this.currentActivityIndex++;
                return false;
            } else {
                this.currentActivityIndex = 0;
                return true;
            }
        }
        return false;
    }
}

