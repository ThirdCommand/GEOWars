export class Activity<ActivityState> {
    name: string;
    activityState: ActivityState;
    // returns true if completed
    runActivity: (time: number, activityState: ActivityState) => boolean;
    constructor(name: string, activityState: ActivityState, activator: (time: number, activityState: ActivityState) => boolean) {
        this.name = name;
        this.activityState = activityState;
        this.runActivity = activator;
    }
    // return true if completed
    doActivity(dT: number): boolean {
        return this.runActivity(dT, this.activityState);
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

    constructor(name: string, subActivities?: Array<ParentActivity | Activity<object>>, parentActivity?: ParentActivity, currentActivityIndex?: number) {
        this.name = name;
        this.parentActivity = parentActivity;
        this.currentActivityIndex = currentActivityIndex || 0;
        this.subActivities = subActivities || [];
    }

    // returns true if this parent activity is done
    doActivity(dT: number): boolean {
        const currentActivityCompleted = this.subActivities[this.currentActivityIndex]?.doActivity(dT) || true;
        if(currentActivityCompleted) {
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

