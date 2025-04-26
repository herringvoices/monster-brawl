import { SpecialAbilityFn } from "../../interfaces/SpecialAbilityFn";
import {
  wolfPackTactics,
  wolfPounce,
  snakeVenomStrike,
  snakeConstrict,
  hawkTalonDive,
  hawkSkystrike,
  bearMaul,
  bearCrushingSwipe,
  owlNightAmbush,
  owlSilentTalons,
} from "./monsterAbilities";

// Define monster types and their configuration
export interface MonsterAbilityConfig {
  specialAbilities: SpecialAbilityFn[];
  specialTitles: string[];
  specialDescriptions: string[];
}

// Group monster abilities by type
export const monsterAbilityConfigs: Record<string, MonsterAbilityConfig> = {
  wolf: {
    specialAbilities: [wolfPackTactics, wolfPounce],
    specialTitles: ["Pack Tactics", "Pounce"],
    specialDescriptions: [
      "Roll 0 – 6 twice; sum (0 – 12)",
      "80% chance to deal 9 damage; 20% chance to miss",
    ],
  },
  snake: {
    specialAbilities: [snakeVenomStrike, snakeConstrict],
    specialTitles: ["Venom Strike", "Constrict"],
    specialDescriptions: [
      "Deal 6 damage and heal 3 HP",
      "Roll 0 – 8 and add 2 damage (2 – 10)",
    ],
  },
  hawk: {
    specialAbilities: [hawkTalonDive, hawkSkystrike],
    specialTitles: ["Talon Dive", "Skystrike"],
    specialDescriptions: [
      "70% chance to deal 12 damage; 30% chance to miss",
      "Roll 0 – 4 three times; sum (0 – 12)",
    ],
  },
  bear: {
    specialAbilities: [bearMaul, bearCrushingSwipe],
    specialTitles: ["Maul", "Crushing Swipe"],
    specialDescriptions: [
      "Roll 0 – 10 and add 2 damage (2 – 12)",
      "Deal flat 8 damage",
    ],
  },
  owl: {
    specialAbilities: [owlNightAmbush, owlSilentTalons],
    specialTitles: ["Night Ambush", "Silent Talons"],
    specialDescriptions: [
      "Deal 5 damage, then roll 0 – 5 for extra (5 – 10)",
      "75% chance to deal 10 damage; 25% chance to miss",
    ],
  },
};
