export const BOSS_REGISTRY = {
  illfang_kobold_lord: {
    id: "illfang_kobold_lord",
    name: "Illfang the Kobold Lord",
    floor: 1,
    hpGauges: 4,
    baseHp: 4500,
    accentColor: "#22c55e",
    phases: [
      { weapon: "Bone Axe & Buckler", triggerHpPct: 1.0 },
      { weapon: "Talwar Curved Blade", triggerHpPct: 0.25 }
    ],
    minions: "ruin_kobold_trooper",
    specialAttack: "Tsumujiguruma Curved Slash"
  },
  the_iron_golem: {
    id: "the_iron_golem",
    name: "The Iron Golem",
    floor: 20,
    hpGauges: 5,
    baseHp: 22000,
    accentColor: "#94a3b8",
    phases: [{ triggerHpPct: 1.0 }, { triggerHpPct: 0.3 }],
    specialAttack: "Ground Slam Shockwave"
  },
  nicholas_the_renegade: {
    id: "nicholas_the_renegade",
    name: "Nicholas The Renegade",
    floor: 27,
    hpGauges: 5,
    baseHp: 38000,
    accentColor: "#a855f7",
    phases: [{ triggerHpPct: 1.0 }, { triggerHpPct: 0.5 }],
    specialAttack: "Crimson Blizzard Hammer"
  },
  the_gleam_eyes: {
    id: "the_gleam_eyes",
    name: "The Gleam Eyes",
    floor: 74,
    hpGauges: 6,
    baseHp: 145000,
    accentColor: "#3b82f6",
    phases: [{ weapon: "Zanbato Greatsword", triggerHpPct: 1.0 }, { weapon: "Primal Roar", triggerHpPct: 0.4 }],
    specialAttack: "Demonic Cleave & Blue Fire"
  },
  the_skull_reaper: {
    id: "the_skull_reaper",
    name: "The Skull Reaper",
    floor: 75,
    hpGauges: 7,
    baseHp: 210000,
    accentColor: "#ef4444",
    phases: [{ triggerHpPct: 1.0 }, { triggerHpPct: 0.5 }, { triggerHpPct: 0.2 }],
    specialAttack: "Instant-Kill Scythe Swing"
  },
  heathcliff_akihiko_kayaba: {
    id: "heathcliff_akihiko_kayaba",
    name: "Heathcliff (Akihiko Kayaba)",
    floor: 100,
    hpGauges: 10,
    baseHp: 480000,
    accentColor: "#ff0055",
    isImmortalObject: true,
    uniqueSkill: "Holy Sword (Liberator)",
    phases: [{ triggerHpPct: 1.0 }, { triggerHpPct: 0.5 }, { triggerHpPct: 0.1 }],
    specialAttack: "Divine Absolute Cross Shield"
  }
};
