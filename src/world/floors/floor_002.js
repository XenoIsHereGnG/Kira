/**
 * ============================================================================
 * SWORD ART ONLINE 2D - FLOOR 002 DEFINITION MODULE
 * Piano 2: Urbus Tableland, Red Mesa Canyons & The Taurus Stronghold
 * ============================================================================
 */

export const FLOOR_002 = {
  metadata: {
    id: 2,
    floorNumber: 2,
    codename: "FL02_URBUS_TABLELAND",
    title: "The Hollow Mesa and the Raging Horns",
    diameterKm: 9.2,
    labyrinthFloorSpan: "Floor 2 - Chambers 1 to 24",
    recommendedLevelRange: { min: 10, max: 18 },
    isFloorClearedByDefault: false
  },

  // --------------------------------------------------------------------------
  // 1. FISICA DEL MONDO E PARAMETRI D'AMBIENTE
  // --------------------------------------------------------------------------
  physics: {
    engineMode: "TOP_DOWN_ARPG",
    worldBounds: { minX: 0, maxX: 4096, minY: 0, maxY: 4096 },
    baseFriction: 0.85,
    playerSpeedModifier: 0.95, // Terreno ghiaioso/scosceso
    dashImpulse: 11.5,
    dashDurationFrames: 12,
    dodgeInvulnerabilityFrames: 14,
    environmentalHazards: {
      canyonGusts: {
        active: true,
        windVector: { x: -0.6, y: 0.0 }, // Spinta del vento nei ponti sospesi
        staminaDrainModifier: 1.15
      },
      quarryDebris: {
        impactStunFrames: 30,
        fallingBoulderChance: 0.03
      }
    },
    collisionLayers: {
      SAFE_ZONE: 0b0001,
      MESA_CLIFFS: 0b0010,
      LABYRINTH_DUNGEON: 0b0100,
      BREAKABLE_BOULDER: 0b1000
    }
  },

  environment: {
    theme: "rocky_mesa",
    lighting: {
      ambientColorDay: "#fff2e0",
      ambientColorDusk: "#c2410c",
      ambientColorNight: "#1c1917",
      canyonShadowFactor: 0.55,
      pointLights: [
        { x: 2048, y: 2048, radius: 350, color: "rgba(251, 146, 60, 0.4)", flicker: true }, // Focolare centrale di Urbus
        { x: 3700, y: 3700, radius: 280, color: "rgba(220, 38, 38, 0.5)", flicker: true }   // Bracieri del Boss
      ]
    },
    weatherParticles: {
      type: "mesa_sandstorm_and_dust",
      density: 35,
      driftVelocity: { x: -0.8, y: 0.15 },
      colorPalette: ["#fdba74", "#b45309", "#78350f"],
      flutterFrequency: 0.08
    },
    zones: [
      {
        id: "urbus_city",
        name: "Urbus (Città Scavata nella Montagna)",
        bounds: { x: 1400, y: 1400, w: 1300, h: 1300 },
        isSafeZone: true,
        antiCriminalCodeActive: true,
        bgmTrack: "bgm_urbus_crafting_drums",
        features: ["Blacksmith Alley", "Roast Beef Taverns", "Underground Ring Plaza"]
      },
      {
        id: "marome_plains",
        name: "Piane Rocciose di Marome",
        bounds: { x: 0, y: 0, w: 1400, h: 4096 },
        isSafeZone: false,
        antiCriminalCodeActive: false,
        bgmTrack: "bgm_rocky_badlands_exploration"
      },
      {
        id: "martial_arts_mountain",
        name: "Picco dell'Asceta (Sentiero delle Arti Marziali)",
        bounds: { x: 1401, y: 0, w: 2695, h: 1399 },
        isSafeZone: false,
        antiCriminalCodeActive: false,
        specialRule: "UNARMED_TRIAL_AREA",
        bgmTrack: "bgm_mountain_solitude"
      },
      {
        id: "taurus_labyrinth",
        name: "Labirinto del 2° Piano - Bastione dei Minotauri",
        bounds: { x: 2700, y: 1400, w: 1396, h: 2696 },
        isSafeZone: false,
        antiCriminalCodeActive: false,
        bgmTrack: "bgm_labyrinth_drums_brass"
      },
      {
        id: "boss_chamber_taurus",
        name: "Sala del Trono del Colonnello Toro",
        bounds: { x: 3500, y: 3500, w: 596, h: 596 },
        isSafeZone: false,
        antiCriminalCodeActive: false,
        bossRoomSealOnEnter: true,
        bgmTrack: "bgm_boss_stampede_orchestral"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. PERSONAGGI (NPC) & ALBERI DI DIALOGO INTERATTIVI
  // --------------------------------------------------------------------------
  npcs: [
    {
      id: "asuna_partner",
      name: "Asuna",
      title: "Spadaccina del Fioretto (Wind Fleuret)",
      guild: "Nessuna (In party con Kirito)",
      spawnPosition: { x: 1650, y: 1800 },
      avatarSprite: "asuna_leather_tunic",
      interactionRadius: 65,
      dialogueTree: {
        root: "asuna_upgrade_worry",
        nodes: {
          asuna_upgrade_worry: {
            speaker: "Asuna",
            portrait: "asuna_serious",
            text: "Kirito, hai visto le statistiche del boss Baran? Ha una corazza spessa il doppio rispetto a Illfang. Il mio Wind Fleuret ha bisogno di un potenziamento a +4 prima di entrare nel labirinto.",
            choices: [
              { text: "C'è un fabbro qui a Urbus che vanta un'alta percentuale di successo: Nezha.", next: "asuna_nezha_doubt" },
              { text: "I mostri toro infliggono Numbness (Intorpidimento). Facciamo scorta di pozioni curative.", next: "asuna_potions" }
            ]
          },
          asuna_nezha_doubt: {
            speaker: "Asuna",
            portrait: "asuna_thinking",
            text: "Ho sentito voci contrastanti... alcuni giocatori dicono che durante i suoi tentativi di potenziamento le armi sono svanite nel nulla invece di rompersi. Teniamo gli occhi aperti.",
            choices: [
              { text: "Verificherò di persona come opera sul mio equipaggiamento.", next: null }
            ]
          },
          asuna_potions: {
            speaker: "Asuna",
            portrait: "asuna_smile",
            text: "Ho già preparato dieci fiale di unguento anti-paralisi usando le bacche di Marome. Non preoccuparti, ti copro io le spalle con lo Switch!",
            choices: []
          }
        }
      }
    },
    {
      id: "nezha_blacksmith",
      name: "Nezha",
      title: "Fabbro di Urbus (Legendary Braves)",
      guild: "Legendary Braves (Segreta)",
      spawnPosition: { x: 1820, y: 1950 },
      avatarSprite: "nezha_blacksmith_apron",
      interactionRadius: 60,
      dialogueTree: {
        root: "nezha_craft_pitch",
        nodes: {
          nezha_craft_pitch: {
            speaker: "Nezha",
            portrait: "nezha_nervous",
            text: "B-benvenuti alla mia forgia! Uso martelli bilanciati con minerali del canyon. Posso portare la tua spada al livello successivo con solo il 15% di rischio di fallimento!",
            choices: [
              { text: "[Affida Anneal Blade per potenziamento +6]", next: "nezha_attempt_scam" },
              { text: "Perché le tue mani tremano mentre maneggi l'incudine?", next: "nezha_defensive" }
            ]
          },
          nezha_attempt_scam: {
            speaker: "Nezha",
            portrait: "nezha_sweat",
            text: "P-perfetto! Iniziamo... Colpo uno... colpo due... [Uno strano bagliore avvolge l'arma mentre Nezha apre furtivamente il menu trade rapido]",
            choices: [
              { text: "[Sleight of Hand Trap: Blocca il suo polso prima che attivi il comando]", next: "nezha_caught" }
            ]
          },
          nezha_caught: {
            speaker: "Nezha",
            portrait: "nezha_shocked",
            text: "C-come hai fatto a capire?! Tu... tu hai visto che stavo scambiando l'arma con un clone identico a durabilità zero?!",
            choices: [
              { text: "Nessun fabbro autentico guarda il proprio inventario invece del metallo sull'incudine. Chi c'è dietro questa truffa?", next: null }
            ]
          },
          nezha_defensive: {
            speaker: "Nezha",
            portrait: "nezha_nervous",
            text: "È solo la fatica del focolare! I minerali di questo piano sono duri da modellare, tutto qui...",
            choices: []
          }
        }
      }
    },
    {
      id: "lind_dda_leader",
      name: "Lind",
      title: "Comandante della DDA (Dragon Knights Brigade)",
      guild: "Dragon Knights Brigade",
      spawnPosition: { x: 2200, y: 2200 },
      avatarSprite: "lind_blue_plate",
      interactionRadius: 65,
      dialogueTree: {
        root: "lind_briefing",
        nodes: {
          lind_briefing: {
            speaker: "Lind",
            portrait: "lind_proud",
            text: "Dopo la caduta di Diabel, non possiamo permettere che i Clearer si disperdano nel caos. La mia gilda guiderà il fronte. Voi giocatori solitari limitatevi a non intralciare la nostra formazione con lo scudo a torre.",
            choices: [
              { text: "Baran usa colpi contundenti con onde d'urto ad area. Gli scudi a torre assorbono il danno, ma non lo scuotimento sismico.", next: "lind_stubborn" },
              { text: "Basta che i vostri uomini mantengano la linea per consentirci le Sword Skills sui fianchi.", next: "lind_agree" }
            ]
          },
          lind_stubborn: {
            speaker: "Lind",
            portrait: "lind_frown",
            text: "La nostra difesa è indistruttibile, Beater. Pensa a te stesso e non fare il maestro.",
            choices: []
          },
          lind_agree: {
            speaker: "Lind",
            portrait: "lind_nod",
            text: "Se adempirete al vostro ruolo di supporto d'assalto, condivideremo la ricompensa dei forzieri.",
            choices: []
          }
        }
      }
    },
    {
      id: "hermit_monk_jin",
      name: "Vecchio Eremita Jin",
      title: "Maestro delle Tecniche Senza Spada",
      guild: "Nessuna (NPC Questmaster)",
      spawnPosition: { x: 3100, y: 450 },
      avatarSprite: "old_monk_robes",
      interactionRadius: 55,
      dialogueTree: {
        root: "jin_trial",
        nodes: {
          jin_trial: {
            speaker: "Eremita Jin",
            portrait: "monk_calm",
            text: "La lama può spezzarsi, il metallo può fondersi, ma il corpo temprato non tradisce mai. Dietro di me c'è il Masso dell'Eco. Frantumalo con le sole nocche senza impugnare armi, e ti trasmetterò l'arte marziale.",
            choices: [
              { text: "Accetto la prova: mostrami dove colpire per trovare il punto di frattura.", next: "jin_strike" },
              { text: "Uno spadaccino combatte con l'acciaio, non a mani nude.", next: "jin_reject" }
            ]
          },
          jin_strike: {
            speaker: "Eremita Jin",
            portrait: "monk_smile",
            text: "Trova la linea azzurra del sistema e scaglia il pugno nell'istante in cui vibra. Non esitare!",
            choices: []
          },
          jin_reject: {
            speaker: "Eremita Jin",
            portrait: "monk_disappointed",
            text: "Chi dipende ciecamente dalla lama resta inerme quando essa viene disarmata. Torna se aprirai la mente.",
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
      id: "trembling_ox",
      name: "Trembling Ox",
      level: 11,
      zone: "marome_plains",
      hp: 680,
      atk: 74,
      def: 38,
      speed: 2.1,
      xpYield: 180,
      colYield: 95,
      collisionRadius: 30,
      aiBehavior: {
        stateMachine: ["GRAZE", "STOMP_GROUND", "HEAVY_TRAMPLE"],
        aggroRadius: 130,
        stompTremorRadius: 80,
        trampleSpeedMultiplier: 2.5
      },
      drops: [
        { itemId: "prime_beef_fl02", name: "Bistecca Pregiata di Marome", chance: 0.85 },
        { itemId: "tough_ox_horn", name: "Corno Robusto di Bue", chance: 0.45 },
        { itemId: "leather_belt_sturdy", name: "Cinturone Rinforzato", chance: 0.08 }
      ]
    },
    {
      id: "mesa_canyon_scorpion",
      name: "Mesa Canyon Scorpion",
      level: 13,
      zone: "marome_plains",
      hp: 820,
      atk: 92,
      def: 55,
      speed: 3.2,
      xpYield: 240,
      colYield: 130,
      collisionRadius: 26,
      aiBehavior: {
        stateMachine: ["BURROW_AMBUSH", "PINCER_GRAB", "NUMBING_STINGER"],
        aggroRadius: 110,
        inflictsStatus: { type: "PARALYSIS", durationMs: 3000, chance: 0.3 }
      },
      drops: [
        { itemId: "scorpion_carapace_plate", name: "Corazza Chitina Rigida", chance: 0.60 },
        { itemId: "paralysis_stinger_fluid", name: "Sacca di Veleno Paralizzante", chance: 0.35 }
      ]
    },
    {
      id: "taurus_vanguard_trooper",
      name: "Taurus Vanguard Trooper",
      level: 15,
      zone: "taurus_labyrinth",
      hp: 1450,
      atk: 128,
      def: 72,
      speed: 2.7,
      xpYield: 410,
      colYield: 220,
      collisionRadius: 34,
      equippedWeapons: ["Spiked Morningstar", "Bronze Buckler"],
      aiBehavior: {
        stateMachine: ["PATROL", "SHIELD_WALL", "BULL_RUSH", "OVERHEAD_SMASH"],
        parryableWindowFrames: 16,
        guardBreakVulnerabilityMs: 1200
      },
      drops: [
        { itemId: "bronze_morningstar", name: "Mazza Chiodata di Bronzo", chance: 0.12 },
        { itemId: "taurus_iron_band", name: "Fascia di Ferro dei Minotauri", chance: 0.50 }
      ]
    },
    {
      id: "taurus_shaman_caster",
      name: "Taurus Ritual Shaman",
      level: 16,
      zone: "taurus_labyrinth",
      hp: 1100,
      atk: 142,
      def: 45,
      speed: 2.3,
      xpYield: 460,
      colYield: 280,
      collisionRadius: 28,
      equippedWeapons: ["Bone Totem Staff"],
      aiBehavior: {
        stateMachine: ["KEEP_DISTANCE", "EARTH_SPIKE_CAST", "BUFF_ALLIES_DEFENSE"],
        castTimeMs: 1400,
        interruptible: true
      },
      drops: [
        { itemId: "totem_wood_fragment", name: "Frammento di Legno Rituale", chance: 0.40 },
        { itemId: "speed_crystal_medium", name: "Cristallo di Rapidità", chance: 0.25 }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 4. BOSS DELL'AREA: BARAN THE GENERAL BULL (AFFIANCATO DA NATTO)
  // --------------------------------------------------------------------------
  boss: {
    id: "baran_general_bull",
    name: "Baran the General Bull",
    title: "Comandante Supremo delle Armate Taurine",
    floorNumber: 2,
    sizeRadius: 64,
    totalHpGauges: 5,
    maxHpPerGauge: 5400,
    totalEffectiveHp: 27000,
    baseDef: 85,
    attackPower: 215,
    criticalRate: 0.18,

    gaugeColors: ["#dc2626", "#ea580c", "#d97706", "#65a30d", "#16a34a"],

    phases: [
      {
        phaseIndex: 1,
        hpGaugeThreshold: 5, // 100% -> 80%
        weaponMain: "Colossal Stone Warhammer",
        weaponOff: "None (Two-Handed Grip)",
        combatStyle: "HEAVY_EARTHSHAKER",
        movementSpeed: 2.4,
        skills: [
          {
            name: "Tremor Slam (Fenditura Sismica)",
            damageMultiplier: 2.2,
            castTimeMs: 1200,
            cooldownMs: 7000,
            telegraphShape: "CONE_FORWARD_SHOCKWAVE",
            range: 180,
            angleDeg: 60,
            inflictsKnockdown: true
          },
          {
            name: "Sweeping Horn Gore",
            damageMultiplier: 1.6,
            castTimeMs: 700,
            cooldownMs: 5000,
            telegraphShape: "WIDE_ARC",
            range: 100
          }
        ]
      },
      {
        phaseIndex: 2,
        hpGaugeThreshold: 4, // 80% -> 60%
        weaponMain: "Colossal Stone Warhammer",
        combatStyle: "CHARGE_AND_PULVERIZE",
        movementSpeed: 2.9,
        skills: [
          {
            name: "Unstoppable Stampede",
            damageMultiplier: 2.8,
            castTimeMs: 800,
            cooldownMs: 9000,
            telegraphShape: "LINEAR_RECTANGLE_FULL_ARENA",
            speedMultiplier: 3.2,
            wallCollisionStunMs: 2000 // Se si schianta contro il muro, resta stordito
          }
        ],
        reinforcementSpawn: {
          mobId: "taurus_vanguard_trooper",
          count: 2
        }
      },
      {
        phaseIndex: 3,
        hpGaugeThreshold: 3, // 60% -> 40%
        weaponMain: "Twin Battle-axes of the Mesa",
        weaponOff: "Offhand Battle-axe",
        combatStyle: "DUAL_AXE_BERSERK",
        movementSpeed: 3.5,
        skills: [
          {
            name: "Double Cyclone Guillotine",
            damageMultiplier: 3.2,
            castTimeMs: 650,
            cooldownMs: 6000,
            telegraphShape: "EXPANDING_DOUBLE_CIRCLE",
            radius: 190,
            canBreakShields: true
          }
        ]
      },
      {
        phaseIndex: 4,
        hpGaugeThreshold: 2, // 40% -> 20%
        weaponMain: "Twin Battle-axes of the Mesa",
        combatStyle: "ROARING_WRATH",
        movementSpeed: 4.0,
        enrageBuffs: { attackBuffPct: 30, defPenaltyPct: 15 },
        environmentalHazardsActive: true // Crollo di stalattiti dal soffitto
      },
      {
        phaseIndex: 5,
        hpGaugeThreshold: 1, // 20% -> 0%
        weaponMain: "Molten Great Horns & Broken Axes",
        combatStyle: "DESPERATE_STAMPEDE_OVERDRIVE",
        movementSpeed: 4.6,
        enrageBuffs: { attackBuffPct: 50, criticalRateBuff: 0.25 },
        skills: [
          {
            name: "Cataclysmic Mesa Tremor",
            damageMultiplier: 4.0,
            castTimeMs: 500,
            cooldownMs: 4000,
            telegraphShape: "ARENA_WIDE_CRACK",
            safeZones: [{ x: 3550, y: 3550, radius: 45 }, { x: 4000, y: 4000, radius: 45 }]
          }
        ]
      }
    ],

    lootTable: {
      standardDrops: [
        { itemId: "taurus_general_horn", name: "Corno Spezzato del Generale Baran", count: 2, chance: 1.0 },
        { itemId: "col_pouch_fl02", name: "Sacco di Col (12,000 Col)", chance: 1.0 },
        { itemId: "exp_reward", amount: 9600 }
      ],
      lastAttackBonus: {
        itemId: "taurus_horn_cuirass",
        name: "Taurus Horn Cuirass (Corazza dei Corni Taurini)",
        type: "EQUIPMENT_CHEST",
        rarity: "EPIC_RELIC",
        description: "Pettorina forgiata dalle corna e dal metallo pesante di Baran. Fornisce immunità alla perdita di equilibrio e aumenta il danno da contrattacco.",
        statsBonus: {
          defense: 58,
          poise: +40,
          shockwaveResistPct: 50,
          counterAttackMultiplier: 1.25
        },
        flavorQuote: "«Nessun terremoto può scalzare colui che si erge con la risolutezza del toro.»"
      }
    }
  },

  // --------------------------------------------------------------------------
  // 5. EVENTI SCRITTURATI & TRIGGERS DI TRAMA
  // --------------------------------------------------------------------------
  scriptedEvents: [
    {
      eventId: "martial_arts_quest_break_rock",
      triggerCondition: "PLAYER_INTERACTS_WITH_ECHO_BOULDER_UNARMED",
      execute(gameState) {
        return {
          minigameType: "RHYTHM_TIMED_STRIKE",
          requiredHits: 3,
          successWindowFrames: 8,
          onSuccessReward: {
            unlockedSkillSlot: "MARTIAL_ARTS",
            skillName: "Senzanpaku (Flash Strike Punch)",
            proficiencyGranted: 1
          },
          dialogueOutput: "Il Masso dell'Eco si spacca in due con un boato fragoroso. Hai sbloccato l'Extra Skill: Arti Marziali!"
        };
      }
    },
    {
      eventId: "blacksmith_conspiracy_reveal",
      triggerCondition: "NEZHA_SCAM_INTERCEPTED",
      execute(gameState) {
        return {
          questUpdate: "THE_SCAM_OF_THE_BRAVES",
          revealedFactions: ["Legendary Braves Guild"],
          protectedEquipment: "Anneal Blade +6 Salvata",
          moraleBuffParty: true
        };
      }
    },
    {
      eventId: "floor_002_clear_gate",
      triggerCondition: "BARAN_DEFEATED",
      execute(gameState) {
        return {
          announcement: "CONGRATULATIONS! Floor 2 Cleared. Teleport Gate Opened to Floor 3 (Zumfel).",
          unlockedFloors: [3],
          teleportGateActivated: "Urbus (Floor 2) -> Zumfel (Floor 3)"
        };
      }
    }
  ]
};
