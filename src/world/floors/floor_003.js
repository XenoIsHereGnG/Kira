/**
 * ============================================================================
 * SWORD ART ONLINE 2D - FLOOR 003 DEFINITION MODULE
 * Piano 3: Forest of Wavering Mists, Zumfel & The Jade Forest Labyrinth
 * ============================================================================
 */

export const FLOOR_003 = {
  metadata: {
    id: 3,
    floorNumber: 3,
    codename: "FL03_ZUMFEL_WAVERING_MIST",
    title: "The Shifting Canopy and the Elven Schism",
    diameterKm: 8.8,
    labyrinthFloorSpan: "Floor 3 - Chambers 1 to 22",
    recommendedLevelRange: { min: 16, max: 24 },
    isFloorClearedByDefault: false
  },

  // --------------------------------------------------------------------------
  // 1. FISICA DEL MONDO E PARAMETRI D'AMBIENTE
  // --------------------------------------------------------------------------
  physics: {
    engineMode: "TOP_DOWN_ARPG",
    worldBounds: { minX: 0, maxX: 4096, minY: 0, maxY: 4096 },
    baseFriction: 0.82, // Terreno muschioso e umido
    playerSpeedModifier: 0.92,
    dashImpulse: 11.0,
    dashDurationFrames: 12,
    dodgeInvulnerabilityFrames: 14,
    environmentalHazards: {
      denseFogBlindness: {
        active: true,
        visionRadiusPixels: 240, // Campo visivo ridotto senza fonte di luce
        stealthDetectionRangeModifier: 0.65
      },
      livingRootsSnare: {
        snareDurationMs: 1600,
        breakFreeInputMashCount: 4,
        spawnChanceOnCanopyWalk: 0.08
      }
    },
    collisionLayers: {
      SAFE_ZONE: 0b0001,
      DENSE_TREES: 0b0010,
      LABYRINTH_UNDERWOOD: 0b0100,
      MIST_MIRE: 0b1000
    }
  },

  environment: {
    theme: "misty_forest",
    lighting: {
      ambientColorDay: "#c7d2fe",
      ambientColorDusk: "#6366f1",
      ambientColorNight: "#090d16",
      mistOpacityDay: 0.45,
      mistOpacityNight: 0.85,
      pointLights: [
        { x: 1950, y: 1950, radius: 300, color: "rgba(16, 185, 129, 0.45)", flicker: false }, // Lanterne arboree di Zumfel
        { x: 920, y: 3100, radius: 260, color: "rgba(168, 85, 247, 0.5)", flicker: true },    // Accampamento Elfi Oscuri
        { x: 3800, y: 3800, radius: 320, color: "rgba(5, 150, 105, 0.6)", flicker: true }    // Radura del Boss
      ]
    },
    weatherParticles: {
      type: "spores_and_swirling_mist",
      density: 50,
      driftVelocity: { x: 0.25, y: -0.15 },
      colorPalette: ["#a7f3d0", "#6ee7b7", "#34d399", "#d1fae5"],
      flutterFrequency: 0.04
    },
    zones: [
      {
        id: "zumfel_city",
        name: "Zumfel (Il Villaggio tra le Fronde)",
        bounds: { x: 1400, y: 1400, w: 1200, h: 1200 },
        isSafeZone: true,
        antiCriminalCodeActive: true,
        bgmTrack: "bgm_zumfel_elven_lute",
        features: ["Tree-Bough Walkways", "Potion Distilleries", "Elder Spire"]
      },
      {
        id: "dhees_valley",
        name: "Valle Nebbiosa di Dhees",
        bounds: { x: 0, y: 0, w: 1400, h: 2800 },
        isSafeZone: false,
        antiCriminalCodeActive: false,
        bgmTrack: "bgm_wavering_mist_ambient"
      },
      {
        id: "dark_elf_encampment",
        name: "Avamposto degli Elfi Oscuri (Kizmel's Haven)",
        bounds: { x: 400, y: 2801, w: 1000, h: 1295 },
        isSafeZone: false, // Diventa zona amica dopo l'evento di Kizmel
        antiCriminalCodeActive: false,
        bgmTrack: "bgm_dark_elf_nocturne"
      },
      {
        id: "jade_labyrinth",
        name: "Labirinto delle Radici Intrecciate",
        bounds: { x: 2600, y: 1400, w: 1496, h: 2696 },
        isSafeZone: false,
        antiCriminalCodeActive: false,
        bgmTrack: "bgm_labyrinth_overgrown_catacomb"
      },
      {
        id: "boss_sanctum_treant",
        name: "Radura Antica di Nerius",
        bounds: { x: 3500, y: 3500, w: 596, h: 596 },
        isSafeZone: false,
        antiCriminalCodeActive: false,
        bossRoomSealOnEnter: true,
        bgmTrack: "bgm_boss_wrath_of_nature"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. PERSONAGGI (NPC) & ALBERI DI DIALOGO INTERATTIVI
  // --------------------------------------------------------------------------
  npcs: [
    {
      id: "kizmel_dark_elf",
      name: "Kizmel",
      title: "Cavaliere della Guardia Reale degli Elfi Oscuri",
      guild: "Corte delle Ombre di Pagau",
      spawnPosition: { x: 820, y: 2950 },
      avatarSprite: "kizmel_amethyst_armor",
      interactionRadius: 70,
      dialogueTree: {
        root: "kizmel_rescue_meeting",
        nodes: {
          kizmel_rescue_meeting: {
            speaker: "Kizmel",
            portrait: "kizmel_noble_solemn",
            text: "Umani della superficie... vi sono debitrice. Quei mercenari degli Elfi della Foresta avevano circondato la mia retroguardia. Il vostro coraggio nel brandire l'acciaio per un'estranea è ammirevole.",
            choices: [
              { text: "Non potevamo stare a guardare mentre venivi sopraffatta. Io sono Kirito, lei è Asuna.", next: "kizmel_names" },
              { text: "Cosa stavano cercando quegli elfi con gli archi lunghi?", next: "kizmel_secret" }
            ]
          },
          kizmel_names: {
            speaker: "Kizmel",
            portrait: "kizmel_gentle_smile",
            text: "«Kirito», «Asuna»... nomi insoliti, ma custodirò il loro eco nel cuore. Il nostro regno è lacerato da una faida millenaria. Se sosterrete la mia gente, la lama del mio stocco non vi tradirà.",
            choices: [
              { text: "Accettiamo la Campagna della Guerra degli Elfi: vi scorteremo attraverso il piano.", next: "kizmel_pledge" }
            ]
          },
          kizmel_secret: {
            speaker: "Kizmel",
            portrait: "kizmel_grim",
            text: "Cercano la Gemma del Giuramento. Se cadesse nelle mani dei sacerdoti della Foresta, il risveglio delle radici corrotte inghiottirà ogni forma vivente di questo piano, compresi voi stranieri.",
            choices: [
              { text: "Allora impediremo che accada. Guideremo noi la spedizione.", next: "kizmel_pledge" }
            ]
          },
          kizmel_pledge: {
            speaker: "Kizmel",
            portrait: "kizmel_sword_salute",
            text: "Che la luce delle stelle d'ametista guidi il nostro cammino. Quando entrerete nel labirinto, sarò al vostro fianco.",
            choices: []
          }
        }
      }
    },
    {
      id: "asuna_forest_companion",
      name: "Asuna",
      title: "Compagna di Party (Wind Fleuret +4)",
      guild: "Nessuna",
      spawnPosition: { x: 1720, y: 1650 },
      avatarSprite: "asuna_scout_cloak",
      interactionRadius: 60,
      dialogueTree: {
        root: "asuna_kizmel_reflection",
        nodes: {
          asuna_kizmel_reflection: {
            speaker: "Asuna",
            portrait: "asuna_thoughtful",
            text: "Kirito... hai notato il modo in cui parla Kizmel? Non ripete le solite tre battute pre-registrate come i venditori della città iniziale. Sembra... quasi una persona reale con ricordi ed emozioni.",
            choices: [
              { text: "Il Cardinal System di Kayaba genera personalità complesse per le quest principali.", next: "asuna_cardinal_reply" },
              { text: "Per noi è un'alleata a tutti gli effetti. Proteggiamola con la stessa cura che riserveremmo a un compagno umano.", next: "asuna_resolve" }
            ]
          },
          asuna_cardinal_reply: {
            speaker: "Asuna",
            portrait: "asuna_soft",
            text: "Anche se è solo un programma... vederla sanguinare e stringere i denti mi stringe il petto. Non permetterò che muoia davanti a noi.",
            choices: []
          },
          asuna_resolve: {
            speaker: "Asuna",
            portrait: "asuna_smile_confident",
            text: "Concordo. Il mio scatto col fioretto e il tuo fendente ad arco la terranno al sicuro. Andiamo a caccia di quel Treant!",
            choices: []
          }
        }
      }
    },
    {
      id: "argo_the_rat_fl03",
      name: "Argo",
      title: "La Spia con i Baffi dipinti",
      guild: "Nessuna (Neutrale)",
      spawnPosition: { x: 1510, y: 1820 },
      avatarSprite: "argo_cloak_trees",
      interactionRadius: 55,
      shopInventory: [
        { itemId: "elven_antidote_flask", name: "Elisir Antidoto del Bosco x5", costCol: 300 },
        { itemId: "phosphor_dust", name: "Polvere Fosforescente Anti-Nebbia", costCol: 450 },
        { itemId: "guide_book_fl03", name: "Manuale di Sopravvivenza: Campagna Elfica", costCol: 800 }
      ],
      dialogueTree: {
        root: "argo_fl03_gossip",
        nodes: {
          argo_fl03_gossip: {
            speaker: "Argo",
            portrait: "argo_grin",
            text: "Kii-bou! Ho saputo che ti sei intrufolato nella foresta scortando una bella elfa dai capelli corvini. Sei consapevole che l'altra fazione di giocatori ha scelto di schierarsi con gli Elfi della Foresta?",
            choices: [
              { text: "Chi si è schierato con loro?", next: "argo_kibaou_intel" },
              { text: "Quali sono le debolezze elementali del Boss Nerius?", next: "argo_nerius_intel" }
            ]
          },
          argo_kibaou_intel: {
            speaker: "Argo",
            portrait: "argo_winking",
            text: "Kibaou e la sua fazione Aincrad Liberation Squad! Hanno preso la quest dagli Elfi della Foresta per ottenere armi d'assedio. Prevedo scintille se vi incontrate nel labirinto...",
            choices: []
          },
          argo_nerius_intel: {
            speaker: "Argo",
            portrait: "argo_serious",
            text: "Nerius è fatto di legno pietrificato antico. I tagli taglienti fanno poco, ma gli attacchi da impatto e le Sword Skills di tipo perforante colpiscono i suoi snodi di linfa. Evita a ogni costo la sua polvere viola!",
            choices: []
          }
        }
      }
    }
  ],

  // --------------------------------------------------------------------------
  // 3. BESTIARIO: MOSTRI COMUNI E MOB DEL LABIRINTO
  // --------------------------------------------------------------------------
  fieldMonsters: [
    {
      id: "mist_crawler_spider",
      name: "Mist Crawler Spider",
      level: 16,
      zone: "dhees_valley",
      hp: 1100,
      atk: 135,
      def: 62,
      speed: 3.8,
      xpYield: 380,
      colYield: 180,
      collisionRadius: 28,
      aiBehavior: {
        stateMachine: ["CAMOUFLAGE_FOG", "WEB_SHOOT", "VENOM_FANG_DASH"],
        aggroRadius: 150,
        inflictsStatus: { type: "POISON", dps: 18, durationMs: 5000, chance: 0.4 }
      },
      drops: [
        { itemId: "fog_spider_silk", name: "Seta Appiccicosa della Nebbia", chance: 0.70 },
        { itemId: "spider_venom_gland", name: "Ghiandola Velenosa Concentrata", chance: 0.35 }
      ]
    },
    {
      id: "bark_skin_treant_scout",
      name: "Bark-Skin Treant Scout",
      level: 18,
      zone: "dhees_valley",
      hp: 2200,
      atk: 165,
      def: 110,
      speed: 1.9,
      xpYield: 520,
      colYield: 240,
      collisionRadius: 36,
      aiBehavior: {
        stateMachine: ["ROOT_PLANT", "HEAVY_BRANCH_SLAP", "THORN_BURST"],
        aggroRadius: 120,
        slapKnockbackForce: 8.0,
        damageReductionBuffWhenRooted: 0.35
      },
      drops: [
        { itemId: "ironbark_wood_log", name: "Tronco di Corteccia di Ferro", chance: 0.65 },
        { itemId: "living_sap_vial", name: "Fiala di Linfa Rigenerante", chance: 0.25 }
      ]
    },
    {
      id: "forest_elf_renegade_scout",
      name: "Forest Elf Mercenary",
      level: 20,
      zone: "jade_labyrinth",
      hp: 1850,
      atk: 195,
      def: 78,
      speed: 3.5,
      xpYield: 640,
      colYield: 340,
      collisionRadius: 26,
      equippedWeapons: ["Elven Longbow", "Twin Leaf Daggers"],
      aiBehavior: {
        stateMachine: ["KITE_RETREAT", "VOLLEY_SHOT", "DAGGER_PARRY"],
        preferredEngagementDistance: 190,
        arrowSpeed: 7.0
      },
      drops: [
        { itemId: "elven_feather_arrow", name: "Frecce di Piuma Elfica x20", chance: 0.50 },
        { itemId: "forest_scout_boots", name: "Stivali Silenti del Bosco", chance: 0.10 }
      ]
    },
    {
      id: "mire_troll_crusher",
      name: "Mire Troll Crusher",
      level: 22,
      zone: "jade_labyrinth",
      hp: 3600,
      atk: 240,
      def: 95,
      speed: 2.2,
      xpYield: 850,
      colYield: 420,
      collisionRadius: 42,
      equippedWeapons: ["Spiked Wooden Club"],
      aiBehavior: {
        stateMachine: ["ROAR_INTIMIDATE", "OVERHEAD_CLUB_SMASH", "SWEEP_GROUND"],
        stunDurationOnHitMs: 1800,
        parryableWindowFrames: 12
      },
      drops: [
        { itemId: "troll_bludgeon_fragment", name: "Scheggia di Randello Spinoso", chance: 0.40 },
        { itemId: "strength_crystal_shard", name: "Frammento di Cristallo della Forza", chance: 0.30 }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 4. BOSS DELL'AREA: NERIUS THE TREANT ROGUE
  // --------------------------------------------------------------------------
  boss: {
    id: "nerius_treant_rogue",
    name: "Nerius the Treant Rogue",
    title: "L'Antico Custode Corrotto delle Radici",
    floorNumber: 3,
    sizeRadius: 72,
    totalHpGauges: 5,
    maxHpPerGauge: 8200,
    totalEffectiveHp: 41000,
    baseDef: 120,
    attackPower: 265,
    criticalRate: 0.14,

    gaugeColors: ["#dc2626", "#ea580c", "#ca8a04", "#15803d", "#0284c7"],

    phases: [
      {
        phaseIndex: 1,
        hpGaugeThreshold: 5, // 100% -> 80%
        weaponMain: "Colossal Root Arms",
        weaponOff: "Vines of Choking Mists",
        combatStyle: "HEAVY_SWEEP_AND_SPORE",
        movementSpeed: 2.0,
        skills: [
          {
            name: "Sweeping Canopy Cleave",
            damageMultiplier: 1.8,
            castTimeMs: 1000,
            cooldownMs: 5500,
            telegraphShape: "SEMI_CIRCLE_FORWARD",
            radius: 170
          },
          {
            name: "Noxious Spore Cloud",
            damageMultiplier: 1.2,
            castTimeMs: 800,
            cooldownMs: 8000,
            telegraphShape: "PULSING_RINGS",
            radius: 200,
            inflictsStatus: { type: "POISON_AND_SLOW", slowPct: 40, durationMs: 4000 }
          }
        ]
      },
      {
        phaseIndex: 2,
        hpGaugeThreshold: 4, // 80% -> 60%
        weaponMain: "Hardened Ironbark Claws",
        combatStyle: "UNDERGROUND_ROOT_CAGE",
        movementSpeed: 2.4,
        skills: [
          {
            name: "Grasping Nether-Roots",
            damageMultiplier: 2.2,
            castTimeMs: 650,
            cooldownMs: 7000,
            telegraphShape: "TARGET_PLAYER_CIRCLE",
            radius: 90,
            inflictsSnareMs: 2500 // Immobilizza sul posto
          }
        ],
        environmentalSpawn: {
          hazard: "POISONOUS_PUDDLES",
          count: 4
        }
      },
      {
        phaseIndex: 3,
        hpGaugeThreshold: 3, // 60% -> 40%
        weaponMain: "Splintering Spire Stems",
        combatStyle: "RAPID_WOODEN_PIKES",
        movementSpeed: 2.8,
        skills: [
          {
            name: "Bramble Barrage",
            damageMultiplier: 2.7,
            castTimeMs: 550,
            cooldownMs: 5000,
            telegraphShape: "CONE_FORWARD_NEEDLES",
            range: 220,
            angleDeg: 45
          }
        ]
      },
      {
        phaseIndex: 4,
        hpGaugeThreshold: 2, // 40% -> 20%
        weaponMain: "Thorn-Encrusted Boughs",
        combatStyle: "FRENZY_WHIRLWIND",
        movementSpeed: 3.4,
        enrageBuffs: { attackBuffPct: 35, defBuffPct: 20 },
        skills: [
          {
            name: "Cyclone of Rotting Wood",
            damageMultiplier: 3.2,
            castTimeMs: 400,
            cooldownMs: 6000,
            telegraphShape: "FULL_ARENA_EXPANDING_STORM",
            radius: 240
          }
        ]
      },
      {
        phaseIndex: 5,
        hpGaugeThreshold: 1, // 20% -> 0%
        weaponMain: "Exposed Core of Blighted Sap",
        combatStyle: "DESPERATION_OVERGROWTH",
        movementSpeed: 4.1,
        enrageBuffs: { attackBuffPct: 60, criticalRateBuff: 0.25 },
        skills: [
          {
            name: "Judgement of the Primeval Forest",
            damageMultiplier: 4.5,
            castTimeMs: 900,
            cooldownMs: 9000,
            telegraphShape: "GRID_OF_BURSTING_TRUNKS",
            safeZones: [
              { x: 3600, y: 3600, radius: 40 },
              { x: 3950, y: 3950, radius: 40 }
            ]
          }
        ]
      }
    ],

    lootTable: {
      standardDrops: [
        { itemId: "ancient_treant_core", name: "Nucleo Pietrificato di Nerius", count: 1, chance: 1.0 },
        { itemId: "ironbark_shield_raw", name: "Scudo Grezzo di Corteccia Antica", chance: 0.35 },
        { itemId: "col_pouch_fl03", name: "Sacco di Col (24,000 Col)", chance: 1.0 },
        { itemId: "exp_reward", amount: 16500 }
      ],
      lastAttackBonus: {
        itemId: "sylphic_breeze_cloak",
        name: "Sylphic Breeze Cloak (Manto della Brezza Silfide)",
        type: "EQUIPMENT_BACK",
        rarity: "EPIC_RELIC",
        description: "Mantello tessuto con fibre di linfa millenaria e piume d'aquila reale. Rende i passi inudibili ai mostri e annulla gli effetti di rallentamento causati da nebbia o terreni fangosi.",
        statsBonus: {
          defense: 42,
          agility: +22,
          movementSpeedBonusPct: 12,
          slowImmunity: true,
          poisonResistPct: 35
        },
        flavorQuote: "«Nessun ramo trattiene il vento tra le foglie.»"
      }
    }
  },

  // --------------------------------------------------------------------------
  // 5. EVENTI SCRITTURATI & TRIGGERS DI TRAMA
  // --------------------------------------------------------------------------
  scriptedEvents: [
    {
      eventId: "kizmel_rescue_skirmish",
      triggerCondition: "PLAYER_APPROACHES_DARK_ELF_CAMP_FIRST_TIME",
      execute(gameState) {
        return {
          battleSequenceId: "defend_kizmel_3_waves",
          waves: [
            { enemyId: "forest_elf_renegade_scout", count: 2 },
            { enemyId: "forest_elf_renegade_scout", count: 3 }
          ],
          failCondition: "KIZMEL_HP_REACHES_ZERO",
          onVictory: "ELF_WAR_CAMPAIGN_ACTIVATED",
          dialogueOutput: "Kizmel rinfodera la spada d'ametista: «Il vostro aiuto ha salvato il nostro avamposto. D'ora in poi marceremo insieme!»"
        };
      }
    },
    {
      eventId: "floor_003_clear_gate",
      triggerCondition: "NERIUS_DEFEATED",
      execute(gameState) {
        return {
          announcement: "CONGRATULATIONS! Floor 3 Cleared. Teleport Gate Opened to Floor 4 (Rovia Canal City).",
          unlockedFloors: [4],
          teleportGateActivated: "Zumfel (Floor 3) -> Rovia (Floor 4)",
          unlockedCampaignProgression: "ELF_WAR_CHAPTER_2_UNLOCKED"
        };
      }
    }
  ]
};
