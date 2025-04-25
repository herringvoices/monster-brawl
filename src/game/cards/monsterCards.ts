import { MonsterCard } from "../../components/game/cards/MonsterCard";
import { SpecialAbilityFn } from "../../components/game/cards/types";
import { CharacterCard } from "../../components/game/cards/CharacterCard";

// Define monster types and their configuration
interface MonsterConfig {
  name: string;
  maxHealth: number;
  attackRange: [number, number];
  specialAbilities: SpecialAbilityFn[];
  specialTitles: string[];
  specialDescriptions: string[];
}

// Utility functions for common monster special ability operations
const rollDamage = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const performChanceEffect = (chance: number, successFn: () => void): void => {
  if (Math.random() < chance) {
    successFn();
  }
  // Do nothing on failure (miss)
};

// Wolf special ability functions
const wolfPackTactics = (_user: CharacterCard, target: CharacterCard): void => {
  const roll1 = rollDamage(0, 6); // Roll 0-6
  const roll2 = rollDamage(0, 6); // Roll 0-6
  const damage = roll1 + roll2;
  target.takeDamage(damage);
};

const wolfPounce = (_user: CharacterCard, target: CharacterCard): void => {
  performChanceEffect(0.8, () => {
    target.takeDamage(9); // 80% chance to hit
  });
};

// Snake special ability functions
const snakeVenomStrike = (user: CharacterCard, target: CharacterCard): void => {
  target.takeDamage(6);
  user.heal(3);
};

const snakeConstrict = (_user: CharacterCard, target: CharacterCard): void => {
  const damage = rollDamage(0, 8) + 2; // Roll 0-8 and add 2
  target.takeDamage(damage);
};

// Hawk special ability functions
const hawkTalonDive = (_user: CharacterCard, target: CharacterCard): void => {
  performChanceEffect(0.7, () => {
    target.takeDamage(12); // 70% chance to hit
  });
};

const hawkSkystrike = (_user: CharacterCard, target: CharacterCard): void => {
  const roll1 = rollDamage(0, 4); // Roll 0-4
  const roll2 = rollDamage(0, 4); // Roll 0-4
  const roll3 = rollDamage(0, 4); // Roll 0-4
  const damage = roll1 + roll2 + roll3;
  target.takeDamage(damage);
};

// Bear special ability functions
const bearMaul = (_user: CharacterCard, target: CharacterCard): void => {
  const damage = rollDamage(0, 10) + 2; // Roll 0-10 and add 2
  target.takeDamage(damage);
};

const bearCrushingSwipe = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  target.takeDamage(8);
};

// Owl special ability functions
const owlNightAmbush = (_user: CharacterCard, target: CharacterCard): void => {
  const extraDamage = rollDamage(0, 5); // Roll 0-5
  const totalDamage = 5 + extraDamage;
  target.takeDamage(totalDamage);
};

const owlSilentTalons = (_user: CharacterCard, target: CharacterCard): void => {
  performChanceEffect(0.75, () => {
    target.takeDamage(10); // 75% chance to hit
  });
};

// Create special ability arrays for each monster
const wolfSpecials: SpecialAbilityFn[] = [wolfPackTactics, wolfPounce];
const wolfTitles = ["Pack Tactics", "Pounce"];
const wolfDescriptions = [
  "Roll 0 – 6 twice; sum (0 – 12)",
  "80% chance to deal 9 damage; 20% chance to miss",
];

const snakeSpecials: SpecialAbilityFn[] = [snakeVenomStrike, snakeConstrict];
const snakeTitles = ["Venom Strike", "Constrict"];
const snakeDescriptions = [
  "Deal 6 damage and heal 3 HP",
  "Roll 0 – 8 and add 2 damage (2 – 10)",
];

const hawkSpecials: SpecialAbilityFn[] = [hawkTalonDive, hawkSkystrike];
const hawkTitles = ["Talon Dive", "Skystrike"];
const hawkDescriptions = [
  "70% chance to deal 12 damage; 30% chance to miss",
  "Roll 0 – 4 three times; sum (0 – 12)",
];

const bearSpecials: SpecialAbilityFn[] = [bearMaul, bearCrushingSwipe];
const bearTitles = ["Maul", "Crushing Swipe"];
const bearDescriptions = [
  "Roll 0 – 10 and add 2 damage (2 – 12)",
  "Deal flat 8 damage",
];

const owlSpecials: SpecialAbilityFn[] = [owlNightAmbush, owlSilentTalons];
const owlTitles = ["Night Ambush", "Silent Talons"];
const owlDescriptions = [
  "Deal 5 damage, then roll 0 – 5 for extra (5 – 10)",
  "75% chance to deal 10 damage; 25% chance to miss",
];

// Define monster configs (blueprint for creating monsters)
const monsterConfigs: MonsterConfig[] = [
  {
    name: "Wolf",
    maxHealth: 25,
    attackRange: [0, 6],
    specialAbilities: wolfSpecials,
    specialTitles: wolfTitles,
    specialDescriptions: wolfDescriptions,
  },
  {
    name: "Snake",
    maxHealth: 23,
    attackRange: [0, 8],
    specialAbilities: snakeSpecials,
    specialTitles: snakeTitles,
    specialDescriptions: snakeDescriptions,
  },
  {
    name: "Hawk",
    maxHealth: 21,
    attackRange: [0, 8],
    specialAbilities: hawkSpecials,
    specialTitles: hawkTitles,
    specialDescriptions: hawkDescriptions,
  },
  {
    name: "Bear",
    maxHealth: 27,
    attackRange: [0, 10],
    specialAbilities: bearSpecials,
    specialTitles: bearTitles,
    specialDescriptions: bearDescriptions,
  },
  {
    name: "Owl",
    maxHealth: 22,
    attackRange: [0, 6],
    specialAbilities: owlSpecials,
    specialTitles: owlTitles,
    specialDescriptions: owlDescriptions,
  },
];

// Factory function to create a new monster instance from config
function createMonster(config: MonsterConfig): MonsterCard {
  return new MonsterCard(
    config.name,
    config.maxHealth,
    config.attackRange,
    config.specialAbilities,
    config.specialTitles,
    config.specialDescriptions
  );
}

// Export a function to get a fresh copy of the monster deck where each monster is newly instantiated
export const getMonsterDeck = (): MonsterCard[] => {
  // Create new instances of each monster
  return monsterConfigs.map((config) => createMonster(config));
};
