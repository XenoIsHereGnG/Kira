import { floors_01_10 } from "./floors_01_10.js";
import { floors_11_20 } from "./floors_11_20.js";
import { floors_21_30 } from "./floors_21_30.js";
import { floors_31_40 } from "./floors_31_40.js";
import { floors_41_50 } from "./floors_41_50.js";
import { floors_51_60 } from "./floors_51_60.js";
import { floors_61_70 } from "./floors_61_70.js";
import { floors_71_80 } from "./floors_71_80.js";
import { floors_81_90 } from "./floors_81_90.js";
import { floors_91_100 } from "./floors_91_100.js";
import { BIOME_PRESETS } from "./biome_presets.js";
import { BOSS_REGISTRY } from "./boss_registry.js";
import { TeleportNetwork } from "./teleport_gates.js";

export class AincradFloorManager {
  constructor() {
    this.floorsMap = new Map();
    this.teleport = new TeleportNetwork();
    this.currentFloorNumber = 1;
    this.init();
  }

  init() {
    const allFloors = [
      ...floors_01_10,
      ...floors_11_20,
      ...floors_21_30,
      ...floors_31_40,
      ...floors_41_50,
      ...floors_51_60,
      ...floors_61_70,
      ...floors_71_80,
      ...floors_81_90,
      ...floors_91_100
    ];

    allFloors.forEach((f) => {
      this.floorsMap.set(f.floor, f);
    });
  }

  getFloor(number) {
    return this.floorsMap.get(number) || null;
  }

  getFloorBiome(number) {
    const f = this.getFloor(number);
    if (!f) return BIOME_PRESETS.grassland_day;
    return BIOME_PRESETS[f.biome] || BIOME_PRESETS.grassland_day;
  }

  getFloorBoss(number) {
    const f = this.getFloor(number);
    if (!f || !f.bossId) return null;
    return BOSS_REGISTRY[f.bossId] || null;
  }

  clearCurrentFloor() {
    const cleared = this.currentFloorNumber;
    const next = cleared + 1;
    if (next <= 100) {
      this.teleport.unlockFloor(next);
      this.currentFloorNumber = next;
      return {
        clearedFloor: cleared,
        unlockedFloor: next,
        nextFloorData: this.getFloor(next)
      };
    }
    return { clearedFloor: 100, gameCompleted: true };
  }
}
