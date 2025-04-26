import { SpecialAbilityFn } from "../../interfaces/SpecialAbilityFn";
import {
  fighterShieldSlam,
  fighterPowerStrike,
  barbarianBloodSacrifice,
  barbarianBerserkerFury,
  paladinDivineSmite,
  paladinLayOnHands,
  archerPiercingShot,
  archerVolley,
  rogueAssassinate,
  rogueDoubleStab,
  monkFlurryOfBlows,
  monkInnerPeace,
  mageFireball,
  mageArcaneBlast,
  necromancerLifeDrain,
  necromancerDarkRitual,
  healerRejuvenation,
  healerSoothingRain,
} from "./heroAbilities";

// Define hero types and their configuration
export interface HeroAbilityConfig {
  specialAbilities: SpecialAbilityFn[];
  specialTitles: string[];
  specialDescriptions: string[];
}

// Create hero ability arrays organized by hero type
export const heroAbilityConfigs: Record<string, HeroAbilityConfig> = {
  fighter: {
    specialAbilities: [fighterShieldSlam, fighterPowerStrike],
    specialTitles: ["Shield Slam", "Power Strike"],
    specialDescriptions: [
      "Deal 4 damage and reduce your next incoming damage by half",
      "Roll 0–10 and add 2 damage",
    ],
  },
  barbarian: {
    specialAbilities: [barbarianBloodSacrifice, barbarianBerserkerFury],
    specialTitles: ["Blood Sacrifice", "Berserker Fury"],
    specialDescriptions: [
      "Lose 5 HP; deal 16 damage",
      "70% chance to deal 14; 20% chance to do nothing; 10% chance to self‑damage 7",
    ],
  },
  paladin: {
    specialAbilities: [paladinDivineSmite, paladinLayOnHands],
    specialTitles: ["Divine Smite", "Lay on Hands"],
    specialDescriptions: ["Roll 0–8 and add 4 damage", "Heal 10 HP"],
  },
  archer: {
    specialAbilities: [archerPiercingShot, archerVolley],
    specialTitles: ["Piercing Shot", "Volley"],
    specialDescriptions: [
      "Roll 0–8 and add 4 damage",
      "Roll 0–4 three times; sum for total damage (0–12)",
    ],
  },
  rogue: {
    specialAbilities: [rogueAssassinate, rogueDoubleStab],
    specialTitles: ["Assassinate", "Double Stab"],
    specialDescriptions: [
      "70% chance to deal 12 damage; 30% chance to miss",
      "Roll 0–8 twice; add both results",
    ],
  },
  monk: {
    specialAbilities: [monkFlurryOfBlows, monkInnerPeace],
    specialTitles: ["Flurry of Blows", "Inner Peace"],
    specialDescriptions: [
      "Roll Basic Attack three times; take the highest result",
      "Deal 6 damage and heal 6 HP",
    ],
  },
  mage: {
    specialAbilities: [mageFireball, mageArcaneBlast],
    specialTitles: ["Fireball", "Arcane Blast"],
    specialDescriptions: [
      "60% chance to deal 14 damage; 40% chance to fizzle (0)",
      "Roll 0–12 and add 2 damage (2–14)",
    ],
  },
  necromancer: {
    specialAbilities: [necromancerLifeDrain, necromancerDarkRitual],
    specialTitles: ["Life Drain", "Dark Ritual"],
    specialDescriptions: [
      "Deal 8 damage and heal 4 HP",
      "Flip a coin—heads deal 14 damage; tails heal 7 HP",
    ],
  },
  healer: {
    specialAbilities: [healerRejuvenation, healerSoothingRain],
    specialTitles: ["Rejuvenation", "Soothing Rain"],
    specialDescriptions: [
      "Heal 12 HP",
      "Roll 0–8 and add 2; heal that amount (2–10)",
    ],
  },
};
