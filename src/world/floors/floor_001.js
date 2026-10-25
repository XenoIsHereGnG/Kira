/**
 * ============================================================================
 * SWORD ART ONLINE 2D - FLOOR 001 DEFINITION MODULE
 * Piano 1: Tolbana Plains, Town of Beginnings & Labyrinth of the Kobold Lord
 * ============================================================================
 */

export const FLOOR_001 = {
  metadata: {
    id: 1,
    floorNumber: 1,
    codename: "FL01_TOLBANA_BEGINNINGS",
    title: "The Starting City and the Rolling Meadows",
    diameterKm: 10.0,
    labyrinthFloorSpan: "Floor 1 - Chambers 1 to 20",
    recommendedLevelRange: { min: 1, max: 12 },
    isFloorClearedByDefault: false
  },

  // --------------------------------------------------------------------------
  // 1. FISICA DEL MONDO E PARAMETRI D'AMBIENTE
  // --------------------------------------------------------------------------
  physics: {
    engineMode: "TOP_DOWN_ARPG",
    worldBounds: { minX: 0, maxX: 4096, minY: 0, maxY: 4096 },
    baseFriction: 0.88,
    playerSpeedModifier: 1.0,
    dashImpulse: 12.0,
    dashDurationFrames: 12,
    dodgeInvulnerabilityFrames: 14,
    collisionLayers: {
      SAFE_ZONE: 0b0001,
      WILDERNESS: 0b0010,
      LABYRINTH_WALL: 0b0100,
      WATER_HAZARD: 0b1000
    },
    gravity: 0, // Top-down
    projectileDecay: 0.98
  },

  environment: {
    theme: "grassland_day",
    lighting: {
      ambientColorDay: "#ffffff",
      ambientColorDusk: "#ff9955",
      ambientColorNight: "#111827",
      labyrinthDarknessFactor: 0.35, // Richiede torce o Vision Skill
      pointLights: [
        { x: 512, y: 512, radius: 180, color: "rgba(255, 200, 100, 0.4)", flicker: true },
        { x: 3400, y: 3800, radius: 240, color: "rgba(0, 229, 255, 0.3)", flicker: false }
      ]
    },
    weatherParticles: {
      type: "dandelion_and_pollen",
      density: 45,
      driftVelocity: { x: 0.4, y: 0.2 },
      colorPalette: ["#ffffff", "#e0f2fe", "#fef08a"],
      flutterFrequency: 0.05
    },
    zones: [
      {
        id: "town_of_beginnings",
        name: "Town of Beginnings (Starting City)",
        bounds: { x: 0, y: 0, w: 1400, h: 1400 },
        isSafeZone: true,
        antiCriminalCodeActive: true,
        bgmTrack: "bgm_town_of_beginnings_nostalgia"
      },
      {
        id: "western_plains",
        name: "Tolbana Outskirts & Rolling Meadows",
        bounds: { x: 1401, y: 0, w: 2695, h: 2500 },
        isSafeZone: false,
        antiCriminalCodeActive: false,
        bgmTrack: "bgm_field_plains_adventure"
      },
      {
        id: "labyrinth_zone",
        name: "Labyrinth Area 01 - Catacomb of Ruin",
        bounds: { x: 2600, y: 2501, w: 1496, h: 1595 },
        isSafeZone: false,
        antiCriminalCodeActive: false,
        ambientDarkness: true,
        bgmTrack: "bgm_labyrinth_dread"
      },
      {
        id: "boss_chamber",
        name: "Floor 1 Boss Gate - Throne of the Kobold Lord",
        bounds: { x: 3600, y: 3600, w: 496, h: 496 },
        isSafeZone: false,
        antiCriminalCodeActive: false,
        bossRoomSealOnEnter: true,
        bgmTrack: "bgm_boss_swordland_orchestral"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. PERSONAGGI (NPC) & ALBERI DI DIALOGO INTERATTIVI
  // --------------------------------------------------------------------------
  npcs: [
    {
      id: "klein",
      name: "Klein (Ryoutarou Tsuboi)",
      title: "Spadaccino Errante Novizio",
      guild: "Fuurinkazan (In formazione)",
      spawnPosition: { x: 820, y: 640 },
      avatarSprite: "klein_bandana_starter",
      interactionRadius: 65,
      dialogueTree: {
        root: "greeting",
        nodes: {
          greeting: {
            speaker: "Klein",
            portrait: "klein_grin",
            text: "Ehi, amico dal cappotto nero! Mi hai visto combattere? Quel cinghiale mi ha quasi caricato nelle parti basse... Puoi insegnarmi le basi del puntamento delle Sword Skills?",
            choices: [
              { text: "Certo. Tieni la guardia, aspetta che la spada si illumini e rilascia l'impatto.", next: "tutorial_success" },
              { text: "Devo sbrigarmi a raggiungere il prossimo villaggio prima che le risorse finiscano.", next: "klein_serious" }
            ]
          },
          tutorial_success: {
            speaker: "Klein",
            portrait: "klein_excited",
            text: "HO CAPITO! La posa iniziale fa partire l'assistenza di sistema! Guarda come brilla la sciabola! Sei un ex-Beta Tester, vero? Si vede subito dalla fluidità dei tuoi movimenti!",
            choices: [
              { text: "Sì, ero nella Beta. Il tempo scorre: dobbiamo muoverci.", next: "klein_parting" }
            ]
          },
          klein_serious: {
            speaker: "Klein",
            portrait: "klein_worried",
            text: "Capisco... con l'annuncio di Kayaba di poco fa e la rimozione del pulsante di logout, la gente in città sta impazzendo. Devo trovare i miei compagni di gilda della vita reale. Abbi cura di te, Kirito!",
            choices: [
              { text: "Anche tu, Klein. Non morire per nessuna ragione al mondo.", next: null }
            ]
          },
          klein_parting: {
            speaker: "Klein",
            portrait: "klein_smile",
            text: "Grazie dell'aiuto! Ci vediamo in prima linea quando avrò livellato i miei amici!",
            choices: []
          }
        }
      }
    },
    {
      id: "argo_the_rat",
      name: "Argo 'The Rat'",
      title: "Information Broker di Aincrad",
      guild: "Nessuna (Neutrale)",
      spawnPosition: { x: 1220, y: 1100 },
      avatarSprite: "argo_whiskers_hood",
      interactionRadius: 55,
      shopInventory: [
        { itemId: "guide_book_fl01", name: "Guida al Boss del 1° Piano (Argo Ed.)", costCol: 500 },
        { itemId: "potion_paralysis_cure", name: "Antidoto Naturale x3", costCol: 120 }
      ],
      dialogueTree: {
        root: "argo_hello",
        nodes: {
          argo_hello: {
            speaker: "Argo",
            portrait: "argo_smug",
            text: "Kii-bou! Vendi o compri segreti oggi? Ho informazioni appena sfornate sul Boss del primo piano... e sulla stanza del tesoro dietro le cascate.",
            choices: [
              { text: "Voglio la Guida Strategica al Boss di Illfang.", next: "argo_boss_intel" },
              { text: "Cosa sai del gruppo di Diabel?", next: "argo_diabel_intel" }
            ]
          },
          argo_boss_intel: {
            speaker: "Argo",
            portrait: "argo_serious",
            text: "Attento a quello che c'è scritto: nella Beta usava un'ascia d'osso e un piccolo scudo, ma ricordati che il Cardinal System impara e muta gli schemi d'attacco. Tieniti pronto a sorprese nell'ultima barra HP!",
            choices: [
              { text: "Ricevuto. Grazie per l'avvertimento, Argo.", next: null }
            ]
          },
          argo_diabel_intel: {
            speaker: "Argo",
            portrait: "argo_winking",
            text: "Diabel sta radunando i Clearer all'anfiteatro di Tolbana. Si comporta da nobile cavaliere per unire tutti, ma anche lui ha i suoi occhi puntati sul Last Attack Bonus...",
            choices: [
              { text: "Andrò alla riunione a sentire cosa propone.", next: null }
            ]
          }
        }
      }
    },
    {
      id: "asuna_hooded",
      name: "Ragazza incappucciata (Asuna)",
      title: "Spadaccina Silenziosa del Fioretto",
      guild: "Nessuna",
      spawnPosition: { x: 2750, y: 1280 },
      avatarSprite: "asuna_cloak_early",
      interactionRadius: 60,
      dialogueTree: {
        root: "asuna_bread",
        nodes: {
          asuna_bread: {
            speaker: "Ragazza col Mantello",
            portrait: "asuna_hood_shadow",
            text: "...Perché mi stai fissando? Sto solo mangiando questo pane nero duro come la pietra. Non ho intenzione di fare gruppo con nessuno.",
            choices: [
              { text: "[Usa Crema Dolce di Tolbana sul suo pane]", next: "asuna_cream_reaction" },
              { text: "Hai una velocità d'affondo impressionante con quel fioretto. Sprecarlo qui è un peccato.", next: "asuna_fencing" }
            ]
          },
          asuna_cream_reaction: {
            speaker: "Ragazza col Mantello",
            portrait: "asuna_sparkle_blush",
            text: "C-cosa ci hai messo sopra?! È... delizioso... non sentivo questo sapore da quando siamo stati rinchiusi qui dentro... Come ti chiami?",
            choices: [
              { text: "Sono Kirito. Un giocatore solitario.", next: "asuna_party_offer" }
            ]
          },
          asuna_fencing: {
            speaker: "Ragazza col Mantello",
            portrait: "asuna_cold",
            text: "Non mi interessa diventare forte per vantarmi. Voglio solo finire questo incubo o morire provandoci invece di marcire nella locanda.",
            choices: [
              { text: "Allora vieni al raid di domani. Abbiamo bisogno della tua velocità.", next: "asuna_party_offer" }
            ]
          },
          asuna_party_offer: {
            speaker: "Ragazza col Mantello",
            portrait: "asuna_resolute",
            text: "...D'accordo. Solo per questa battaglia del Boss. Fammi vedere di cosa è capace la tua spada, Kirito.",
            choices: []
          }
        }
      }
    },
    {
      id: "diabel_the_knight",
      name: "Diabel",
      title: "Leader del Raid del 1° Piano",
      guild: "Squadra di Liberazione di Aincrad",
      spawnPosition: { x: 2300, y: 920 },
      avatarSprite: "diabel_knight_armor",
      interactionRadius: 70,
      dialogueTree: {
        root: "diabel_speech",
        nodes: {
          diabel_speech: {
            speaker: "Diabel",
            portrait: "diabel_noble",
            text: "Benvenuti compagni! Oggi siamo qui non per piangerci addosso, ma per abbattere la porta del primo piano e mostrare ai 10.000 giocatori rinchiusi che questo gioco può essere battuto!",
            choices: [
              { text: "Qual è la strategia per i Ruin Kobold Sentinels che lo scortano?", next: "diabel_tactics" }
            ]
          },
          diabel_tactics: {
            speaker: "Diabel",
            portrait: "diabel_command",
            text: "La squadra A e B ingaggeranno i minion. Io guiderò il team principale contro Illfang. Voi due in fondo, Kirito e la ragazza col fioretto: copriteci i fianchi con la tattica Switch!",
            choices: [
              { text: "Affidati a noi. Saremo il vostro scudo.", next: null }
            ]
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
      id: "frenzy_boar",
      name: "Frenzy Boar",
      level: 1,
      zone: "western_plains",
      hp: 120,
      atk: 18,
      def: 6,
      speed: 2.4,
      xpYield: 28,
      colYield: 15,
      collisionRadius: 22,
      aiBehavior: {
        stateMachine: ["WANDER", "AGGRO_ALERT", "TELEGRAPH_CHARGE", "POST_CHARGE_STUN"],
        aggroRadius: 140,
        chargeSpeedMultiplier: 2.8,
        chargeTelegraphTimeMs: 800,
        stunOnWallImpactSeconds: 2.0
      },
      drops: [
        { itemId: "boar_meat", name: "Carne Fresca di Cinghiale", chance: 0.75 },
        { itemId: "boar_hide_rough", name: "Pelle Grezza di Cinghiale", chance: 0.40 },
        { itemId: "bronze_dagger", name: "Pugnale di Bronzo", chance: 0.05 }
      ]
    },
    {
      id: "little_nepenthes",
      name: "Little Nepenthes",
      level: 3,
      zone: "western_plains",
      hp: 210,
      atk: 29,
      def: 12,
      speed: 1.8,
      xpYield: 45,
      colYield: 32,
      collisionRadius: 26,
      aiBehavior: {
        stateMachine: ["CAMOUFLAGE", "VINE_WHIP", "POISON_SPORES"],
        specialMechanic: "SE_HA_IL_FRUTTO_ATTIRA_BRANCO_COL_SUO_PIANTO",
        aggroRadius: 120,
        poisonDamagePerSec: 4,
        poisonDurationSec: 6
      },
      drops: [
        { itemId: "nepenthes_vine", name: "Vite Flessibile di Nepenthes", chance: 0.60 },
        { itemId: "nepenthes_flower_sap", name: "Linfa Floreale Dolce", chance: 0.25 },
        { itemId: "nepenthes_ovule_rare", name: "Ovulo di Nepenthes (Quest Item)", chance: 0.02 }
      ]
    },
    {
      id: "dire_wolf_alpha",
      name: "Dire Wolf of Tolbana",
      level: 5,
      zone: "western_plains",
      hp: 340,
      atk: 44,
      def: 16,
      speed: 3.6,
      xpYield: 85,
      colYield: 65,
      collisionRadius: 24,
      aiBehavior: {
        stateMachine: ["CIRCLE_PREY", "LUNGE_BITE", "HOWL_CALL_PACK"],
        packHunter: true,
        flankAngleVariance: 0.8
      },
      drops: [
        { itemId: "dire_wolf_fang", name: "Zanna di Lupo Grigio", chance: 0.55 },
        { itemId: "dire_wolf_pelt", name: "Pelliccia Folta", chance: 0.35 }
      ]
    },
    {
      id: "ruin_kobold_trooper",
      name: "Ruin Kobold Trooper",
      level: 7,
      zone: "labyrinth_zone",
      hp: 580,
      atk: 62,
      def: 28,
      speed: 2.6,
      xpYield: 140,
      colYield: 110,
      collisionRadius: 28,
      equippedWeapons: ["Iron Hatchet", "Wooden Buckler"],
      aiBehavior: {
        stateMachine: ["PATROL_HALLWAY", "GUARD_STANCE", "SHIELD_BASH", "SWING_CHOP"],
        parryableWindowFrames: 18,
        blockChance: 0.35
      },
      drops: [
        { itemId: "iron_hatchet", name: "Accetta di Ferro dei Koboldi", chance: 0.15 },
        { itemId: "ruin_iron_scrap", name: "Frammenti di Ferro del Labirinto", chance: 0.50 }
      ]
    },
    {
      id: "ruin_kobold_sentinel",
      name: "Ruin Kobold Sentinel (Boss Bodyguard)",
      level: 9,
      zone: "boss_chamber",
      hp: 1100,
      atk: 88,
      def: 42,
      speed: 2.9,
      xpYield: 320,
      colYield: 240,
      collisionRadius: 32,
      equippedWeapons: ["Heavy Halberd"],
      aiBehavior: {
        stateMachine: ["DEFEND_LORD", "HALBERD_THRUST", "SWEEP_CLEAVE"],
        bodyguardTarget: "illfang_kobold_lord",
        interveneThresholdDistance: 120
      },
      drops: [
        { itemId: "kobold_sentinel_halberd", name: "Alabarda della Sentinella", chance: 0.20 },
        { itemId: "high_healing_crystal", name: "Cristallo di Recupero HP", chance: 0.40 }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 4. BOSS DELL'AREA: ILLFANG THE KOBOLD LORD
  // --------------------------------------------------------------------------
  boss: {
    id: "illfang_kobold_lord",
    name: "Illfang the Kobold Lord",
    title: "Signore Supremo delle Rovine di Tolbana",
    floorNumber: 1,
    sizeRadius: 58,
    totalHpGauges: 4,
    maxHpPerGauge: 3200,
    totalEffectiveHp: 12800,
    baseDef: 55,
    attackPower: 145,
    criticalRate: 0.15,

    // Gauge Colors: 4 = Verde, 3 = Giallo, 2 = Arancione, 1 = Rosso
    gaugeColors: ["#ef4444", "#f97316", "#eab308", "#22c55e"],

    // Fasi del combattimento
    phases: [
      {
        phaseIndex: 1,
        hpGaugeThreshold: 4, // 100% -> 75%
        weaponMain: "Heavy Bone Axe",
        weaponOff: "Spiked Buckler",
        combatStyle: "HEAVY_BRUTE",
        movementSpeed: 2.2,
        skills: [
          {
            name: "Overhead Splitting Cleave",
            damageMultiplier: 2.0,
            castTimeMs: 1100,
            cooldownMs: 6000,
            telegraphShape: "RECTANGLE_FORWARD",
            range: 140,
            width: 40,
            canBeParried: true
          },
          {
            name: "Shield Slam & Concussion",
            damageMultiplier: 1.2,
            stunDurationSeconds: 2.5,
            castTimeMs: 600,
            cooldownMs: 8000,
            telegraphShape: "ARC_CONE",
            range: 80
          }
        ],
        addsSpawnCondition: "AT_START_3_SENTINELS"
      },
      {
        phaseIndex: 2,
        hpGaugeThreshold: 3, // 75% -> 50%
        weaponMain: "Heavy Bone Axe",
        weaponOff: "Spiked Buckler",
        combatStyle: "AGGRESSIVE_STOMP",
        movementSpeed: 2.6,
        skills: [
          {
            name: "Ground Shaker Stomp",
            damageMultiplier: 1.5,
            castTimeMs: 900,
            cooldownMs: 7000,
            telegraphShape: "FULL_CIRCLE",
            radius: 160,
            knocksBack: true
          }
        ],
        addsSpawnCondition: "SPAWN_3_SENTINELS_ON_ENTER"
      },
      {
        phaseIndex: 3,
        hpGaugeThreshold: 2, // 50% -> 25%
        weaponMain: "Heavy Bone Axe",
        weaponOff: "Spiked Buckler",
        combatStyle: "FRENZY_ROAR",
        movementSpeed: 3.0,
        enrageBuffs: { attackBuffPct: 20 },
        addsSpawnCondition: "SPAWN_3_SENTINELS_ON_ENTER"
      },
      {
        phaseIndex: 4,
        hpGaugeThreshold: 1, // 25% -> 0% (COLPO DI SCENA DALLA BETA)
        isBetaDeviation: true,
        dialogueCue: "Illfang getta a terra l'ascia e lo scudo! Estrae una sciabola ricurva TALWAR dal dorso!",
        weaponMain: "Karatachi / Talwar Curved Katana",
        weaponOff: "Empty Hand (Agile Acrobatics)",
        combatStyle: "ACROBATIC_KATANA_DUELIST",
        movementSpeed: 4.8, // Velocità più che raddoppiata
        enrageBuffs: { attackBuffPct: 45, evasionBuffPct: 30 },
        skills: [
          {
            name: "Tsumujiguruma (Tornado Whirlwind Slash)",
            damageMultiplier: 3.5,
            castTimeMs: 450,
            cooldownMs: 4500,
            telegraphShape: "RAPID_DASH_CIRCLE",
            range: 220,
            canBreakGuardInstantly: true,
            lethalToDiabelPattern: true
          },
          {
            name: "Wall-Bounce Leap Ambush",
            damageMultiplier: 2.8,
            castTimeMs: 700,
            cooldownMs: 6500,
            telegraphShape: "TARGET_PLAYER_CIRCLE",
            radius: 120
          }
        ],
        addsSpawnCondition: "NONE_SOLO_EXECUTION"
      }
    ],

    // Tabella delle ricompense
    lootTable: {
      standardDrops: [
        { itemId: "illfang_talwar_shard", name: "Frammento della Lama di Talwar", count: 2, chance: 1.0 },
        { itemId: "col_pouch_boss", name: "Borsa di Col del Piano 1 (5,000 Col)", chance: 1.0 },
        { itemId: "exp_reward", amount: 4800 }
      ],
      // Last Attack (LA) Bonus canonico di Kirito
      lastAttackBonus: {
        itemId: "coat_of_midnight",
        name: "Coat of Midnight (Mantello di Mezzanotte)",
        type: "EQUIPMENT_CHEST",
        rarity: "UNIQUE_RELIC",
        description: "Il leggendario soprabito di cuoio corvino ottenuto infliggendo il colpo di grazia al Boss del 1° Piano. Conferisce occultamento, bonus a destrezza ed elusione.",
        statsBonus: {
          defense: 38,
          agility: +18,
          stealthRating: +25,
          darkResistPct: 15
        },
        flavorQuote: "«Il nero riflette le ombre di chi cammina da solo.»"
      }
    }
  },

  // --------------------------------------------------------------------------
  // 5. EVENTI SCRITTURATI & TRIGGERS DI TRAMA
  // --------------------------------------------------------------------------
  scriptedEvents: [
    {
      eventId: "diabel_fatal_charge",
      triggerCondition: "BOSS_HP_GAUGE_1_REACHED_AND_TALWAR_DRAWN",
      execute(gameState) {
        return {
          cutsceneId: "diabel_ambush_warning",
          announcement: "ATTENZIONE! Diabel si lancia per il Last Attack ignorando il cambio di arma!",
          kiritoActionRequired: "INTERCEPT_OR_SWITCH",
          windowDurationMs: 2500,
          onTimeout: "DIABEL_FALLS_KIRITO_TAKES_BURDEN",
          onSuccess: "PERFECT_PARRY_OPENING"
        };
      }
    },
    {
      eventId: "beater_declaration",
      triggerCondition: "BOSS_DEFEATED",
      execute(gameState) {
        return {
          cutsceneId: "beater_speech",
          dialogue: "«Non osate paragonarmi a quei dilettanti dei beta tester. Io ho raggiunto piani che loro non hanno mai visto. Da oggi chiamatemi pure un Beater... un imbroglione.»",
          unlockedTitles: ["The Black Swordsman", "Beater"],
          unlockedFloors: [2],
          teleportGateActivated: "Town of Beginnings -> Urbus (Floor 2)"
        };
      }
    }
  ]
};
