export { Airport } from "./Airport/Airport";
export { EndingLine } from "./Airport/EndingLine";
export { Aurora } from "./Aurora/Aurora";
export { B2Bomber } from "./B2Bomber/B2Bomber";
export { BombBasic } from "./Bombs/BombBasic";
export { Building1 } from "./Buildings/Building1";
export { TargetBuilding } from "./Buildings/TargetBuilding";
export { Missile } from "./Enemies/Missile";
export { PatriotMissileSite } from "./Enemies/PatriotMissileSite";
export { LevelPrototype } from "./Levels/LevelPrototype";

export type StrikeTimeObjectType = 
    "Missile" | 
    "Aurora" | 
    "PatriotMissileSite" |
    "Building1" |
    "TargetBuilding" | 
    "Airport" | 
    "EndingLine"

