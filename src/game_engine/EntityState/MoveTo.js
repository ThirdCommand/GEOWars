export class MoveTo {
    constructor(entity, parentGoal, name, location) {
        this.entity = entity;
        this.parentGoal = parentGoal;
        this.name = name, 
        this.type = 'MoveTo';
        this.location = location;
    }

    update() {

    }
}