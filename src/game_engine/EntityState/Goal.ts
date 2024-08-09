// import { type Entity } from "../../game_objects/ClockworkGames/Entity/Entity";

// export class Goal {
//     entity: Entity;
//     parentGoal?: Goal;
//     name: string;
//     type: 'Goal';
//     constructor(entity: Entity, parentGoal?: Goal, name: string, subActivities, currentSubActivityIndex) {
//         this.entity = entity;
//         this.parentGoal = parentGoal;
//         this.name = name;
//         this.type = 'Goal';
//         this.subActivities = subActivities || [];
//         this.currentSubActivityIndex = currentSubActivityIndex || 0;
       
//     }

//     // I think I'm confusing things a bit
//     // I think it will work fine this way
//     // but will not be dynamic like goal oriented action planning
//     // rigidity means I can make it a puzzle game of sorts

//     update(dT: number) {
//         this.subActivities[this.currentSubActivityIndex](dT);
//     }

//     /*
//     stack works I believe
//     1 2 2 1 3 4 4 3
//     [ [ ] ] [ [ ] ]
//     */
//     createLoopId() {
//         this.loopId++;
//         this.loopsToClose.push(this.loopId);
//         return this.loopId;
//     }
//     getLoopId() {
//         return this.loopsToClose.pop();  
//     }

//     goToLoopId(loopId) {
//         this.gameElements.forEach((element, idx) => {
//             if(element.loopId === loopId) {
//                 this.currentElementIndex = idx;
//             }
//         });
//     }

//     nextGoal() {
//         if(this.currentSubActivityIndex < this.subActivities.length - 1) {
//             this.currentElementIndex++;
//         } else {
//             this.currentElementIndex = 0;
//             this.parentGoal.nextElement();
//         }
//     }
// }

// // want to try making it a game object of some sort
// export class GoalObject {
//     constructor(name, gameElements) {
//     }
    
    
// }


// // I think entities will have their own queue of tasks or high level goals
// // and a way to manage when to pause, alter, or change higher level goals in the queue

// // so then goals will be static once defined