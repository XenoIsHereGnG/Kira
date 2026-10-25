export class TeleportNetwork {
  constructor() {
    this.unlockedFloors = new Set([1]);
  }

  unlockFloor(floorNumber) {
    if (floorNumber >= 1 && floorNumber <= 100) {
      this.unlockedFloors.add(floorNumber);
      return true;
    }
    return false;
  }

  isFloorUnlocked(floorNumber) {
    return this.unlockedFloors.has(floorNumber);
  }

  getUnlockedFloorsList() {
    return Array.from(this.unlockedFloors).sort((a, b) => a - b);
  }

  executeCorridorTeleport(targetFloor) {
    if (!this.isFloorUnlocked(targetFloor)) {
      return {
        success: false,
        reason: `Floor ${targetFloor} Teleport Gate is LOCKED. Sconfiggi il Boss del piano precedente.`
      };
    }
    return {
      success: true,
      message: `Teletrasporto a Floor ${targetFloor}... Teleport Gate Active!`
    };
  }
}
